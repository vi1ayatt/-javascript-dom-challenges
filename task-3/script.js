const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Keyboard", price: 75 },
  { id: 4, name: "Monitor", price: 300 }
];

const productContainer = document.querySelector("#productContainer");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const totalPrice = document.querySelector("#totalPrice");
const cart = [];

function renderCart() {
  cartItems.replaceChildren();
  cart.forEach((product, index) => {
    const item = document.createElement("li");
    const remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.setAttribute("aria-label", "Remove " + product.name + " from cart");
    remove.addEventListener("click", () => {
      cart.splice(index, 1);
      renderCart();
    });
    item.append(product.name + " · $" + product.price, remove);
    cartItems.append(item);
  });
  cartCount.textContent = "Cart: " + cart.length + (cart.length === 1 ? " item" : " items");
  totalPrice.textContent = "Total: $" + cart.reduce((total, product) => total + product.price, 0);
}

products.forEach((product) => {
  const card = document.createElement("article");
  const name = document.createElement("h2");
  const price = document.createElement("p");
  const add = document.createElement("button");

  name.textContent = product.name;
  price.textContent = "$" + product.price;
  add.textContent = "Add to Cart";
  add.dataset.productId = product.id;
  add.addEventListener("click", (event) => {
    const id = Number(event.currentTarget.dataset.productId);
    cart.push(products.find((item) => item.id === id));
    renderCart();
  });

  card.append(name, price, add);
  productContainer.append(card);
});
