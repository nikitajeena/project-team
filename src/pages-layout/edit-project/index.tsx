import Button from "../../components/buttons/Button";
import { useNavigate, useParams } from "react-router-dom";
import useProjectForm from "../../hooks/useCreateProjectForm";
import { useDispatch, useSelector } from "react-redux";
import classes from "../create-project/create.module.scss";
import ImageInput from "../../components/inputs/UploadInput";
import FormWrapper from "../../components/form/Form";
import TextInput from "../../components/inputs/TextInput";
import { button } from "../../constants/constants";
import { updateProject } from "../../store/project/projectActionCreator";
const EditProject = () => {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const projectInformation = useSelector((state: any) => state);
  const params = useParams();
  const project = projectInformation.project.projects.find((project) => {
    return project.id == params.projectId;
  });

  const {
    projectFormState,
    handleImageUpload,
    fieldChangeHandler,
    buttonDisabledStatus,
    toPreviousPage,
    history,
  } = useProjectForm({
    projectName: project?.projectName || "",
    projectManager: project?.projectManager || "",
    clientName: project?.clientName || "",
    numberOfMembers: project?.numberOfMembers || "",
    projectImage: project?.projectImage || "",
    id: project?.id || "",
    errors: {
      projectName: "",
      projectManager: "",
      clientName: "",
      numberOfMembers: "",
    },
  });

  const handleUpdateProject = async (event) => {
    event.preventDefault();
    const updatedProjectDetails = {
      id: projectFormState.id,
      projectName: projectFormState.projectName,
      projectManager: projectFormState.projectManager,
      clientName: projectFormState.clientName,
      numberOfMembers: projectFormState.numberOfMembers,
      projectImage: projectFormState.projectImage,
    };
    dispatch(updateProject(updatedProjectDetails));

    navigate("/");
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
            style={{ size: "400px" }}
            image={projectFormState.projectImage}
            onChangeHandler={handleImageUpload}
          />
          <FormWrapper
            formTitle="edit the project details"
            size="450px"
            onSubmitHandler={handleUpdateProject}
          >
            <TextInput
              id="project-name"
              type="text"
              label="Project Name"
              hideLabel={true}
              value={projectFormState.projectName}
              onChangeHandler={fieldChangeHandler}
              error={projectFormState.errors.projectName}
            />
            <TextInput
              id="project-manager"
              type="text"
              label="Project Manager"
              hideLabel={true}
              value={projectFormState.projectManager}
              onChangeHandler={fieldChangeHandler}
              error={projectFormState.errors.projectManager}
            />
            <TextInput
              id="client-name"
              type="text"
              label="Client Name"
              hideLabel={true}
              value={projectFormState.clientName}
              onChangeHandler={fieldChangeHandler}
              error={projectFormState.errors.clientName}
            />
            <TextInput
              id="number-of-members"
              type="number"
              label="Number of Members"
              hideLabel={true}
              value={projectFormState.numberOfMembers}
              onChangeHandler={fieldChangeHandler}
              error={projectFormState.errors.numberOfMembers}
            />
            <Button
              label="submit"
              buttonType={button.PILL}
              gutter="top"
              disabled={buttonDisabledStatus}
            />
          </FormWrapper>
        </div>
      </main>
    </>
  );
};

export default EditProject;
