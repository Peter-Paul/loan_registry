var mysql = require('mysql')
const { v4: uuidv4 } = require('uuid');
var datab = mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: 'root',
    password: '',
    // password: '123goodluck',
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
            (err,row,fields) =>{
                if (err) reject(err)
                else resolve(row)
             })
        })
    }
    
    post(d) {
        return new Promise((resolve,reject)=>{
            // format of d is [d.id,d.title,d.description,moment().format('LLLL'),d.user]
            var queries=`INSERT INTO ${this.table} VALUES ?`
            var values=[[uuidv4(),...d]]
            datab.query(queries,[values],
                (err,results,fields)=>{
                    if (err) reject(err)
                    else resolve(results)
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
}


module.exports = Registry