const socket = io();
console.log(socket);

// Obtengo los id de cada elemento
const submitForm = document.getElementById("formUser");
const btnSubmit = document.getElementById("submit");
const btnCancelUpdate = document.getElementById("cancelUpdate");
const idInput = document.getElementById("id");
const nameInput = document.getElementById("name");
const lastnameInput = document.getElementById("lastname");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");
const rolInput = document.getElementById("rol");

// Obtengo los datos del formulario
const obtenerDatos = () => {
  const id = idInput.value;
  const name = nameInput.value;
  const lastname = lastnameInput.value;
  const age = ageInput.value;
  const email = emailInput.value;
  const rol = rolInput.value;
  const product = {
    id,
    name,
    lastname,
    age,
    email,
    rol
  };
  return product;
};

submitForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const body = obtenerDatos();
  console.log(body)
  await fetch(`/api/users/${body.id}`, {
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
          timer: 1500,
          timerProgressBar: true,
        });
        setTimeout(() => {
          window.location.href = "/users";
        }, 1500);
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
