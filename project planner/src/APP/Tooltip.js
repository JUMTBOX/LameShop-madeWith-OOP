import { Component } from "./Component.js";

export class Tooltip extends Component {
  constructor(closeNotifierFunc, text, hostElementId) {
    super(hostElementId);
    this.closeNotifier = closeNotifierFunc;
    this.text = text;
    this.closeToolTipHandler = () => {
      this.detach();
      this.closeNotifier();
    };
    this.create();
  }
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
