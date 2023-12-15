import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NoPropComponent } from "../../types/noProps.type";
import { uploadProfile } from "../../services/user.service";
import { uploadProfileadmin } from "../../services/admin.service";

const SetProfilePic: NoPropComponent = () => {
  const location = useLocation();

  const uploadRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<any>();
  const [previewImage, setPreviewImage] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
console.log(location.state);

    // window.history.pushState(null, "", window.location.pathname);

    return () => {};
  }, []);


  const handleButtonClick = () => {
    uploadRef.current!.click();
    console.log(uploadRef)
  
   
  };
  const onchange = (e:any) => {
    const file = e.target.files[0];

    if (file) {
      // Read the selected image file as a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(file);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
 }

  async function uploadProfiledata() {
    const formData = new FormData();
    formData.append('file', selectedImage);
    // formData.append('id',location.state.data.data._id)
    const { data } =  location.state.data.data.role ==='admin' ? await uploadProfileadmin(formData,location.state.data.data.accessToken) :  await uploadProfile(formData,location.state.data.data.accessToken)
    if (data) {
      window.history.pushState(null, "", window.location.pathname);
       navigate("/auth/login", { replace: true })
    }

  }

  return (
    <>
      {/* <h1>{selectedImage ? selectedImage.name : 'Profile Pic'}</h1> */}
      {previewImage && (
        <div className="flex justify-center">
         
          <img src={previewImage} alt="Preview" className="w-28 h-28 m-3" />
        </div>
      )}
      <button
        className="w-full bg-activeIconColor font-semibold text-base rounded-md text-white p-3"
        onClick={handleButtonClick }
      >
         <input ref={uploadRef} className="hidden" type="file" name="uploadPdf" accept="image/*" id="" onChange={onchange}  />
        Upload profile photo
      </button>
      <button
        className="w-full mt-3 bg-activeIconColor font-semibold text-base rounded-md text-white p-3"
        onClick={ uploadProfiledata}
      >Save</button>
    </>
  );
};

export default SetProfilePic;
