import { useEffect, useReducer, useRef } from "react"
import { Trash, Upload } from "react-feather"
import DialogBox from "../dialogBox";
import { Close } from "@mui/icons-material";
import InputField from "./inputField.component";
import { singleFileUpload } from "../../services/user.service";
import { singleFileUploadAdmin } from "../../services/admin.service";
import { useGlobalState } from "../../contexts/global.context";
import { LOADING } from "../../constants/action.constant";
import { toast } from "react-toastify";
//import useLocalStorage from "../../hooks/saveToLocal";

interface Props {
    folder: string,
    name: string,
    from: string,
    expireDate?: any,
    dataFun(id: any): void,
    isMultiple?:boolean
}





const FileUpload = ({folder,name,from,expireDate,dataFun,isMultiple=false}: Props) => {
    const uploadRef = useRef<HTMLInputElement>(null);
    const [, dispatch] = useGlobalState();
   
    const [formEvent, updateFormEvent] = useReducer((prev: any, next: any) => {
        const newEvent = { ...prev, ...next };
        return newEvent;
    }, {
        name: "",//props.name,
        expireDate: "",
        isUploadOpen: false,
        data: null,
        multipleData: []
    })
    //?.split("T")[0]

    useEffect(() => {
        updateFormEvent({ name: name, expireDate: expireDate ?? "" })
       
    }, [expireDate, name])

    

    useEffect(() => {
        if (formEvent.isUploadOpen === false) {
            updateFormEvent({
                name: name,//props.name,
                expireDate: "",
                isUploadOpen: false,
                data: null,
                multipleData: []
            })
}
        
},[formEvent.isUploadOpen])

    // const [isUploadOpen, setIsUploadOpen] = useState(false);

    const handleButtonClick = () => {
        uploadRef.current!.click();
        console.log(uploadRef)
    };


    const addMoreButton = async () => {
        if (uploadRef.current!.files!.length > 0 && formEvent.name) {
            dispatch({ type: LOADING, payload: true });

            const formData = new FormData();
            formData.append('file', uploadRef.current!.files![0]);
            formData.append('name', formEvent.name)
            formData.append('expire', formEvent.expireDate)
            formData.append('foldername', folder)

            updateFormEvent({ multipleData: [...formEvent.multipleData, formData] })
            dispatch({ type: LOADING, payload: false });
            uploadRef.current!.value = "";
            updateFormEvent({expireDate:""})
        } else {
            toast.info("Name and File cannot be empty");
        }
    }


    const handleSaveButton = async () => {
        console.log(uploadRef.current!.files)
        dispatch({ type: LOADING, payload: true });
        if (!isMultiple ) {
            dispatch({ type: LOADING, payload: true });
            const formData = new FormData();
            formData.append('file', uploadRef.current!.files![0]);
            formData.append('name', formEvent.name)
            formData.append('expire', formEvent.expireDate)
            formData.append('foldername', folder)

            console.log(uploadRef.current!.files![0])
            try {
                if (from === "user") {
                    const { data } = await singleFileUpload(formData)
                    console.log(data)
                    updateFormEvent({ data })
                    dataFun(data.data)
                    dispatch({ type: LOADING, payload: false });
                    updateFormEvent({ isUploadOpen: false })
                } else {
                    const { data } = await singleFileUploadAdmin(formData)
                    console.log(data)
                    dataFun(data.data)
                    dispatch({ type: LOADING, payload: false });
                    updateFormEvent({ isUploadOpen: false })
                }
            } catch (error) {
                console.log(error);
                //dispatch({ type: LOADING, payload: false });
            } finally {
                dispatch({ type: LOADING, payload: false });
            }

        } else {
            if (formEvent.multipleData.length !== 0 && formEvent.multipleData.length >= 1) {
                try {
                    // const formDataArray = formEvent.multipleData.map((file: any, index: number) => {
                    //     const formData = new FormData();
                    //     formData.append(`file`, file);
                    //     formData.append('name', file.name);
                    //     formData.append('expire', formEvent.expireDate);
                    //     formData.append('foldername', folder);
                    //     return formData;
                    // });
    
                    const uploadPromises = formEvent.multipleData.map(async (formData: any) => {
                        try {
                            if (from === "user") {
                                const { data } = await singleFileUpload(formData);
                                return data.data;
                            } else {
                                const { data } = await singleFileUploadAdmin(formData);
                                return data.data;
                            }
                        } catch (error) {
                            console.log(error);
                            return null;
                        }
                    });
    
                    const results = await Promise.all(uploadPromises);
                    console.log(results)
                    dataFun(results)
    
                    // Handle results as needed (results is an array of responses)
    
                    updateFormEvent({ files: [], isUploadOpen: false });
                    dispatch({ type: LOADING, payload: false });
    
                } catch (error) {
                    console.log(error);
                    dispatch({ type: LOADING, payload: false });
                }
            } else {
                toast.info("Add Document to Upload.")
                dispatch({ type: LOADING, payload: false });
            }
           
        }




    }


    const openUpload = () => {
        // setIsUploadOpen(true)
        updateFormEvent({ isUploadOpen: true })
    }
    const clearImageData = () => {
        uploadRef.current!.value = ""
        updateFormEvent({ isUploadOpen: false });
        console.log("Clear")
    }

    const listofData = formEvent.multipleData.map((formData: any, index: any) => {
        const name = formData.get('name');
        const expire = formData.get('expire');
        const filename = formData.get("file").name
        return (
        <tr key={index} className="bg-white border-b hover:bg-slate-100 cursor-pointer">
            <td className="px-6 py-4">{name}</td>
            <td className="px-6 py-4">{expire}</td>
            <td className="px-6 py-4">{filename}</td>
            {/* <td className="px-6 py-4">file</td> */}
            <td className="px-6 py-4">
                <Trash
                    onClick={() => {
                        formEvent.multipleData.splice(index, 1);
                        updateFormEvent({ dataList: formEvent.multipleData });
                    }}
                />
            </td>
        </tr>
    )});





    return <div>
        <div onClick={openUpload} className="flex flex-row m-3 items-center justify-center p-3 rounded-2xl border-2 border-[#C7C7C7] bg-[#0075FF1A] cursor-pointer">
            <Upload className="text-IbColor" />
            <p className="text-IbColor">Upload {name} PDF</p>
        </div>
        {/* <h1 className="ml-3 text-IbColor"> {formEvent.data !== null ? <a href={formEvent.data.data.link}>You have uploaded one file { formEvent.data.data.name }</a> :""}</h1> */}
        <DialogBox label="Add New Document" isOpen={formEvent.isUploadOpen} onClose={() => { updateFormEvent({ isUploadOpen: false }) }} component={
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
                {isMultiple && formEvent.multipleData.length > 0  && (
            <div className="relative overflow-x-auto mb-3">
                <table className="table-auto w-full text-sm text-left text-grey-500">
                    <thead className="text-xs text-grey-700 uppercase ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Expire
                            </th>
                            <th scope="col" className="px-6 py-3">
                                File
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>{listofData}</tbody>
                   
                </table>
            </div>
        ) }
                {isMultiple && <div className="w-full text-center">
                    <button type="button" className="mt-4 mr-3 border border-blue-300 hover:bg-blue-700 hover:text-white text-blue-400 font-bold py-2 px-4 rounded " onClick={addMoreButton}>Add More</button>
                </div>}
                <hr className="mt-4 bg-IbColor h-1" />
                <button type="button" className="mt-4 mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSaveButton}>Save</button>

                {/* <p className="text-IbColor">Upload {props.name} PDF</p> */}
            </>
        } />
    </div>



}

export default FileUpload