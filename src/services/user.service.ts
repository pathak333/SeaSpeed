import axios from "axios";
import {
  AddEducationDetailApi,
  AddPassportDetailApi,
  AddPersonalDetailApi,
  BankDetailApi,
  DeleteEducationDetailApi,
  GetBankDetailApi,
  GetEducationDetailApi,
  GetKinDetailApi,
  GetPassportDetailApi,
  GetPersonalDetailApi,
  GetProfileApi,
  KinDetailApi,
  updatePassportDetailApi,
} from "../constants/api.constant";
import httpService from "./api.service";

export const ProfileService = () => {
  axios.defaults.headers.common["Authorization"] =
    sessionStorage.getItem("token") || "";
  return httpService.get(GetProfileApi);
};

// post routes
export const AddPersonalDetail = (data: any) => {
  return httpService.post(AddPersonalDetailApi,data)
}

export const AddEducationDetail = (data: any) => {
  return httpService.post(AddEducationDetailApi, data);
};

export const BankDetailService = (data: any) => {
  return httpService.post(BankDetailApi, data);
};

export const KinDetailService = (data: any) => {
  return httpService.post(KinDetailApi, data);
};

// get routes

export const GetPersonalDetail = () => {
  return httpService.get(GetPersonalDetailApi);
};
export const GetEducationDetail = () => {
  return httpService.get(GetEducationDetailApi);
};
export const GetBankDetail = () => {
  return httpService.get(GetBankDetailApi);
};
export const GetKinDetail = () => {
  return httpService.get(GetKinDetailApi);
};

export const DeleteEducationDetail = (id: string) => {
  return httpService.delete(DeleteEducationDetailApi + `/${id}`);
};


export const PassportDetailService = (data:any) => {
  return httpService.post(AddPassportDetailApi,data)
}

export const updatePassportDetailService = (data: any) => {
  return httpService.put(updatePassportDetailApi,data)
  
}

export const GetPassportDetailService = () => {
  return httpService.get(GetPassportDetailApi);
}