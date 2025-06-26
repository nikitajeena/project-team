import { FormEvent, useState, ChangeEvent, FocusEvent } from "react";
import classes from "./textinput.module.scss";

interface TextInputProps {
  id: string;
  type?: string;
  label: string;
  error?: string;
  value?: string;
  hideLabel?: boolean;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocusHandler?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlurHandler?: (e: FocusEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  type = "text",
  label,
  value,
  hideLabel = false,
  onChangeHandler,
onBlurHandler,
onFocusHandler,
error="",

}) => {
  const [activeStyle, setActiveStyle] = useState({});
  function labelActive(active){
    active && !error ? setActiveStyle({  color: "#001a38"}) : setActiveStyle({})
  }
const handleOnFocus = (event) => {
labelActive(true)
if(onFocusHandler) onFocusHandler(event)
}

const HandleOnBlur = (event) => {
labelActive(false)
if(onBlurHandler) onBlurHandler(event)

}
  const inputErrorStyle = error
    ? { borderBottomColor: "rgb(244, 67, 54)" }
    : undefined;

  const errorStyle = error ? { color: "rgb(244, 67, 54)" } : null;
  return (
    <div className={classes["text-container"]}>
      {!hideLabel && <label htmlFor={id} style={{...activeStyle, ...errorStyle}}>{label}</label>}
      <input
        id={id}
        min={0}
        type={type}
        placeholder={hideLabel ? label : ""}
        value={value}
        onChange={onChangeHandler}
        onFocus={handleOnFocus}
        onBlur={HandleOnBlur}
        style={inputErrorStyle}
         autoComplete="off" 
      />
    </div>
  );
};

export default TextInput;
