import UserService from "../application/services/user.service";
import UserModel from "../domain/model/user.model";
import ControllerBase from "./base/controller-base";

export default class UserController extends ControllerBase<UserModel> {
  constructor() {
    super(new UserService());
  }
}
