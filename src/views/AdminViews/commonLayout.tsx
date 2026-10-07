import {  ReactNode } from "react";
import { ArrowLeft } from "react-feather"
import { useNavigate } from "react-router-dom";


interface Props{
    heading: String,
    subHeading?: String,
    lastHeading?: String,
    children?:ReactNode
    
}

const CommonLayout = (props:Props) => {
    const navigate = useNavigate();
    function goBack() {
        navigate("/dashboard/home", { replace: true });
    }


    return  <div className="box-border border border-[1] border-[#C7C7C7] dark:border-gray-600 bg-white dark:bg-gray-800 rounded-2xl p-[50px] max-sm:p-[20px]">
    <p className="font-medium text-[22px] leading-none flex flex-row items-center dark:text-gray-100">
        <span className="mr-2">
            <ArrowLeft onClick={() => goBack()} className="dark:text-gray-300" />
        </span>{" "}
       {props.heading}
    </p>
    <p className="pl-8 text-[#A5A5A5] dark:text-gray-400">
       {props.subHeading}
    </p>
        <span className="ml-4 text-lg dark:text-gray-200">{ props.lastHeading}</span>
       {props.children}
</div>
}

export default CommonLayout