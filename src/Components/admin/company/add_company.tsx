import { useEffect, useReducer, useState } from "react";

import InputField from "../../../uiComponents/inputField/inputField.component";

import FileUpload from "../../../uiComponents/inputField/fileUpload.component";
import AddManager from "./add_manager";
import { toast } from "react-toastify";
import { companyJoi } from "./validation";
import { addCompanyService, updateCompanyService } from "../../../services/admin.service";
import { Trash2 } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";




const AddCompany = () => {

    const [logofileData,updatelogoFileData] = useState<any>()
    const [fileData,updateFileData] = useState<any>()
    const [companyData,updateCompanyData] = useState<any>()
    const location = useLocation();
    const navigate = useNavigate();
    function goBack(n:number) {
        navigate(n ?? -1)
      }
    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next };
        return newEvent;
    }, {
        name: "",
        email: "",
        phone: "",
        address: "",
        logo: "",
        documentId:[],
        manager:[],
        error: { key: "", value: "" },
    })

//     const getImgUrl = (imgUrl: string) => {
       
//    }
//     const getcompanyImgUrl = (imgUrl: string) => {
       
    //    }
    
    useEffect(() => {
        console.log(location.state)
        let data = location.state ? location.state.company: null;
        console.log(data);
        
        if (data) {
            updateCompanyData(data)
            updateEvent({
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                logo: data.logo,
                documentId: data.documentId,
                manager: data.hasOwnProperty('manager') ? data.manager : [],
            })
        }
      return () => {
        
      }
    }, [])
    

    const errorReturn = (field: string) =>
        formEvent.error.key === field ? formEvent.error.value : "";


    const addMoreManager = (data: any) => {
        formEvent.manager.push(data);
        updateEvent({manager:formEvent.manager})
    }

    const getLogoDocId = (data: any) => {
        updatelogoFileData(data)
       return updateEvent({ logo: data._id ,isFormChanged: true })
        
      }

    const getDocId = (data: any) => {
        updateFileData(data)
       const arrId = data.map((e:any)=> e._id)
        return updateEvent({ documentId: [...formEvent.documentId, ...arrId],isFormChanged: true  })
      }

    const listofData = formEvent.manager.map((item: any, index: any) => (
        <tr key={index} className="bg-white border-b hover:bg-slate-100 cursor-pointer">
            <td className="px-6 py-4">{item.name}</td>
            <td className="px-6 py-4">{item.email}</td>
            <td className="px-6 py-4">{item.phone}</td>
            <td className="px-6 py-4">{item.address}</td>
            <td className="px-6 py-4">{item.type}</td>


            {/* <td className="px-6 py-4">file</td> */}
            <td className="px-6 py-4">
                <Trash2
                    onClick={() => {
                        formEvent.manager.splice(index, 1);
                        updateEvent({ dataList: formEvent.dataList });
                    }}
                />
            </td>
        </tr>
    ));





    return <> <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
        <InputField
            className="m-4"
            fieldName={"name"}
            label={"Name"}
            type={"text"}
            error={errorReturn("name")}
            onChange={(e) => updateEvent({ name: e.target.value, isFormChanged: true })}
            value={formEvent.name}
            id="cName"
        />
        <InputField
            className="m-4"
            fieldName={"email"}
            label={"Email"}
            type={"text"}
            error={errorReturn("email")}
            onChange={(e) => updateEvent({ email: e.target.value, isFormChanged: true })}
            value={formEvent.email}
            id="cemail"
        />
        <InputField
            className="m-4"
            fieldName={"phone"}
            label={"Phone"}
            type={"text"}
            error={errorReturn("phone")}
            onChange={(e) => updateEvent({ phone: e.target.value, isFormChanged: true })}
            value={formEvent.phone}
            id="cphone"
        />
        <InputField 
            className="m-4"
            fieldName={"address"}
            label={"Address"}
            type={"text"}
            error={errorReturn("address")}
            onChange={(e) => updateEvent({ address: e.target.value, isFormChanged: true })}
            value={formEvent.address}
            id="addressCompany"
        />
        <FileUpload folder={"company"} name="logo" from="admin" dataFun={getLogoDocId} />
        <h1 className="ml-3 text-IbColor"> {logofileData !== undefined ? <a href={logofileData?.link}>You have uploaded one file { logofileData?.name }</a> :""}</h1>
        <FileUpload folder={"company"} name="copmany_doc" from="admin" dataFun={getDocId} isMultiple={true} />
        <h1 className="ml-3 text-IbColor"> {fileData !== undefined ? <a href={fileData?.link}>You have uploaded one file { fileData?.name }</a> :""}</h1>
        

    </div>
        <hr />
       <p className="text-lg ml-3">Manager basic details</p>
        <AddManager  from={"company"} callback={addMoreManager} />
        {formEvent.manager.length > 0  ? (
            <div className="relative overflow-x-auto mb-3">
                <table className="table-auto w-full text-sm text-left text-grey-500">
                    <thead className="text-xs text-grey-700 uppercase ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>


                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>{listofData}</tbody>
                   
                </table>
            </div>
        ) : (
            <div></div>
        )}
         <button type="button" className=" text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-14 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={async (e:any) => {
                    e.preventDefault();
                    try {
                        var formData = { ...formEvent }
                        console.log(formData)
                        delete formData.error;
                        delete formData.isFormChanged
                        console.log(formData);
                        if (companyData) {
                            formData._id= companyData._id
                            console.log(formData);

                            const { data } = await updateCompanyService(formData);
                            if (data) {
                                toast.success(data.message);
                                goBack(-2)
                            }
                        } else {
                            
                        
                        var isValid = await companyJoi(formData);
                        if (isValid) {
                           
                            const { data } = await addCompanyService(formData);
                            if (data) {
                                toast.success(data.message);
                            }
                          
                            updateEvent({
                                name: "",
                                email: "",
                                phone: "",
                                address: "",
                                manager: [],
                                error: { key: "", value: "" },
                            })
                        }
                    }
                    } catch (error:any) {
                        if (error.name === "ValidationError") {
                            for (let errorDetail of error.details) {
                              updateEvent({
                                error: {
                                  keys: errorDetail.context.key,
                                  values: errorDetail.message,
                                },
                              });
                              toast.error(errorDetail.message);
                            }
                          } else if (error.name === "AxiosError") {
                            toast.error(error.response.data.message);
                          }
                    }
                }} >
               {companyData ? "Edit Company" : "Add Company"}
            </button>
    </>



}


export default AddCompany;