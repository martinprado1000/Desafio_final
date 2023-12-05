const socket = io();
console.log(socket);

// const submitForm = document.getElementById("formUser");
const submitFormRegister = document.getElementById("formRegister");
const name = document.getElementById("name");
const lastname = document.getElementById("lastname");
const age = document.getElementById("age");
const email = document.getElementById("email");
const password = document.getElementById("password");

submitFormRegister.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitFormRegister.submit() 
  // const data = {
  //   name: name.value,
  //   lastname: lastname.value,
  //   age: age.value,
  //   email: email.value,
  //   password: password.value,
  // };
  // //console.log(data);
  // //socket.emit("regiterUser", data);
  // await fetch("/api/register", {
  //   method: "POST",
  //   headers: { "Content-type": "application/json;charset=UTF-8" },
  //   body: JSON.stringify(data),
  // })
  //   .then((response) => response.json())
  //   .then((res) => {
  //     if (res.status == 200) {
  //       Swal.fire({
  //         title: `${res.data}`,
  //         icon: "success", // succes , warning , info , question
  //         timer: 2000,
  //         timerProgressBar: true,
  //       });
  //       name.value = "";
  //       lastname.value = "";
  //       age.value = "";
  //       email.value = "";
  //       password.value = "";
  //       setTimeout(() => {
  //         window.location.href = "http://localhost:8080/login";
  //       }, 2000);
  //     } else {
  //       console.log(res.data);
  //       Swal.fire({
  //         title: "Error",
  //         text: `${res.data}`,
  //         icon: "error", // succes , warning , info , question
  //       });
  //     }
  //   });
});

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
