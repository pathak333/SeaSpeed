import {  ReactNode } from "react";
import { ArrowLeft } from "react-feather"
import { useNavigate } from "react-router-dom";


interface Props{
    heading: String,
    subHeading?: String,
    lastHeading?: String,
    children?:ReactNode
    gobackone?:boolean
}

const CommonLayout = (props:Props) => {
    const navigate = useNavigate();
    function goBack() {
        if (props.gobackone) {
            navigate(-1)
        } else {
            navigate("/dashboard/home", { replace: true });
        }
    }


    return  <div className="box-border border border-[1] border-[#C7C7C7] bg-white rounded-2xl p-[50px] max-sm:p-[20px]">
    <p className="font-medium text-[22px] leading-none flex flex-row  items-center">
        <span className="mr-2">
            <ArrowLeft onClick={() => goBack()} />
        </span>{" "}
       {props.heading}
    </p>
    <p className="pl-8 text-[#A5A5A5]">
       {props.subHeading}
    </p>
        <span className="ml-4 text-lg">{ props.lastHeading}</span>
       {props.children}
</div>
}

export default CommonLayout