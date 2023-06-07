import { useState } from "react";



const DropDownMenu = () => {
    const [selectedOption, setSelectedOption] = useState('');
    
    return <>
        <a href="#" className="text-gray-700 block px-4 py-2 text-sm" id="pro" role="menuitem" tabIndex={-1}>Profile</a>
        <a href="#" className="text-gray-700 block px-4 py-2 text-sm" id="log" role="menuitem" tabIndex={-1}>LogOut</a>
    </>
}

export default DropDownMenu;