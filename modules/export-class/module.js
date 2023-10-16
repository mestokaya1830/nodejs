export class User {
  constructor(name, lastName) {
    this.name = name
    this.lastName = lastName
  }
  fullName(){
    return this.name +' '+ this.lastName
  }
}

export class Admin {
  constructor(name, lastName) {
    this.name = name
    this.lastName = lastName
  }
  fullName(){
    return this.name +' '+ this.lastName
  }
}