import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NoPropComponent } from "../../types/noProps.type";

const SetProfilePic: NoPropComponent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);

    return () => {};
  }, []);

  return (
    <>
      <h1>Profile Pic</h1>
      <button
        className="w-full bg-activeIconColor font-semibold text-base rounded-md text-white p-3"
        onClick={() => navigate("/dashboard/home", { replace: true })}
      >
        Upload profile photo
      </button>
    </>
  );
};

export default SetProfilePic;
