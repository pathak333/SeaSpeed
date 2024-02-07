import React, { useReducer, useState } from "react";
import { NoPropComponent } from "../../types/noProps.type";
import InputField from "../../uiComponents/inputField/inputField.component";
import { AccountCircle, VisibilityOff } from "@mui/icons-material";
import { toast } from "react-toastify";
import { LOADING, LOGIN } from "../../constants/action.constant";
import { useGlobalState } from "../../contexts/global.context";
import { validationAuth } from "./validation";
import { LoginService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const LoginForm: NoPropComponent = () => {
  const navigate = useNavigate();
  const [, dispatch] = useGlobalState();
  const [showPassword, setShowPassword] = useState(false);

  const [formEvent, updateEvent] = useReducer(
    (prev: any, next: any) => {
      const newEvent = { ...prev, ...next };
      console.log(newEvent);

      return newEvent;
    },
    {
      email: "",
      password: "",
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
        const { data } = await LoginService(formData);
        console.log(data);
        if (data.data.isNewUser) {
          navigate("/auth/resetPassword", {
            state: {
              data,
              password: formData.password,
            },
          });
        } else {
          dispatch({ type: LOGIN, payload: data.data.refreshToken,role: data.data.role,data:data.data });
          sessionStorage.setItem("token", data.data.refreshToken);
          sessionStorage.setItem("role", data.data.role);
          if (data.data.role === "admin") {
            navigate("/adminDashboard/home",{ state: {
              data:data.data,
              
            },})
          } else {
            
            navigate("/dashboard/home", {
              state: {
                data,
                password: formData.password,
              },
            });
          }
        }

        updateEvent({
          error: {
            keys: "",
            values: "",
          },
        });
        console.log(formData);
      }
    } catch (error: any) {
      console.log("70", error.details);
      if (error.name === "ValidationError") {
        for (let errorDetail of error.details) {
          toast.error(errorDetail.message);
          updateEvent({
            error: {
              keys: errorDetail.context.key,
              values: errorDetail.message,
            },
          });

          console.log(errorDetail.context.key + "======");
         

          //return setErrorState(validationErrors);
        }
        console.log("error");
      } else if (error.name === "AxiosError")
        toast.error(error.response.data.message);
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
          type="text"
          fieldName="email"
          label="Enter Email"
          className="mb-4"
          error={errorReturn("email")}
          icon={<AccountCircle className="text-gray-300" />}
          onChange={(e) => updateEvent({ email: e.target.value })}
        />
        <InputField
          type={showPassword ? "text" : "password"}
          fieldName="password"
          label="Enter password"
          error={errorReturn("password")}
          icon={
            <VisibilityOff
              className={`${showPassword ? "text-blue-400" : "text-gray-300"}`}
            />
          }
          onIconClick={() => setShowPassword(!showPassword)}
          onChange={(e) => updateEvent({ password: e.target.value })}
          isnotUpperCase={true}
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

export default LoginForm;
