import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LOADING } from "../../constants/action.constant";
import { useGlobalState } from "../../contexts/global.context";
import {
  PersonalDetailContext,
  Personalstate,
} from "../../contexts/personalDetail.context";
import {
  AddEducationDetail,
  GetEducationDetail,
} from "../../services/user.service";
import InputField from "../inputField/inputField.component";
import EducationDetailList from "./educationDetailList";
import { EducationValidation } from "./validation";

const Education = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [, dispatch] = useGlobalState();
  const [oldData, setOldData] = useState([]);
  const { setState } = useContext(PersonalDetailContext)!;

  async function fetchData() {
    const { data } = await GetEducationDetail();
    console.log("Education data = ", data);
    setOldData(data.data.educationList);
  }

  useEffect(() => {
    setState(Personalstate.educationBackground);
    fetchData();
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
      error: { keys: "", values: "" },
    }
  );

  const errorReturn = (field: string) =>
    formEvent.error.keys === field ? formEvent.error.values : "";

  const listofData = formEvent.dataList.map((item: any, index: any) => (
    <tr key={index} className="bg-white border-b">
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

  const listOfData = oldData.map((item: any, index: any) => (
    <tr key={index} className="bg-white border-b">
      <td className="px-6 py-4">{item.institution}</td>
      <td className="px-6 py-4">{item.qualification}</td>
      <td className="px-6 py-4">{item.startDate}</td>
      <td className="px-6 py-4">{item.endDate}</td>
      <td className="px-6 py-4">{item.city}</td>
      <td className="px-6 py-4">{item.country}</td>
      <td className="px-6 py-4">
        <Trash2
          onClick={() => {
            let newData = [...oldData];
            newData.splice(index, 1);
            setOldData(newData);
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
        formData = formEvent.dataList;
      } else if (formEvent.institution) {
        let data = { ...formEvent };
        delete data.dataList;
        delete data.error;
        formData = [data];
      }

      // formData = formEvent.dataList.length > 0 ? formEvent.dataList : ;
      if (formData.length > 0) {
        console.log(formData, formData.length);
        const { data } = await AddEducationDetail(formData);
        console.log(data);
        if (data) {
          navigate("/dashboard/personaldetails/bankDetail");
          dispatch({ type: LOADING, payload: false });
          toast.done(data.message);
        }
      } else {
        toast.error("Add minimum one education detail");
        dispatch({ type: LOADING, payload: false });
      }
    } catch (e: any) {
      toast.error(e.message);
      dispatch({ type: LOADING, payload: false });
    }
  };

  return (
    <div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <h3 className="pl-4 font-semibold">Education background</h3>
        <div className="grid grid-flow-row max-sm:grid-flow-row grid-cols-2 max-sm:grid-cols-1 ">
          <InputField
            className="m-4"
            fieldName={"institution"}
            label={"Name of school/ college attended/ institute"}
            type={"text"}
            error={errorReturn("firstname")}
            onChange={(e) => updateEvent({ institution: e.target.value })}
          />
          <InputField
            className="m-4"
            fieldName={"qualification"}
            label={"Qualification achieved"}
            type={"text"}
            // error={errorReturn("lastname")}
            onChange={(e) => updateEvent({ qualification: e.target.value })}
          />
          <InputField
            className="m-4"
            fieldName={"startDate"}
            label={"Start date"}
            type={"date"}
            // error={errorReturn("dob")}
            onChange={(e) => updateEvent({ startDate: e.target.value })}
          />
          <InputField
            className="m-4"
            fieldName={"endDate"}
            label={"End date"}
            type={"date"}
            // error={errorReturn("dob")}
            onChange={(e) => updateEvent({ endDate: e.target.value })}
          />
          <InputField
            className="m-4"
            fieldName={"city"}
            label={"City"}
            type={"text"}
            error={errorReturn("firstname")}
            onChange={(e) => updateEvent({ city: e.target.value })}
          />
          <InputField
            className="m-4"
            fieldName={"country"}
            label={"Country"}
            type={"text"}
            // error={errorReturn("lastname")}
            onChange={(e) => updateEvent({ country: e.target.value })}
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
            <tbody>{listOfData}</tbody>
          </table>
        </div>
        <button
          type="submit"
          //onClick={() => navigate("/dashboard/personaldetails/bankDetail")}
          className="ml-4 text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Save & next
        </button>
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
      </form>
    </div>
  );
};

export default Education;
