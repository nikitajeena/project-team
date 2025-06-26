import { useNavigate } from "react-router-dom";
import useProjectForm from "../../hooks/useCreateProjectForm";
import classes from "./create.module.scss";
import Button from "../../components/buttons/Button";
import FormWrapper from "../../components/form/Form";
import TextInput from "../../components/inputs/TextInput";
import ImageInput from "../../components/inputs/UploadInput";
import { createProject } from "../../store/project/projectActionCreator";
import { button } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AppDispatch, RootState } from "../../store/store";
const CreateProject = (props) => {
  const data = useSelector((state: RootState) => state.project);
  const dispatch = useDispatch <AppDispatch>();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const initialFormState = {
    projectName: "",
    projectManager: "",
    clientName: "",
    numberOfMembers: "",
    projectImage: "",
    errors: {
      projectName: "",
      projectManager: "",
      clientName: "",
      numberOfMembers: "",
    },
  };
  const {
    projectFormState,
    handleImageUpload,
    fieldChangeHandler,
    buttonDisabledStatus,
    toPreviousPage,
  } = useProjectForm(initialFormState);

  const addProject = async (event) => {
    event.preventDefault();
    setLoading(true);

    const newProject = {
      projectName: projectFormState.projectName,
      projectManager: projectFormState.projectManager,
      clientName: projectFormState.clientName,
      numberOfMembers: projectFormState.numberOfMembers,
      projectImage: projectFormState.projectImage,
    };

    const load = dispatch(createProject(newProject));
    setLoading(!load);

    const successfullyCreated = load;
    if (successfullyCreated) navigate("/");
  };

  return (
    <>
      <div className={classes["top-content"]}>
        <Button
          label={<span>🠔</span>}
          style={{
            size: "100px",
            fontSize: "20px",
          }}
          onClickHandler={toPreviousPage}
        />
      </div>
      <main className={classes["create-project-main"]}>
        <div className={classes["create-project-form-container"]}>
          <ImageInput
            size="200px"
            image={projectFormState.projectImage}
            onChangeHandler={handleImageUpload}
          />
          <FormWrapper
            formTitle="create a new project"
            size="450px"
            onSubmitHandler={addProject}
          >
            <TextInput
              id="project-name"
              type="text"
              label="Project Name"
              hideLabel={true}
              onChangeHandler={fieldChangeHandler}
              error={projectFormState.errors.projectName}
            />
            <TextInput
              id="project-manager"
              type="text"
              label="Project Manager"
              hideLabel={true}
              onChangeHandler={fieldChangeHandler}
              error={projectFormState.errors.projectManager}
            />
            <TextInput
              id="client-name"
              type="text"
              label="Client Name"
              hideLabel={true}
              onChangeHandler={fieldChangeHandler}
              error={projectFormState.errors.clientName}
            />
            <TextInput
              id="number-of-members"
              type="number"
              label="Number of Members"
              hideLabel={true}
              onChangeHandler={fieldChangeHandler}
              error={projectFormState.errors.numberOfMembers}
            />
            <Button
              label="submit"
              buttonType={button.PILL}
              gutter="top"
              disabled={buttonDisabledStatus || loading}
            />
          </FormWrapper>
        </div>
      </main>
    </>
  );
};

export default CreateProject;
