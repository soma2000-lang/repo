
using { ECEmploymentInformation} from './external/ECEmploymentInformation';
using { ECTimeOff} from './external/ECTimeOff';

service EmployeeService @(requires: 'authenticated-user' ) {

    entity EmpJobUserManager @(restrict: [ { grant: '*', to: 'user', where: 'userId = $userId' }])
    as projection on ECEmploymentInformation.EmpJob{userId} ;

}