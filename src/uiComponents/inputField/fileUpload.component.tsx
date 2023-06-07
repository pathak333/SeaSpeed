import { useRef, useState } from "react"
import { Upload } from "react-feather"

interface Props{
    folder:String
}





const FileUpload = (props: Props) => {
    const uploadRef = useRef<HTMLInputElement>(null);

   // const [selectedFile, setSelectedFile] = useState(null);

    const handleButtonClick = () => {
        uploadRef.current!.click();
    };
    


    return <div onClick={handleButtonClick} className="flex flex-row m-3 items-center justify-center p-3 rounded-2xl border-2 border-[#C7C7C7] bg-[#0075FF1A] cursor-pointer">
    <input ref={uploadRef} className="hidden" type="file" name="uploadPdf"  accept="application/pdf" id="" />
<Upload className="text-IbColor" />
<p className="text-IbColor">Upload Passport PDF</p>
</div> 
}

export default FileUpload