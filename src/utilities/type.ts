export interface ProjectErrors {
  projectName: string;
  projectManager: string;
  clientName: string;
  numberOfMembers: string;
}

export interface Project {
  projectName: string;
  projectManager: string;
  clientName: string;
  numberOfMembers: string;
  id: string | number;
  projectImage: string;
  errors: ProjectErrors;
}

export interface ProjectState {
  projects: Project[];
  initialProjectsFetched: boolean;
}