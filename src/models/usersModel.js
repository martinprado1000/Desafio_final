const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const usersSchema = new Schema(
  {
    name: String,
    lastname: String,
    email: {
      type: String,
      unique: true,
    },
    username: String,
    age: Number,
    password: String,
    rol: {
      type: String,
      default: "user",
      enum: ["admin", "user", "premium"],
    },
  },
  { timestamps: true }
);

usersSchema.plugin(mongoosePaginate);

/** 
// Asi seria el tipo de objeto que le tengo que pasar a este Model.
{
  name: 'martin',
  lastname: 'prado',
  age: '22',
  email: 'asd@gmail.com',
  password: '12345'
}
**/

module.exports = model("users", usersSchema);
