
import { addCompanyApi, addManagerApi, addSubAdminApi, addVesselApi, createNewUserApi, getAllCompanyApi, getAllCrewApi, getAllManagerByCompanyIdApi, getAllRankApi, getAllVessel, getAllVesselForAdminApi, getCrewPersonalDetailApi, getSubAdminApi } from "../constants/api.admin.constant";
import httpService from "./api.service";




export const AllVessel = () => {
    return httpService.get(getAllVessel)
}

export const createVessel = (data: any) => {
    return httpService.post(addVesselApi,data)
}

export const getAllVesselById = () => {
    return httpService.get(getAllVesselForAdminApi)
}



export const AddSubAdmin = (data:any) => {
    return httpService.post(addSubAdminApi,data)
}

export const getAllSubAdmin = () => {
    return httpService.get(getSubAdminApi)
}


export const createNewUser = (data: any) => {
    return httpService.post(createNewUserApi, data);
}

export const getAllCrew = () => {
    return httpService.get(getAllCrewApi);
}

export const getAllRank = () => {
    return httpService.get(getAllRankApi);
}


export const addManagerService = (data: any) => {
    return httpService.post(addManagerApi,data);
}

export const getAllManagerByCompanyId = (id:any) => {
    return httpService.get(getAllManagerByCompanyIdApi+"/?id="+id);
}


export const getAllCompanyService = () => {
    return httpService.get(getAllCompanyApi);
}


export const addCompanyService = (data: any) => {
    return httpService.post(addCompanyApi, data)
}



// crew form api

export const getCrewPersonalDetail = (id:string) => {
    return httpService.get(getCrewPersonalDetailApi+"/?id="+id)
}





