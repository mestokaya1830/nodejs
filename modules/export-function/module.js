//export functions
export const User = (firstname, lastName) => firstname +' '+ lastName
export const Admin = (firstname, lastName) => firstname +' '+ lastName
export const Person = {
  name:'Mesto',
  lastname:'Kaya',
  language:['Html5','Css','Javascript'],
  fullName (){
    return this.name +' '+ this.lastname
  }
}