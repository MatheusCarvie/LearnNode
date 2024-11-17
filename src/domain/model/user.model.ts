import ModelBase from "./base/model-base";

export default interface UserModel extends ModelBase {
  name: string;
  email: string;
  password: string;
}
