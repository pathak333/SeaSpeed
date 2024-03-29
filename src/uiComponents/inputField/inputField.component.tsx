import React, { useState } from "react";
import "../../App.css";

interface Props {
  className?: string;
  inputClass?: string;
  fieldName: string;
  label: string;
  type: string;
  //placeholder: string;
  error?: string;
  icon?: any;
  disabled?: boolean;
  value?: string;
  min?: string;
  max?: string;
  id?: string;
  isnotUpperCase?: boolean;

  onIconClick?: React.MouseEventHandler<HTMLButtonElement>;
  onChange(event: React.ChangeEvent<HTMLInputElement>): any;
}

function InputField({isnotUpperCase = false,...props}: Props) {
  const [, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => setIsFocused(true);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Convert the input value to uppercase only if it is a string
    const updatedValue = event.target.value && typeof event.target.value === 'string'
      ? event.target.value.toUpperCase()
      : event.target.value;

    // Call the original onChange prop with the updated value
    
    if (props.onChange && !isnotUpperCase) {
      props.onChange({ ...event, target: { ...event.target, value: updatedValue } });
    } else {
      props.onChange(event)
    }
  };


  return (
    <div className={`${props.className}`}>
      <div
        className={`
       
           f-outline   pr-0 relative border border-inputBorderColor rounded-lg focus-within:border-indigo-500`}
      >
        <input
          type={props.type}
          id={props.id ?? props.fieldName}
          name={props.fieldName}
          className={`block pl-2 pr-[3%] max-sm:pr-0  w-full h-10 text-lg appearance-none focus:outline-none bg-transparent ${props.inputClass}`}
          placeholder=" "
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={props.disabled}
          onChange={handleChange}
          value={props.value}
          min={props.min}
          max={props.max}
          autoComplete="off"
          autoCorrect="off"
          
        />
       {props.icon && <button
          type="button"
          onClick={props.onIconClick}
          className="inputIcon items-center top-0 bottom-0 absolute right-1  mr-2 max-sm:hidden"
        >
          {props.icon}
        </button>}
        <label
          htmlFor={props.id ?? props.fieldName}
          className="absolute block left-0 appearance-none cursor-text ml-5 top-0 bottom-0 max-sm:top-1 max-sm:text-sm    text-gray-400 bg-white rounded-lg px-1 mt-2  duration-300 origin-0 "
        >
          {props.label}
        </label>
      </div>
      {props.error !== "" && props.error !== undefined ? (
        <p
          id="outlined_error_help"
          className="mt-1 text-start text-xs text-red-600 dark:text-red-400"
        >
          {props.error}.
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default InputField;

// ${
//   props.error !== undefined
//     ? "focus-within:border-red-500"
//     :"focus-within:border-indigo-500"
//  }