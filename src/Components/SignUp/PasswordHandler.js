export function isValidPassword(password, confirmPassword){
  // TODO: Remove console.log before release
  if(password !== confirmPassword){
    return 'Passwords do not match';
  }

  else if(password.length <8){
    return 'Password must have a minimum length of 8.';
  }

  else if(password.toUpperCase() === password){
    return 'Password does not contain at least one lowercase letter.';
  }

  else if(password.toLowerCase() === password){
    return 'Password does not contain at least one uppercase letter.';
  }

  else if(!hasNumber(password)){
    return 'Password does not contain at least one uppercase letter.';
  }

  return '';
}

function hasNumber(str){
  return /\d/.test(str);
}
