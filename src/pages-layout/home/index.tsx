import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loadProjects } from "../../store/project/projectActionCreator";
import { useSelector } from "react-redux";
import { List } from "../../components/list/List";
import classes from "./home.module.scss";
import Button from "../../components/buttons/Button";
import { RootState } from "../../store/store";
function Home() {
  const navigate = useNavigate()
  const projects = useSelector((state: RootState) => {
    return state.project;
  });
  useEffect(() => {
    loadProjects();
  }, []);
  let mainClasses = "";
  let projectList: any = null;
  if (projects.projects.length > 0) {
    mainClasses = "";

    projectList = <List items={projects.projects} />;
  } else {
    mainClasses = `flex ${classes["no-projects-main"]}`;

    projectList = (
      <div>
        <span>No Projects!</span>
        <span>Start adding projects by clicking on the button below.</span>
      </div>
    );
  }
  const toCreateProject = useCallback(() => {
    navigate("/add-project")
  },[]) 
  return (
    <main className={mainClasses}>
      {projectList}
      <div className={classes["add-project-button"]}>
        <Button
          label={<i className="fa fa-plus"></i>}
          buttonType="circular"
          style={{ size: "65px", fontSize: "40px" }}
          onClickHandler={toCreateProject}
        />
      </div>
    </main>
  );
}

export default Home;
