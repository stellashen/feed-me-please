class App {

  static init() {

    const boxes = document.getElementsByClassName('box');

    for(const box of boxes) {
      box.addEventListener("dragstart", App.dragstart);
      box.addEventListener("dragend", App.dragend);
    }

    const containers = document.getElementsByClassName('item');
    const cartItems = document.getElementsByClassName('cart-item');

    for(const cartItem of cartItems) {
      cartItem.addEventListener("dragover", App.dragover);
      cartItem.addEventListener("dragenter", App.dragenter);
      cartItem.addEventListener("dragleave", App.dragleave);
      cartItem.addEventListener("drop", App.drop);
    }
  }

  static dragstart() {
    this.classList.add("current-item");
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
    this.classList.add("hovered");
  }

  static dragleave() {
    this.classList.remove("hovered");
  }

  static drop(e) {
    if(e.preventDefault) {
      e.preventDefault();
    }
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    this.className = "cart-item has-food";
    const currentItem = document.getElementsByClassName("current-item")[0];
    currentItem.classList.remove("current-item");
    this.appendChild(currentItem);

    // items added to cart cannot be changed
    currentItem.classList.add("undraggable");
    this.removeEventListener("dragover", App.dragover);
    this.removeEventListener("dragenter", App.dragenter);
    this.removeEventListener("dragleave", App.dragleave);
    this.removeEventListener("drop", App.drop);
  }
}

document.addEventListener("DOMContentLoaded", App.init);
