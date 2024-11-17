import RepositoryBase from "./base/repository-base";
import UserEntity from "../../domain/entities/user";
import UserModel from "../../domain/model/user.model";

export default class UserRepository extends RepositoryBase<UserModel> {
  constructor() {
    super(UserEntity);
  }
}
