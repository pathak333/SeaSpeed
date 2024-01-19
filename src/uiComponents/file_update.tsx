import { useEffect, useReducer, useRef, useState } from "react"
import DialogBox from "./dialogBox"
import InputField from "./inputField/inputField.component"
import { Close, Download } from "@mui/icons-material";
import { Edit } from "react-feather";
import "./css/custom_button.css"
import { updateFile } from "../services/admin.service";
import { useGlobalState } from "../contexts/global.context";
import { LOADING } from "../constants/action.constant";
import { toast } from "react-toastify";

interface Props {
  name: string,//props.name,
  expireDate: string,
  link: string,
  id:string
}

export default function FileUpdate(props: Props) {
  const [, dispatch] = useGlobalState();
  const uploadRef = useRef<HTMLInputElement>(null);


  const [formEvent, updateFormEvent] = useReducer((prev: any, next: any) => {
    const newEvent = { ...prev, ...next };
    return newEvent;
  }, {
    name: "",//props.name,
    expireDate: "",
    link: "",
    isUploadOpen: false
  })

  const save = async (e:any) => {
    e.preventDefault();
    dispatch({ type: LOADING, payload: true });
    const formData = new FormData();
    formData.append('_id',props.id)
    if (uploadRef.current!.files![0]) {
      formData.append('file', uploadRef.current!.files![0]);
      formData.append('name', formEvent.name)
      formData.append('expire', formEvent.expireDate)
      formData.append('foldername', "")
    } else {
      
     
      formData.append('name', formEvent.name)
      formData.append('expire', formEvent.expireDate)
      formData.append('foldername', "")
    }
    const { data } = await updateFile(formData)
    if (data) {
      toast.success(data.message);
    } 
    dispatch({ type: LOADING, payload: false });
  }

  useEffect(() => {

    updateFormEvent({ name: props.name, expireDate: props.expireDate, link: props.link })
    return () => {

    }
  }, [])

  const handleButtonClick = () => {
    uploadRef.current!.click();
    console.log(uploadRef)
  };

  const clearImageData = () => {
    uploadRef.current!.value = ""
    updateFormEvent({ isUploadOpen: false });
    console.log("Clear")
  }





  return <>
    <div className="shadow p-3 m-3 rounded-2xl border-2 border-[#C7C7C7] bg-[#0075FF1A]">
      <p className="font-semibold mb-3">You have one file {props?.name}</p>
      <div className="flex flex-row justify-between ">
        <a href={props?.link} className="text-blue-500"> <Download /> Download Document </a>
        <p className="inline-flex text-blue-500 cursor-pointer" onClick={() => updateFormEvent({ isUploadOpen: true })}><Edit />&nbsp; Edit Document </p>
      </div>
    </div>
    <DialogBox label="Update Your Document" isOpen={formEvent.isUploadOpen} onClose={() => { updateFormEvent({ isUploadOpen: false }) }} component={
      <>
        <div className="relative">
          <div onClick={handleButtonClick} className="flex flex-col m-3 items-center justify-center p-3 rounded-2xl  bg-[#0075FF1A] cursor-pointer relative">
            <input ref={uploadRef} className="hidden" type="file" name="uploadPdf" accept="application/pdf" id="" onChange={() => updateFormEvent({})} />
            <img src="/images/upload_file_black_24dp 1.png" alt="" className=" h-56" />
            <p>{uploadRef.current && uploadRef.current.files!.length > 0 ? uploadRef.current.files![0].name : ""}</p>
          </div>
          <div className="absolute top-0 right-3">
            <Close onClick={clearImageData} className="text-IbColor absolute top-0 right-0 m-2 h-5 w-5 border-2 border-IbColor rounded-full" />
          </div>
        </div>
        <p className="text-blue-300 text-xs font-bold text-center mt-2 mb-4">Click on above section to select Document</p>
        <div className="columns-2 gap-1">
          <InputField fieldName={"name"} label={"name"} type={"text"} value={formEvent.name} onChange={(e) => updateFormEvent({ name: e.target.value })} />
          <InputField fieldName={"expireDate"} label={"expireDate"} type={"date"} onChange={(e) => updateFormEvent({ expireDate: e.target.value })} value={formEvent.expireDate} />
        </div>
        <button  className=" mr-5 border border-sky-700 before:bg-sky-700 alexroumi" type="button" onClick={save}>Save</button>
      </>
    } />

  </>
}
