const { Schema, model } = require("mongoose"); // de mongoose solo requier Schema y model
const mongoosePaginate = require("mongoose-paginate-v2");
// Schema: es para armar el esquema de como va a ser nuestra colleccion, se escribe en mayusculo porque es una clase.
// model: es lo que interactua nuestro esquema con la colleccion

//Los tipo de datos los obtenemos d la paguina de mongoose
const productsSchema = new Schema(
  {
    code: {
      type: String,
      unique: true,
      index: true, // Agregue un index a este campo, con solo esto si hacemos una consulta por code va a utilizar el index
      // db.products.getIndex()  Con este comando vemos los indices en una colleccion en mongo
      trim:true // Saca los espacios al principio y al final
    },
    title: String,
    description: String,
    price: {
      type: Number,
      default: 0,
    },
    thumbnail: String,
    stock: Number,
    category: {
      type: String,
      enum: ["pc","monitor","teclado"], // Solo permite dichos valores
    },
    owner: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }, // Esto habilita automáticamente los campos created_at y updated_at
  //{ versionKey: false } // Esto es para que no aparezca el _v cuando guardamos el objeto con monggose
);

productsSchema.plugin(mongoosePaginate); // Asi inyectamos el plugin de mongoose-paginate en nuestro esquema

module.exports = model("products", productsSchema);
// Si no existe la colleccion products crea la colleccion, pero lo muestra cuando ingresemos el primer documento
// Aca indicamos que el nombre de nuestro modelo es products y esta basado en el Schema productSchema.
// Y lo exporto para usar en otro lado de la aplicacion
