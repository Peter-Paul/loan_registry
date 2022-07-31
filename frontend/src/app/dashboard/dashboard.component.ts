import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Client, Person } from '../modals/users';
import { UsersService } from '../services/users/users.service';
import {  
          addClient,
          addClientsError,
          addUsers, 
          addUsersError, 
          deleteClient, 
          deleteUsers, 
          setClients, 
          setUser, 
          setUsers,
          updateClients,
          updatedUsers} from '../state/app.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentView:string="dashboard"
  state$: Observable<any>
  currentUser
  currentUser_
  minuteBeforeExpiry
  timeout
  credentials
  loading:boolean=true
  modifiedUser$:Observable<Person>
  constructor(
    private ms:NgbModal,
    private store:Store<{state:any}>,
    private us:UsersService,
    ) {
    this.state$ = this.store.select('state');
    this.state$.subscribe(data=>{
      this.credentials = data.credentials
      if (data.userLoaded){
        const cuser = data.user

        this.modifyCuser(cuser).subscribe( data => {
          data.role == "CS Agent" || data.role == "LBF Agent"?
          this.currentUser = data:
          this.currentUser = {  ...data,
                              // Ensure that workers are also modified as analytics will also be done on them
                              workers:data.workers.map( w => { 
                                let worker
                                w.clients.length>0 ? 
                                this.modifyCuser(w).subscribe(data=> {worker=data}) : 
                                worker = {...w,archives:[]}
                                return worker
                              })
                            }
        })

        this.loading=false
        console.log(this.currentUser)
      }
    })
  }
  
  ngOnInit(): void {
    this.getUser()
  }


  // UTILS

  updateView(view:string){
    this.currentView=view
  }

  open(content:any) {
    this.ms.open(content, { scrollable: true });
  }

  archive(c:Client){
    const now:any = new Date()
    const created:any =  new Date(c.created.year,c.created.month,c.created.day)
    const days = (now-created)/(86400*1000)
    return (days < 30) ?  false :  true
  }

  labelling(c:Client){
    const now:any = new Date()
    const created:any =  new Date(c.created.year,c.created.month-1,c.created.day)
    const days:any = (now-created)/(86400*1000)
    return (days < 10) ?  {...c,days:parseInt(days),label:"Hot"} :  (days < 30) ? {...c,days:parseInt(days),label:"Cold"} : {...c,days:parseInt(days),label:"Dumped"}
  }

  modifyCuser(user:Person):Observable<Person>{
    const {clients} = user
    const active = clients.filter( c => !this.archive(c) ).map( c => c = this.labelling(c) )
    const archives = clients.filter( c => this.archive(c) ).map( c => c = this.labelling(c) )
    const getAnalytics = (data) => {
      const totalProspects=data.filter(c=>(c.status == "Prospect" || c.status == "Valid Prospect")).length
      const totalLeads=data.filter(c=>(c.status == "Lead")).length
      const totalConversions=data.filter(c=>(c.status == "Converted")).length
      const total = totalProspects+totalLeads+totalConversions
      const pRate= total== 0 ? 0 : (totalProspects/(total))*100
      const lRate= total== 0 ? 0 : (totalLeads/(total))*100
      const cRate= total== 0 ? 0 : (totalConversions/(total))*100
      return [totalProspects,totalLeads,totalConversions,pRate,lRate,cRate]
    }

    const [tp,tl,tc,pr,lr,cr] = getAnalytics(active)
    const [gtp,gtl,gtc,gpr,glr,gcr] = getAnalytics(archives)
    return of({  ...user,
              clients:active,
              archives:archives,
              nprospects:tp,
              nleads:tl,
              nconversions:tc,
              prate:pr,
              lrate:lr,
              crate:cr,
              gnprospects:gtp,
              gnleads:gtl,
              gnconversions:gtc,
              gprate:gpr,
              glrate:glr,
              gcrate:gcr,
            })
  }

  // USER FUNCTIONS
  getUser(){
    this.us.getUser().subscribe( async data => {
        await this.store.dispatch(setUser(data))
    } )
  }

  // getallusers(){
  //   this.us.getAllUsers().subscribe(async data=>{
  //     await this.store.dispatch(setUsers(data))
  //   })
  // }

  createUser(data){
    this.us.createUser(data).subscribe( { 
      next: worker => this.store.dispatch(addUsers(worker))
    })
  }

  patchUser(user){
    this.us.patchUser(user).subscribe({ 
      next: data => {
        console.log(data)
        user.id === this.currentUser.id ? this.getUser() : this.store.dispatch(updatedUsers(data))
      }
  })
  }

  deleteUser(id:string){
    this.us.deleteUser(id).subscribe({
      next: data => {
        this.store.dispatch(deleteUsers(id))
      }
    })
  }

  // CLIENT FUNCTIONS

  getallclients(){
    this.us.getAllClients().subscribe({ 
      next : async data=>await this.store.dispatch(setClients(data)),
      error: err=> {
        console.log(err)
        this.store.dispatch(addClientsError("Fetch clients error"))
      }
    })
  }

  createClient(data){
    this.us.createClient(data).subscribe( { 
      next: client => {
        console.log(client)
        this.store.dispatch(addClient(client))},
      error: err => {
        console.log(err)
      if (err.error.err.code === 'ER_DUP_ENTRY') {
        this.store.dispatch(addClientsError("User with this email already exsists"))
      }
    }})
  }

  patchClient(user){
    this.us.patchClient(user).subscribe({ 
      next: data => {
        // console.log(user)
        // console.log(data)
        this.store.dispatch(updateClients({...user,fullname:`${user.firstname} ${user.surname}`,dob:JSON.parse(user.dob), created:JSON.parse(user.created)}))
      },
      error:err =>{
        this.store.dispatch(addClientsError("Update error"))
      }
    })
  }

  deleteClient(id:string){
    this.us.deleteClient(id).subscribe({
      next: data => {
        this.store.dispatch(deleteClient(id))
      },
      error:err =>{
        this.store.dispatch(addClientsError("Delete Error"))
      }
    })
  }

}
