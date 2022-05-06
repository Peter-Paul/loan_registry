import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Person } from 'src/app/modals/users';
import { usersErrorReset } from 'src/app/state/app.actions';

@Component({
  selector: 'app-form-worker',
  templateUrl: './form-worker.component.html',
  styleUrls: ['./form-worker.component.css']
})
export class FormWorkerComponent implements OnInit,OnDestroy {
  @Input() worker:Person
  @Input() edit:Boolean
  @Input() action:string
  @Output() ew:EventEmitter<any>=new EventEmitter()
  @Output() cu:EventEmitter<any> =new EventEmitter()
  @Output() pu:EventEmitter<any> =new EventEmitter()
  genders=["Male", "Female"]
  roles=[ "Admin", "CS Agent", "LBF Agent", "CS Leader", "LBF Leader","CS Branch Manager", "LBF Branch Manager",
          "CS Region Manager", "LBF Region Manager", "CS Zone Manager"]
  teams=["A", "B", "C", "D", "E"]
  cszones = ["North","South"]
  csregions = { "North":["Busoga","Eastern","Elgon","North West","Northern","Teso","Westnile"],
              "South":["Central","City","Great Masaka","Kigezi","Nkore","Rwenzori","Western"]
            }
  csbranches={
              "Busoga":["Jinja","Iganga","Mayuge","Kamuli"],
              "Eastern":["Mbale","Tororo","Pallisa","Busia"],
              "Elgon":["Bukwo","Kapchorwa","Nakapiripirit"],
              "North West":["Yumbe","Adjumani","Gulu"],
              "Northern":["Kitgum","Lira","Pader","Dokolo"],
              "Teso":["Kumi","Soroti","Moroto","Katakwi"],
              "Westnile":["Nebbi","Arua","Koboko","Yumbe"],
              "Central":["Luweero","Mubende","Mukono","Mityana"],
              "City":["Kampala"],
              "Great Masaka":["Buwama","Masaka","Kyotera","Gomba"],
              "Kigezi":["Kabale","Rukungiri","Ntungamo","Kisoro"],
              "Nkore":["Ishaka","Mbarara","Ibanda","Lyantonde"],
              "Rwenzori":["Bundibugyo","Kyenjojo","Fort Portal","Kasese"],
              "Western":["Hoima","Masindi","Kagadi","Kiboga"],
            }
  lbfregions=["Central","Eastern","Busoga","Northern","Rwenzori"]
  lbfbranches={
    "Busoga":["Jinja","Iganga","Mayuge","Kamuli"],
    "Eastern":["Mbale","Tororo","Pallisa","Busia"],
    "North West":["Gulu"],
    "Northern":["Lira"],
    "Teso":["Soroti"],
    "Central":[ "City","Luweero","Mubende","Mukono",
                "Mityana","Nateete","Nakawa","Ntinda",
                "Gayaza","Kikuubo","Nansana","Kawempe",
                "Kabalagala","Kyaliwajjala"],
    "Mbarara":["Mbarara","Masaka"],
    "Rwenzori":["Kyenjojo","Fort Portal","Kasese"],
    "Entebbe":["Entebbe","Kajjansi"],
  }
  workerForm:FormGroup
  state$: Observable<any>
  error=""
  constructor(
    private store:Store<{state:any}>
  ) { 
    this.state$ = this.store.select('state')
    this.state$.subscribe( state => {
      state.workerErrorMessage==="" ? this.error="" : this.error=state.workerErrorMessage
    })
  }

  ngOnInit(): void {
    console.log(this.worker)
  }

  ngOnDestroy(): void {
    this.store.dispatch(usersErrorReset())
  }
  

  viewWorker(){
    this.ew.emit()
  }
  workerPatch(){
    if (this.action === 'add'){
      let payload = ( ({ email,password,role,firstname,surname,dob,gender,team,branch,zone,region,contact1,contact2  }) =>
                      ({ email,password,role,firstname,surname,dob:JSON.stringify(dob),gender,team,branch,zone,region,contact1,contact2  }))
                    (this.worker) 
      this.cu.emit(payload)
      // this.worker=new Person() // empty the input feilds
    }else{
      let { clients,fullname,agents,lbfagents,csagents,
            lbfleaders,csleaders,teams,teamMates,csbmanagers,
            lbfbmanagers,rmanagers,zmanagers,...payload} = {...this.worker,dob:JSON.stringify(this.worker.dob)}
      this.pu.emit(payload)
    }
    
  }

}
