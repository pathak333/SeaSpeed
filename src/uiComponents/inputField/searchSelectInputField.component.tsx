import React, { ReactNode, useState } from 'react';

import CreatableSelect from 'react-select/creatable';

interface Option {
  readonly label: string;
  readonly value: string;
}


interface Props{
  className: string;
  options: Array<Option>;
  onChange:(value:any) => void;
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
      onCreateOption={(v:string)=>props.onCreateOption(v)}
      options={props.options}
      value={props.value}
    />
  );
};

export  {SearchSelect,createOption};