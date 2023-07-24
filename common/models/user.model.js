import { UserTypes } from "../utils/userType.enum";

export class UserModel {
  id = "";
  firstName = "";
  lastName = "";
  email = "";
  type = UserTypes.USUARIO;
}
