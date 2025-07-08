import Employees from './module.js'//export default
import {Users, Admins} from './module.js'//export normal

//you can also import with these formats
// import Employees, {Users, Admins} from './module.js'

const Emp1 = new Employees('Employee1','Kaya')
const User1 = new Users('User1','Kaya')
const Admin1 = new Admins('Admin1','Kaya')

console.log(Emp1.fullName())
console.log(User1.fullName())
console.log(Admin1.fullName())