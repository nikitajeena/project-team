
import { useCallback, useMemo, useReducer } from "react";
import * as projectFormActions from "../utilities/projectFormAction";
import {  projectFormReducer } from "../utilities/projectFormReducer";
import { useNavigate } from "react-router-dom";


const useProjectForm = (initialFormState) => {

    const navigate = useNavigate()
  const [projectFormState, dispatch] = useReducer(
    projectFormReducer,
    initialFormState
  );

  const handleImageUpload = useCallback((image) => {
    dispatch({ type: projectFormActions.SET_PROJECT_IMAGE, payload: image });
  }, []);

  const fieldChangeHandler = useCallback(({ target }) => {
    const fieldValue = target.value;

    const updateStore = (
      actionType,
      shouldSetError,
      errorActionType,
      errorMessage
    ) => {
      dispatch({ type: actionType, payload: fieldValue });
      if (shouldSetError)
        dispatch({ type: errorActionType, payload: errorMessage });
      else dispatch({ type: errorActionType, payload: "" });
    };

    switch (target.id) {
      case "project-name":
        if (fieldValue)
          updateStore(
            projectFormActions.SET_PROJECT_NAME,
            false,
            projectFormActions.SET_PROJECT_NAME_ERROR,
            ""
          );
        else
          updateStore(
            projectFormActions.SET_PROJECT_NAME,
            true,
            projectFormActions.SET_PROJECT_NAME_ERROR,
            "This field is required."
          );
        break;
      case "project-manager":
        if (fieldValue)
          updateStore(
            projectFormActions.SET_PROJECT_MANAGER,
            false,
            projectFormActions.SET_PROJECT_MANAGER_ERROR,
            ""
          );
        else
          updateStore(
            projectFormActions.SET_PROJECT_MANAGER,
            true,
            projectFormActions.SET_PROJECT_MANAGER_ERROR,
            "This field is required."
          );
        break;
      case "client-name":
        if (fieldValue)
          updateStore(
            projectFormActions.SET_CLIENT_NAME,
            false,
            projectFormActions.SET_CLIENT_NAME_ERROR,
            ""
          );
        else
          updateStore(
            projectFormActions.SET_CLIENT_NAME,
            true,
            projectFormActions.SET_CLIENT_NAME_ERROR,
            "This field is required."
          );
        break;
      case "number-of-members":
        if (fieldValue) {
          if (fieldValue > 0)
            updateStore(
              projectFormActions.SET_NUMBER_OF_MEMBERS,
              false,
              projectFormActions.SET_NUMBER_OF_MEMBERS_ERROR,
              ""
            );
          else
            updateStore(
              projectFormActions.SET_NUMBER_OF_MEMBERS,
              true,
              projectFormActions.SET_NUMBER_OF_MEMBERS_ERROR,
              "AT least one member is required."
            );
        } else
          updateStore(
            projectFormActions.SET_NUMBER_OF_MEMBERS,
            true,
            projectFormActions.SET_NUMBER_OF_MEMBERS_ERROR,
            "This field is required."
          );
        break;
      default:
        return;
    }
  }, []);

  const checkButtonDisabled = useCallback(() => {
    return projectFormState.projectName &&
      projectFormState.projectManager &&
      projectFormState.clientName &&
      projectFormState.numberOfMembers &&
      !projectFormState.errors.projectName &&
      !projectFormState.errors.projectManager &&
      !projectFormState.errors.clientName &&
      !projectFormState.errors.numberOfMembers
      ? false
      : true;
  }, [projectFormState]);
  const buttonDisabledStatus = useMemo(() => checkButtonDisabled(), [
    checkButtonDisabled,
  ]);


  const toPreviousPage = useCallback(() => navigate(-1), []);

  return {
    projectFormState,
    handleImageUpload,
    fieldChangeHandler,
    buttonDisabledStatus,
    toPreviousPage,
    history,
  };
};

export default useProjectForm;
