export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export const validatePassword = (password) => {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    console.log(password)
    let x = false;
    for(let i = 0; digits.length; i++){
         if( password.includes(digits[i])){
            x = true;
            break;
         }
    }
    console.log(x)
    return x;
}