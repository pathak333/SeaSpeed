
import { GetCrewBankDetailApi, GetCrewCertificateApi, GetCrewCourseCertificateApi, GetCrewDangerousCargoEndorsementApi, GetCrewEducationDetailApi, GetCrewFlagEndorsementApi, GetCrewKinDetailApi, GetCrewMedicalDetailApi, GetCrewPassportDetailApi, GetCrewReferencesApi, GetCrewSeamenBookApi, GetCrewUnionRegistrationApi, GetCrewVisaDetailApi, GetCrewWorkExperienceApi, addCompanyApi, addManagerApi, addSubAdminApi, addVesselApi, approveOrRejectApi, createNewUserApi, getAllCompanyApi, getAllCrewApi, getAllManagerByCompanyIdApi, getAllPendingCrewApi, getAllRankApi, getAllVessel, getAllVesselForAdminApi, getCrewPersonalDetailApi, getSubAdminApi } from "../constants/api.admin.constant";
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

export const getAllPendingCrew = () => {
    return httpService.get(getAllPendingCrewApi);
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

export const getCrewEducationDetail = (id:string) => {
    return httpService.get(GetCrewEducationDetailApi+"/?id="+id)
}


export const getCrewBankDetail = (id:string) => {
    return httpService.get(GetCrewBankDetailApi+"/?id="+id)
}


export const getCrewKinDetail = (id:string) => {
    return httpService.get(GetCrewKinDetailApi+"/?id="+id)
}



export const getCrewPassportDetail = (id:string) => {
    return httpService.get(GetCrewPassportDetailApi+"/?id="+id)
}
export const getCrewVisaDetail = (id:string) => {
    return httpService.get(GetCrewVisaDetailApi+"/?id="+id)
}
export const getCrewSeamenBook = (id:string) => {
    return httpService.get(GetCrewSeamenBookApi+"/?id="+id)
}


export const getCrewCertificate = (id:string) => {
    return httpService.get(GetCrewCertificateApi+"/?id="+id)
}
export const getCrewFlagEndorsement = (id:string) => {
    return httpService.get(GetCrewFlagEndorsementApi+"/?id="+id)
}
export const getCrewDangerousCargoEndorsement = (id:string) => {
    return httpService.get(GetCrewDangerousCargoEndorsementApi+"/?id="+id)
}
export const getCrewWorkExperience = (id:string) => {
    return httpService.get(GetCrewWorkExperienceApi+"/?id="+id)
}
export const getCrewCourseCertificate = (id:string) => {
    return httpService.get(GetCrewCourseCertificateApi+"/?id="+id)
}
export const getCrewReferences = (id:string) => {
    return httpService.get(GetCrewReferencesApi+"/?id="+id)
}
export const getCrewUnionRegistration = (id:string) => {
    return httpService.get(GetCrewUnionRegistrationApi+"/?id="+id)
}
export const getCrewMedicalDetail = (id:string) => {
    return httpService.get(GetCrewMedicalDetailApi+"/?id="+id)
}



export const approveOrReject = (data: any) => {
    return httpService.post(approveOrRejectApi, data);
}





