// getExpireDocUser

import { useEffect, useState } from "react"
import { Search, Trash2 } from "react-feather";
import { getExpireDocUser } from "../../../services/admin.service";
import { AccountCircle } from "@mui/icons-material";
import InputField from "../../../uiComponents/inputField/inputField.component";

const UserExpireDocs = (props: any) => {
    
  const [UserData, updateUserData] = useState([]);
  const [expireDate, updateExpireDate] = useState("");
  const fetchData = async () => {
      console.log(expireDate);
      
      const { data } = await getExpireDocUser(expireDate);
      console.log(data)
      updateUserData(data.data)
  }


  useEffect(() => {
      console.log("Company useEffect");
      fetchData()
    
    //   return () => {
    //     second
    //   }
    }, [])


    const listofData = UserData.map((item: any, index: any) => {
      console.log(item)
      return <tr key={index} className={`  border-b hover:bg-slate-100 cursor-pointer`} >
        <td className="px-6 py-4">{`${item.firstname} ${item.lastname}`}<br /> </td>
        <td className="px-6 py-4">{item.document.name}</td>
        <td className="px-6 py-4">{item.document.expire && item.document.expire.split('T')[0]}</td>
       
        <td className="px-6 py-4 ">
  
          <Trash2
            onClick={() => {
  
            }}
          />
        </td>
      </tr>
    });
  
  
  
  
  
  return <>
       <InputField
       type='date'
       fieldName=' fieldName'
       label=' Expire Date'
       className='my-4 w-2/3 '
      // error={errorReturn(' fieldName')}
      icon={<Search className=' text-blue-700' />}
      onIconClick={()=>fetchData() }
       onChange={(e)=>(updateExpireDate(e.target.value))} 
      />
      {/* <input type="date" name="expire" id="expire" onChange={(e)=>(updateExpireDate(e.target.value) , fetchData())} /> */}
   <div className="relative overflow-x-auto mb-3">
      <table className="table-auto w-full text-sm text-left text-grey-500">
        <thead className="text-xs text-grey-700 uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              Doc Name
            </th>
            <th scope="col" className="px-6 py-3">
              Expire
            </th>
           

            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody >{listofData.length >0 ? listofData : <tr className="text-center mt-5"><td colSpan={4} className="text-xl font-bold">No data found</td></tr>}</tbody>
      </table> 
    </div>
  </>
}

export default UserExpireDocs;