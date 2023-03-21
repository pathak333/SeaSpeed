import { GetPersonalDetailApi, GetProfileApi } from "../constants/api.constant";
import httpService from "./api.service";

export const ProfileService = () => {
  return httpService.get(GetProfileApi);
};

export const GetPersonalDetail = () => {
  return httpService.get(GetPersonalDetailApi)
}