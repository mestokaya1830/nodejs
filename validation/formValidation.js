const formValidate = (user = '', email = '', password = '') => {
  const errors = []
  if(user === '' || email === '' || password === ''){
    errors.push({message:'Please fill all field'})
  } else if(user.length < 3){
    errors.push({message:'User must be less 4 charecters!'})
  } else if(!email.match(/([^ ]+)@([^ ]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/)){
    errors.push({message:'email is not match pattern!'})
  } else if(password.length < 3){
    errors.push({message:'password must be less 3 charecters!'})
  }
  return errors
}

export default formValidate
