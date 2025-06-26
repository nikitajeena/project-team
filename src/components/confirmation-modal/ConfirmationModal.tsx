// import Button from "../buttons/button";
import Button from "../buttons/Button";
import classes from "./confirmation.module.scss";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <>
    <div className={classes["modal-overlay"]}>
 <div className={classes["modal-container"]}>
        <div className={classes["align-container"]}>
          <div>
            <span>{message}</span>
          </div>
          <div className={classes["button-container"]}>
            <Button
              label="confirm"
              buttonType="pill"
              style={{ size: "128px" }}
              onClickHandler={onConfirm}
            />
            <Button
              label="cancel"
              buttonType="pill"
              style={{ size: "128px" }}
              onClickHandler={onCancel}
            />
          </div>
        </div>
      </div>
    </div>
     
    </>
  );
};

export default ConfirmationModal;
