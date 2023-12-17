const socket = io();
console.log(socket);

// Ver producto
const buttonFn = () => {
  const viewProductBtn = document.getElementsByClassName("viewProduct");
  for (var i = 0; i < viewProductBtn.length; i++) {
    viewProductBtn[i].onclick = async function () {
      var pid = this.value;
      console.log("Ver producto: " + pid);
      window.location.href = `http://localhost:8080/realTimeProducts/${pid}`;
    };
  }
};
buttonFn();