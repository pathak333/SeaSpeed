import { useNavigate } from "react-router-dom";

interface Props{
  navigation: string,
  name: string,
  locationStateData:any
}


const ApproveReject = ({ navigation, name,locationStateData }: Props) => {
  const navigate = useNavigate();

    return <div className="flex flex-col">
        <div className="flex flex-row">
        <button onClick={() => {
          console.log("approve and next");
          
          navigate(navigation,{state:{crew:locationStateData}})
        }} className="bg-IbColor text-white rounded-lg p-3 font-semibold m-3">Approve & Next</button>
        {/* <button className="border border-blue-600 border-2 rounded-lg p-3 text-blue-600 font-semibold m-3">Reject</button> */}
      </div>
        <div className="relative w-full">
        <textarea className="border border-2 rounded-lg mx-3 p-2 w-full" name="Reject" id="rejectbox" cols={30} rows={10} placeholder="Enter Your Reason For Rejection" /> 
    <button className="absolute right-4 bottom-3 px-3 py-4 border border-blue-600 border-2 rounded-lg p-3 text-blue-600 font-semibold m-3">Reject & Next</button>
  </div>
    </div>
}
export default ApproveReject;