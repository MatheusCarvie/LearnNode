import HttpError from "../../Infrastructure/errors/http-error";
import bcrypt from "bcryptjs";
import UserService from "./user.service";
import jwt from "jsonwebtoken";
import UserModel from "../../domain/model/user.model";
import ErrorMessages from "../../Infrastructure/errors/error-messages";

class AuthService {
  private userService = new UserService();

  async signIn(email: string, password: string) {
    const user = await this.userService.getByEmail(email, "+password");
    if (!user) throw new HttpError(ErrorMessages.Auth.INVALID_EMAIL_OR_PASSWORD, 400);

    const passwordIsValid = await bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) throw new HttpError(ErrorMessages.Auth.INVALID_EMAIL_OR_PASSWORD, 400);

    const token = jwt.sign({ _id: user._id, email: user.email, name: user.name }, String(process.env.TOKEN_KEY), {
      expiresIn: "720h",
    });
    return token;
  }

  async signUp(model: UserModel) {
    return await this.userService.create(model);
  }
}

export default AuthService;
