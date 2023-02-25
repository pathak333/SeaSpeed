import { useEffect, useReducer, useRef, useState } from "react";
import { Trash2 } from "react-feather";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../contexts/global.context";
import InputField from "../inputField/inputField.component";

const Education = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [, dispatch] = useGlobalState();

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

  // useEffect(() => {}, [formEvent.dataList]);

  return (
    <div>
      <form ref={formRef}>
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
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              const { dataList, error, ...other } = formEvent;
              console.log(other);
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
            }}
            className=" text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 font-bold px-14 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            Add more
          </button>
        </div>
        <button
          type="submit"
          className="text-white font-semibold bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-xl px-16 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
      {formEvent.dataList.length > 0 ? (
        <div className="relative overflow-x-auto">
          <table className="table-auto w-full text-sm text-left text-grey-500">
            <thead className="text-xs text-grey-700 uppercase ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Institution
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Qualification
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
    </div>
  );
};

export default Education;
