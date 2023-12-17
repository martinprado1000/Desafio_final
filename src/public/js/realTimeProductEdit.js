const socket = io();
console.log(socket);

// Obtengo los id de cada elemento
const goToCart = document.getElementById("goToCart");
const submitForm = document.getElementById("formProducts");
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
const querySubmit = document.getElementById("querySubmit")

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
      var editProduct = this.value;
      console.log("Editar producto: " + editProduct);
      //socket.emit("getProductById", JSON.stringify(editProduct));
      // socket.on("getProductById", async (res) => {
      //   const getId = JSON.parse(res);
      //   const data = getId.data;
      //   idInput.value = data._id;
      //   titleInput.value = data.title;
      //   descriptionInput.value = data.description;
      //   priceInput.value = data.price;
      //   codeInput.value = data.code;
      //   categoryInput.value = data.category;
      //   stockInput.value = data.stock;
      //   thumbnailInput.value = data.thumbnail;
      // });
    };
  }

  // ---- Eliminar producto ----------
  const deleteBtn = document.getElementsByClassName("delete");
  for (var i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].onclick = async function () {
      var pid = this.value;
      console.log(pid);
      socket.emit("deleteProduct", pid);
    };
  }

  // ---- Agregar producto al carrito----------
  const addCartBtn = document.getElementsByClassName("addCart");
  for (var i = 0; i < addCartBtn.length; i++) {
    addCartBtn[i].onclick = async function () {
      var pid = this.value;
      console.log("Agregar producto: " + pid);
      const addProdutToCart = [
        {
          product: pid,
          quantity: 1,
        },
      ];
      await fetch("/api/carts", {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(addProdutToCart),
      })
        .then((res) => JSON.stringify(res))
        .then((res) => {
          console.log("se destruyo la sesion");
        });
    };
  }
};
buttonFn();