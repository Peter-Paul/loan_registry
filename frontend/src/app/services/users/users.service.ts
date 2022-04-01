import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { setUser, setUserDetails, setUsers } from 'src/app/state/app.actions'
import { catchError, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Users,Product } from 'src/app/modals/users';



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

  modifyUserObj(data):Users{
    const sample:Users=new Users()
    return {...data,
      dob: data.dob.length>0? JSON.parse(data.dob) : sample.dob,
      gender:data.gender.length>0? data.gender : sample.gender,
      team:data.team.length>0? data.team : sample.team,
      holding: data.holding!==''? parseInt(data.holding):0,
      products:[],
   }

  }

  modifyProductObj(data):Product{
    const sample:Product=new Product()
    return {  ...data,
              created: data.created.length>0? JSON.parse(data.created) : sample.created,
              amount: data.amount!==''? parseInt(data.amount):0
            }
  }


  // AUTHENTICATION SERVICE FUNCTIONS

  signin(data):Observable<any>{
    return this.http.post(`${this.url}user/login`,data,{withCredentials:true}).pipe(
      catchError(err=>{
        console.log(err)
        return err}),
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

  signup(data):Observable<any>{

    return this.http.post(`${this.url}user/signup`,data).pipe(
      catchError(err=>{
        console.log(err)
        return err}),
      map(res=>{
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
      catchError(err=>{
        console.log(err)
        return err
      }),
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
  getUser():Observable<any>{ 
    return this.http.get(`${this.url}user/${this.credentials.id}`,this.getOptions()).pipe(
      catchError(err=>{return err}),
      map( res=>{
        const user:Users = this.modifyUserObj(res[0])        
        this.store.dispatch(setUser(user))
        return user
      })
    )
  }

  getAllUsers():Observable<any>{ 
    return this.http.get(`${this.url}user`,this.getOptions()).pipe(
      catchError(err=>{return err}),
      map((res:any)=>{
        // console.log(res.data)
        const users:Users[] = (res.data as []).map(d=>this.modifyUserObj(d))  
        // this.store.dispatch(setUsers(users))       
        return users
      })
    )
  }

  patchUser(data):Observable<any>{
    return this.http.patch(`${this.url}user/${this.credentials.id}`,data,this.getOptions()).pipe(
      catchError(err=>{return err}),
      map(res=>{
        return res
      })
    )
  }

  patchOtherUser(data):Observable<any>{
    return this.http.patch(`${this.url}user/${data.id}`,data,this.getOptions()).pipe(
      catchError(err=>{
        console.log(err)
        return err}),
      map(res=>{
        return res
      })
    )
  }

  // LEAVE SERVICE FUNCTIONS
  getProducts(uid):Observable<any>{  //uses the user id
    return this.http.get(`${this.url}products/user/${uid}`,this.getOptions()).pipe(
      catchError(err=>{return err}),
      map((res:any)=>{        
        const product:Product[] = res?(res as []).map(d=>this.modifyProductObj(d)) :[]        
        return product
      })
    )
  }

  getAllProducts():Observable<any>{  //uses the user id
    return this.http.get(`${this.url}products`,this.getOptions()).pipe(
      catchError(err=>{return err}),
      map((res:any)=>{        
        const products = (res.data as [])
        const data:Product[] = products.length>0?products.map(d=>this.modifyProductObj(d)) :[]      
        return data
      })
    )
  }

  createProduct(data):Observable<any>{ 
    return this.http.post(`${this.url}products`,data,this.getOptions()).pipe(
      catchError(err=>{return err}),
      map((res:any)=>{   
        return res
      })
    )
  }

  deleteProduct(id):Observable<any>{ 
    return this.http.delete(`${this.url}products/${id}`,this.getOptions()).pipe(
      catchError(err=>{
        console.log(err)
        return err}),
      map((res:any)=>{   
        return res
      })
    )
  }




}
