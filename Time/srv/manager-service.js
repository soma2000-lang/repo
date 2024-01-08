const cds = require('@sap/cds');
const timehandler = require('./handler/timehandler');
class   EmployeeService  extends cds.ApplicationService {
    init() {
        this.on(["CREATE", "UPDATE","READ"], "EmpJobUserManager", timehandler.usersLeaveReport)
        
   
        
        return super.init();
    }
}

module.exports = {
    EmployeeService 
}
