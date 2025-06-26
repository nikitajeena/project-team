import { Fragment, ReactNode, FormEvent } from "react";
import classes  from "./form.module.scss"
interface FormWrapperProps {
  size?: string;
  formTitle: string;
  onSubmitHandler: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  size = "",
  formTitle,
  onSubmitHandler,
  children,
}) => {
  const formStyle = {
    width: size,
    minHeight: size,
  };

  return (
    <Fragment>
      <form
        style={formStyle}
        className={classes.form}
        onSubmit={onSubmitHandler}
      >
        <h2>{formTitle}</h2>
        {children}
      </form>
    </Fragment>
  );
};

export default FormWrapper;
