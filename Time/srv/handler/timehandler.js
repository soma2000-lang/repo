
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
    const query = SELECT.from("EmployeeTime", ["externalCode", "timeType", "approvalStatus", "userId", "startDate", "endDate"])
      .where(`userId IN`, usersArray)
    //`and approvalStatus IN`, ['APPROVED', 'PENDING'])
    info = await txecto.send({ method: "READ", query });
    return info;
  }
}

const ectimeEmployees = async (req) => {
  try {
    var { $top, $filter } = req._query;
    console.log('query', req._query);
    //req.user.id='100135'
    //$skip = $skip ? $skip : 0;
    $top = $top ? $top : 5;
    let filters = $filter ? await enrichFilterDetails($filter.toString()) : "";
    //let count = 0;
    // let flattenedData = [];
    
      let sURL = filters

        ? `/EmployeeTime?$format=json
            &$select=userId,startDate,endDate,approvalStatus,timeType,
            &$top=${$top}&$filter='${filters}'`

        : `/EmployeeTime?$format=json
          &$select=userId,startDate,endDate,approvalStatus,timeType,
          &$top=${$top}`;
      //const txecto = ECTimeOff.transaction(req);

      const leaveReports = await ECTimeOff.send({ method: "GET", query: sURL });
      

      if (Array.isArray(leaveReports) && leaveReports.length) {

        // leaveReports.forEach((item) => {
        //   flattenedData.push({
        //     userId: item.userId,
        //     timeType: item.timeType,
        //     startDate: item.startDate,
        //     endDate: item.endDate, 
        //     approvalStatus: item.approvalStatus
        //   });
        // });
    console.log(leaveReports);
    return leaveReports;
        

      } else {
        log.info(`Couldn't find any pending records`);
      }
    
  
    
  } catch (e) {
    throw new Error(e);
  }
};

const enrichFilterDetails = async (sFilter) => {
  console.log("sFilter", sFilter);
  sFilter = sFilter.replace("userId", "userId");
  console.log("After replacement ", sFilter);
  return sFilter;
};




module.exports = {
  getUsersECtime,
  usersLeaveReport,
  ectimeEmployees
}

