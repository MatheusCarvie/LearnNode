import UserService from "../application/services/user.service";
import UserValidation from "../application/validations/user.validation";
import UserModel from "../domain/model/user.model";
import ControllerBase from "./base/controller-base";

export default class UserController extends ControllerBase<UserModel> {
  constructor() {
    super(new UserService(), UserValidation);
  }
}
