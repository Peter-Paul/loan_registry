const d=new Date()

interface DatePick{
    year:number,
    month:number,
    day:number
}

const today = {year:d.getFullYear(),month:d.getMonth()+1,day:d.getDate()}

export class User {
    id?:string=""
    username:string=""
    email:string=""
    password?:string=""
    firstname :string=""
    surname :string=""
    role? :string=""
    gender :string="Male"
    dob :DatePick
    phonenumber :string=""
    holding:any=""
    team:string="A"

    constructor(){
        this.dob={year:2000,month:1,day:1}
    }
}

export class Person {
    id:string=""
    email:string="" 
    password?:string=""
    role:string="CS Agent"
    firstname:string=""
    surname:string=""
    dob:DatePick
    gender:string="Male"
    team:string="A"
    branch:string="Mukono"
    zone:string="South"
    region:string="Central"
    contact1:string=""
    contact2:string=""
    agents=[]
    csagents=[]
    lbfagents=[]
    csleaders=[]
    lbfleaders=[]
    teamMates=[]
    clients:Client[]=[]
    teams:[]
    csbmanagers=[]
    lbfbmanagers=[]
    rmanagers=[]
    zmanagers=[]
    fullname?:string=""

    constructor(){
        this.dob={year:2000,month:1,day:1}
    }
    // get fullname() {
    //     return `${ this.firstname } ${ this.surname }`

    // }
}

export class Client {
    id?:string=""
    email:string="" 
    firstname:string=""
    surname:string=""
    dob:DatePick
    gender:string="Male"
    contact1:string=""
    contact2:string=""
    type:string="CS Client"
    status:string="Prospect"
    created:DatePick=today
    agent:string=""
    mstatus:string="Pending Tracking"
    affordability:string=""
    reservation:string=""
    amount:string=""
    nin:string=""
    nin_doc:number
    nin_eid:number
    a_letter:number
    i_letter:number
    ipps:string=""
    mid:string=""
    agentName=""
    fullname?:string=""
    

    constructor(){
        this.dob={year:2000,month:1,day:1}
    }

    // get fullname() {
    //     return `${ this.firstname } ${ this.surname }`

    // }
}
