import { ArrowBack, } from "@mui/icons-material";
import { ReactNode } from "react";



type ModalBoxProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;//JSX.Element;
    label: string;
    className?: string;
  };
  
  const ModalBox = (props:ModalBoxProps) => {
    return (
      <div >
        {props.isOpen && (
          <div className="fixed z-50 inset-0 overflow-y-auto bg-slate-200 bg-opacity-60">
                    <div className="flex items-center justify-center min-h-screen">
                        
                        <div className={`bg-white p-6  rounded-lg border border-IbColor ${props.className}`}>
                           
                            
                {props.children}
               
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  

  export default ModalBox