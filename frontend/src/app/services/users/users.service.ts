import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addUsers, addUsersError, setUserDetails, setUsers } from 'src/app/state/app.actions'
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User, Person, Client } from 'src/app/modals/users';

@Injectable({
  providedIn: 'root'
})


export class UsersService {
  private url ="http://127.0.0.1:3000/"
  state$:Observable<any>
  credentials
  token
  constructor(
    private http:HttpClient,
    private store:Store<{state:any}>,
    private router:Router
    ) {
      this.state$ = this.store.select('state')
      this.state$.subscribe(data=>{
        this.credentials=data.credentials
        this.token=data.token
      })
    }
  
  // UTILITY FUNCTIONS
  getOptions(){
    return {headers:new HttpHeaders({
        "Content-Type":"application/json",
        Authorization: `Bearer ${this.token}`})
    }
  }
  decodeAccessToken(t){
    let data=JSON.parse(window.atob(t.split(".")[1]))
    data.exp = (data.exp*1000)-Date.now() // instead of actual time, get the interval
    return data
  }

  modifyUserObj(data):Person{
    const sample:Person=new Person()
    return {...data,
      fullname:`${data.firstname} ${data.surname}`,
      dob: data.dob.length>0? JSON.parse(data.dob) : sample.dob,
      role:data.role.length>0? data.role : sample.role,
      gender:data.gender.length>0? data.gender : sample.gender,
      team:data.team.length>0? data.team : sample.team,
      branch:data.branch.length>0? data.branch : sample.branch,
      zone:data.zone.length>0? data.zone : sample.zone,
      region:data.region.length>0? data.region : sample.region,
      clients:data.clients?data.clients:[],
      workers:data.workers?data.workers:[]
   }

  }

  modifyClientObj(data):Client{
    const sample:Client=new Client()
    return {  ...data,
              fullname:`${data.firstname} ${data.surname}`,
              gender:data.gender.length>0? data.gender : sample.gender,
              type:data.type.length>0? data.type : sample.type,
              mstatus:data.type=="LBF Client" ? ( data.mstatus.length>0 ? data.mstatus : sample.mstatus ) : "",
              status:data.status.length>0? data.status : sample.status,
              reservation:data.reservation.length>0? data.reservation : sample.reservation,
              dob: data.dob.length>0? JSON.parse(data.dob) : sample.dob,
              created: data.created.length>0? JSON.parse(data.created) : sample.created,
              nin_doc:data.nin_doc===0?false:true,
              eid_doc:data.eid_doc===0?false:true,
              a_letter:data.a_letter===0?false:true,
              i_letter:data.i_letter===0?false:true,
              ipps:data.type=="CS Client" ? ( data.ipps>0 ? data.ipps : sample.ipps ) : "",
            }
  }

  handleError(error:HttpErrorResponse){
    console.log(error.error.message)
    if(error.status == 400 ) alert(error.error.message)    
    if(error.status == 500 ) alert( `Internal Server Error! Try refreshing or contact IT support.` )
    return throwError( ()=> error)
  }

  // AUTHENTICATION SERVICE FUNCTIONS

  signin(data):Observable<any>{
    return this.http.post(`${this.url}user/login`,data,{withCredentials:true}).pipe(
      catchError(this.handleError.bind(this)), // beacuse we need 'this' when using handleError as a callback function
      map(res=>{
        const token = (res as any).token
        const httpOptions={
          headers:new HttpHeaders(
            {"Content-Type":"application/json",
            Authorization: `Bearer ${token}`}
          )
        }
        const credentials=this.decodeAccessToken(token)
        const data = {credentials,token,isauthenticated:true,httpOptions}
        this.store.dispatch(setUserDetails(data))
        this.router.navigate(["dashboard"])
        return res
      })
    )
  }

  signout():Observable<any>{
    return this.http.get(`${this.url}user/logout`,{withCredentials:true}).pipe(
      catchError(err=>{
        console.log(err)
        return err}),
      map(res=>{
        console.log(res)
        const data = {credentials:undefined,token:"",isauthenticated:false,user:undefined,users:[]}
        this.store.dispatch(setUserDetails(data))
        this.router.navigate([""])
        return res
      })
    )
  }

  refreshToken():Observable<any>{
    return this.http.get(`${this.url}user/refresh`,{withCredentials:true}).pipe(
      catchError(this.handleError.bind(this)),
      map(res=>{
        const token = (res as any).token
        const httpOptions={
          headers:new HttpHeaders(
            {"Content-Type":"application/json",
            Authorization: `Bearer ${token}`}
          )
        }
        const credentials=this.decodeAccessToken(token)
        const data = {credentials,token,isauthenticated:true,httpOptions}
        this.store.dispatch(setUserDetails(data))
        this.router.navigate(["dashboard"])
        return res
      })
    )
  }

  // USER SERVICE FUNCTIONS
  createUser(data):Observable<any>{
    return this.http.post(`${this.url}user/create`,data).pipe(
      catchError(this.handleError.bind(this)),
      map(res=>{
        let data = (res as any).user
        // const worker:Person = this.modifyUserObj(data)
        // return worker
        let person:Person

        of( this.modifyUserObj(data) ).subscribe(data => {
            person = { ...data,
                      workers:data.role == "CS Agent" || data.role == "LBF Agent"? []:
                      data.workers.filter( w => w.id !== data.id).map( (w:Person) => {
                        return this.modifyUserObj( {...w,clients:w.clients.map( c=> { return this.modifyClientObj(c)} )} ) 
                      }),
                      clients:data.clients.map( c=> {return this.modifyClientObj(c)})
                      }
        })
               
        return person
        
      })
    )
  }

  getUser():Observable<any>{ 
    return this.http.get(`${this.url}user/info/details`,this.getOptions()).pipe(
      catchError(err=>{return err}),
      map( res=>{
        let person:Person

        of( this.modifyUserObj(res) ).subscribe(data => {
            person = { ...data,
                      workers:data.role == "CS Agent" || data.role == "LBF Agent"? []:
                      data.workers.filter( w => w.id !== data.id).map( (w:Person) => {
                        return this.modifyUserObj( {...w,clients:w.clients.map( c=> { return this.modifyClientObj(c)} )} ) 
                      }),
                      clients:data.clients.map( c=> {return this.modifyClientObj(c)})
                      }
        })
               
        return person
      })
    )
  }

  getAllUsers():Observable<any>{ 
    return this.http.get(`${this.url}user`,this.getOptions()).pipe(
      catchError(this.handleError.bind(this)),
      map((res:any)=>{
        const people:Person[] = (res.data as []).map(d=>this.modifyUserObj(d))  
        return people
      })
    )
  }

  patchUser(data):Observable<any>{ // filter out passwords and email
    return this.http.patch(`${this.url}user/update`,data,this.getOptions()).pipe(
      catchError(this.handleError.bind(this)),
      map(res=>{
        // return res

        let data = (res as any).user
        // const worker:Person = this.modifyUserObj(data)
        // return worker
        let person:Person

        of( this.modifyUserObj(data) ).subscribe(data => {
            person = { ...data,
                      workers:data.role == "CS Agent" || data.role == "LBF Agent"? []:
                      data.workers.filter( w => w.id !== data.id).map( (w:Person) => {
                        return this.modifyUserObj( {...w,clients:w.clients.map( c=> { return this.modifyClientObj(c)} )} ) 
                      }),
                      clients:data.clients.map( c=> {return this.modifyClientObj(c)})
                      }
        })
               
        return person
      })
    )
  }

  deleteUser(id:string):Observable<any>{
    return this.http.delete(`${this.url}user/delete/${id}`,this.getOptions()).pipe(
      catchError(this.handleError.bind(this)),
      map(res=>{return res})
    )
  }

  forgotPassword(email:string){
    return this.http.post(`${this.url}user/forgot_password`,{email}).pipe(
      catchError(this.handleError.bind(this)),
      map(res=>{
        return res
      })
    )
  }

  changePassword(data){
    return this.http.patch(`${this.url}user/change_password`,data,this.getOptions()).pipe(
      catchError(this.handleError.bind(this)),
      map(res=>{return res})
    )
  }

  // CLIENT SERVICE FUNCTIONS

  getAllClients():Observable<any>{  //uses the user id
    return this.http.get(`${this.url}client`,this.getOptions()).pipe(
      catchError(this.handleError.bind(this)),
      map((res:any)=>{      
        const data = (res.data as [])
        const clients:Client[] = data.length>0?data.map(d=>this.modifyClientObj(d)) :[]      
        return clients
      })
    )
  }

  createClient(data):Observable<any>{ 
    return this.http.post(`${this.url}client`,data,this.getOptions()).pipe(
      catchError(this.handleError.bind(this)),
      map((res:any)=>{   
        const data = (res as any).client
        const client:Client = this.modifyClientObj(data)
        return client
      })
    )
  }

  patchClient(data):Observable<any>{
    return this.http.patch(`${this.url}client/${data.id}`,data,this.getOptions()).pipe(
      catchError(this.handleError.bind(this)),
      map(res=>{return res})
    )
  }

  deleteClient(id):Observable<any>{ 
    return this.http.delete(`${this.url}client/${id}`,this.getOptions()).pipe(
      catchError(this.handleError.bind(this)),
      map((res:any)=>{console.log(res);return res})
    )
  }

}
