import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
          setUsers,
          updateClients,
          updatedUsers} from '../state/app.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentView:string="analytics"
  state$: Observable<any>
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
      console.log(data.users)
      const workers:Person[] = data.users.map(w=>{return {...w,fullname:`${w.firstname} ${w.surname}`}})
      const clients:Client[] = data.clients.map(c=>{
        const agent:Person = workers.filter(w => w.id === c.agent)[0]
        return {...c,agentName:`${agent.firstname} ${agent.surname}`,fullname:`${c.firstname} ${c.surname}`} })
      if (workers.length>0){
        const cUser:Person= workers.filter(w=>w.id===data.credentials.id)[0]
        const csagents:Person[] = workers.filter(w=>w.role==="CS Agent" || w.role==="CS Leader").map(a=>{
          return {...a,clients:clients.filter(c => c.agent === a.id)} })
        const lbfagents:Person[] = workers.filter(w=>w.role==="LBF Agent" || w.role==="LBF Leader" ).map(a=>{
          return {...a,clients:clients.filter(c => c.agent === a.id)} })
        const csleaders:Person[] = csagents.filter(w=>w.role==="CS Leader").map( w=> {
          return {...w,workers:csagents.filter(a=> a.branch===w.branch && a.team===w.team )}
        })
        const lbfleaders:Person[] = lbfagents.filter(w=>w.role==="LBF Leader").map( w=> {
          return {...w,workers:lbfagents.filter(a=> a.branch===w.branch && a.team===w.team )}
        })
        const csbmanagers:Person[] = workers.filter(w=>w.role==="CS Branch Manager").map( w=> {
          return {...w,workers:csagents.filter(a=> a.branch===w.branch )}
        })
        const lbfbmanagers:Person[] = workers.filter(w=>w.role==="LBF Branch Manager").map( w=> {
          return {...w,workers:lbfagents.filter(a=> a.branch===w.branch )}
        })

        switch(cUser.role){
          case 'Admin':
            this.currentUser = { ...cUser,
              clients,
              agents:[...csagents,...lbfagents],
              workers:[...csagents,...lbfagents,...csleaders,...lbfleaders,...csbmanagers,...lbfbmanagers],
              csleaders,
              lbfleaders,
              csbmanagers,
              lbfbmanagers,
              rmanagers:[],
              zmanagers:[]
            }
            break
          case 'CS Agent':
            this.currentUser = csagents.filter( l => l.id === data.credentials.id)[0]
            break
          case 'LBF Agent':
            this.currentUser = lbfagents.filter( l => l.id === data.credentials.id)[0]
            break
          case 'CS Leader':
            const csuser:Person = csleaders.filter( l => l.id === data.credentials.id )[0]
            // we then extract all worker clients and merge them such that the team leader can have acces to team clients 
            const csextraClients = [].concat.apply([],csuser.workers.filter( u => u.id !== csuser.id).map( u => {return u.clients}))
            //we append the merged (csextraClients) to the current use clients
            this.currentUser = {...csuser, clients:[ ...csuser.clients,...csextraClients]} 
            break
          case 'LBF Leader':
            const lbfuser:Person = lbfleaders.filter( l => l.id === data.credentials.id )[0]
            const lbfextraClients = [].concat.apply([],lbfuser.workers.filter( u => u.id !== lbfuser.id).map( u => {return u.clients}))
            this.currentUser = {...lbfuser, clients:[ ...lbfuser.clients,...lbfextraClients]} 
            break
          case 'CS Branch Manager':
            const csbm:Person = csbmanagers.filter( l => l.id === data.credentials.id )[0]
            const csbmextraClients = [].concat.apply([],csbm.workers.filter( u => u.id !== csbm.id).map( u => {return u.clients}))
            this.currentUser = {...csbm, clients:[ ...csbm.clients,...csbmextraClients]} 
            break
          case 'LBF Branch Manager':
            const lbfbm:Person = lbfbmanagers.filter( l => l.id === data.credentials.id )[0]
            const lbfbmextraClients = [].concat.apply([],lbfbm.workers.filter( u => u.id !== lbfbm.id).map( u => {return u.clients}))
            this.currentUser = {...lbfbm, clients:[ ...lbfbm.clients,...lbfbmextraClients]} 
            break
        }
      }
    })
  }
  
  ngOnInit(): void {
    this.getallusers()
    this.getallclients()
  }

  // UTILS

  updateView(view:string){
    this.currentView=view
  }
  open(content:any) {
    this.ms.open(content, { scrollable: true });
  }

  // USER FUNCTIONS

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
      if (err.error.err.code === 'ER_DUP_ENTRY') {
        this.store.dispatch(addClientsError("User with this email already exsists"))
      }
    }})
  }

  patchClient(user){
    this.us.patchClient(user).subscribe({ 
      next: data => {
        this.store.dispatch(updateClients({...user,dob:JSON.parse(user.dob), created:JSON.parse(user.created)}))
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
