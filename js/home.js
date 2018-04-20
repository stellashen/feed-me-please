// feed cat
function selectItemToFeed(e) {
  e.preventDefault();
  const selectedFoods = document.getElementsByClassName("to-feed");
  for(const selectedFood of selectedFoods) {
    selectedFood.classList.remove("to-feed");
  }
  const tabby = document.getElementById('tabby');
  tabby.src = "https://res.cloudinary.com/devleg/image/upload/v1523854994/if_cat_sing_185529.png";
  e.currentTarget.classList.add("to-feed");
}

function feed() {
  const foodContainer = document.getElementsByClassName("to-feed")[0];
  const myBag = document.getElementById("items-in-bag");
  if (myBag.children[0].id === "empty-bag-warning") {
    alert("There is nothing to feed. Go to the store to buy some?");
  } else if (foodContainer !== undefined && foodContainer !== null) {
    const food = foodContainer.childNodes[0];
    myBag.removeChild(foodContainer);
    if (food !== undefined && food !== null) {
      eat(food);
    }
    if (myBag.childElementCount === 1) {
      const empty = document.createElement("p");
      empty.innerText = "Your bag is empty.";
      empty.id = "empty-bag-warning";
      myBag.prepend(empty);
    }
  } else {
    alert("Please select a food (just click it in the bag), and then feed.");
  }
}

function eat(food) {
  const tabby = document.getElementById('tabby');
  if (food.classList.contains("good")) {
    tabby.src="https://res.cloudinary.com/devleg/image/upload/v1523854948/meal.gif";
    pop(`Love it! Yummy, ${food.id} is great.`);
  } else if (food.classList.contains("bad")){
    tabby.src="https://res.cloudinary.com/devleg/image/upload/v1523854993/if_cat_pirate_185520.png";
    displayMessage(food.id);
  } else if (food.classList.contains("ok")){
    tabby.src="https://res.cloudinary.com/devleg/image/upload/v1523854958/burp.gif";
    pop(`It's OK to feed ${food.id}. But don't eat too much.`);
  } else if (food.classList.contains("walk")){
    tabby.src="https://res.cloudinary.com/devleg/image/upload/v1523854939/walk.gif";
    pop(`Oops. Your cat seems to hate the smell of ${food.id}.`);
  }
}

function pop(message) {
  const page = document.getElementsByClassName("sidebar-home-wrapper")[0];
  const oldMessage = document.getElementsByClassName("pop")[0];

  if (oldMessage !== undefined) {
    oldMessage.classList.add("hide");
  }

  const newMessage = document.createElement("div");
  newMessage.classList.add("pop");
  newMessage.innerText = message;
  page.appendChild(newMessage);

  window.setTimeout(()=>{
    page.removeChild(newMessage);
  }, 10000);
}

function displayMessage(name) {
  if (name === "alcohol") {
    pop("Alcohol is bad for your cat! As little as a tablespoon of alcohol can lead to problems for your cat. It can cause severe liver and brain damage.");
  }
  if (name === "chocolate") {
    pop("Chocolate is bad for your cat! Most cats aren’t attracted to chocolate anyway, but you should still be careful. In addition to the sugar content, chocolate also contains a dangerous compound called theobromine which can be toxic in even very small quantities.");
  }
  if (name === "milk") {
    pop("Milk is bad for your cat! Some cats are lactose intolerant and if they eat dairy products it can cause vomiting and diarrhoea.");
  }
  if (name === "cheese") {
    pop("Cheese is bad for your cat! Some cats are lactose intolerant and if they eat dairy products it can cause vomiting and diarrhoea.");
  }
  if (name === "raw fish") {
    pop("Raw fish is bad for your cat! Never feed your cat raw meat or fish because it could transmit food-borne pathogens like salmonella.");
  }
  if (name === "onion") {
    pop("Onion is bad for your cat! All members of the onion family can cause problems if eaten in sufficient quantity. A little bit of onion is not likely to cause any problems. However, eating too much onion may cause digestive upset. Eating some type of onion on a regular basis could cause anemia.");
  }
  if (name === "salted chicken") {
    pop("Salted chicken is bad for your cat! Or any salted food. Large amounts of salt can produce excessive thirst and urination, or even sodium ion poisoning in pets. Signs that your pet may have eaten too many salty foods include vomiting, diarrhea, depression, tremors, elevated body temperature, seizures and even death.");
  }
  if (name === "grape") {
    pop("Grapes are incredibly toxic to cats. Feeding your cat grapes could put him at risk for kidney failure. Some of the early signs may include vomiting and hyperactivity.");
  }
  if (name === "raisin") {
    pop("Grapes are incredibly toxic to cats. Feeding your cat grapes could put him at risk for kidney failure. Some of the early signs may include vomiting and hyperactivity.");
  }
  if (name === "mushroom") {
    pop("Mushrooms? Not recommended! While a small amount of mushrooms may not harm your cat, certain varieties are incredibly toxic so it is better to be safe than sorry.");
  }
  if (name === "dog food") {
    pop("Dog food is bad for your cat! Though dog food and cat food may look alike, they are completely different products. Not only is dog food formulated according to a different nutrient profile, but it contains higher levels of certain nutrients which could be bad for your cat. ");
  }
}

// welcome modal
const welcomeModal = document.getElementById('welcome-modal');
const closeWelcomeButtons = document.getElementsByClassName("welcome-modal-close");

for (let i = 0; i < closeWelcomeButtons.length; i++) {
  closeWelcomeButtons[i].addEventListener('click', function(event) {
    event.preventDefault();
    welcomeModal.removeAttribute("class");
  });
}
