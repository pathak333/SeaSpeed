import {  useReducer, useRef } from "react"
import { Upload } from "react-feather"
import DialogBox from "../dialogBox";
import { Close } from "@mui/icons-material";
import InputField from "./inputField.component";
import { singleFileUpload } from "../../services/user.service";
import { singleFileUploadAdmin } from "../../services/admin.service";
//import useLocalStorage from "../../hooks/saveToLocal";

interface Props {
    folder: string,
    name: string,
    from: string,
    dataFun(id:string):void
}





const FileUpload = (props: Props) => {
    const uploadRef = useRef<HTMLInputElement>(null);
    
    const [formEvent, updateFormEvent] = useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next };
        return newEvent;
     }, {
        name: "",
        expireDate: "",
        isUploadOpen: false,
    })

   // const [isUploadOpen, setIsUploadOpen] = useState(false);

    const handleButtonClick =  () => {
        uploadRef.current!.click();
        console.log(uploadRef)
    };

    const handleSaveButton = async () => {
        console.log(uploadRef.current!.files)
        if (uploadRef.current!.files!.length > 0) {
           
            const formData = new FormData();
            formData.append('file', uploadRef.current!.files![0]);
            formData.append('name',formEvent.name)
            formData.append('expire',formEvent.expireDate)
            formData.append('foldername',props.folder)

            console.log(uploadRef.current!.files![0])
            if (props.from === "user") {
                const { data } = await singleFileUpload(formData)
                console.log(data)
                props.dataFun(data.data._id)
                updateFormEvent({isUploadOpen:false})
            } else {
                const { data } = await singleFileUploadAdmin(formData)
                console.log(data)
                props.dataFun(data.data._id)
                updateFormEvent({isUploadOpen:false})
            }
        }
      
    }


    const openUpload = () => {
       // setIsUploadOpen(true)
        updateFormEvent({isUploadOpen:true})
    }
    const clearImageData = () => {
        uploadRef.current!.value =""
        updateFormEvent({});
        console.log("Clear")
   }

    return <div>
        <div onClick={openUpload} className="flex flex-row m-3 items-center justify-center p-3 rounded-2xl border-2 border-[#C7C7C7] bg-[#0075FF1A] cursor-pointer">

            <Upload className="text-IbColor" />
            <p className="text-IbColor">Upload {props.name} PDF</p>


        </div>
        <DialogBox label="Add New Document" isOpen={formEvent.isUploadOpen} onClose={() => { updateFormEvent({isUploadOpen:false}) }} component={
            <>
                <div className="relative">
                <div onClick={handleButtonClick} className="flex flex-col m-3 items-center justify-center p-3 rounded-2xl  bg-[#0075FF1A] cursor-pointer relative">
                    <input ref={uploadRef} className="hidden" type="file" name="uploadPdf" accept="application/pdf" id="" onChange={()=> updateFormEvent({})} />
                    <img src="/images/upload_file_black_24dp 1.png" alt="" className=" h-56" />
                    <p>{ uploadRef.current && uploadRef.current.files!.length >0 ? uploadRef.current.files![0].name : ""}</p>
                </div>
                <div className="absolute top-0 right-3">
                    <Close onClick={clearImageData} className="text-IbColor absolute top-0 right-0 m-2 h-5 w-5 border-2 border-IbColor rounded-full" />
                </div>
               </div>
                <p className="text-blue-300 text-xs font-bold text-center mt-2 mb-4">Click on above section to select Document</p>
                <div className="columns-2 gap-1">
                <InputField fieldName={"name"} label={"name"} type={"text"} onChange={(e)=>updateFormEvent({name:e.target.value}) }  />
                <InputField fieldName={"expireDate"} label={"expireDate"} type={"date"} onChange={(e)=>updateFormEvent({expireDate:e.target.value}) }  />
                </div>
                <button type="button" className="mt-4 mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSaveButton}>Save</button>
                
                {/* <p className="text-IbColor">Upload {props.name} PDF</p> */}
            </>
        } />
    </div>



}

export default FileUpload