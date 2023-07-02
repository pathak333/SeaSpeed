

import CreatableSelect from 'react-select/creatable';

import { Option } from '../../types/propes.types';


interface Props{
  className: string;
  options: Array<Option>;
  onChange: (value: any) => void;
  onInputChange: any;
  onCreateOption: any;
  value: Option;
  isDisabled: boolean;
  isLoading: boolean;
  label: string;
}


const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
}) as Option;

// const defaultOptions = [
//   createOption('One'),
//   createOption('Two'),
//   createOption('Three'),
// ];

const SearchSelect = (props:Props) => {



  // const [isLoading, setIsLoading] = useState(false);
  // const [options, setOptions] = useState(defaultOptions);
  // const [value, setValue] = useState<Option | null>();

  // const handleCreate = (inputValue: string) => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     const newOption = createOption(inputValue);
  //     setIsLoading(false);
  //     setOptions((prev) => [...prev, newOption]);
  //     setValue(newOption);
  //   }, 1000);
  // };

  return (
    <CreatableSelect className={props.className}
      
      createOptionPosition='first'
      placeholder={props.label}
      isClearable
      isDisabled={props.isDisabled}
      isLoading={props.isLoading}
      onChange={props.onChange}
      onInputChange={props.onInputChange}
      onCreateOption={props.onCreateOption}
      options={props.options}
      value={props.value}
    />
  );
};

export  {SearchSelect,createOption};