import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationStart, Router, Event as NavigationEvent } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  @Output() authForm:EventEmitter<any> = new EventEmitter()
  currentRoute:string
  event$
  state$:Observable<any>
  isauth:boolean
  constructor(
    private router:Router,
    private store:Store<{state:any}>,
    private us:UsersService
    ) { 
      this.state$ = this.store.select('state');
      this.event$=this.router.events.subscribe((event: NavigationEvent) => {
              if(event instanceof NavigationStart) {
                this.currentRoute=event.url
              }
            });
  }

  ngOnInit(): void {
    this.state$.subscribe(data=>this.isauth=data.isauthenticated)
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }

  showForms(){
    this.authForm.emit()
  }
  logout(){
    this.us.signout().subscribe()
  }
}
