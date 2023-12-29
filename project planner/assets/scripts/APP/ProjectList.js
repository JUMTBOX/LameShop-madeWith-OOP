import { DOMHelper } from "../Utility/DomHelper.js";
import { ProjectItem } from "./ProjectItem.js";

export class ProjectsList {
  projects = [];
  constructor(projectType) {
    this.projectType = projectType;
    const projectItems = document.querySelectorAll(
      `#${projectType}-projects li`
    );

    for (let item of projectItems) {
      this.projects.push(
        new ProjectItem(
          item.id,
          this.switchProject.bind(this),
          this.projectType
        )
      );
    }
  }
  setSwitchHandlerFunc(switchHandlerFunc) {
    this.switchHandler = switchHandlerFunc;
  }
  addProject(project) {
    this.projects.push(project);
    DOMHelper.moveElement(project.id, `#${this.projectType}-projects ul`);
    project.update(this.switchProject.bind(this), this.projectType);
  }
  switchProject(id) {
    this.switchHandler(this.projects.find((p) => p.id === id));
    this.projects = this.projects.filter((item) => item !== id);
  }
}
