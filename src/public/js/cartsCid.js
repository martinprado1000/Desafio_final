const socket = io();
console.log(socket);

const cartId = document.getElementById("cartId");
const buyBtn = document.getElementById("buy");
const updateButton = document.querySelectorAll(".productIdUpdate");
const deleteButton = document.querySelectorAll(".productIdDelete");

const obtenerDatos = () => {
  const cid = cartId.value;
  return cid;
};

// Solicitar la compra
buyBtn.addEventListener("click", async function (event) {
  const cid = obtenerDatos();
  await fetch(`/api/cartsBuy/${cid}`, {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == 200) {
        Swal.fire({
          title: `${res.data}`,
          text: "¿Confirmar la compra?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, continuar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            ;(async ()=>{
            await fetch(`/api/cartsBuyConfirm/${cid}`, {
              method: "POST",
              headers: { "Content-type": "application/json" },
            })
              .then((res2) => res2.json())
              .then((res2) => {
                console.log(res2)
                if (res2.status == 204) {
                  Swal.fire({
                    title: `${res2.data}`,
                    icon: "success",
                    timer: 2000,
                    timerProgressBar: true,
                  });
                  setTimeout(() => {
                    window.location.href = "http://localhost:8080/carts";
                  }, 2000);
                } else {
                  Swal.fire({
                    title: `${res2.data}`,
                    icon: "error",
                    timer: 2000,
                    timerProgressBar: true,
                  });
                }
              });
            })();
          } else {
            Swal.fire({
              text: "Operación cancelada",
              icon: "error",
              timer: 1500,
              timerProgressBar: true,
            });
          }
        });
      }
    });
});

// Iterar sobre los botones y añadir un manejador de eventos para cada uno
updateButton.forEach((button) => {
  button.addEventListener("click", async function (event) {
    const row = event.target.closest("tr");
    let body = row.querySelector(".quantity").value;
    body = parseInt(body);
    body = { quantity: body };
    const pid = event.target.value;
    const cid = obtenerDatos();
    console.log(body);
    console.log("Editar cantidad del producto:", pid);
    await fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "PUT",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status == 201) {
          Swal.fire({
            title: res.data,
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          });
          setTimeout(() => {
            window.location.href = `http://localhost:8080/carts/${cid}`;
          }, 2000);
        } else {
          Swal.fire({
            title: res.data,
            icon: "info",
            timer: 2000,
            timerProgressBar: true,
          });
        }
      });
  });
});

deleteButton.forEach((button) => {
  button.addEventListener("click", async function (event) {
    const row = event.target.closest("tr");
    let body = row.querySelector(".quantity").value;
    body = parseInt(body);
    body = { quantity: body };
    const pid = event.target.value;
    const cid = obtenerDatos();
    console.log(body);
    console.log("Eliminar del carrito el producto:", pid);
    console.log(`/api/carts/${cid}/product/${pid}`)
    await fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status == 204) {
          Swal.fire({
            title: res.data,
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
          });
          setTimeout(() => {
            window.location.href = `http://localhost:8080/carts/${cid}`;
          }, 2000);
        } else {
          Swal.fire({
            title: res.data,
            icon: "info",
            timer: 2000,
            timerProgressBar: true,
          });
        }
      });
  });
});
