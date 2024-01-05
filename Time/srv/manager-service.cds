
using { ECEmploymentInformation} from './external/ECEmploymentInformation';
using { ECTimeOff} from './external/ECTimeOff';

service EmployeeService @(requires: 'authenticated-user' ) {

    entity EmpJobUserManager @(restrict: [ { grant: '*', to: 'userId', where: 'userId = $userId' }])
    as projection on ECEmploymentInformation.EmpJob{userId} ;

}