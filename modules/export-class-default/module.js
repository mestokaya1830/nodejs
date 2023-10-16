export default class Employees {
  constructor(name, lastName) {
    this.name = name
    this.lastName = lastName
  }
  fullName(){
    return this.name +' '+ this.lastName
  }
}
