import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Users } from '../modals/users';
import { UsersService } from '../services/users/users.service';
import {  
          addProducts, 
          deleteProduct, 
          deleteProducts, 
          setProducts, 
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
  currentView:string="profile"
  user:Users=new Users()
  state$: Observable<any>
  users:Array<Users>
  currentUser:Users
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
      const users:Users[] = data.users
      if (users.length>0){
        const cUser:Users=users.filter(user=>user.id===data.credentials.id)[0]
        if (cUser.role==="customer"){
          this.currentUser={...cUser,products:data.products.filter(p=>p.customer===cUser.id)}
        }else if(cUser.role==="agent"){
          this.currentUser={...cUser,products:data.products.filter(p=>p.user===cUser.id)}
        }else{
          this.currentUser={...cUser,products:data.products}
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
    // this.getCurrentUser()
    this.getallusers()
    this.fetchAllProducts()
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
  
  getUserProducts(uid){
    const user:Users = this.users.filter(user => user.id===uid)[0]
    const productIds = user.products.map(d=>d.id)
    this.us.getProducts(uid).subscribe( products=>{
      products.forEach( payload => !productIds.includes(payload.id) && this.store.dispatch(addProducts({uid,payload})) )
    }) 
  }

  modifyUser(user:Users){
    const {products,...data} = {...user,dob:JSON.stringify(user.dob)}
    return data
  }
  
  // USER FUNCTIONS
  getCurrentUser(){
     this.us.getUser().subscribe( async user =>{
      // if (user.role==="admin") this.getallusers()
      this.getallusers()
      // await this.getUserProducts(data.id)
    })
  }

  getallusers(){
    this.us.getAllUsers().subscribe(async data=>{
      await this.store.dispatch(setUsers(data))
      // await data.forEach( async user=>{
      //   await this.getUserProducts(user.id)
      // })
    })
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

  updateUser(user:Users){
    this.user=user
  }
  updateView(view:string){
    this.currentView=view
  }
  open(content:any) {
    this.ms.open(content, { scrollable: true });
  }

  //PRODUCTS
  fetchAllProducts(){
    this.us.getAllProducts().subscribe(data=>this.store.dispatch(setProducts(data)))
  }

  // ADDING
  addprods(data:any){
    console.log(data)
    const product=data.payload
    const {id,...payload} = {...product,
                              created:JSON.stringify(product.created),
                              id:product.id
                              }
    console.log(payload)                              
    this.us.createProduct(payload).subscribe(d=>{
      console.log(d)
      this.fetchAllProducts()
    })
  }

  // DELETING
  deleteprods(data:any){
    console.log(data)
    const id = data.payload.id
    this.us.deleteProduct(id).subscribe(res=>{
      console.log(id)
      this.store.dispatch(deleteProduct(id))
    })
  }
}
