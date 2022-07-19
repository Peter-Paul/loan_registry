import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { PageSettingsModel, ToolbarItems, GridComponent } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { Client, Person, User } from 'src/app/modals/users';

@Component({
  selector: 'app-dash-search',
  templateUrl: './dash-search.component.html',
  styleUrls: ['./dash-search.component.css']
})
export class DashSearchComponent implements OnInit, OnChanges {
  @ViewChild('grid') public grid: GridComponent;
  columns={
    'users':{ 
            "gender": false, 
            "role": true, 
            "branch": true, 
            "region": false, 
            "status": false 
    },
    'clients':{ 
            "gender": true, 
            "type": false, 
            "status": true 
    },
  }
  @Output() uview:EventEmitter<any> = new EventEmitter()
  @Output() updateform:EventEmitter<any> = new EventEmitter()
  @Output() cu:EventEmitter<any> = new EventEmitter()
  @Output() pu:EventEmitter<any> = new EventEmitter()
  @Output() du:EventEmitter<any> = new EventEmitter()
  @Output() cc:EventEmitter<any> = new EventEmitter()
  @Output() pc:EventEmitter<any> = new EventEmitter()
  @Output() dc:EventEmitter<any> = new EventEmitter()
  @Input() currentUser:Person
  @Input() currentView:string
  action:string='add'
  worker:Person
  client:Client
  pageSettings:PageSettingsModel = { pageSize: 6 }
  editPermission:boolean
  createPermission:boolean
  public toolbarOptions: ToolbarItems[];
  columnList:string[]
  constructor() { }

  ngOnInit(): void {
    this.permissions()
    this.toolbarOptions = ['ExcelExport','ColumnChooser'];;
    this.columnList = Object.keys(this.columns[this.currentView])
  }

  ngOnChanges(changes: any): void {
    // console.log(changes.currentUser.currentValue)
  }

  permissions(){
    this.editPermission=true
    // this.editPermission = this.currentUser.role==='Admin' || 
    // (this.currentUser.role==='CS Agent' && this.currentView==='clients') || 
    // (this.currentUser.role==='LBF Agent' && this.currentView==='clients') || 
    // (this.currentUser.role==='CS Leader' && (this.currentView==='clients')) || 
    // (this.currentUser.role==='LBF Leader' && this.currentView==='clients') ||
    // (this.currentUser.role==='LBF Branch Manager' && this.currentView==='clients') ||
    // (this.currentUser.role==='CS Branch Manager' && this.currentView==='clients') 

    this.createPermission = (this.currentUser.role==='CS Agent' && this.currentView==='clients') || 
    (this.currentUser.role==='LBF Agent' && this.currentView==='clients') || 
    (this.currentUser.role==='CS Leader' && this.currentView==='clients') || 
    (this.currentUser.role==='LBF Leader' && this.currentView==='clients') || 
    (this.currentUser.role==='Admin' && this.currentView==='users')
  }

  createUser(data){
    this.cu.emit(data)
  }
  patchUser(data){
    this.pu.emit(data)
  }
  deleteUser(data){
    const user = this.setUser(data)
    if (confirm( `Are you sure you want to delete ${user.fullname}?` )) this.du.emit(user.id)
  }
  createClient(data){
    this.cc.emit(data)
  }
  patchClient(data){
    this.pc.emit(data)
  }
  deleteClient(data){
    const client = this.setUser(data)
    if (confirm( `Are you sure you want to delete ${client.fullname}?` )) this.dc.emit(client.id)
  }
  
  setNewUser(){
    if (this.currentView === "users") this.worker=new Person() 
    else this.client=new Client()
  }
  
  setUser(user){
    const {index,foreignKeyData,column,...data}=user
    if (this.currentView === "users") return this.worker=data 
    else return this.client=data
  }

  updateView(){
    this.uview.emit('details')
  }
  userUpdateForm(data:any){
    this.updateform.emit(data)
  }

  toolbarClick(args: ClickEventArgs): void {
    if (args.item.id === 'Grid_excelexport') { // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.grid.excelExport();
    }
  }

  checkboxChange(values){
    // console.log(values.currentTarget.checked);
    // console.log(values.currentTarget.value);
    const cols = this.columns
    cols[this.currentView][values.currentTarget.value] = values.currentTarget.checked
    this.columns=cols
    console.log(this.columns)
  }

  genderChange(){
    this.columns[this.currentView]['gender'] = !this.columns[this.currentView]['gender']
    console.log(this.columns[this.currentView]['gender'])
  }
  show() {
    this.grid.columnChooserModule.openColumnChooser(200, 50); // give X and Y axis
}
}
