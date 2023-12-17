const socket = io();
console.log(socket);

const goToCart = document.getElementById("goToCart");
const quantityInput = document.getElementById("quantity");
const idUserInput = document.getElementById("idUser");
const cartIdInput = document.getElementById("cartId");
const idProductInput = document.getElementById("idProduct");

const obtenerDatos = () => {
  const idProduct = idProductInput.value;
  const quantity = quantityInput.value;
  const idUser = idUserInput.value;
  const cartId = cartIdInput.value;
  const product = {
    idProduct,
    quantity,
    idUser,
    cartId,
  };
  return product;
};

// ---- Agregar producto al carrito----------
const addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const body = obtenerDatos();
  console.log(body)
  if (!body.cartId) {
    Swal.fire({
      title: "Para agregar productos a un carrito debe registrarse con un email",
      icon: "info",
      timer: 5000,
      timerProgressBar: true,
    });
    fetch("/api/register", {
      method: "DELETE",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((res) => {
        setTimeout(() => {
          window.location.href = "http://localhost:8080/register";
        }, 5000);
      });
  } else {
    await fetch(`/api/carts/${body.cartId}/product/${body.idProduct}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 201) {
          Swal.fire({
            title: res.data,
            icon: "success", // succes , warning , info , question
            timer: 2000,
            timerProgressBar: true,
          });
          setTimeout(() => {
            window.location.href = "http://localhost:8080/realTimeProducts";
          }, 2000);
        } else {
          Swal.fire({
            title: res.data,
            icon: "info", // succes , warning , info , question
            timer: 2000,
            timerProgressBar: true,
          });
        }
      });
  }
});