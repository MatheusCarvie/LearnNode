import UserModel from "../../domain/model/user.model";
import ErrorMessages from "../../Infrastructure/errors/error-messages";
import HttpError from "../../Infrastructure/errors/http-error";
import UserRepository from "../../Infrastructure/repositorys/user.repository";
import ServiceBase from "./base/service-base";
import bcrypt from "bcryptjs";

export default class UserService extends ServiceBase<UserModel> {
  constructor() {
    super(new UserRepository());
  }

  override async create(model: UserModel): Promise<UserModel> {
    const userExist = await this.repository.getByProps({ email: model.email });
    if (userExist) throw new HttpError(ErrorMessages.Validations.EMAIL_IS_ALREADY_IN_USE, 400);

    const newPassword = await this.hashedPassword(model.password.toString());
    const updateModel: UserModel = { ...model, password: newPassword };
    return super.create(updateModel);
  }

  async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }
}
