import * as yup from "yup";
import UserModel from "../../domain/model/user.model";
import ErrorMessages from "../../Infrastructure/errors/error-messages";

const UserValidation = yup.object<Partial<UserModel>>({
  name: yup.string().required(ErrorMessages.Validations.Required.name),
  email: yup.string().required(ErrorMessages.Validations.Required.email).email(),
  password: yup
    .string()
    .required(ErrorMessages.Validations.Required.password)
    .min(8, ErrorMessages.Auth.SHORT_PASSWORD),
});

export default UserValidation;
