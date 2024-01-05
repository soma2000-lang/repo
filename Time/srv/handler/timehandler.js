
const cds = require('@sap/cds');


(async function () {
  ECTimeOff = await cds.connect.to('ECTimeOff')
  EmployeeInfo = await cds.connect.to('ECEmploymentInformation')
})();

const user = ['100135'];
let EmpInfo;                                           
const getUsers = async (req) => {                       
  const txei = EmployeeInfo.transaction(req);
  const query = SELECT.from("EmpJob", ["userId"]).where(`managerId IN`, user)
  EmpInfo = await txei.send({ method: "READ", query });
  console.log('Employees', EmpInfo);
}

const getUsersECtime = async (req) => {                
  const txei = EmployeeInfo.transaction(req);
  const query = SELECT.from("EmpJob", ["userId"]).where(`managerId IN`, user)
  EmpInfo = await txei.send({ method: "READ", query });
  console.log(EmpInfo);
  return EmpInfo;
}

const usersLeaveReport = async (req) => {                                      
  await getUsers(req);                                                          
  if (EmpInfo) {
    const usersArray = EmpInfo.map(obj => obj.userId);                     
    console.log(usersArray);
    const query = SELECT.from("EmployeeTime", ["externalCode", "timeType", "userId", "startDate", "endDate"])
      .where(`userId IN`, usersArray)
    info = await txecto.send({ method: "READ", query });
    return info;
  }
}




module.exports = {
  getUsers,
  getUsersECtime,
  usersLeaveReport
}

