import { CSSProperties } from "react";
import { button } from "../../constants/constants";
import classes from "./button.module.scss";
import * as React from "react";
interface ButtonProps {
  buttonType?: string;
  style?: CSSProperties | any;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClickHandler?: () => void;
  label?: React.ReactNode | string;
  gutter?: string;
}

const Button = ({
  buttonType,
  style,
  type,
  disabled,
  onClickHandler,
  label,
  gutter,
}: ButtonProps) => {
  let buttonStyle: CSSProperties = {};
  switch (buttonType) {
    case button.PILL:
      buttonStyle = {
        borderRadius: "20px",
        width: style?.size ?? "",
        fontSize: style?.fontSize ?? "",
      };
      break;
    case button.CIRCULAR:
      buttonStyle = {
        borderRadius: "50%",
        width: style.size ?? "30px",
        height: style.size ?? "30px",
        fontSize: style.fontSize ?? "",
      };
      break;
    default:
      buttonStyle = {
        fontSize: style.fontSize ?? "",
      };
  }
  switch (gutter) {
    case "top":
      buttonStyle.marginTop = "1rem";
      break;
    case "bottom":
      buttonStyle.marginBottom = "1rem";
      break;
    default:
      break;
  }

  return (
    <>
      <button
        className={`flex ${classes.button}`}
        style={buttonStyle}
        type={type}
        onClick={onClickHandler}
        disabled={disabled}
      >
        {label}
      </button>
    </>
  );
};

export default React.memo(Button);
