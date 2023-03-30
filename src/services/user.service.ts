import axios from "axios";
import {
  AddEducationDetailApi,
  BankDetailApi,
  DeleteEducationDetailApi,
  GetEducationDetailApi,
  GetPersonalDetailApi,
  GetProfileApi,
} from "../constants/api.constant";
import httpService from "./api.service";

export const ProfileService = () => {
  axios.defaults.headers.common["Authorization"] =
    sessionStorage.getItem("token") || "";
  return httpService.get(GetProfileApi);
};

export const AddEducationDetail = (data: any) => {
  return httpService.post(AddEducationDetailApi, data);
};

export const BankDetailService = (data: any) => {
  return httpService.post(BankDetailApi, data);
}

export const GetPersonalDetail = () => {
  return httpService.get(GetPersonalDetailApi);
};
export const GetEducationDetail = () => {
  return httpService.get(GetEducationDetailApi);
};
export const DeleteEducationDetail = (id: string) => {
  return httpService.delete(DeleteEducationDetailApi + `/${id}`);
};
