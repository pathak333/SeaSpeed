import axios from "axios";
import {
  AddEducationDetailApi,
  GetEducationDetailApi,
  GetPersonalDetailApi,
  GetProfileApi,
} from "../constants/api.constant";
import httpService from "./api.service";
import { EducationValidation } from "../Components/personalDetails/validation";

export const ProfileService = () => {
  axios.defaults.headers.common["Authorization"] =
    sessionStorage.getItem("token") || "";
  return httpService.get(GetProfileApi);
};

export const GetPersonalDetail = () => {
  return httpService.get(GetPersonalDetailApi);
};
export const AddEducationDetail = (data: any) => {
  return httpService.post(AddEducationDetailApi, data);
};
export const GetEducationDetail = () => {
  return httpService.get(GetEducationDetailApi);
};
