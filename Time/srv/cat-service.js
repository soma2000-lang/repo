const cds = require('@sap/cds');
const timehandler = require('./handler/timehandler');

class  CatalogService extends cds.ApplicationService {
    init() {
        this.on(["READ"], "EmployeeTime", timehandler.usersLeaveReport)
   
        this.on(["READ"], "EmpJob", timehandler.getUsersECtime)
        return super.init();
    }
}

module.exports = {
    CatalogService
}

