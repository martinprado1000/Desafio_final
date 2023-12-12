const socket = io();
console.log(socket);

// Obtengo los id de cada elemento
const cartId = document.getElementById("cartId");


// Obtengo los datos del formulario
const obtenerDatos = () => {
  const cid = cartId.value;
  return cid;
};

//goToCart.addEventListener("click", async (e) => {
//console.log("holaaaa")
// await fetch("/api/register", {
//   method: "DELETE",
//   headers: { "Content-type": "application/json;charset=UTF-8" },
// })
//   .then((res) => JSON.stringify(res))
//   .then((res) => {
//     console.log("se destruyo la sesion");
//     window.location.href = "http://localhost:8080/login";
//   });
// });

//Editar producto
const buttonFn = () => {

  const productIdBtn = document.getElementsByClassName("productId");
  for (var i = 0; i < productIdBtn.length; i++) {
    productIdBtn[i].onclick = async function () {
      const body = obtenerDatos()
      console.log(body)
      var pid = this.value;
      console.log("Editar producto: " + pid);
      console.log(`/api/carts/${body}/product/${pid}`)
      await fetch(`/api/carts/${body}/product/${pid}`, {
        method: "PUT",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
        });
      // const addProdutToCart = {
      //   email,
      //   products: [
      //     {
      //       product: pid,
      //       quantity: 1,
      //     },
      //   ],
      // };
      // socket.emit("addCart", addProdutToCart);
    };
  }
};
buttonFn();

// // Cargo nuevo producto en el front
// socket.on("newProduct", (data) => {
//   const product = JSON.parse(data);
//   const table = document.getElementById("tableProducts");
//   const newRow = table.insertRow();
//   //const id = newRow.insertCell();
//   const title = newRow.insertCell();
//   const description = newRow.insertCell();
//   const price = newRow.insertCell();
//   const code = newRow.insertCell();
//   const stock = newRow.insertCell();
//   const category = newRow.insertCell();
//   const cellEdit = newRow.insertCell();
//   const cellDelete = newRow.insertCell();
//   const cellAddCart = newRow.insertCell();
//   //id.textContent = product._id;
//   title.textContent = product.title;
//   description.textContent = product.description;
//   price.textContent = product.price;
//   code.textContent = product.code;
//   stock.textContent = product.stock;
//   category.textContent = product.category;
//   const btnEdit = document.createElement("button");
//   btnEdit.innerText = "Editar";
//   btnEdit.value = product._id;
//   btnEdit.classList.add("edit", "btn", "btn-primary", "btn-sm");
//   cellEdit.appendChild(btnEdit);
//   const btnDelete = document.createElement("button");
//   btnDelete.innerText = "Eliminar";
//   btnDelete.value = product._id;
//   btnDelete.classList.add("delete", "btn", "btn-danger", "btn-sm");
//   cellDelete.appendChild(btnDelete);
//   const h5logged = document.createElement("button");
//   h5logged.innerText = "Agregar al carrito";
//   h5logged.value = product._id;
//   h5logged.classList.add("logged", "btn", "btn-info", "btn-sm");
//   cellAddCart.appendChild(h5logged);
//   buttonFn();
//   Swal.fire({
//     title: `Producto con codigo ${product.codeInput} agregado correctamente`,
//     icon: "success", // succes , warning , info , question
//     timer: 2000,
//     timerProgressBar: true,
//   });
//   limpiarFormulario();
// });

// Cargo nuevo producto en el front
socket.on("productNewOrEdit", (data) => {
  const product = JSON.parse(data);
  const table = document.getElementById("tableProducts");
  const newRow = table.insertRow();
  //const id = newRow.insertCell();
  const title = newRow.insertCell();
  const description = newRow.insertCell();
  const price = newRow.insertCell();
  const code = newRow.insertCell();
  const stock = newRow.insertCell();
  const category = newRow.insertCell();
  const cellEdit = newRow.insertCell();
  const cellDelete = newRow.insertCell();
  const cellAddCart = newRow.insertCell();
  //id.textContent = product._id;
  title.textContent = product.title;
  description.textContent = product.description;
  price.textContent = product.price;
  code.textContent = product.code;
  stock.textContent = product.stock;
  category.textContent = product.category;
  const btnEdit = document.createElement("button");
  btnEdit.innerText = "Editar";
  btnEdit.value = product._id;
  btnEdit.classList.add("edit", "btn", "btn-primary", "btn-sm");
  cellEdit.appendChild(btnEdit);
  const btnDelete = document.createElement("button");
  btnDelete.innerText = "Eliminar";
  btnDelete.value = product._id;
  btnDelete.classList.add("delete", "btn", "btn-danger", "btn-sm");
  cellDelete.appendChild(btnDelete);
  const h5logged = document.createElement("button");
  h5logged.innerText = "Agregar al carrito";
  h5logged.value = product._id;
  h5logged.classList.add("logged", "btn", "btn-info", "btn-sm");
  cellAddCart.appendChild(h5logged);
});

socket.on("addedProductToCart", async (data) => {
  const addedProductToCart = JSON.parse(data);
  console.log(addedProductToCart.data);
  Swal.fire({
    title: addedProductToCart.data,
    icon: "success", // succes , warning , info , question
    timer: 3000,
    timerProgressBar: true,
  });
});

// Cartel de error
socket.on("error", (e) => {
  const error = JSON.parse(e);
  console.log(error.data);
  Swal.fire({
    title: "Error",
    text: `${error.data}`,
    icon: "error", // succes , warning , info , question
  });
});
