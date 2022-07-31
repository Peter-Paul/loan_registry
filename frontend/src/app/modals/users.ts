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
    // password?:string=Math.random().toString(36).slice(-8);
    password?:string="123goodluck"
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
    // agents=[] // Additionnal properties
    workers=[]
    // csagents=[]
    // lbfagents=[]
    // csleaders=[]
    // lbfleaders=[]
    // teamMates=[]
    // teams:[]
    clients:Client[]=[]
    archives:Client[]=[]
    // csbmanagers=[]
    // lbfbmanagers=[]
    // rmanagers=[]
    // zmanagers=[]
    fullname?:string=""
    nprospects:number=0
    nleads:number=0
    nconversions:number=0
    prate:number=0
    lrate:number=0
    crate:number=0
    gnprospects:number=0
    gnleads:number=0
    gnconversions:number=0
    gprate:number=0
    glrate:number=0
    gcrate:number=0

    constructor(){
        this.dob={year:2000,month:1,day:1}
    }
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
    mstatus:string="On Appointment"
    affordability:string=""
    reservation:string="No"
    amount:string=""
    nin:string=""
    nin_doc:boolean=false
    eid_doc:boolean=false
    a_letter:boolean=false
    i_letter:boolean=false
    ipps:string=""
    mid:string=""
    agentName=""
    fullname?:string=""
    label?:string=""
    days?:number=0
    employer:string=""

    constructor(){
        this.dob={year:2000,month:1,day:1}
    }

}
