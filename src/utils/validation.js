export function validateName(name) {
  if (!name.trim()) {
    return "Name is required";
  }

  return "";
}

export function validateEmail(email) {
  if (!email.trim()) {
    return "Email is required";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return "Enter a valid email address";
  }

  return "";
}

export function validatePassword(password) {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  return "";
}

export function validateConfirmPassword(password, confirmPass) {
  if (!confirmPass) {
    return "Please confirm your password";
  }

  if (password !== confirmPass) {
    return "Passwords do not match";
  }

  return "";
}
