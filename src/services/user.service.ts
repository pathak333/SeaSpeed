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
  UpdateBankDetailApi,
  UpdatePersonalDetailApi,
  UpdateProfile,
  updatePassportDetailApi,
  AddVisaDetailApi,
  UpdateVisaDetailApi,
  GetVisaDetailApi
} from "../constants/api.constant";
import httpService from "./api.service";

export const ProfileService = () => {
  axios.defaults.headers.common["Authorization"] =
    sessionStorage.getItem("token") || "";
  return httpService.get(GetProfileApi);
};

export const ProfileUpdate = (data: any) => {
  return httpService.put(UpdateProfile,data)
}

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

export const UpdateBankDetailService = (data: any) => {
  return httpService.put(UpdateBankDetailApi, data)
}




export const KinDetailService = (data: any) => {
  return httpService.post(KinDetailApi, data);
};

// get routes

export const GetPersonalDetail = () => {
  return httpService.get(GetPersonalDetailApi);
};
export const UpdatePersonalDetail = (data:any) => {
  return httpService.put(UpdatePersonalDetailApi,data);
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

export const addVisaDetailService = (data:any) => {
  return httpService.post(AddVisaDetailApi,data)
}
export const UpdateVisaDetailService = (data:any) => {
  return httpService.put(UpdateVisaDetailApi,data)
}
export const GetVisaDetailService = () => {
  return httpService.get(GetVisaDetailApi)
}