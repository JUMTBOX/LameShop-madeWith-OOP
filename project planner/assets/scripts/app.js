class DOMHelper {
  static clearEventListener(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destination = document.querySelector(newDestinationSelector);
    destination.append(element);
    /**요소가 움직이면 자동으로 해당 요소쪽으로 스크롤 */
    element.scrollIntoView({ behavior: "smooth" });
  }
}

//-----------------------------------------------------------------------------
class Component {
  constructor(hostElementId, insertBefore) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
    }
    this.insertBefore = insertBefore;
  }

  detach() {
    if (this.element) this.element.remove();
  }

  attach() {
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? "beforebegin" : "beforeend",
      this.element
    );
  }
}

//-----------------------------------------------------------------------------
class Tooltip extends Component {
  constructor(closeNotifierFunc, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunc;
    this.text = text;
    this.create();
  }

  closeToolTipHandler = () => {
    this.detach();
    this.closeNotifier();
  };
  create() {
    const toolTipEl = document.createElement("div");
    toolTipEl.className = "card";
    const toolTipTemplate = document.getElementById("tooltip");
    const toolTipBody = document.importNode(toolTipTemplate.content, true);
    toolTipBody.querySelector("p").textContent = this.text;
    toolTipEl.append(toolTipBody);

    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;
    const parentElScrolling = this.hostElement.parentElement.scrollTop;

    const x = hostElPosLeft + 20;
    const y = hostElPosTop + hostElHeight - parentElScrolling - 10;

    toolTipEl.style.position = "absolute";
    toolTipEl.style.left = `${x}px`;
    toolTipEl.style.top = `${y}px`;

    toolTipEl.addEventListener("click", this.closeToolTipHandler);
    this.element = toolTipEl;
  }
}

//-----------------------------------------------------------------------------

class ProjectItem {
  hasActiveTooltip = false;
  constructor(id, updateProjectListFunc, type) {
    this.id = id;
    this.updateHandler = updateProjectListFunc;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
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

//-----------------------------------------------------------------------------

class ProjectsList {
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

//-----------------------------------------------------------------------------

class App {
  static init() {
    const activeProject = new ProjectsList("active");
    const finishedProject = new ProjectsList("finished");
    activeProject.setSwitchHandlerFunc(
      finishedProject.addProject.bind(finishedProject)
    );
    finishedProject.setSwitchHandlerFunc(
      activeProject.addProject.bind(activeProject)
    );

    setTimeout(this.startAnalytics, 3000);
  }

  static startAnalytics() {
    const analyticsScript = document.createElement("script");
    analyticsScript.src = "assets/scripts/analytics.js";
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init();
