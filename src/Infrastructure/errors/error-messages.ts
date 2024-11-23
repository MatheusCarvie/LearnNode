const ErrorMessages = {
  Validations: {
    Required: {
      name: "Name is required",
      email: "Email is required",
      password: "Password is required",
    },
    INVALID_ID: "Invalid id",
    DATA_NOT_FOUND: "Data not found",
    EMAIL_IS_ALREADY_IN_USE: "Email is already in use",
    INVALID_PARAMETERS: "Invalid parameters",
  },
  Auth: {
    SHORT_PASSWORD: "Password must be at least 8 characters long",
    INVALID_EMAIL_OR_PASSWORD: "Invalid email or password",
    INVALID_OR_EXPIRED_TOKEN: "Invalid or expired token",
  },
};

export default ErrorMessages;
