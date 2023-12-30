import { DOMHelper } from "../Utility/DomHelper.js";
import { Tooltip } from "./Tooltip.js";

export class ProjectItem {
  hasActiveTooltip = false;
  constructor(id, updateProjectListFunc, type) {
    this.id = id;
    this.updateHandler = updateProjectListFunc;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
    this.connectDrag();
  }

  showMoreInfoHandler() {
    if (this.hasActiveTooltip) return;
    const projectElement = document.getElementById(this.id);
    const toolTipText = projectElement.dataset.extraInfo;
    const toolTip = new Tooltip(
      () => (this.hasActiveTooltip = false),
      toolTipText,
      this.id
    );
    toolTip.attach();
    this.hasActiveTooltip = true;
  }

  connectDrag() {
    document.getElementById(this.id).addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", this.id);
      e.dataTransfer.effectAllowed = "move";
    });
  }

  connectMoreInfoButton() {
    const projectItemElement = document.getElementById(this.id);
    const moreInfoBtn = projectItemElement.querySelector(
      "button:first-of-type"
    );
    moreInfoBtn.addEventListener("click", this.showMoreInfoHandler.bind(this));
  }

  connectSwitchButton(type) {
    const projectItemElement = document.getElementById(this.id);
    let switchBtn = projectItemElement.querySelector("button:last-of-type");
    switchBtn = DOMHelper.clearEventListener(switchBtn);
    switchBtn.textContent = type === "active" ? "Finished" : "Activate";
    switchBtn.addEventListener("click", this.updateHandler.bind(null, this.id));
  }
  update(updateProjectListFunc, type) {
    this.updateHandler = updateProjectListFunc;
    this.connectSwitchButton(type);
  }
}
