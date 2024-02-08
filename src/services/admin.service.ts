
import axios, { Axios } from "axios";
import { GetAdminProfileApi, GetCrewBankDetailApi, GetCrewCertificateApi, GetCrewCourseCertificateApi, GetCrewDangerousCargoEndorsementApi, GetCrewEducationDetailApi, GetCrewFlagEndorsementApi, GetCrewKinDetailApi, GetCrewMedicalDetailApi, GetCrewPassportDetailApi, GetCrewReferencesApi, GetCrewSeamenBookApi, GetCrewUnionRegistrationApi, GetCrewVisaDetailApi, GetCrewWorkExperienceApi, addCompanyApi, updateCompanyApi, addManagerApi, addSubAdminApi, addVesselApi, approveOrRejectApi, assignNewCrewApi, assignVesselApi, createNewUserApi, getAllCompanyApi, getAllCrewApi, getAllCrewByVesselIdApi, getAllManagerByCompanyIdApi, getAllPendingCrewApi, getAllRankApi, getAllUnAssinedCrewApi, getAllVessel, getAllVesselByCompanyIdApi, getAllVesselForAdminApi, getCrewPersonalDetailApi, getSubAdminApi, getVesselByIdApi, singleFileUploadAdminApi, updateSubAdminApi, uploadProfileadminApi, UpdatePersonalDetailAdminApi, sendInstructionApi, deleteInstructionApi, getInstructionApi, getExpireDocVesselApi, getExpireDocCompanyApi, updateVesselApi, getExpireDocUserApi, updateBankDetailApi, updateKinDetailApi, updateFileApi, applicationPdfApi, updateProfileApi } from "../constants/api.admin.constant";
import httpService from "./api.service";



export const adminProfileService = () => {

    axios.defaults.headers.common["Authorization"] =
        sessionStorage.getItem("token") || "";
    return httpService.get(GetAdminProfileApi);
};

export const AllVessel = () => {
    return httpService.get(getAllVessel)
}


export const UpdateVessel = (id: string, data: any) => {
    return httpService.put(updateVesselApi + `?id=${id}`, data)
}






export const getAllVesselByCompanyIdService = (id: string) => {
    return httpService.get(getAllVesselByCompanyIdApi + "/?id=" + id)
}

export const createVessel = (data: any) => {
    return httpService.post(addVesselApi, data)
}

export const getAllVesselById = () => {
    return httpService.get(getAllVesselForAdminApi)
}

export const getVesselByIdService = (id: string) => {
    return httpService.get(getVesselByIdApi + `/?id=${id}`)
}

export const getAllCrewByVesselIdService = (id: string) => {
    return httpService.get(getAllCrewByVesselIdApi + `/?id=${id}`)
}

export const AddSubAdmin = (data: any) => {
    return httpService.post(addSubAdminApi, data)
}
export const updateSubAdmin = (id: any, data: any) => {
    return httpService.put(updateSubAdminApi + `/?id=${id}`, data)
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

export const getAllPendingCrew = (pageno:number,perpage:number) => {
    return httpService.get(getAllPendingCrewApi+`?pageno=${pageno}&perpage=${perpage}`);
}

export const getAllUnAssinedCrew = (rank: string) => {
    return httpService.get(getAllUnAssinedCrewApi + "/?rank=" + rank);
}

export const assignNewCrewService = (data: any) => {
    return httpService.post(assignNewCrewApi, data);
}

export const getAllRank = () => {
    return httpService.get(getAllRankApi);
}


export const addManagerService = (data: any) => {
    return httpService.post(addManagerApi, data);
}

export const getAllManagerByCompanyId = (id: any) => {
    return httpService.get(getAllManagerByCompanyIdApi + "/?id=" + id);
}


export const getAllCompanyService = () => {
    return httpService.get(getAllCompanyApi);
}


export const addCompanyService = (data: any) => {
    return httpService.post(addCompanyApi, data)
}

export const updateCompanyService = (data: any) => {
    return httpService.put(updateCompanyApi, data)
}



// crew form api

export const getCrewPersonalDetail = (id: string) => {
    return httpService.get(getCrewPersonalDetailApi + "/?id=" + id)
}

export const UpdatePersonalDetailAdmin = (data: any) => {
    return httpService.put(UpdatePersonalDetailAdminApi, data);
};

export const getCrewEducationDetail = (id: string) => {
    return httpService.get(GetCrewEducationDetailApi + "/?id=" + id)
}


export const getCrewBankDetail = (id: string) => {
    return httpService.get(GetCrewBankDetailApi + "/?id=" + id)
}


export const getCrewKinDetail = (id: string) => {
    return httpService.get(GetCrewKinDetailApi + "/?id=" + id)
}



export const getCrewPassportDetail = (id: string) => {
    return httpService.get(GetCrewPassportDetailApi + "/?id=" + id)
}
export const getCrewVisaDetail = (id: string) => {
    return httpService.get(GetCrewVisaDetailApi + "/?id=" + id)
}
export const getCrewSeamenBook = (id: string) => {
    return httpService.get(GetCrewSeamenBookApi + "/?id=" + id)
}


export const getCrewCertificate = (id: string) => {
    return httpService.get(GetCrewCertificateApi + "/?id=" + id)
}
export const getCrewFlagEndorsement = (id: string) => {
    return httpService.get(GetCrewFlagEndorsementApi + "/?id=" + id)
}
export const getCrewDangerousCargoEndorsement = (id: string) => {
    return httpService.get(GetCrewDangerousCargoEndorsementApi + "/?id=" + id)
}
export const getCrewWorkExperience = (id: string) => {
    return httpService.get(GetCrewWorkExperienceApi + "/?id=" + id)
}
export const getCrewCourseCertificate = (id: string) => {
    return httpService.get(GetCrewCourseCertificateApi + "/?id=" + id)
}
export const getCrewReferences = (id: string) => {
    return httpService.get(GetCrewReferencesApi + "/?id=" + id)
}
export const getCrewUnionRegistration = (id: string) => {
    return httpService.get(GetCrewUnionRegistrationApi + "/?id=" + id)
}
export const getCrewMedicalDetail = (id: string) => {
    return httpService.get(GetCrewMedicalDetailApi + "/?id=" + id)
}



export const approveOrReject = (data: any) => {
    return httpService.post(approveOrRejectApi, data);
}

export const singleFileUploadAdmin = (payload: any) => {
    return httpService.post(singleFileUploadAdminApi, payload, { headers: { 'Content-Type': 'multipart/form-data', } })
}


export const assignVessel = (data: any) => {
    return httpService.put(assignVesselApi, data)
}
export const uploadProfileadmin = (payload: any, token: any) => {
    return httpService.post(uploadProfileadminApi, payload, {
        headers: {
            // 'Content-Type': 'application/json', // Assuming you are sending JSON data
            'Authorization': token,
        }
    })
}


export const sendInstruction = (data: any) => {
    return httpService.post(sendInstructionApi, data);
}
export const getInstructionAdmin = (id: string) => {
    return httpService.get(getInstructionApi + `?id=${id}`);
}
export const deleteInstruction = (id: string) => {
    return httpService.delete(deleteInstructionApi + `?id=${id}`);
}

export const sendMessageToWhatsapp = (number: string, message: string) => {
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank')
}

export const getExpireDocVessel = (date: string) => {
    return httpService.get(getExpireDocVesselApi + `?expireDate=${date}`);
}
export const getExpireDocCompany = (date: string) => {
    return httpService.get(getExpireDocCompanyApi + `?expireDate=${date}`);
}
export const getExpireDocUser = (date: string) => {
    return httpService.get(getExpireDocUserApi + `?expireDate=${date}`);
}

export const updateBankDetail = (data: any) => {
    return httpService.put(updateBankDetailApi, data);
}

export const updateKinDetail = (data: any) => {
    return httpService.put(updateKinDetailApi, data);
}

export const ProfileUpdateadmin = (data: any) => {
    return httpService.put(updateProfileApi,data)
  }


export const updateFile = (data: any) => {
    axios.AxiosHeaders.concat({ 'Content-Type': 'multipart/form-data' })
    return  httpService.put(updateFileApi, data);
}


export const applicationPdf = (id:string) => httpService.get(applicationPdfApi+`?id=${id}`);


