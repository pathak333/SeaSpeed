import { ChangeEvent } from "react";
import DialogBox from "../../../uiComponents/dialogBox";
import InputField from "../../../uiComponents/inputField/inputField.component";
import { IssuesformattedDate } from "../../../constants/values.constants";
import { AirplaneTicket, Save } from "@mui/icons-material";

interface Props {
    isOpen: boolean,
    onClose: () => void,
    label: string,
    userData: any
}

export default function CreateContract({ isOpen, label, onClose, userData }: Props) {
    return <>
        <DialogBox label={label} isOpen={isOpen} onClose={onClose} componentStyle="w-[70%]" component={
            <>
                <div className="relative">
                    {/* <div className="w-24 h-24 bg-white overflow-hidden rounded-full absolute left-2/4 top-[-25%]">

                    <img src={userData.avatar} alt="" className="relative w-20 h-20 rounded-full " />
                </div> */}
                    <div className="w-20 h-20 p-1 bg-white overflow-hidden rounded-full absolute left-2/4 top-[-25%] transform -translate-x-2/4">
                        <img src={userData.avatar} alt="" className="relative  rounded-full object-cover" />
                    </div>
                    <div className="absolute top-[-50px] right-0">
                        <p className="text-xl  font-semibold leading-none">{userData.firstname} {userData.lastname}</p>
                        <p className="text-sm text-textGrey ">{userData.rank.label}</p>
                    </div>
                    <div className="grid grid-flow-row grid-cols-2">
                        <InputField
                            className="m-2 "
                            inputClass=" datePlaceholder"
                            fieldName={"dateOfIssue"}
                            label={"Start Of Contract"}
                            type={"date"}
                            max={IssuesformattedDate}
                            //   error={errorReturn("dateOfIssue")}
                            onChange={(e) => { }}
                            value={""}
                        />
                        <InputField
                            className="m-2 "
                            fieldName={"dateOfIssue"}
                            label={"Embarkation"}
                            type={"date"}
                            max={IssuesformattedDate}
                            //   error={errorReturn("dateOfIssue")}
                            onChange={(e) => { }}
                            value={""}
                        />
                    </div>

                    <InputField
                        className="m-2"
                        fieldName={"passportNumber"}
                        label={"Embarkation Port"}
                        type={"text"}

                        //error={errorReturn("passportNumber")}
                        onChange={(e) => { }}
                        value={""}
                    />
                    <div className="grid grid-flow-row grid-cols-2">
                        <InputField
                            className="m-2"
                            fieldName={"dateOfIssue"}
                            label={"Disembarkation"}
                            type={"date"}
                            max={IssuesformattedDate}
                            //   error={errorReturn("dateOfIssue")}
                            onChange={(e) => { }}
                            value={""}
                        />
                        <InputField
                            className="m-2"
                            fieldName={"dateOfIssue"}
                            label={"End Of Contract(Arrival of home)"}
                            type={"date"}
                            max={IssuesformattedDate}
                            //   error={errorReturn("dateOfIssue")}
                            onChange={(e) => { }}
                            value={""}
                        />
                    </div>
                    <InputField
                        className="m-2"
                        fieldName={"passportNumber"}
                        label={"Disembarkation Port"}
                        type={"text"}

                        //error={errorReturn("passportNumber")}
                        onChange={(e) => { }}
                        value={""}
                    />
                    <div className="grid grid-flow-row grid-cols-2">
                        <InputField
                            className="m-2"
                            fieldName={"dateOfIssue"}
                            label={"EOC Date"}
                            type={"date"}
                            max={IssuesformattedDate}
                            //   error={errorReturn("dateOfIssue")}
                            onChange={(e) => { }}
                            value={""}
                        />
                        <InputField
                            className="m-2"
                            fieldName={"dateOfIssue"}
                            label={"Sign Off Request"}
                            type={"date"}
                            max={IssuesformattedDate}
                            //   error={errorReturn("dateOfIssue")}
                            onChange={(e) => { }}
                            value={""}
                        />
                    </div>

                    <InputField
                        className="m-2"
                        fieldName={"passportNumber"}
                        label={"Sign Off Reason"}
                        type={"text"}

                        //error={errorReturn("passportNumber")}
                        onChange={(e) => { }}
                        value={""}
                    />


                    <InputField
                        className="m-2 mt-5 "
                        fieldName={"dateOfIssue"}
                        label={"Next available from"}
                        type={"date"}
                        max={IssuesformattedDate}
                        //   error={errorReturn("dateOfIssue")}
                        onChange={(e) => { }}
                        value={""}
                    />
                </div>
                    <button className=" border border-[#0075FF] text-IbColor p-2 rounded-lg mx-2 hover:text-white hover:bg-[#0075FF] leading-none"><AirplaneTicket /> Send Tickets & Visa</button>
                    <button className=" border border-[#0075FF] text-IbColor p-2 rounded-lg mx-2 hover:text-white hover:bg-[#0075FF] leading-none"><Save /> Save</button>
            </>} />
    </>
}