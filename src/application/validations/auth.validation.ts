import * as yup from "yup";
import ErrorMessages from "../../Infrastructure/errors/error-messages";
import AuthModel from "../../domain/model/auth.model";

const AuthValidation = yup.object<AuthModel>({
  email: yup.string().required(ErrorMessages.Validations.Required.email),
  password: yup.string().required(ErrorMessages.Validations.Required.password),
});

export default AuthValidation;
