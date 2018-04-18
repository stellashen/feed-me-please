# Feed Me Please! - A cat-feeding game

Hello fellow humans. `Feed Me Please!` is an educational browser game built with HTML5 and JavaScript.

#### The purpose of this game
- provide a **low-pressure cat-feeding experience**
- answer this question you may have: **What are the foods my cat can / cannot eat?**

## Technical Challenges
#### Modal using JavaScript and CSS
event listeners for triggers to open/close modal:
```js
const modal = document.getElementById('modal');
const openButton = document.getElementById("open-store");

openButton.addEventListener('click', function(event) {
  event.preventDefault();
  modal.classList.add("is-open");
  const closeButtons = document.getElementsByClassName("js-modal-close");
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = function() {
      event.preventDefault();
      modal.classList.remove("is-open");
    };
  }
});
```
#### HTML5 Drag and Drop
For implementing dragging food items and dropping them in cart, relevant code is in `cart.js`.

Event listeners are added to all food items to make them draggable. Event listeners are added to all cart spots to make them holders for dropping items.

Since event listeners are added to all food items, how does JavaScript know which one the user is dragging to cart? To let JavaScript know, we add "currentItem" id to item when the dragging starts. Item's opacity changes to indicate that it's being dragged, and the opacity changes back to 1 after the dragging ends.

```js
static dragstart() {
  this.id = "currentItem";
  this.style.opacity = '0.4';
}

static dragend() {
  this.style.opacity = '1';
}
```

After a food item has been added to cart, they should not be draggable any more. So users cannot drag a food out of cart, or drag more food items into the same spot. Therefore, listeners are removed for these spots in shopping cart, and a "undraggable" class is added to food items in cart.

```js
static drop(e) {
  if(e.preventDefault) {
    e.preventDefault();
  }
  if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }
  this.className = "cart-item has-food";
  const currentItem = document.getElementById("currentItem");
  currentItem.removeAttribute("id");
  this.appendChild(currentItem);

  // items added to cart cannot be changed
  currentItem.classList.add("undraggable");
  this.removeEventListener("dragover", App.dragover);
  this.removeEventListener("dragenter", App.dragenter);
  this.removeEventListener("dragleave", App.dragleave);
  this.removeEventListener("drop", App.drop);
}
```

```css
.undraggable {
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
```

Test for browser compatibility: works in Chrome, Firefox, Safari.

Note: HTML5 Drag and Drop are supported by most browsers, but may not be supported in some older browser versions.
