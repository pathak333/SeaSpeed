
import { addSubAdminApi, createNewUserApi, getAllRankApi, getAllVessel } from "../constants/api.admin.constant";
import httpService from "./api.service";




export const AllVessel = () => {
    return httpService.get(getAllVessel)
}


export const AddSubAdmin = (data:any) => {
    return httpService.post(addSubAdminApi,data)
}


export const getAllRank = () => {
    return httpService.get(getAllRankApi);
}


export const createNewUser = (data: any) => {
    return httpService.post(createNewUserApi, data);
}
