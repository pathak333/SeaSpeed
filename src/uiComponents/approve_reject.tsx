import { useNavigate } from "react-router-dom";
import { approveOrReject } from "../services/admin.service";
import { toast } from "react-toastify";
import { useState } from "react";

interface Props{
  navigation: string,
  name: string,
  locationStateData: any,
  user_id: string,
  doc_id:string
}


const ApproveReject = ({ navigation, name,locationStateData,user_id,doc_id }: Props) => {
  const navigate = useNavigate();
const [msg, updateMsg] = useState("")

  const handleClick = async (e: any,postdata:any) => {
    e.preventDefault();
    try {
    
      const { data } = await approveOrReject(postdata)
      if (data.success) {
        toast.info(data.message)
        navigate(navigation,{state:{crew:locationStateData}})
      } else {
        toast.info(data.message)
      }
     
    } catch (error:any) {
      toast.info(error.message)
      
    }
  }

    return <div className="flex flex-col">
        <div className="flex flex-row">
        <button onClick={(e:any) => {
          console.log("approve and next");
          let postData = {
            user_id,
            approver_doc:doc_id,
           
          }
          handleClick(e,postData);
         // navigate(navigation,{state:{crew:locationStateData}})
        }} className="bg-IbColor text-white rounded-lg p-3 font-semibold m-3">Approve & Next</button>
        {/* <button className="border border-blue-600 border-2 rounded-lg p-3 text-blue-600 font-semibold m-3">Reject</button> */}
      </div>
        <div className="relative w-full">
        <textarea  onChange={(e:any) => updateMsg(e.target.value)} className="border border-2 rounded-lg mx-3 p-2 w-full" name="Reject" id="rejectbox" cols={30} rows={10} placeholder="Enter Your Reason For Rejection"  /> 
    <button onClick={(e:any) => {
          console.log("reject and next");
          let postData = {
            user_id,
            rejetedDoc:doc_id,
            rejected_reason:msg
          }
          handleClick(e,postData);
        
        }} className="absolute right-4 bottom-3 px-3 py-4 border border-blue-600 border-2 rounded-lg p-3 text-blue-600 font-semibold m-3">Reject & Next</button>
  </div>
    </div>
}
export default ApproveReject;