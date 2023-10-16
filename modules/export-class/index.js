import { User, Admin } from './module.js'

//new user
const u1 = new User('Mesto', 'Kaya')
console.log(u1)
console.log(u1.fullName())

console.log('------------------------------')
//new admin
const a1 = new Admin('Mesto', 'Kaya')
console.log(a1)
console.log(a1.fullName())
