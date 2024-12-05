import { request } from "../services/request";

class AuthModel {
  async login(data: Record<string, string>) {
    return request.get("/auth/login");
  }
  register() {
    return "";
  }
  userInfo() {
    return "userinfo";
  }
}

const authModel = new AuthModel();
export default authModel;
