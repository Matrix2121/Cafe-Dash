export const validateFirstName = (firstName) => {
    if (!firstName.trim()) {
      return 'Please enter your first name.';
    } else {
      return null;
    }
  };
  
  // Validate Last Name
  export const validateLastName = (lastName) => {
    if (!lastName.trim()) {
      return 'Please enter your last name.';
    } else {
      return null;
    }
  };
  
  // Validate Email
  export const validateEmail = (email) => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      return 'Please enter a valid email address.';
    } else {
      return null;
    }
  };
  
  // Validate Phone Number
  export const validatePhone = (phone) => {
    if (!phone.trim() || !/^\d{10,}$/.test(phone)) {
      return 'Please enter a valid phone number with at least 10 digits.';
    } else {
      return null;
    }
  };
  
  // Validate all fields and return an object with error messages (or null for no error)
  export const validateRegistration = ({ firstName, lastName, email, phone }) => {
    const errors = {};
    errors.firstName = validateFirstName(firstName);
    errors.lastName = validateLastName(lastName);
    errors.email = validateEmail(email);
    errors.phone = validatePhone(phone);
    return errors;
  };