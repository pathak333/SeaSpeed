
import "./css/custom_button.css"

type DialogBoxProps = {
  isOpen: boolean;
  onClose: () => void;
  component: JSX.Element;
  label: string;
};

const DialogBox = (props: DialogBoxProps) => {
  return (
    <>
      {props.isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto bg-slate-200 bg-opacity-60">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg border  shadow">
              <h2 className="text-xl mb-4 font-semibold">{props.label}</h2>
              {props.component}
              <button
              
                className="mt-4 border border-red-600 alexroumi before:bg-red-500"
                onClick={props.onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default DialogBox