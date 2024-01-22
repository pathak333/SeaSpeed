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
  GetVisaDetailApi,
  AddSeamenBookApi,
  GetSeamenBookApi,
  AddCertificateApi,
  GetCertificateApi,
  DeleteCertificateOfCompetencyApi,
  AddFlagEndorsementApi,
  GetFlagEndorsementApi,
  DeleteFlagEndorsementApi,
  AddDangerousCargoEndorsementApi,
  DeleteDangerousCargoEndorsementApi,
  GetDangerousCargoEndorsementApi,
  AddWorkExperienceApi,
  DeletetWorkExperienceApi,
  GetWorkExperienceApi,
  AddCourseCertificateApi,
  DeletetCourseCertificateApi,
  GetCourseCertificateApi,
  DeletetReferencesApi,
  AddReferencesApi,
  GetReferencesApi,
  AddUnionRegistrationApi,
  DeletetUnionRegistrationApi,
  GetUnionRegistrationApi,
  UpdateMedicalDetailApi,
  AddMedicalDetailApi,
  DeletetMedicalDetailApi,
  GetMedicalDetailApi,
  DeleteTypeMedicalDetailApi,
  UpdateKinDetailApi,
  singleFileUploadApi,
  getAllFileApi,
  uploadProfileApi,
  getInstructionUserApi,
  updateInstructionUserApi,
  updateUserFileApi
} from "../constants/api.constant";
import httpService from "./api.service";



export const ProfileService = () => {
  const token = sessionStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] =
  token+"4" || "";
  return token ? httpService.get(GetProfileApi) : "";
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
export const UpdateKinDetailService = (data: any) => {
  return httpService.put(UpdateKinDetailApi, data);
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

export const addSeamenBookDetail = (data: any) => {
  return httpService.post(AddSeamenBookApi, data)
}

export const getSeamenBookDetail = () => {
  return httpService.get(GetSeamenBookApi)
}


export const addCertificateOfCompetency = (data:any) => {
  return httpService.post(AddCertificateApi,data)
}

export const getCertificateOfCompetency = () => {
  return httpService.get(GetCertificateApi)
}

export const deleteCertificateOfCompetency = (id:String) => {
  return httpService.delete(DeleteCertificateOfCompetencyApi+`?docId=${id}`)
}

export const addFlagEndorsement = (data:any) => {
  return httpService.post(AddFlagEndorsementApi,data)
}

export const getFlagEndorsement = () => {
  return httpService.get(GetFlagEndorsementApi)
}

export const deleteFlagEndorsement = (id:String) => {
  return httpService.delete(DeleteFlagEndorsementApi+`?docId=${id}`)
}

export const addDangerousCargoEndorsement = (data:any) => {
  return httpService.post(AddDangerousCargoEndorsementApi,data)
}

export const getDangerousCargoEndorsement = () => {
  return httpService.get(GetDangerousCargoEndorsementApi)
}

export const deleteDangerousCargoEndorsement = (id:String) => {
  return httpService.delete(DeleteDangerousCargoEndorsementApi+`?docId=${id}`)
}

export const addWorkExperience = (data:any) => {
  return httpService.post(AddWorkExperienceApi,data)
}

export const getWorkExperience = () => {
  return httpService.get(GetWorkExperienceApi)
}

export const deletetWorkExperience = (id:String) => {
  return httpService.delete(DeletetWorkExperienceApi+`?docId=${id}`)
}

export const addCourseCertificate = (data:any) => {
  return httpService.post(AddCourseCertificateApi,data)
}

export const getCourseCertificate = () => {
  return httpService.get(GetCourseCertificateApi)
}

export const deletetCourseCertificate = (id:String) => {
  return httpService.delete(DeletetCourseCertificateApi+`?docId=${id}`)
}


export const addReferences = (data:any) => {
  return httpService.post(AddReferencesApi,data)
}

export const getReferences = () => {
  return httpService.get(GetReferencesApi)
}

export const deletetReferences = (id:String) => {
  return httpService.delete(DeletetReferencesApi+`?docId=${id}`)
}


export const addUnionRegistration = (data:any) => {
  return httpService.post(AddUnionRegistrationApi,data)
}

export const getUnionRegistration = () => {
  return httpService.get(GetUnionRegistrationApi)
}

export const deletetUnionRegistration = (id:String) => {
  return httpService.delete(DeletetUnionRegistrationApi+`?docId=${id}`)
}


export const addMedicalDetail = (data:any) => {
  return httpService.post(AddMedicalDetailApi,data)
}

export const updateMedicalDetail = (data:any,id:String) => {
  return httpService.post(UpdateMedicalDetailApi+`?docId=${id}`,data)
}

export const getMedicalDetail = () => {
  return httpService.get(GetMedicalDetailApi)
}

export const deletetMedicalDetail = (id:String) => {
  return httpService.delete(DeletetMedicalDetailApi+`?docId=${id}`)
}

export const deleteTypeMedicalDetail = (id:String,mdocId:String) => {
  return httpService.delete(DeleteTypeMedicalDetailApi+`?docId=${id}&mdocId=${mdocId}`)
}

export const singleFileUpload = (payload: any) => {
  axios.AxiosHeaders.concat({'Content-Type': 'multipart/form-data'})
  return httpService.post(singleFileUploadApi,payload)
}

export const getAllFile = () => {
  return httpService.get(getAllFileApi)
}

export const uploadProfile = (payload:any,token:any) => {
  return httpService.post(uploadProfileApi, payload, {
    headers: {
      // 'Content-Type': 'application/json', // Assuming you are sending JSON data
      'Authorization': token,
    }
  })
}
export const getUserInstruction = () => {
  return httpService.get(getInstructionUserApi);
}
export const updateInstructionUser = (payload:any,id:string) => {
  return httpService.put(updateInstructionUserApi+`?id=${id}`,payload);
}

export const updateUserFile = (data: any) => {
  // axios.AxiosHeaders.concat({'Content-Type': 'multipart/form-data'})
  console.log(data);
  
  return  httpService.put(updateUserFileApi, data,{ headers: { 'Content-Type': 'multipart/form-data', } });
}