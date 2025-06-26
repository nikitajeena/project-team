import { useEffect, useState } from "react";
import FormWrapper from "../../components/form/Form";
import TextInput from "../../components/inputs/TextInput";
import classes from "./login.module.scss";
import Button from "../../components/buttons/Button";
import { button } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/auth/authActionCreator";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
  const {isAuthenticated, error} = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [hasSignInButtonBeenClicked, setHasSignInButtonBeenClicked] =
    useState(false);

  const handleUserName = ({ target }) => {
    setUsername(target.value);
    hasSignInButtonBeenClicked &&
      setErrors((errors) => ({
        ...errors,
        username: target.value ? "" : "Username is required.",
      }));
  };

  function login(username, password) {
    dispatch(userLogin(username, password))
    
  }
  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
    hasSignInButtonBeenClicked &&
      setErrors((errors) => ({
        ...errors,
        password: target.value ? "" : "Password is required.",
      }));
  };


  const validateCredentials = (event) => {
    event.preventDefault();

    !hasSignInButtonBeenClicked && setHasSignInButtonBeenClicked(true);

    if (!username)
      setErrors((errors) => ({ ...errors, username: "Username is required." }));
    else if (!password)
      setErrors((errors) => ({ ...errors, password: "Password is required." }));
    else login(username, password);
  };

  useEffect(()=>{
    if(isAuthenticated){
 navigate('/');
    }
    
  },[isAuthenticated])
  return (
    <>
      <div className={classes["login-container"]}>
        <div className={classes["login-left-container"]}>
          <img src="images/Group.png" />
        </div>
        <div className={classes["login-right-container"]}>
          <FormWrapper
            formTitle={"Login to your account"}
            onSubmitHandler={validateCredentials}
          >
            <TextInput
              id="username"
              type="text"
              label="Username"
              hideLabel={true}
              value={username}
              onChangeHandler={handleUserName}
              error={errors.username}
            />

            <TextInput
              id="password"
              type="password"
              label="Password"
              hideLabel={true}
              value={password}
              onChangeHandler={handlePasswordChange}
              error={errors.password}
            />
            {error && (
              <span className={classes["error-message"]}>
                {error}
              </span>
            )}
            <Button
              type="submit"
              label="sign in"
              buttonType={button.PILL}
              gutter="top"
            />
          </FormWrapper>
        </div>
      </div>
    </>
  );
};

export default Login;
