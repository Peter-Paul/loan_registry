const d=new Date()

interface DatePick{
    year:number,
    month:number,
    day:number
}

const today = {year:d.getFullYear(),month:d.getMonth()+1,day:d.getDate()}

export class Product{
    id?:string=""
    amount:any=""
    created:DatePick=today
    customer?:string=""
    user?:string=""
}


export class Users {
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
    products:Product[]=[]
    holding:any=""
    team:string="A"

    constructor(){
        this.dob={year:2000,month:1,day:1}
    }
}
