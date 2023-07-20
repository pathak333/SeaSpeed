import { useState } from "react";



const DropDownMenu = () => {
   // const [selectedOption, setSelectedOption] = useState('');
    
    return <>
        <p onClick={()=>{}} className="text-gray-700 block px-4 py-2 text-sm" id="pro" role="menuitem" tabIndex={-1}>Profile</p>
        <p onClick={() => {
            sessionStorage.clear();
        }} className="text-gray-700 block px-4 py-2 text-sm" id="log" role="menuitem" tabIndex={-1}>LogOut</p>
    </>
}

export default DropDownMenu;