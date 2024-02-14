
import "./css/custom_button.css"

type DialogBoxProps = {
  isOpen: boolean;
  onClose: () => void;
  component: JSX.Element;
  label: string;
  componentStyle?: string;
};

const DialogBox = (props: DialogBoxProps) => {
  return (
    <>
      {props.isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto bg-slate-200 bg-opacity-60">
          <div className="flex items-center justify-center min-h-screen">
            <div className={`bg-white p-6 rounded-lg border shadow ${props.componentStyle}`}>
              <h2 className="text-xl mb-4 font-semibold">{props.label}</h2>
              {props.component}
              <button
                className="mt-4 border border-red-600 hover:bg-red-700 hover:text-white text-red-600 font-bold py-2 px-4 rounded"
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