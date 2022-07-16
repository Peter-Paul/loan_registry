class Mailing {
    types = {
        create : `  <h2>Hello Peter!</h2>
                    <p>Your account with the platinum credit pipeline has successfully been acivated.
                    Use your email password below to access pipeline</p>
                    <h4>OIimodoij23</h4>`
    }

    constructor(type){
        this.type = type
    }


    newAccount(name, password){
        return `<h2>Hello ${name}!</h2>
                <p>Your account with the platinum credit pipeline has successfully been acivated.
                Use your email password below to access pipeline</p>
                <h4>OIimodoij23</h4>`
    }

    resetPassword(){
        return `<h2>Hello ${'Peter'}!</h2>
                <p>Your account with the platinum credit pipeline has successfully been acivated.
                Use your email password below to access pipeline</p>
                <h4>OIimodoij23</h4>`
    }
}

let m = new Mailing()
