import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Client, Person, User } from '../modals/users';
import { UsersService } from '../services/users/users.service';
import {  
          addProducts, 
          deleteClient, 
          deleteProducts, 
          setClients, 
          setUser, 
          setUserDetails,
          setUsers,
          updatedUsers} from '../state/app.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {
  currentView:string="users"
  user:Person=new Person()
  state$: Observable<any>
  users:Person[]
  currentUser
  minuteBeforeExpiry
  timeout
  credentials
  constructor(
    private ms:NgbModal,
    private store:Store<{state:any}>,
    private us:UsersService,
    ) {
    this.state$ = this.store.select('state');
    this.state$.subscribe(data=>{
      this.credentials = data.credentials
      // this.minuteBeforeExpiry=data.credentials.exp-60000 // one minute = 60000 micro seconds
      // console.log(this.minuteBeforeExpiry)
      this.users=data.users.slice() // copy of users state
      // this.currentUser=data.user?{...data.user}:undefined // copy of user state
      // this.currentUser=data.users.length>0?data.users.filter(user=>user.id===data.credentials.id)[0]:undefined
      const workers:Person[] = data.users.map(w=>{return {...w,fullname:`${w.firstname} ${w.surname}`}})
      const clients:Client[] = data.clients.map(c=>{
        const agent:Person = workers.filter(w => w.id === c.agent)[0]
        return {...c,agentName:`${agent.firstname} ${agent.surname}`,fullname:`${c.firstname} ${c.surname}`} })
      if (workers.length>0){
        const cUser:Person= workers.filter(w=>w.id===data.credentials.id)[0]
        const csagents:Person[] = workers.filter(w=>w.role==="CS Agent").map(a=>{
          return {...a,clients:clients.filter(c => c.agent === a.id)} })
        const lbfagents:Person[] = workers.filter(w=>w.role==="LBF Agent").map(a=>{
          return {...a,clients:clients.filter(c => c.agent === a.id)} })
        const csleaders:Person[] = workers.filter(w=>w.role==="CS Team Lead").map( w=> {
          return {...w,teamMates:csagents.filter(a=> a.branch===w.branch && a.team===w.team )}
        })
        const lbfleaders:Person[] = workers.filter(w=>w.role==="LBF Team Lead").map( w=> {
          return {...w,teamMates:csagents.filter(a=> a.branch===w.branch && a.team===w.team )}
        })
        const csbmanagers:Person[] = workers.filter(w=>w.role==="CS Branch Manager").map( w=> {
          return {...w,csagents:csagents.filter(a=> a.branch===w.branch )}
        })
        const lbfbmanagers:Person[] = workers.filter(w=>w.role==="LBF Branch Manager").map( w=> {
          return {...w,csagents:csagents.filter(a=> a.branch===w.branch )}
        })
        const csclients:Client[] = clients.filter(c=>c.type==="CS Client")
        const lbfclients:Client[] = clients.filter(c=>c.type==="LBF Client")

        if (cUser.role==="Admin"){
          this.currentUser = { ...cUser,
                        clients,
                        agents:[...csagents,...lbfagents],
                        csleaders,
                        lbfleaders,
                        csbmanagers,
                        lbfbmanagers,
                        rmanagers:[],
                        zmanagers:[]
                      }
          console.log(this.currentUser)
        }else if(cUser.role==="CS Agent"){
          // this.currentUser={...cUser,products:data.products.filter(p=>p.user===cUser.id)}
        }else if(cUser.role==="lbfagent"){
          // this.currentUser={...cUser,products:data.products}
        }else if(cUser.role==="leader"){
          // this.currentUser={...cUser,products:data.products}
        }
      }
      for (let user of data.users){
        if (user.id===this.user.id){ // after updating table profile, make this the user
          this.user={...user}
        }
      }
    })
  }
  
  ngOnInit(): void {
    this.getallusers()
    this.fetchAllClients()
    // this.us.refreshToken().subscribe(data=>console.log(data))
    // this.silentRefresh()

  }

  ngOnDestroy(): void {
    // this.stopRefresh()
  }
  
  // UTILITY FUNCTIONS
  tokenStatus(){
    this.us.refreshToken().subscribe(data=>{
      const token = data.token
      const payload = {credentials:this.credentials,token,isauthenticated:true}
      this.store.dispatch(setUserDetails(payload))
    })
  }
  
  silentRefresh(){
    this.timeout = setTimeout(()=>this.tokenStatus(),this.minuteBeforeExpiry)
  }
  
  stopRefresh(){
    clearTimeout(this.timeout)
  }
  
  modifyUser(user:Person){
    const data = {...user,dob:JSON.stringify(user.dob)}
    return data
  }
  
  // USER FUNCTIONS

  getallusers(){
    this.us.getAllUsers().subscribe(async data=>{
      console.log(data)
      await this.store.dispatch(setUsers(data))
      // await data.forEach( async user=>{
      //   await this.getUserProducts(user.id)
      // })
    })
  }

  //PRODUCTS
  fetchAllClients(){
    this.us.getAllClients().subscribe(data=>{
      console.log(data)
      this.store.dispatch(setClients(data))})
  }

  userPatch(data){
    console.log(this.currentUser.id,this.user.id)
    if (this.currentUser.id===this.user.id){
      this.us.patchUser(data).subscribe(data=>console.log(data))
    }else{
      const {uid,...payload}=data
      this.us.patchOtherUser(payload).subscribe(data=>console.log(data))
    }
  }

  updateUser(user:Person){
    this.user=user
  }
  updateView(view:string){
    this.currentView=view
  }
  open(content:any) {
    this.ms.open(content, { scrollable: true });
  }



  // ADDING
  addclient(data:any){
    console.log(data)
    const client=data.payload
    const {id,...payload} = {...client,
                              dob:JSON.stringify(client.dob),
                              created:JSON.stringify(client.created),
                              id:client.id
                              }
    console.log(payload)                              
    this.us.createClient(payload).subscribe(d=>{
      console.log(d)
      this.fetchAllClients()
    })
  }

  // DELETING
  deleteclient(data:any){
    console.log(data)
    const id = data.payload.id
    this.us.deleteClient(id).subscribe(res=>{
      console.log(id)
      this.store.dispatch(deleteClient(id))
    })
  }
}
