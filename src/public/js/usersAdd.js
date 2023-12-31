const socket = io();
console.log(socket);

const submitForm = document.getElementById("userProducts");
const btnSubmit = document.getElementById("submit");
const btnCancelUpdate = document.getElementById("cancelUpdate");
const nameInput = document.getElementById("name");
const lastnameInput = document.getElementById("lastname");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");
const rolInput = document.getElementById("rol");
const passwordInput = document.getElementById("password");
const passwordRepitInput = document.getElementById("passwordRepit");

const obtenerDatos = () => {
  const name = nameInput.value;
  const lastname = lastnameInput.value;
  const age = ageInput.value;
  const email = emailInput.value;
  const rol = rolInput.value;
  const password = passwordInput.value;
  const passwordRepit = passwordRepitInput.value;
  const product = {
    name,
    lastname,
    age,
    email,
    rol,
    password,
    passwordRepit
  };
  return product;
};



// const submitFormRegister = document.getElementById("formRegister");
// submitFormRegister.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const user = obtenerDatos();
//   submitFormRegister.submit();
// });




submitForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const body = obtenerDatos();
  console.log(body)
    await fetch(`/api/users`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 201) {
        Swal.fire({
          title: res.data,
          icon: "success",
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
          timer: 2000,
          timerProgressBar: true,
        });
      }
    });
});

(function () {
  var forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
})()