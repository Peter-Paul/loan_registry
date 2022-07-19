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
  currentView:string="clients"
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
                                worker = w
                                return worker
                              })
                            }
        })

        this.loading=false
        // console.log(this.currentUser)
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

  modifyCuser(user:Person):Observable<Person>{
    const {clients} = user
    const totalProspects=clients.filter(c=>(c.status == "Prospect" || c.status == "Valid Prospect")).length
    const totalLeads=clients.filter(c=>(c.status == "Lead")).length
    const totalConversions=clients.filter(c=>(c.status == "Converted")).length
    const pRate=(totalProspects/(totalProspects+totalLeads+totalConversions))*100
    const lRate=(totalLeads/(totalProspects+totalLeads+totalConversions))*100
    const cRate=(totalConversions/(totalProspects+totalLeads+totalConversions))*100
    return of({  ...user,
              clients:clients,
              nprospects:totalProspects,
              nleads:totalLeads,
              nconversions:totalConversions,
              prate:pRate,
              lrate:lRate,
              crate:cRate,
            })
  }

  // USER FUNCTIONS
  getUser(){
    this.us.getUser().subscribe( async data => {
        await this.store.dispatch(setUser(data))
    } )
  }

  getallusers(){
    this.us.getAllUsers().subscribe(async data=>{
      await this.store.dispatch(setUsers(data))
    })
  }

  createUser(data){
    this.us.createUser(data).subscribe( { 
      next: worker => {
        this.store.dispatch(addUsers(worker))
      },
      error: err => {
      if (err.error.err.code === 'ER_DUP_ENTRY') {
        this.store.dispatch(addUsersError("User with this email already exsists"))
      }
    }})
  }

  patchUser(user){
    this.us.patchUser(user).subscribe({ 
      next: data => {
        this.store.dispatch(updatedUsers({...user,dob:JSON.parse(user.dob)}))
      },
      error:err =>{
        this.store.dispatch(addUsersError("Update error"))
      }
  })
  }

  deleteUser(id:string){
    this.us.deleteUser(id).subscribe({
      next: data => {
        this.store.dispatch(deleteUsers(id))
      },
      error:err =>{
        this.store.dispatch(addUsersError("Delete Error"))
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
