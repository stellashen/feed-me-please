// credit: David Brennan, drag and drop example:
// https://medium.com/quick-code/simple-javascript-drag-drop-d044d8c5bed5

class App {

  static init() {

    App.box = document.getElementsByClassName('box')[0];

    App.box.addEventListener("dragstart", App.dragstart);
    App.box.addEventListener("dragend", App.dragend);

    const containers = document.getElementsByClassName('item');

    for(const container of containers) {
      container.addEventListener("dragover", App.dragover);
      container.addEventListener("dragenter", App.dragenter);
      container.addEventListener("dragleave", App.dragleave);
      container.addEventListener("drop", App.drop);
    }
  }

  static dragstart() {
    this.className += " held";

    setTimeout(() => {
      this.className="invisible";
    }, 0);
  }

  static dragend() {
    this.className = "box";
  }

  static dragover(e) {
    e.preventDefault();
  }

  static dragenter(e) {
    e.preventDefault();
    this.className += " hovered";
  }

  static dragleave() {
    this.className = "item";
  }

  static drop() {
    this.className = "item";
    this.append(App.box);
  }
}

document.addEventListener("DOMContentLoaded", App.init);
