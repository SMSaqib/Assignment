import sqlite3 from 'sqlite3';

let db = new sqlite3.Database('user_db.db');

// Create the table if it doesn't exist
 db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY  AUTOINCREMENT, name TEXT, father TEXT, password TEXT, pin TEXT)');
 db.run('CREATE TABLE IF NOT EXISTS Log_Trnx (trnx_id TEXT  , trnx_type TEXT, custmr_Id NUMBER, trnx_Amount NUMBER, trnx_nature TEXT,Trnx_date DATETIME,comp_ref TEXT,Acc_Ref TEXT )');


//  import sqlite3 from 'sqlite3';


 async function checkDatabaseAndTableExistence() {
   let db = new sqlite3.Database('user_db.db');
 
   return new Promise<number>((resolve) => {
     // Check if the 'users' table exists in the database
     db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", (err, table) => {
       if (err || !table) {
         // If there's an error or the table doesn't exist, return 0
         db.close();
         resolve(0);
       } else {
         // The table 'users' exists, now check if it contains any records
         db.get("SELECT COUNT(*) as count FROM users", (err, result:{ count: number }) => {
           if (err || !result || !result.count) {
             // If there's an error, no result, or count is falsy, return 0
             db.close();
             resolve(0);
           } else {
             // If there are records, return 1
             db.close();
             resolve(1);
           }
         });
       }
     });
   });
 }
 
 // Call the function to check database and table existence
 checkDatabaseAndTableExistence().then((result) => {
   return result;
 });
 
  
 interface Row {
  id: number;
  name: string;
}


 async function getUserID( xToCheck:string) {
  return new Promise((resolve, reject) => {
      // let db = new sqlite3.Database(databaseName);
      db.get(`SELECT id   FROM users WHERE pin = ?`, [xToCheck], (err, row:Row) => {
//            db.get(`SELECT COUNT(*) as count FROM ${tableName} WHERE ${columnName} = ?`, [xToCheck], (err, row) => {
          if (err) {
              reject(err);
          }
          else {
              let database_userID:number = (row as Row).id;
              //let  database_name = (row as Row).name;
    
              // Resolve the promise with the user ID and name
              resolve(database_userID)//, database_name]);
      

          }
          db.close();
      });
  });
}


async function fetchdataSum(tableName:string,columnName1:string,columnName2:string,xToCheck:number|string,yToCheck:number|string): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    let db = new sqlite3.Database('user_db.db');
    db.get(`SELECT SUM(trnx_Amount) as sum FROM ${tableName} WHERE  ${columnName1} = ? AND ${columnName2}= ?`, [xToCheck,yToCheck], (err, row: { sum: number }) => {
//    db.get(`SELECT COUNT(*) as count FROM ${tableName} WHERE ${columnName} = ?`, [xToCheck], (err, row) => {
      if (err) {
        reject(err);
      } else {
         let sum = row?.sum || 0;
        resolve(sum);
      }

      db.close();
    });
  });
}
//fetchdataSum

// let total_credit = await fetchdataSum(`log_Trnx`, `trnx_nature`,"custmr_Id", "Credit",1 )
// console.log(total_credit);
//await fetchdata(`Select SUM(trnx_Amount)  from log_Trnx where trnx_nature= "Credit" AND custmr_id=? `,1)

async function blancequery(id:number){
let total_credit = await fetchdataSum(`log_Trnx`, `trnx_nature`,"custmr_Id", "Credit",id )
let total_debit=  await fetchdataSum(`log_Trnx`, `trnx_nature`,"custmr_Id", "Debit",id )
let balance:number=total_credit-total_debit
console.log(balance)
return balance
//console.log(`${total_credit} and debit is ${total_debit}`)
 
}
//trnx_id TEXT  , trnx_type TEXT, custmr_Id TEXT, trnx_Amount NUMBER, trnx_nature TEXT,Trnx_date DATETIME,comp_ref TEXT,Acc_Ref TEXT
/////////////////get trnx detail /////////////////////
async function gettrnx_detail(IDcustomer:number) {
  return new Promise((resolve, reject) => {
    let db = new sqlite3.Database('user_db.db');
    db.all(`SELECT * FROM Log_Trnx where custmr_id = ?`,[IDcustomer], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        // Resolve the promise with the rows
        resolve(rows);

        // Print the records in tabular form
        console.log("|      ID         |   Trnx Typ   | custmr_Id | trnx_Amount | trnx_nature | Trnx_date |----|");
        console.log("|-----------------|--------------|-----------|-------------|-------------|-----------|----|");
        rows.forEach((row) => {
          console.log(`| ${row.trnx_id} | ${row.trnx_type} | ${row.custmr_Id} |  ${row.trnx_Amount}  |${row.trnx_nature} |${row.Trnx_date} | ... |`);
        });
      }
      db.close();
    });
  });
}




// await gettrnx_detail(1)

//trnx_id INTEGER PRIMARY KEY  , trnx_type TEXT, custmr_Id TEXT, trnx_Amount NUMBER, trnx_nature TEXT,Trnx_date DATETIME

//INSERT statement with corrected column list
async function trnx_punch(trnx_id:string,trnx_type:string,custmr_Id:number,trnx_Amount:number,trnx_nature:string,Trnx_date:Date,comp_ref:string,Acc_Ref:string) {
  let db = new sqlite3.Database('user_db.db');
  await db.run(
  'INSERT INTO Log_Trnx (trnx_id,trnx_type,custmr_Id,trnx_Amount,trnx_nature,Trnx_date,comp_ref,Acc_Ref) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
  [trnx_id,trnx_type,custmr_Id,trnx_Amount,trnx_nature,Trnx_date,comp_ref,Acc_Ref],
  (err) => {
    if (err) {
      console.error('Error inserting data into the database:', err);
    } else {
      console.log('User data saved to the database.');
    }

    // Close the database connection after the INSERT operation
    db.close();
  }
);
}



async function getCount(databaseName:string,tableName:string,columnName:string,xToCheck:string): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    let db = new sqlite3.Database(databaseName);
    db.get(`SELECT COUNT(*) as count FROM ${tableName} WHERE ${columnName} = ?`, [xToCheck], (err, row: { count: number }) => {
//    db.get(`SELECT COUNT(*) as count FROM ${tableName} WHERE ${columnName} = ?`, [xToCheck], (err, row) => {
      if (err) {
        reject(err);
      } else {
         let count = row?.count || 0;
        resolve(count);
      }

      db.close();
    });
  });
}



 function dateo(){ 
let current = new Date()
//console.log(current)
let formt_Date=current.toLocaleString('en-US',{
year:'numeric',
month:'2-digit',
day:'2-digit',
hour:'2-digit',
minute:'2-digit',
second:'2-digit'
})//.format(current)
return formt_Date
}
//let x =dateo()
console.log("login Time:", dateo())

// db.close();


export {getCount,db,checkDatabaseAndTableExistence,getUserID,trnx_punch,gettrnx_detail,blancequery,dateo}


