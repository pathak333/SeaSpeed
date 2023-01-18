import { AccountCircle, VisibilityOff } from "@material-ui/icons";
import { useReducer, useState } from "react";
import { LOADING } from "../../constants/action.constant";
import { useGlobalState } from "../../contexts/global.context";
import { NoPropComponent } from "../../types/noProps.type";
import InputField from "../inputField/inputField.component";
import { validationAuth } from "./validation";
import { toast } from "react-toastify";

const ResetPassword: NoPropComponent = () => {
  const [, dispatch] = useGlobalState();
  const [showPassword, setShowPassword] = useState(false);

  const [formEvent, updateEvent] = useReducer(
    (prev: any, next: any) => {
      const newEvent = { ...prev, ...next };
      console.log(newEvent);

      return newEvent;
    },
    {
      userId: "",
      password: "",
      confirmPassword: "",
      error: { keys: "", values: "" },
    }
  );

  const handalerSubmit = async (event: any) => {
    toast.dismiss();
    try {
      dispatch({ type: LOADING, payload: true });
      event.preventDefault();
      let formData = { ...formEvent };
      delete formData.error;
      let isValid = await validationAuth({ ...formData });
      if (isValid) {
        updateEvent({
          error: {
            keys: "",
            values: "",
          },
        });
        console.log(formData);
      }
    } catch (error: any) {
      console.log(error.details);
      if (error.name === "ValidationError") {
        for (let errorDetail of error.details) {
          updateEvent({
            error: {
              keys: errorDetail.context.key,
              values: errorDetail.message,
            },
          });

          console.log(errorDetail.context.key + "======");
          toast.error(errorDetail.message);

          //return setErrorState(validationErrors);
        }
        console.log("error");
      }
      if (error.response && [400].includes(error.response.status))
        return toast.error(error.response.data.message);
      console.log(error);
    } finally {
      dispatch({ type: LOADING, payload: false });
    }
  };

  const errorReturn = (field: string) =>
    formEvent.error.keys === field ? formEvent.error.values : "";

  return (
    <form onSubmit={handalerSubmit}>
      <div className="max-sm:w-80 max-md:w-96 max-lg:w-96 lg:w-96 ">
        <InputField
          fieldName="userId"
          label="User ID"
          className="mb-4"
          type="text"
          error={errorReturn("userId")}
          icon={<AccountCircle className="text-gray-300" />}
          onChange={(e) => updateEvent({ userId: e.target.value })}
        />
        <InputField
          type={showPassword ? "text" : "password"}
          fieldName="password"
          error={errorReturn("password")}
          label="Create new password"
          className="mb-4"
          icon={
            <VisibilityOff
              className={`${showPassword ? "text-blue-400" : "text-gray-300"}`}
            />
          }
          onIconClick={() => setShowPassword(!showPassword)}
          onChange={(e) => updateEvent({ password: e.target.value })}
        />
        <InputField
          type="password"
          fieldName="confirmPassword"
          error={errorReturn("confirmPassword")}
          label="Confirm password"
          // disabled={event.password && event.error === "" ? false : true}
          icon={<VisibilityOff className="text-gray-300 " />}
          onChange={(e) => updateEvent({ confirmPassword: e.target.value })}
        />
      </div>
      <div className="block mt-2  w-full ">
        <p className="float-right  font-semibold text-base text-IbColor pl-1 ">
          Contact admin
        </p>
        <p className="float-right text-sm align-text-bottom">
          Issue with login?
        </p>
      </div>
      <button
        className="w-full h-12 font-bold text-base mt-5 bg-IbColor text-white rounded-lg"
        type="submit"
      >
        Next
      </button>
    </form>
  );
};

export default ResetPassword;
