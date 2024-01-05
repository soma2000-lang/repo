
const cds = require('@sap/cds');


(async function () {
  ECTimeOff = await cds.connect.to('ECTimeOff')
  EmployeeInfo = await cds.connect.to('ECEmploymentInformation')
})();

const user = ['100135'];
let EmpInfo;                                            // var to store the usersId
const getUsers = async (req) => {                       //function to get usersId who having the same managerId
  const txei = EmployeeInfo.transaction(req);
  const query = SELECT.from("EmpJob", ["userId"]).where(`managerId IN`, user)
  EmpInfo = await txei.send({ method: "READ", query });
  console.log('Employees', EmpInfo);
}

const getUsersECtime = async (req) => {                 //{ this block of code gets the usersId those who having the same managerId and expose as a service }
  const txei = EmployeeInfo.transaction(req);
  const query = SELECT.from("EmpJob", ["userId"]).where(`managerId IN`, user)
  EmpInfo = await txei.send({ method: "READ", query });
  console.log(EmpInfo);
  return EmpInfo;
}

const usersLeaveReport = async (req) => {                                      //{this block of code, here im getting EmpInfo from the async function and passing here in query through array}
  await getUsers(req);                                                          // calling the async function
  const txecto = ECTimeOff.transaction(req);
  if (EmpInfo) {
    const usersArray = EmpInfo.map(obj => obj.userId);                     //the array stores the usersId
    console.log(usersArray);
    const query = SELECT.from("EmployeeTime", ["externalCode", "timeType", "userId", "startDate", "endDate"])
      .where(`userId IN`, usersArray)
    info = await txecto.send({ method: "READ", query });
    return info;
  }
}




module.exports = {
  getUsersECtime,
  usersLeaveReport
}

