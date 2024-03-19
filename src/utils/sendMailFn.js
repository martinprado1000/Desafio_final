const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "martinprado1000@gmail.com",
    //pass: "renb bqzb dehj tpvs",
    pass: "ktrv czmi swtr rzob",
  },
});

const sendMailDeleteProductFn = async (owner , code) => {
  const result = await transporter.sendMail({
    from: "martinprado1000@gmail.com",
    to: owner,
    subject: "Eliminación de producto",
    html: `<div>
                <h1>Se eliminó el producto con código ${code} que fué creado por usted.</h1>
            </div>`,
    // attachments: [
    //   {
    //      filename: 'chems.PNG',
    //      path: './src/chems.PNG',
    //      cid: 'chems'
    //   },
    // ],
  });
  //console.log(result);
  return { status: "success", result: "mail enviado" };
};

const sendMailBuyProductFn = async (owner,cid) => {
  const result = await transporter.sendMail({
    from: "martinprado1000@gmail.com",
    to: owner,
    subject: "Compra de producto",
    html: `<div>
                <h1>Se realizó la compra del carrito con codigo: ${cid}</h1>
            </div>`,
    // attachments: [
    //   {
    //      filename: 'chems.PNG',
    //      path: './src/chems.PNG',
    //      cid: 'chems'
    //   },
    // ],
  });
  //console.log(result);
  return { status: "success", result: "mail enviado" };
};

module.exports = { sendMailDeleteProductFn , sendMailBuyProductFn };
