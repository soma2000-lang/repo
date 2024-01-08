
const cds = require('@sap/cds');


(async function () {
  ECTimeOff = await cds.connect.to('ECTimeOff')
  EmployeeInfo = await cds.connect.to('ECEmploymentInformation')
})();

//const user = ['100135'];
//let EmpInfo;                                           
//const getUsers = async (req) => {                       
 // const txei = EmployeeInfo.transaction(req);
 // const query = SELECT.from("EmpJob", ["userId"]);
 // EmpInfo = await txei.send({ method: "READ", query });
  //console.log('Employees', EmpInfo);
//}

let EmpInfo;  
const getUsersECtime = async (req) => {                
  const txei = EmployeeInfo.transaction(req);
  const query = SELECT.from("EmpJob", ["userId"]);//this block of code gets all the user ids
  EmpInfo = await txei.send({ method: "READ", query });
  console.log(EmpInfo);
  return EmpInfo;
}

const usersLeaveReport = async (req) => {                                      
  //await getUsersECtime(req);                                                          
  //if (EmpInfo) {
   // const usersArray = EmpInfo.map(obj => obj.userId);                     
    //console.log(usersArray);
    const query = SELECT.from("EmployeeTime", ["externalCode", "timeType", "userId", "startDate", "endDate"]);
      
    info = await txecto.send({ method: "READ", query });
    return info;
  
}




module.exports = {
  getUsersECtime,
  usersLeaveReport
}

