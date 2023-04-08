import { useReducer } from "react";
import InputField from "../inputField/inputField.component";
import { Upload } from "react-feather";
import { useNavigate } from "react-router-dom";


const CertificateOfCompetency = () => {
    const navigate = useNavigate()
    const [formEvent, updateEvent] = useReducer((prev: any, next: any) => {
        let newEvent = { ...prev, ...next };
        return newEvent;
    }, {
        grade: "",
        licenseNumber: "",
        dateOfIssue: "",
        dateOfExpiry: "",
        placeOfIssue: "",
        issuingAuthorityCountry: "",
        isFormChanged: false,
        error: { keys: "", values: "" },
    })

    const errorReturn = (field: string) =>
        formEvent.error.keys === field ? formEvent.error.values : "";



    return <form>
        <h3 className="pl-4 font-semibold">Certificate of competency</h3>
        <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
            <InputField
                className="m-4"
                fieldName={"grade"}
                label={"Grade (License)"}
                type={"text"}
                error={errorReturn("grade")}
                onChange={(e) => updateEvent({ grade: e.target.value, isFormChanged: true })}
                value={formEvent.grade}
            />
            <InputField
                className="m-4"
                fieldName={"licenseNumber"}
                label={"License number"}
                type={"text"}
                error={errorReturn("licenseNumber")}
                onChange={(e) => updateEvent({ licenseNumber: e.target.value, isFormChanged: true })}
                value={formEvent.licenseNumber}
            />
            <InputField
                className="m-4"
                fieldName={"placeOfIssue"}
                label={"Place of issue"}
                type={"text"}
                error={errorReturn("placeOfIssue")}
                onChange={(e) => updateEvent({ placeOfIssue: e.target.value })}
                value={formEvent.placeOfIssue}
            />
            <InputField
                className="m-4"
                fieldName={"dateOfIssue"}
                label={"Date of issue"}
                type={"date"}
                error={errorReturn("dateOfIssue")}
                onChange={(e) => updateEvent({ dateOfIssue: e.target.value })}
                value={formEvent.dateOfIssue}
            />
            <InputField
                className="m-4"
                fieldName={"dateOfExpiry"}
                label={"Date of expiry"}
                type={"date"}
                error={errorReturn("dateOfExpiry")}
                onChange={(e) => updateEvent({ dateOfExpiry: e.target.value })}
                value={formEvent.dateOfExpiry}
            />
            <InputField
                className="m-4"
                fieldName={"issuingAuthorityCountry"}
                label={"Issuing Authority country"}
                type={"text"}
                error={errorReturn("issuingAuthorityCountry")}
                onChange={(e) => updateEvent({ issuingAuthorityCountry: e.target.value, isFormChanged: true })}
                value={formEvent.issuingAuthorityCountry}
            />
            <div className="flex flex-row m-3 items-center justify-center p-3 rounded-2xl border-2 border-[#C7C7C7] bg-[#0075FF1A]">
                <Upload className="text-IbColor" />
                <p className="text-IbColor">Upload Passport PDF</p>
            </div>
            <p className="m-3 text-textGrey">(Nationality candidate can complete course from india for another county)</p>

        </div>
        <button
            className="ml-8 text-xl text-gray-500"
            onClick={() => navigate("/dashboard/traveldetails")}
        >
            Previous
        </button>
        {formEvent.isFormChanged ? <button
            type="submit"
            className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
            Save & next
        </button> :
            <button
                type="button"
                className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {

                    navigate("/dashboard/certificates/flagEndorsement");
                }}
            >
                Skip and Next
            </button>}
        <button
            type="button"
            className="ml-8 text-xl text-blue-700"
            onClick={() => {
                //clearAllData();

            }}
        >
            Clear all
        </button>
    </form>
}

export default CertificateOfCompetency;