let modal = document.querySelector(".modal");
let btn = document.querySelector(".cart-btn");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

const cards = document.querySelectorAll(".card");
const cart = document.querySelector(".cart");
const addButtons = document.querySelectorAll(".add");
const totalElement = document.querySelector(".total"); 
const selectedItems = {};

function handleCardClick(event) {
  const card = event.currentTarget;
  const itemId = card.id;
  const itemImg = card.querySelector("img").src;
  const itemName = card.querySelector(".desc").textContent;
  const itemPrice = parseFloat(card.querySelector(".price").textContent); 

  if (selectedItems[itemId]) {
    selectedItems[itemId].count++;
  } else {
    selectedItems[itemId] = {
      name: itemName,
      image: itemImg,
      price: itemPrice,
      count: 1,
    };
  }

  updateCart();
}

function updateCart() {
  cart.innerHTML = '';
  let total = 0; 
  console.log(selectedItems)

  for (const itemId in selectedItems) {
    const item = selectedItems[itemId];

    cart.innerHTML += `<div class="cart-card">
                  <img src="${item.image}" alt="${item.name}" />
                  <h6 class="cart-desc">${item.name}</h6>
                  <h6 class="cart-price">$${item.price}</h6>
                  <div class="quantity-container">
                    <button class="subt-btn" data-item-id="${itemId}">-</button>
                    <span class="quantity-text">${item.count}</span>
                    <button class="add-btn" data-item-id="${itemId}">+</button>
                  </div>
              </div>`

      total += item.price * item.count;
  }
  
  totalElement.textContent = `${total}`; 
}


function addItem(itemId) {
  if (selectedItems[itemId]) {
      selectedItems[itemId].count++;
  }
  updateCart();
}

function removeItem(itemId) {
  if (selectedItems[itemId]) {
      selectedItems[itemId].count--;
      if (selectedItems[itemId].count <= 0) {
          delete selectedItems[itemId];
      }
  }
  updateCart();
}

cards.forEach((card) => {
  card.addEventListener("click", handleCardClick);
});

cart.addEventListener("click", function(event) {
  const target = event.target;
  if (target.classList.contains("add-btn")) {
    const itemId = target.getAttribute("data-item-id");
    addItem(itemId);
  } else if (target.classList.contains("subt-btn")) {
    const itemId = target.getAttribute("data-item-id");
    removeItem(itemId);
  }
});

document.querySelector(".submit").addEventListener("click", function() {
  document.querySelector(".modal-content").innerHTML = `<span class="close close-submit">&times;</span>
  <h2>Order successful!</h2>`
  let span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.style.display = "none";
  }
})

