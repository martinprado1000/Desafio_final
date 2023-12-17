const socket = io();
console.log(socket); 

const submitFormRegister = document.getElementById("formRegister");
const nameInput = document.getElementById("name");
const lastnameInput = document.getElementById("lastname");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordRepitInput = document.getElementById("passwordRepit");

const obtenerDatos = () => {
  const name = nameInput.value;
  const lastname = lastnameInput.value;
  const age = ageInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const passwordRepit = passwordRepitInput.value;
  return { name, lastname, age, email, password, passwordRepit };
};

// submitFormRegister.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const user = obtenerDatos();
//   submitFormRegister.submit();
// });

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
