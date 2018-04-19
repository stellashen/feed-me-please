class Cat {

  static init() {

    const cats = document.getElementsByClassName('cat');

    this.offsetx = null;
    this.offsety = null;

    for(const cat of cats) {
      cat.addEventListener("dragstart", Cat.dragstart);
      cat.addEventListener("dragend", Cat.dragend);
    }

    const home = document.getElementById('home');
    const homeWidth = home.clientWidth;
    const homeHeight = home.clientHeight;

    // generate spots
    let left = 0;
    let bottom = 0;
    while (bottom < homeHeight - 105) {
      left += 5;
      if (left > homeWidth - 105) {
        bottom += 5;
        left = 0;
      }
      const spot = document.createElement("div");
      spot.classList.add("spot");
      spot.style.left = `${left}px`;
      spot.style.bottom = `${bottom}px`;
      home.appendChild(spot);
    }

    const spots = document.getElementsByClassName('spot');

    for(const spot of spots) {
      spot.addEventListener("dragover", Cat.dragover);
      spot.addEventListener("dragenter", Cat.dragenter);
      spot.addEventListener("dragleave", Cat.dragleave);
      spot.addEventListener("drop", Cat.drop);
    }
  }

  static dragstart() {
    this.classList.add("current-cat");
    this.style.opacity = '0.4';
  }

  static dragend() {
    this.style.opacity = '1';
  }

  static dragover(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  }

  static dragenter(e) {
    e.preventDefault();
  }

  static dragleave() {
  }

  static drop(e) {
    if(e.preventDefault) {
      e.preventDefault();
    }
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    const currentCat = document.getElementsByClassName("current-cat")[0];
    currentCat.classList.remove("current-cat");
    this.appendChild(currentCat);
  }
}

document.addEventListener("DOMContentLoaded", Cat.init);
