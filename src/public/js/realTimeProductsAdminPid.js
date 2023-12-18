const socket = io();
console.log(socket);

// Obtengo los id de cada elemento
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

btnUpdate.addEventListener("click", async (e) => {
  e.preventDefault();
  const body = obtenerDatos();
  await fetch(`/api/products/${body.id}`, {
    method: "PUT",
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
          window.location.href = "/realTimeProducts";
        }, 2000);
      } else {
        Swal.fire({
          title: res.data,
          icon: "error",
          timer: 3000,
          timerProgressBar: true,
        });
      }
    });
});