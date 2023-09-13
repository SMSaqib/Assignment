#!/usr/bin/env node
import inquirer from "inquirer";
import {task_list,confirmation, removal,cont,activity_re,activity,Removal_confirm_afteraddition} from "./functions.js"
console.log("To-do App | Plan your Day to Day Activity");
let removalconfirmationafteraddition:string
let continiuty:string 
let d = await confirmation()
console.log(d.conf)
switch (<string> d.conf) {
  case "Please Add your Activity":
    do {
      let answer = await inquirer.prompt([
      {
        message: "Please Enter your activity",
        type: "string",
        name: "act",
      },
    ]);  
    activity(answer.act)
    console.log(task_list)

    continiuty= await cont()
   console.log(task_list)

    } while(continiuty =="Yes");
    if (continiuty =="No"){
      // return {remov_conf: Removal_confirm_afteraddition.remov_conf}
    do {
      removalconfirmationafteraddition =await  Removal_confirm_afteraddition()
      if(removalconfirmationafteraddition=="Yes"){
      let x =await  removal()  
      activity_re(x.indNo,x.Rec_No)
     //   result = num1 - num2;
      console.log(task_list)
      console.log("you have suucessfully removed the task from the list") 
    //  continiuty= await cont()
     console.log(task_list)}
     else
    break
    }while( removalconfirmationafteraddition =="Yes")

  }
//    result = num1 + num2;
    break;
//   case "Do you want to remove Activity?":
//   do {
//   let x =await  removal()  
//   activity_re(x.indNo,x.Rec_No)
//  //   result = num1 - num2;
//  console.log(task_list)
//  console.log("you have suucessfully removed the task from the list") 
//  continiuty= await cont()
//    console.log(task_list)
//   } while(continiuty =="Yes")
//   break;
   default:
    console.log(task_list)
    console.log("you have successfuly log Out");
}

//console.log(`Result: ${num1} ${operator} ${num2} = ${result}`);


