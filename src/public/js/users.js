const socket = io();
console.log(socket);

// Obtengo los id de cada elemento
const goToCart = document.getElementById("goToCart");
const btnSubmit = document.getElementById("submit");
const btnUpdate = document.getElementById("update");
const btnCancelUpdate = document.getElementById("cancelUpdate");
const idInput = document.getElementById("id");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const thumbnailInput = document.getElementById("thumbnail");
const codeInput = document.getElementById("code");
const stockInput = document.getElementById("stock");
const categoryInput = document.getElementById("category");
const querySubmit = document.getElementById("querySubmit");

// Obtengo los datos del formulario
const obtenerDatos = () => {
  const id = idInput.value;
  const title = titleInput.value;
  const description = descriptionInput.value;
  const price = priceInput.value;
  const thumbnail = thumbnailInput.value;
  const code = codeInput.value;
  const stock = stockInput.value;
  const category = categoryInput.value;
  const product = {
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
  };
  return product;
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
  // ---- Editar producto --------
  // const editBtn = document.getElementsByClassName("edit");
  // for (var i = 0; i < editBtn.length; i++) {
  //   editBtn[i].onclick = async function () {
  //     var editProduct = this.value;
  //     btnSubmit.disabled = true;
  //     btnUpdate.disabled = false;
  //     btnCancelUpdate.disabled = false;
  //     codeInput.disabled = true;
  //     console.log("Editar producto: " + editProduct);
  //     socket.emit("getProductById", JSON.stringify(editProduct));
  //     socket.on("getProductById", async (res) => {
  //       const getId = JSON.parse(res);
  //       const data = getId.data;
  //       idInput.value = data._id;
  //       titleInput.value = data.title;
  //       descriptionInput.value = data.description;
  //       priceInput.value = data.price;
  //       codeInput.value = data.code;
  //       categoryInput.value = data.category;
  //       stockInput.value = data.stock;
  //       thumbnailInput.value = data.thumbnail;
  //     });
  //   };
  // }
  const editBtn = document.getElementsByClassName("edit");
  for (var i = 0; i < editBtn.length; i++) {
    editBtn[i].onclick = async function () {
      var pid = this.value;
      console.log("Editar usuario: " + pid);
      window.location.href = `http://localhost:8080/users/${pid}`;
    };
  }

  // ---- Eliminar producto ----------
  const deleteBtn = document.getElementsByClassName("delete");
  for (var i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].onclick = async function () {
      var pid = this.value;
      console.log("Eliminar usuario: " + pid);
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el usuario",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, continuar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`/api/users/${pid}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.status == 201) {
                Swal.fire({
                  text: res.data,
                  icon: "success",
                  timer: 1500,
                  timerProgressBar: true,
                });
                setTimeout(() => {
                  window.location.href =
                    "http://localhost:8080/users";
                }, 2000);
              } else {
                Swal.fire({
                  text: res.data,
                  icon: "info",
                  timer: 1500,
                  timerProgressBar: true,
                });
              }
            });
        } else {
          Swal.fire({
            text: "La operación ha sido cancelada",
            icon: "error",
            timer: 2000,
            timerProgressBar: true,
          });
        }
      });
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
