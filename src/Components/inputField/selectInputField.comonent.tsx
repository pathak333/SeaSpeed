import { ChevronDown } from "react-feather";

interface Props {
  className?: string;
  fieldName: string;
  label: string;
  type: string;
  //placeholder: string;
  error?: string;
  disabled?: boolean;
  option: Array<string>;
  value?: string;
  onChange(event: React.ChangeEvent<HTMLSelectElement>): any;
}

const SelectInput = (props: Props) => {
  return (
    <div className={`${props.className}`}>
      <div
        className={`flex
       
       f-outline h-fit   pr-0 relative border border-inputBorderColor rounded-lg focus-within:border-indigo-500`}
      >
        <select
          value={props.value}
          id="countries"
          onChange={props.onChange}
          className="block pl-2 pr-12 w-full h-10 text-lg appearance-none focus:outline-none bg-transparent"
        >
          {props.option.map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </select>
        <label
          htmlFor="countries"
          className="absolute block left-0 appearance-none cursor-text ml-5 top-0 bottom-0 max-sm:top-1 max-sm:text-sm pl-0   text-gray-400 bg-white mt-2  duration-300 origin-0 "
        >
          {props.label}
        </label>
        <ChevronDown className="self-center mr-2 " />
      </div>
    </div>
  );
};

export default SelectInput;
