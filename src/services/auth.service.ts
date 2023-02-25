import { LoginSchema } from "../Components/auth/validation";
import { loginApi, UpdatePasswordApi } from "../constants/api.constant";
import httpService from "./api.service";

export const LoginService = (data: LoginSchema) => {
    return httpService.post(loginApi,data)
}
 
export const ResetPasswordService = (data: LoginSchema) => {
    return httpService.post(UpdatePasswordApi,data)
 }