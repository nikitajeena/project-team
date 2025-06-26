import * as projectActions from "./projectActions.js";

export function loadProjects() {
  return async (dispatch) => {
    // to get the data from the server and call get api
    const projects = [];
    dispatch({ type: projectActions.LOAD_PROJECTS, payload: { projects } });
  };
}

export const deleteProject = (projectId) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // Call the backend API to delete the project from the Database and in success do following.
      // Hardcoding success case for now.
      const callToApiSuccessfull = true;
      if (callToApiSuccessfull) {
        dispatch({
          type: projectActions.DELETE_PROJECT,
          payload: { projectId },
        });
        resolve(true);
      } else reject(false);
    });
  };
};

export const updateProject = (updatedProject) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // Call the backend API to update project in the database and in succes do following.
      // Hardcoding the success case for now.
      const callToApiSuccessfull = true;
      if (callToApiSuccessfull) {
        dispatch({
          type: projectActions.UPDATE_PROJECT,
          payload: { updatedProject },
        });
        resolve(true);
      } else reject(false);
    });
  };
};

export const createProject = (newProject) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // Call the backend API here to save new project in the database and in success do following
      // Hardcoding call to API as success
      const callToApiSuccessfull = true;
      if (callToApiSuccessfull) {
        // Hardcoding ID returned by API for new project
        const idOfNewObjReturenedByApi = Math.random() + Math.random() * 100;
        newProject.id = idOfNewObjReturenedByApi;
        dispatch({
          type: projectActions.CREATE_PROJECT,
          payload: { newProject },
        });
        resolve(true);
        return true
      } else{ reject(false);  return false}
    });
  };
};
