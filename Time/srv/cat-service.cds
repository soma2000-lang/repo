
using { ECEmploymentInformation} from './external/ECEmploymentInformation';
using { ECTimeOff} from './external/ECTimeOff';

@cds.autoexpose
service CatalogService {
  entity EmpJob as projection on ECEmploymentInformation.EmpJob {*};
    @readonly  entity EmployeeTime as projection on ECTimeOff.EmployeeTime { userId,startDate,endDate,timeType,externalCode};

}

@protocol: 'rest' //defined as as rest service
service CatalogServiceRest {
  entity EmployeeTime          as projection on CatalogService.EmployeeTime;
  

}
   
    
       
    