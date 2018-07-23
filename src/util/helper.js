import Isemail from 'isemail'

export const checkRegisterInput = {
  username(username) {
    if(!username) {
      return {
        type: 'username',
        msg: 'Please enter the username'
      }
    } else if (username.length < 8) {
      return {
        type: 'username',
        msg: 'The username must longer than 8 characters'
      }
    } else {
      // TODO: check on server
      return null
    }
  },
  email(email) {
    if(!email) {
      return {
        type: 'email',
        msg: 'Please enter the email'
      }
    } else if(!Isemail.validate(email)) {
      return {
        type: 'email',
        msg: 'Please enter a valid email'
      }
    } else {
      // TODO: check on server
      return null
    }
  },
  password(password) {
    if(!password) {
      return {
        type: 'password',
        msg: 'Please enter the password'
      }
    } else if(password.length < 8) {
      return {
        type: 'password',
        msg: 'Password must longer than 8 characters'
      }
    } else {
      return null
    }
  },
  password1(password) {
    return this.password(password)
  },
  password2(password) {
    return this.password(password)
  },
  passwordMatch(pwd1, pwd2) {
    console.log(pwd1)
    console.log(pwd2)
    console.log(pwd1 === pwd2)
    return pwd1 === pwd2
  }
}
