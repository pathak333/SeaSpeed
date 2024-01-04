import { useEffect, useState } from "react";
import { getExpireDocCompany } from "../../../services/admin.service";
import { Search, Trash2 } from "react-feather";
import InputField from "../../../uiComponents/inputField/inputField.component";
import { AccountCircle } from "@mui/icons-material";

const CompanyExpireDocs = (props: any) => {
    const [companyData, updateCompanyData] = useState([]);
    const [expireDate, updateExpireDate] = useState("");
    const fetchData = async () => {
        console.log(expireDate);
        
        const { data } = await getExpireDocCompany(expireDate);
        console.log(data)
        updateCompanyData(data.data)
    }


    useEffect(() => {
        console.log("Company useEffect");
        fetchData()
      
      //   return () => {
      //     second
      //   }
      }, [])


      const listofData = companyData.map((item: any, index: any) => {
        console.log(item)
        return <tr key={index} className={`  border-b hover:bg-slate-100 cursor-pointer`} >
          <td className="px-6 py-4">{item.companyName}<br /> </td>
          <td className="px-6 py-4">{item.document.name}</td>
          <td className="px-6 py-4">{item.document.expire}</td>
         
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
         onChange={(e)=>(updateExpireDate(e.target.value) )}
        />
        {/* <input type="date" name="expire" id="expire" onChange={(e)=>(updateExpireDate(e.target.value) , fetchData())} /> */}
     <div className="relative overflow-x-auto mb-3">
        <table className="table-auto w-full text-sm text-left text-grey-500">
          <thead className="text-xs text-grey-700 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Company Name
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
          <tbody>{listofData}</tbody>
        </table>
      </div>
    </>
}

export default CompanyExpireDocs;