const socket = io();
console.log(socket);

// Obtengo los id de cada elemento
const submitForm = document.getElementById("formProducts");
const btnSubmit = document.getElementById("submit");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");
const thumbnailInput = document.getElementById("thumbnail");
const codeInput = document.getElementById("code");
const stockInput = document.getElementById("stock");
const categoryInput = document.getElementById("category");

// Obtengo los datos del formulario
const obtenerDatos = () => {
  const title = titleInput.value;
  const description = descriptionInput.value;
  const price = priceInput.value;
  const thumbnail = thumbnailInput.value;
  const code = codeInput.value;
  const stock = stockInput.value;
  const category = categoryInput.value;
  const product = {
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

//Envio nuevo producto al backend
submitForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newProduct = obtenerDatos();
  console.log(newProduct);
  await fetch("/api/products", {
    method: "POST",
    headers: { "Content-type": "application/json" }, 
    body: JSON.stringify(newProduct),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
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
          icon: "warning",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    });
});

(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();