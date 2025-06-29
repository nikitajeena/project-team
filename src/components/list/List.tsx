import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../buttons/Button";
import { button } from "../../constants/constants";
import classes from "./list.module.scss";
import ConfirmationModal from "../confirmation-modal/confirmationModal";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../store/project/projectActionCreator";
import { AppDispatch } from "../../store/store";
export const List = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [currentDeleteId, setCurrentDeleteId] = useState(null);

  const toggleDeleteConfirmationModal = (
    shouldShow,
    currentDeleteId = null
  ) => {
    setShowDeleteConfirmationModal(shouldShow);
    setCurrentDeleteId(currentDeleteId);
  };

  const handleDeleteProject = async () => {
    dispatch(deleteProject(currentDeleteId));
    const deletionWasSuccess = true;
    if (deletionWasSuccess) toggleDeleteConfirmationModal(false);
  };
  

  const tableHeader = ["Name","Manager","Members","Actions"]
  const deleteButtonLabel = (
    <span>
      <i className="fa fa-trash-o"></i> delete
    </span>
  );
  const editButtonLabel = (
    <span>
      <i className="fa fa-pencil"></i> edit
    </span>
  );

  const items = props.items.map((item) => (
    <li key={item.id}>
      <div className={classes["logo"]}>
        <div>
          <img
            src={item.projectImage || "images/image-upload.png"}
            alt="project logo"
          />
        </div>
      </div>
      <div className={classes.details}>
        <span>{item.projectName}</span>
      </div>
      <div className={classes.details}>
        <span>{item.projectManager}</span>
      </div>
      <div className={classes.details}>
        <span>{item.numberOfMembers}</span>
      </div>
      <div>
        <div>
          <Button
            buttonType={button.PILL}
            label={editButtonLabel}
            onClickHandler={() => {
              navigate(`/edit-project/${item.id}`);
            }}
          />
        </div>
        <div>
          <Button
            buttonType={button.PILL}
            label={deleteButtonLabel}
            onClickHandler={() => toggleDeleteConfirmationModal(true, item.id)}
          />
        </div>
      </div>
    </li>
  ));

  return (
    <div className={classes["list-container"]}>
      <ul className={classes.list}>
        <li>
          <div className={classes["logo"]}>
            <span>Logo</span>
          </div>
          {
            tableHeader.map((header) => <> 
            <div>
            <span>{header}</span>
          </div>
            </>)
          }
        </li>
        {items}
      </ul>
      {showDeleteConfirmationModal ? (
        <>
          <ConfirmationModal
            message="Are you sure you want to delete the Project?"
            onConfirm={handleDeleteProject}
            onCancel={() => toggleDeleteConfirmationModal(false)}
          />{" "}
        </>
      ) : null}
    </div>
  );
};
