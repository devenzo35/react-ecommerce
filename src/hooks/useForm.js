import { useState } from "react";

export const useForm = (initialState = {}) => {
  
  
  const [formValue, setValue] = useState(initialState);
  
  const reset=()=>{
    
    setValue(initialState)
    
  };
  
  const handleOnChange = ({ target }) => {
    setValue({
      ...formValue,
      [target.name]: target.value,
    });
  };

  return [formValue, handleOnChange,reset];
};