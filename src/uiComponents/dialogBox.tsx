
type DialogBoxProps = {
    isOpen: boolean;
    onClose: () => void;
    component: JSX.Element;
    label: string;
  };
  
  const DialogBox = (props:DialogBoxProps) => {
    return (
      <div >
        {props.isOpen && (
          <div className="fixed z-50 inset-0 overflow-y-auto bg-slate-200 bg-opacity-60">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white p-6 rounded-lg border border-IbColor">
                            <h2 className="text-xl mb-4">{props.label }</h2>
                {props.component}
                <button
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={props.onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  

  export default DialogBox