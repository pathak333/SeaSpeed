import { useEffect, useState } from "react";
import { getUserInstruction } from "../../services/user.service";
import { Trash2 } from "react-feather";



const Notification = (props: any) => {
    
    const [notif, updateNotify] = useState([]);

   async function fetchData() {
    const { data } = await getUserInstruction();
    console.log(data);
    updateNotify(data.data)
    }

useEffect(() => {
    fetchData();  
}, [])


    

    const listofData = notif.map((item: any, index: any) => (
        <div key={index} className="bg-white border-b  p-4">
          <p className="px-6  font-semibold text-slate-800">{item.message}</p>
            <p className="px-6 text-slate-500 text-sm">{item.updatedAt.split("T")[0]}</p>
            
        </div>
      ));
    



    return <>
    <div className="relative overflow-auto mb-3  z-50">
         { notif.length > 0 && listofData}
        </div>
    </>
}


export default Notification;