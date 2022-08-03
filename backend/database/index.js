var mysql = require('mysql')
const { v4: uuidv4 } = require('uuid');
var datab = mysql.createPool({
    connectionLimit:10,
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'loan_registry'
})

class Registry {

    constructor (table){
        this.table=table
    }
    getAll() {
        return new Promise((resolve,reject)=>{
            datab.query(`SELECT * FROM ${this.table}`, (err,rows,fields)=>{
                if (err) reject(err)
                else resolve(rows)
            })
        })
    }
    
    getOne(id) {
        return new Promise((resolve,reject)=>{
            datab.query( `SELECT * FROM ${this.table} WHERE id = ?`, [id],
             (err,row,fields) =>{
                if (err) reject(err)
                else resolve(row)
             })
        })
    }

    getForUser(uid) {
        return new Promise((resolve,reject)=>{
            datab.query( `SELECT * FROM ${this.table} WHERE user = ?`, [uid],
             (err,row,fields) =>{
                if (err) reject(err)
                else resolve(row)
             })
        })
    }
    
    patch(id,d) {
        return new Promise((resolve,reject)=>{
            datab.query(`UPDATE ${this.table} SET ? WHERE id = ?`,[d, id],
            async (err,results,fields) =>{
                if (err) reject(err)
                else {
                    try{
                        const data = await this.getOne(id) // return saved data on response
                        resolve({results,data})
                    }catch(err){
                        throw err
                    }
                }
             })
        })
    }
    
    post(d) {
        return new Promise((resolve,reject)=>{
            // format of d is [d.id,d.title,d.description,moment().format('LLLL'),d.user]
            var queries=`INSERT INTO ${this.table} VALUES ?`
            var id=uuidv4()
            var values=[[id,...d]]
            datab.query(queries,[values],
                async (err,results,fields)=>{
                    if (err) reject(err)
                    else {
                        try{
                            const data = await this.getOne(id) // return saved data on response
                            resolve({results,data})
                        }catch(err){
                            throw err
                        }
                    }
                }
            )
        })
    }
    
    delete(id) {
        return new Promise((resolve,reject)=>{
            datab.query(`DELETE FROM ${this.table} WHERE id = ?`,[id],
            (err,results,feilds)=>{
                if (err) reject(err)
                else resolve(results)
            })
        })
    }
    
    clear() {
        return new Promise((resolve,reject)=>{
            datab.query(`DELETE FROM ${this.table}`,
            (err,results,feilds)=>{
                if (err) reject(err)
                else resolve(results)
            })
        })
    }

    getClients(id){
        // from users clinets
        return new Promise((resolve,reject)=>{
            datab.query( `SELECT * FROM ${this.table} WHERE agent = ?`, [id],
                (err,row,fields) =>{
                if (err) reject(err)
                else resolve(row)
                })
        })
    }


    getTeam(team,branch){
        // for users table
        return new Promise((resolve,reject)=>{
            datab.query( `SELECT * FROM ${this.table} WHERE team = ? AND branch = ?`, [team, branch],
                (err,row,fields) =>{
                if (err) reject(err)
                else resolve(row)
                })
        })
    }

    getBranch(branch){
        // for users table
        return new Promise((resolve,reject)=>{
            datab.query( `SELECT * FROM ${this.table} WHERE branch = ?`, [branch],
                (err,row,fields) =>{
                if (err) reject(err)
                else resolve(row)                
                })
        })
    }

    getRegion(region){
        // for users table
        return new Promise((resolve,reject)=>{
            datab.query( `SELECT * FROM ${this.table} WHERE region = ?`, [region],
                (err,row,fields) =>{
                if (err) reject(err)
                else resolve(row)
                })
        })
    }

    userExists(email) {
        return new Promise((resolve,reject)=>{
            datab.query( `SELECT * FROM ${this.table} WHERE email = ?`, [email],
             (err,row,fields) =>{
                if (err) reject(err)
                else resolve(row)
             })
        })
    }

}


module.exports = Registry