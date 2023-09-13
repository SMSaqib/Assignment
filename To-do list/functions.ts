import inquirer from "inquirer";

let task_list:string[]=[] 

let continiuty


////////////////////////// step-01 cuser feedback
async function confirmation() { 
    let confirmation=await inquirer.prompt([
    {
      message: "Please select your preferrence",
      type: "list",
      name: "conf",
      choices:["Please Add your Activity","Exit"]
    },
   ]);
return {conf:confirmation.conf}  
}
  



////////////////////////// step-02 push data

function activity(task:string):string[]{

task_list.push(task)
return task_list

 }

////////////////////////// step-03 remove data

 function activity_re(index:number,record:number):string[]{

  task_list.splice(index,record)
  return task_list
  

   }

////////////////////////// step-03 continue data

  async function cont() { 
  let continuation = await inquirer.prompt([
    {
      message: "Do you want to Continue? ",
      type: "list",
      name: "conf",
      choices:["Yes","No"]
    },
   ]);
  return continuation.conf
  }

  async function removal() { 
    let rem = await inquirer.prompt([
      {
        message: "Enter Index Number",
        type: "input",
        name: "indNo",
      },
      {
        message: "Enter Record ",
        type: "input",
        name: "Rec_No",
      },
     ]);
    return rem
    }
  

     async function Removal_confirm_afteraddition() { 
      let x = await inquirer.prompt([{
      message:"Do you want to remove?",
      type:"list",
      choices:["Yes","No"],
      name:"remov_conf"
    }])
    return x.remov_conf
  }

// let x=await Removal_confirm_afteraddition()
// console.log(x)


export {task_list,continiuty,confirmation, removal,cont,activity_re,activity,Removal_confirm_afteraddition}