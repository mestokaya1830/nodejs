import Employees from './module.js'//export default
import {Users, Admins} from './module.js'//export normal

//you can also import with these formats
// import Employees, {Users, Admins} from './module.js'

console.log(Employees('Employee1','Kaya'))
console.log(Users('User1','Kaya'))
console.log(Admins('Admin1','Kaya'))