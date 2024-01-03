import { DOMHelper } from "../Utility/DomHelper";
import { ProjectItem } from "./ProjectItem";

export class ProjectsList {
  // projects = [];
  constructor(projectType) {
    this.projectType = projectType;
    this.projects = [];
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
    this.connectDroppable();
  }

  connectDroppable() {
    const list = document.querySelector(`#${this.projectType}-projects ul`);

    list.addEventListener("dragenter", (e) => {
      if (e.dataTransfer.types[0] === "text/plain") {
        list.parentElement.classList.add("droppable");
        e.preventDefault();
      }
    });

    list.addEventListener("dragover", (e) => {
      if (e.dataTransfer.types[0] === "text/plain") {
        e.preventDefault();
      }
    });

    list.addEventListener("dragleave", (e) => {
      if (
        e.relatedTarget.closest(`#${this.projectType}-projects ul`) !== list
      ) {
        list.parentElement.classList.remove("droppable");
      }
    });

    list.addEventListener("drop", (e) => {
      const prjId = e.dataTransfer.getData("text/plain");

      let click = new Event("click");
      document
        .querySelector(`#${prjId}`)
        .querySelector("button:last-of-type")
        .dispatchEvent(click);

      list.parentElement.classList.remove("droppable");
    });
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
