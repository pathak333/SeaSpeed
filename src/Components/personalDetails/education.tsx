import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Trash2 } from "react-feather";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DATA, LOADING } from "../../constants/action.constant";
import { useGlobalState } from "../../contexts/global.context";
import {
  PersonalDetailContext,
  Personalstate,
} from "../../contexts/personalDetail.context";
import {
  AddEducationDetail,
  DeleteEducationDetail,
  GetEducationDetail,
  ProfileService,
} from "../../services/user.service";


import { EducationValidation } from "./validation";
import InputField from "../../uiComponents/inputField/inputField.component";
import { educationDetailAdmin, getCrewEducationDetail } from "../../services/admin.service";
import ApproveReject from "../../uiComponents/approve_reject";

const Education = () => {
  const [globalState, dispatch] = useGlobalState();
  //get query parameters 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');

  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  
  const [oldData, setOldData] = useState([]);
  const { setState } = useContext(PersonalDetailContext)!;
  let date = new Date();
  let todaydate = date.toISOString().substring(0, 10);

  async function fetchData() {
    dispatch({ type: LOADING, payload: true });

    const { data } = id === null ? await GetEducationDetail() : await getCrewEducationDetail(id);
    console.log("Education data = ", data);
    setOldData(data.data.educationList);
    dispatch({ type: LOADING, payload: false });

  }
  async function updateProfileData() {
    dispatch({ type: LOADING, payload: true });
    const { data } = await ProfileService();
    console.log("profile data", data);
    if (data) {
      sessionStorage.setItem("formState", data.data.formState)
      dispatch({ type: DATA, payload: data });
    }
 
    dispatch({ type: LOADING, payload: false });
  }

  useEffect(() => {
    setState(Personalstate.educationBackground);
    fetchData();
    if (id === null) updateProfileData();
    console.log("educationBackground component ");
  }, []);

  const [formEvent, updateEvent] = useReducer(
    (prev: any, next: any) => {
      const newEvent = { ...prev, ...next };
      return newEvent;
    },
    {
      institution: "",
      qualification: "",
      startDate: "",
      endDate: "",
      city: "",
      country: "",
      dataList: [],
      isFormChanged: false,
      error: { keys: "", values: "" },
    }
  );

  const errorReturn = (field: string) =>
    formEvent.error.keys === field ? formEvent.error.values : "";

  const listofData = formEvent.dataList.map((item: any, index: any) => (
    <tr key={index} className="bg-white border-b hover:bg-slate-100 cursor-pointer">
      <td className="px-6 py-4">{item.institution}</td>
      <td className="px-6 py-4">{item.qualification}</td>
      <td className="px-6 py-4">{item.startDate}</td>
      <td className="px-6 py-4">{item.endDate}</td>
      <td className="px-6 py-4">{item.city}</td>
      <td className="px-6 py-4">{item.country}</td>
      <td className="px-6 py-4">
        <Trash2
          onClick={() => {
            formEvent.dataList.splice(index, 1);
            updateEvent({ dataList: formEvent.dataList });
          }}
        />
      </td>
    </tr>
  ));

  const listOfOldData = oldData.map((item: any, index: any) => (
    <tr key={index} className="bg-white border-b hover:bg-slate-100 cursor-pointer">
      <td className="px-6 py-4">{item.institution}</td>
      <td className="px-6 py-4">{item.qualification}</td>
      <td className="px-6 py-4">{item.startDate}</td>
      <td className="px-6 py-4">{item.endDate}</td>
      <td className="px-6 py-4">{item.city}</td>
      <td className="px-6 py-4">{item.country}</td>
      <td className="px-6 py-4">
        <Trash2
          onClick={async () => {
            dispatch({ type: LOADING, payload: true });
            let newData = [...oldData];

            const { data } = await DeleteEducationDetail(newData[index]["_id"]);
            newData.splice(index, 1);
            setOldData(newData);
            console.log(data);
            console.log(data.message);
            console.log(data.success);
            if (data.success) {
              dispatch({ type: LOADING, payload: false });
              toast.done(data.message);
            } else {
              dispatch({ type: LOADING, payload: false });
            }
          }}
        />
      </td>
    </tr>
  ));

  const clearAllData = () => {
    updateEvent({
      institution: "",
      qualification: "",
      startDate: "",
      endDate: "",
      city: "",
      country: "",
      dataList: [],
      isFormChanged: false,
      error: { keys: "", values: "" },
    });
    if (formRef.current !== null) {
      formRef.current.reset();
    }
  };

  const handleSubmit = async (event: any) => {
    toast.dismiss();

    try {
      dispatch({ type: LOADING, payload: true });
      event.preventDefault();
      let formData;
      if (formEvent.dataList.length > 0) {
        for (let index = 0; index < formEvent.dataList.length; index++) {
          delete formEvent.dataList[index].isFormChanged;

        }
        formData = formEvent.dataList;
      } else {
        let data = { ...formEvent };
        delete data.dataList;
        delete data.error;
        delete data.isFormChanged;
        let isValid = await EducationValidation(data);
        if (isValid) {
          delete data.dataList;
          delete data.error;
          formData = [data];
        } else {
          throw Error(isValid);
        }
      }

      // formData = formEvent.dataList.length > 0 ? formEvent.dataList : ;
      if (formData.length > 0) {
        console.log(formData, formData.length);
        const { data } =id ? await educationDetailAdmin({ _id: id, dataList:formData }) : await AddEducationDetail(formData);
        console.log(data);
        if (data) {
          toast.done(data.message);
        if(!id) navigate("/dashboard/personaldetails/bankDetail");
          dispatch({ type: LOADING, payload: false });
          clearAllData()
        }
      } else {
        toast.error("Add minimum one education detail");
        dispatch({ type: LOADING, payload: false });
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e.message);
      dispatch({ type: LOADING, payload: false });
    }
  };


//   const adminEdit = async () => {
//     //educationDetailAdmin
//     let formData;
//       if (formEvent.dataList.length > 0) {
//         for (let index = 0; index < formEvent.dataList.length; index++) {
//           delete formEvent.dataList[index].isFormChanged;

//         }
//         formData = formEvent.dataList;
//       }
//     const { data } = await educationDetailAdmin({ _id: "", dataList:formData });
//     if(data){}


//  }



  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <h3 className="pl-4 font-semibold">Education background</h3>
        <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
          <InputField
            className="m-4"
            fieldName={"institution"}
            label={"Name of school/college/institute"}
            type={"text"}
            error={errorReturn("firstname")}
            onChange={(e) => updateEvent({ institution: e.target.value, isFormChanged: true })}
          />
          <InputField
            className="m-4"
            fieldName={"qualification"}
            label={"Qualification achieved"}
            type={"text"}
            // error={errorReturn("lastname")}
            onChange={(e) => updateEvent({ qualification: e.target.value, isFormChanged: true })}
          />
          <InputField
            className="m-4"
            fieldName={"startDate"}
            label={"Start date"}
            type={"date"}
            max={todaydate}
            // error={errorReturn("dob")}
            onChange={(e) => updateEvent({ startDate: e.target.value, isFormChanged: true, endDate: "" })}
          />
          <InputField
            className="m-4"
            fieldName={"endDate"}
            label={"End date"}
            type={"date"}
            min={formEvent.startDate}
            // error={errorReturn("dob")}
            onChange={(e) => updateEvent({ endDate: e.target.value, isFormChanged: true })}
          />
          <InputField
            className="m-4"
            fieldName={"city"}
            label={"City"}
            type={"text"}
            error={errorReturn("firstname")}
            onChange={(e) => updateEvent({ city: e.target.value, isFormChanged: true })}
          />
          <InputField
            className="m-4"
            fieldName={"country"}
            label={"Country"}
            type={"text"}
            // error={errorReturn("lastname")}
            onChange={(e) => updateEvent({ country: e.target.value, isFormChanged: true })}
          />
        </div>
        {formEvent.dataList.length > 0 ? (
          <div className="relative overflow-x-auto">
            <table className="table-auto w-full text-sm text-left text-grey-500">
              <thead className="text-xs text-grey-700 uppercase ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Institution
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qualification
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    End Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    City
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Country
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{listofData}</tbody>
            </table>
          </div>
        ) : (
          <div></div>
        )}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={async () => {
              const { dataList, error, ...other } = formEvent;
              console.log(other);

              try {
                var data = { ...formEvent };
                delete data.dataList;
                delete data.error;
                delete data.isFormChanged;
                let isValid = await EducationValidation(data);
                console.log(isValid);
                if (isValid) {
                  updateEvent({
                    dataList: [...dataList, ...[other]],
                    institution: "",
                    qualification: "",
                    startDate: "",
                    endDate: "",
                    city: "",
                    country: "",
                    error: { keys: "", values: "" },
                  });

                  if (formRef.current !== null) {
                    formRef.current.reset();
                  }
                }
              } catch (error: any) {
                if (error.name === "ValidationError") {
                  for (let errorDetail of error.details) {
                    updateEvent({
                      error: {
                        key: errorDetail.context.key,
                        values: errorDetail.message,
                      },
                    });
                    console.log(errorDetail.context.key + "======");
                    toast.error(errorDetail.message);
                  }
                } else if (error.name === "AxiosError")
                  toast.error(error.response.data.message);
              } finally {
                dispatch({ type: LOADING, payload: false });
              }
            }}
            className=" text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-14 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            Add more
          </button>
        </div>
        {oldData.length > 0 ? (
          <div className="relative overflow-x-auto">
            <table className="table-auto w-full text-sm text-left text-grey-500">
              <thead className="text-xs text-grey-700 uppercase ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Institution
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qualification
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    End Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    City
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Country
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{listOfOldData}</tbody>
            </table>
          </div>
        ) : (
          <div></div>
        )}
<div></div>
        {id === null && <div>
          {formEvent.isFormChanged ? <button
            type="submit"
            //onClick={() => navigate("/dashboard/personaldetails/bankDetail")}
            className="ml-4 mt-3 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save & next
          </button> :
            <button
              type="button"
              className="ml-4 mt-3 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl max-sm:text-base px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                clearAllData();
                updateEvent({ dataList: [] });
                navigate("/dashboard/personaldetails/bankDetail");
              }}
            >
              Skip and Next
            </button>}
          <button
            type="button"
            className="ml-8 text-xl text-blue-700"
            onClick={() => {
              clearAllData();
              updateEvent({ dataList: [] });
            }}
          >
            Clear all
          </button>
          <button
            className="ml-8 text-xl text-gray-500"
            onClick={() => navigate("/dashboard/personaldetails/contactDetail")}
          >
            Previous
          </button>
        </div>}
{ globalState.data.data.permission.includes("application") && 
        <div>
            {id !== null && formEvent.isFormChanged && <button className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleSubmit} >Save</button>}

        {id !== null && !formEvent.isFormChanged && <div id="approver">
          <ApproveReject name="education" navigation={`/adminDashboard/personaldetails/bankDetail/?id=${id}`} locationStateData={{}}  doc_id="Education" user_id={id} />
        </div>}
      </div> }
      { (globalState.data.data.permission.includes("admin") || ("vessel")) && id !== null &&
        <div>
           <button
            type="button"
            className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl max-sm:text-base px-16 py-2.5 mr-2 ml-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              // clearAllData();
              navigate(`/adminDashboard/personaldetails/bankDetail/?id=${id}`);
            }}
          >
           Next
          </button>
      </div> }

      </form>
    </div> 
  );
};

export default Education;
