import { ProjectsList } from "./APP/ProjectList";

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
    analyticsScript.src = "assets/scripts/Utility/Analytics.js";
    analyticsScript.defer = true;
    document.head.append(analyticsScript);
  }
}

App.init();
