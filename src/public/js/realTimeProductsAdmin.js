const socket = io();
console.log(socket);

//Editar producto
const buttonFn = () => {
  const editBtn = document.getElementsByClassName("edit");
  for (var i = 0; i < editBtn.length; i++) {
    editBtn[i].onclick = async function () {
      var pid = this.value;
      console.log("Editar producto: " + pid);
      window.location.href = `/realTimeProductsAdmin/${pid}`;
    };
  }

  // ---- Eliminar producto ----------
  const deleteBtn = document.getElementsByClassName("delete");
  for (var i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].onclick = async function () {
      var pid = this.value;
      console.log("Eliminar producto: " + pid);
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el producto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, continuar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`/api/products/${pid}`, {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.status == 201) {
                Swal.fire({
                  title: res.data,
                  icon: "success",
                  timer: 2000,
                  timerProgressBar: true,
                });
                setTimeout(() => {
                  window.location.href =
                    "/realTimeProducts";
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
        } else {
          Swal.fire({
            text: "Operación cancelada",
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