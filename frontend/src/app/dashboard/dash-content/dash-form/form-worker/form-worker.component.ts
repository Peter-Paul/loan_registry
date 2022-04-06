import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Person } from 'src/app/modals/users';

@Component({
  selector: 'app-form-worker',
  templateUrl: './form-worker.component.html',
  styleUrls: ['./form-worker.component.css']
})
export class FormWorkerComponent implements OnInit {
  @Input() worker:Person
  @Input() edit:Boolean
  @Input() action:string
  @Output() ew:EventEmitter<any>=new EventEmitter()
  genders=["Male", "Female"]
  roles=[ "Admin", "CS Agent", "LBF Agent", "CS Leader", "LBF Leader","CS B.Manager", "LBF B.Manager",
          "CS R.Manager", "LBF R.Manager", "CS Z.Manager"]
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

  constructor() { }

  ngOnInit(): void {
  }

  viewWorker(){
    this.ew.emit()
  }
  workerPatch(){}

}
