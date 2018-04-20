# Feed Me Please! - A cat-feeding game

Hello fellow humans. `Feed Me Please!` is an educational browser game built with HTML5 and JavaScript.

#### The purpose of this game
- provide a **low-pressure cat-feeding experience**
- answer this question you may have: **What are the foods my cat can / cannot eat?**

## Technical Details
### Modal using JavaScript and CSS
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
### HTML5 Drag and Drop
#### drag food to cart
For implementing dragging food items and dropping them in cart, relevant code is in `cart.js`.

Event listeners are added to all food items to make them draggable. Event listeners are added to all cart spots to make them holders for dropping items.

Since event listeners are added to all food items, how does JavaScript know which one the user is dragging to cart? To let JavaScript know, we add "currentItem" id to item when the dragging starts. Item's opacity changes to indicate that it's being dragged, and the opacity changes back to 1 after the dragging ends.

```js
static dragstart() {
  this.classList.add("current-item");
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

#### Place cat anywhere inside home

Cat has an initial position. But the user can drag the cat to somewhere else at home.

Generate drop spots dynamically according to home size:

```js
// home.js
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
```
```
//home.css
.cat {
  width: 100px;
  z-index: 1;
  cursor: pointer;
}
.spot {
  width: 100px;
  height: 100px;
  position: absolute;
}
```
During development, add `border: 1px solid black;` to show the grids:

<img src="https://res.cloudinary.com/devleg/image/upload/v1524074232/spots.png" width="400">

#### Browser compatibility

Test for browser compatibility: works in Chrome, Firefox, Safari.

Note: HTML5 Drag and Drop are supported by most browsers, but may not be supported in some older browser versions.

## Credit
#### 1. Cat images
Cat characters are designed by [Denis Sazhin](http://iconka.com/en/).

This project is using this license:
- Cat Power Animated – Regular Commercial License

#### 2. [Unsplash](https://unsplash.com/) images
[Home photo](https://unsplash.com/photos/_-JR5TxKNSo) by ian dooley

#### 3. Messages cited:
_[What not to feed your cat](https://www.vets-now.com/2017/02/foods-poisonous-to-cats/)_
-[Can My Cat Eat That? 30 Foods Cats Can and Can’t Eat](https://www.kittycatter.com/can-cats-eat-chocolate-bananas-cheese/)_
-[Foods Toxic to Cats](http://www.orphankittenrescue.com/foods_toxic_to_cats)_
