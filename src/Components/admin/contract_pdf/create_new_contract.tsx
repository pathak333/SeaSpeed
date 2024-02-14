import { ChangeEvent } from "react";
import DialogBox from "../../../uiComponents/dialogBox";
import InputField from "../../../uiComponents/inputField/inputField.component";
import { IssuesformattedDate } from "../../../constants/values.constants";

interface Props {
    isOpen: boolean,
    onClose: () => void,
    label: string
}

export default function CreateContract({ isOpen, label, onClose }: Props) {
    return <>
        <DialogBox label={label} isOpen={isOpen} onClose={onClose} componentStyle="w-[70%]" component={
            <div className="">
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
            </div>} />
    </>
}