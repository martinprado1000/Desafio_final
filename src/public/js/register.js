const socket = io();
console.log(socket);

const submitFormRegister = document.getElementById("formRegister");
// const btnRegister = document.getElementById("btnRegister");
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

submitFormRegister.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = obtenerDatos();
  // if (user.password != user.passwordRepit) {
  //   Swal.fire({
  //     title: `Las contraseñas no coinciden`,
  //     icon: "error", // succes , warning , info , question
  //     timer: 3000,
  //     timerProgressBar: true,
  //   });
  // } else {
    //console.log(user);
    submitFormRegister.submit()
  //a}
});

// (function() {
//   'use strict';
//   window.addEventListener('load', function() {
//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     var forms = document.getElementsByClassName('needs-validation');
//     // Loop over them and prevent submission
//     var validation = Array.prototype.filter.call(forms, function(form) {
//       form.addEventListener('submit', function(event) {
//         if (form.checkValidity() === false) {
//           event.preventDefault();
//           event.stopPropagation();
//         }
//         form.classList.add('was-validated');
//       }, false);
//     });
//   }, false);
// })();



// socket.on("registerUser", (response) => {
//   console.log(response);
//   const user = JSON.parse(response);
//   Swal.fire({
//     title: `${user.data}`,
//     icon: "success", // succes , warning , info , question
//     timer: 3000,
//     timerProgressBar: true,
//   });
//   name.value = "";
//   lastname.value = "";
//   age.value = "";
//   email.value = "";
//   password.value = "";
//   setTimeout(() => {
//     window.location.href = "http://localhost:8080/login";
//   }, 3000);
// });

// socket.on("errorRegister", (e) => {
//   const error = JSON.parse(e);
//   console.log(error.data);
//   Swal.fire({
//     title: "Error",
//     text: `${error.data}`,
//     icon: "error", // succes , warning , info , question
//   });
// });
