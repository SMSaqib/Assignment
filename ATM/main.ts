#!/usr/bin/env node
import date from 'date-fns';
//import sqlite3 from 'sqlite3';
import {getCount,db,checkDatabaseAndTableExistence,getUserID,trnx_punch, gettrnx_detail,blancequery,dateo} from "./db.js"
import {User,Transaction_list,FT_Account_Number,pinVerification,ReattemptV,Data_collection,new_User_Regs,BP_Customer_Info,Withdrawl} from "./Cus_data_type.js"
import inquirer from 'inquirer';
import chalk from 'Chalk';
//import chalkAnimation from 'chalk-animation'
console.log("ATM Application")

//db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY , name TEXT, father TEXT, password TEXT, pin TEXT)');
//Data insertion for Trnasactipons:
let   trnx_id: string
let   trnx_type: string
let  custmr_Id: number
let  trnx_Amount: number
let   trnx_nature: string
let    Trnx_date: Date
let comp_ref:string
let Acc_ref:string
/////////

//let [database_userID,database_name]= await getUserID("9798")
// console.log(database_userID)
// let x:string=  await getUserID("9798")
// console.log(x[0])
let trnx_Ref:string
let UserAth
let Trnx_Selected
let Ratempt
let PinVer=0;
let pinrecordcount=0;

// const currentDateTime: Date = new Date(Date());

// const formattedCurrentDateTime = currentDateTime.toUTCString("YYYY-MM-DD");

// console.log(formattedCurrentDateTime);// let trnx_date_processed = Trnx_date.formate("YYYY-MM-DD HH:MM:SS");
// // console.log(Trnx_date)
let firsttime_User = await checkDatabaseAndTableExistence()
//console.log(firsttime_User)
if(firsttime_User==0){
console.log("please register yourself first");
let nUser= await  new_User_Regs();

await console.log("you have succesfully registered")
trnx_Ref="TRNX:"+ Math.random() * 100000
trnx_id =trnx_Ref
trnx_type="Cash Deposit"
custmr_Id=<number> await getCount('user_db.db','users','pin',nUser.pin_in)
trnx_Amount=1000000
trnx_nature="Credit"
comp_ref =""
Acc_ref=""
Trnx_date = dateo() as unknown as Date//new Date()//new Date(Date.now().toLocaleString("YYYY-MM-DD HH:MM:SS"))
 
//trnx_id: string, trnx_type: string, custmr_Id: number, trnx_Amount: number, trnx_nature: string, Trnx_date: Date, comp_ref: string, Acc_Ref: string): Promise<void>
await trnx_punch(trnx_id,trnx_type,custmr_Id,trnx_Amount,trnx_nature,Trnx_date,comp_ref,Acc_ref)

console.log(chalk.green(`you have sucessfully deposited the ${trnx_Amount}`)) 


}
else{

}
//await checkDatabaseAndTableExistence()
//step-01 Confirmation form customer
let confirmation = await inquirer.prompt([{

  type: 'list',
  name: 'Con1',
  choices:["Yes","No"],
  message: 'Are you a registered customer?',
  // validate: 
}, 
]);


 if( confirmation.Con1=="Yes") {  
// at this point user input will be validate such 04 digit must be number
  do { 
 UserAth = await pinVerification()
 pinrecordcount= await getCount('user_db.db','users','pin',UserAth)
// let fetch_user=await getUserID(UserAth)
 //if()
PinVer++;

if (pinrecordcount<1 && PinVer<3) {
  Ratempt = await ReattemptV(PinVer)
}  
} while( pinrecordcount<1 && PinVer<3 && Ratempt=="Y")
}
else{
  await  new_User_Regs()
}
//pinrecordcount
pinrecordcount
if(pinrecordcount>0){
  console.log(chalk.bgGreen("Welcome To HBL ATM Services"))
   Trnx_Selected =  await Transaction_list();
//  console.log(Trnx_Selected);
    switch(Trnx_Selected){
      case "Fund Transfer":
          console.log("Pelase follow the instrucions for IBFT/FT");
          let ft = await FT_Account_Number()
           if (ft.confir.toLowerCase()=="y"){
            trnx_Ref="TRNX:"+ Math.random() * 100000
             trnx_id =trnx_Ref
          trnx_type=<string>Trnx_Selected
          custmr_Id=<number> await getUserID(UserAth)
          trnx_Amount=<number>ft.Amt
          trnx_nature="Debit"
          comp_ref =<string>""
          Acc_ref=<string>ft.trnx
          Trnx_date = dateo() as unknown as Date //new Date(Date.now().toLocaleString("YYYY-MM-DD HH:MM:SS"))          Trnx_date = new Date(Date.now().toLocaleString("YYYY-MM-DD HH:MM:SS"))

         //trnx_id: string, trnx_type: string, custmr_Id: number, trnx_Amount: number, trnx_nature: string, Trnx_date: Date, comp_ref: string, Acc_Ref: string): Promise<void>
          let fundtransfer =  await trnx_punch(trnx_id,trnx_type,custmr_Id,trnx_Amount,trnx_nature,Trnx_date,comp_ref,Acc_ref)
          let balance =await blancequery(custmr_Id)
            console.log(chalk.green(`you have sucessfully transferred the ${ft.Amt} to the Account ${ft.trnx} and you current balance is ${balance}`)) 
           }

          break;
        case "Bill Payment":
         let bp= await BP_Customer_Info()
         trnx_Ref="TRNX:"+ Math.random() * 100000
         if (bp.confirmationBP.toLowerCase()=="y"){
          trnx_id =trnx_Ref
          trnx_type=<string>Trnx_Selected
          custmr_Id=<number> await getUserID(UserAth)
          trnx_Amount=<number>bp.BillAmount
          trnx_nature="Debit"
          comp_ref =<string>""
          Acc_ref=<string>bp.customer
          Trnx_date = dateo() as unknown as Date//new Date(Date.now().toLocaleString("YYYY-MM-DD HH:MM:SS"))          Trnx_date = new Date(Date.now().toLocaleString("YYYY-MM-DD HH:MM:SS"))

         //trnx_id: string, trnx_type: string, custmr_Id: number, trnx_Amount: number, trnx_nature: string, Trnx_date: Date, comp_ref: string, Acc_Ref: string): Promise<void>
          let fundtransfer =  await trnx_punch(trnx_id,trnx_type,custmr_Id,trnx_Amount,trnx_nature,Trnx_date,comp_ref,Acc_ref)

          let balance =await blancequery(custmr_Id)

          console.log(chalk.green(`you have sucessfully paid the ${bp.BillAmount} to the  ${bp.customer} comapnay and your current balance is  ${balance}  and Trnx ID is ${trnx_Ref}`)) 
         }


       // console.log(2);
          break;
        case "Cash Withdrawl":
        
        let Wthd= await await Withdrawl()
        trnx_Ref="TRNX:"+ Math.random() * 100000
        if (Wthd.withdrawl_confirmation.toLowerCase()=="y"){
        trnx_id =trnx_Ref
        trnx_type=<string>Trnx_Selected
        custmr_Id=<number> await getUserID(UserAth)
        //custmr_Id=custmr_Id.database_userID
//        console.log(custmr_Id)
        trnx_Amount=<number>Wthd.withDrawl_Amount
        trnx_nature="Debit"
        comp_ref =<string>""
        Acc_ref=<string>""
        Trnx_date = dateo()//new Date(Date.now().toLocaleString("YYYY-MM-DD HH:MM:SS"))          Trnx_date = new Date(Date.now().toLocaleString("YYYY-MM-DD HH:MM:SS"))

        //trnx_id: string, trnx_type: string, custmr_Id: number, trnx_Amount: number, trnx_nature: string, Trnx_date: Date, comp_ref: string, Acc_Ref: string): Promise<void>
        let fundtransfer =  await trnx_punch(trnx_id,trnx_type,custmr_Id,trnx_Amount,trnx_nature,Trnx_date,comp_ref,Acc_ref)
        let balance =await blancequery(custmr_Id)


        console.log(chalk.green(`you have sucessfully withdraw the ${trnx_Amount} and Trnx ID is ${trnx_Ref} and current balance is ${balance}`)) 
        }          
          break;
          case "Mini Statement":
//          let  customer_id= 
//          console.log(customer_id.toLocaleString())
          await gettrnx_detail(<number> await getUserID(UserAth))
          break;

          case "Balance":
            custmr_Id=<number> await getUserID(UserAth)
            let balance =await blancequery(custmr_Id)
    
    
            console.log(chalk.green(`your current balance is ${balance}`)) 
                      
                break;
            
       
    }
  

}


else if(pinrecordcount<1){

  chalk.bgYellow(console.log("Sorry you have used all attempt wait for 30mints"))
    };
  
  