import { Injectable } from '@angular/core';
import { Router, CanActivate} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {
  state$:Observable<any>
  isauth:boolean
  constructor(
    private store:Store<{state:any}>,
    private router:Router
    ){
    this.state$ = this.store.select('state');
  }
  async canActivate(){
    try{
      await this.state$.subscribe(data=>this.isauth=data.isauthenticated)
      if (this.isauth){
        return true
      }else{
        this.router.navigate([""])
        return false
      }
    }catch(err){
      return false
    }
  }
  
}
