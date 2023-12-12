//Aparte de modificar el dato id, tambien sacamos los datos createdAt y updatedAt porque son datos irrelevantes para el cliente.

class UsersDTO {
  constructor(user) {
    this.id = user._id || user.id; // Esto lo que hace es que si el dato vine distinto segun la persistencia estemos usando no importa porque lo vamos retornar siempre igual.
    this.name = user.name;
    this.lastname = user.lastname;
    this.age = user.age;
    this.email = user.email;
    this.username = user.username || user.email;
    //this.password = user.password;
    this.rol = user.rol;
  }
}

module.exports = UsersDTO;
