const UsersRepository = require("../repositories/usersRepository");
const CartsRepository = require("../repositories/cartsRepository");
const mongoose = require("mongoose");
const { hashPassword, isValidPassword } = require("../utils/passwordHash");

// Funcion para validar si los id son validos para mongo
const isValid = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

class UsersService {
  constructor() {
    this.usersRepository = new UsersRepository();
    this.cartsRepository = new CartsRepository();
  }

  async get() {
    try {
      const result = await this.usersRepository.get();
      if (!result || result == "") {
        return { status: 404, data: "Usuarios no encontrados" };
      }
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async getPaginate(data) {
    try {
      // ?limit=2&page=2&query=fruta&sort=asc  // esto podemos recibir en la consulta
      const limit = parseInt(data.limit) || 10;
      const page = parseInt(data.page) || 1;
      const rol = data.rol || "";
      let sort = data.sort == "asc" ? -1 : 1 || "";
      sort = { price: sort };
      //const sort = parseInt(data.sort) || " ";
      const options = { limit, page, rol, sort };
      //const users = await productModel.paginate(query,{ limit , page , sort:{price:sort} })
      let query = {}; // Define un objeto vacío para la consulta
      if (rol) {
        query.rol = rol; // Agrega la categoría a la consulta si se proporciona
      }
      const users = await this.usersRepository.getPaginate(query, options);
      if (!users || users == "") {
        return { status: 404, data: "Usuarios no encontrados" };
      }
      const payload = users.docs;
      // paguinate me retorna un objeto que contiene toda la info de paguinacion y un array llamado docs que ahi se encuentran los datos solicitados.
      const usersPaginate = {
        status: "success",
        payload,
        totalPages: users.totalPages,
        prevPage: users.prevPage,
        nextPage: users.nextPage,
        page: users.page,
        hasPrevPage: users.hasPrevPage,
        hasNextPage: users.hasNextPage,
        prevLink:
          users.hasPrevPage == true
            ? `http://localhost:8080/users/?page=${users.prevPage}`
            : null,
        nextLink:
          users.hasNextPage == true
            ? `http://localhost:8080/users/?page=${users.nextPage}`
            : null,
      };
      return { status: 200, data: usersPaginate };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async getById(id) {
    if (!isValid(id)) {
      return { status: 404, data: "ID de usuario invalido" };
    }
    try {
      if (!id) {
        return { status: 404, data: "Debe enviar un ID valido" };
      }
      const result = await this.usersRepository.getById(id);
      if (!result) {
        return { status: 404, data: "Usuario no encontrado" };
      }
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async getByEmail(email) {
    try {
      const result = await this.usersRepository.getByEmail(email);
      if (!result) {
        return { status: 404, data: "Usuario no encontrado" };
      }
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async post(body) {
    const { email, name, lastname, age, password, rol, passwordRepit } = body;
    //IMPORTANTE: username es el email

    if (
      !email ||
      !name ||
      !lastname ||
      !age ||
      !password ||
      !passwordRepit ||
      !rol
    ) {
      console.log(`Campos incompletos`);
      return { status: 404, data: `Campos incompletos` };
    }

    function validateEmail(correo) {
      // Expresión regular para validar el formato de un correo electrónico
      const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return patronCorreo.test(correo);
    }
    if (!validateEmail(email)) {
      console.log(`Formato de email inválido`);
      return { status: 404, data: `Formato de email inválido` };
    }

    //username es el email
    if (password != passwordRepit || password == "") {
      return { status: 404, data: `Contraseñas incorrectas` };
    }
    try {
      let exist = await this.getByEmail(email); //username es el email
      if (exist.status == 200) {
        return { status: 404, data: `El usuario ${email} ya existe` };
      }
      let passwordHashed = hashPassword(password); // Llamamos a la función para hashear la password
      await this.usersRepository.post({ ...body, password: passwordHashed }); // Creo el usuario
      await this.cartsRepository.post(email); // Creo el carrito default
      return { status: 201, data: "Usuario ingresado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async postRegister(body) {
    const { email, password } = body;
    try {
      body.password = hashPassword(password);
      await this.usersRepository.post(body); // Creo el usuario
      await this.cartsRepository.post(email); // Creo el carrito default
      return { status: 201, data: "Usuario ingresado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async put(id, body) {
    // Valido si es un id valido de mongoo
    if (!isValid(id)) {
      return { status: 404, data: "ID de usuario invalido" };
    }
    try {
      // Valido si existe el id
      if (!id) {
        return { status: 400, data: "Debe enviar un ID valido" };
      }
      const userFound = await this.usersRepository.getById(id); //-------
      // Valido si existe el usuario
      if (!userFound) {
        return { status: 404, data: "Usuario no encontrado" };
      }
      // Valido que el email de usuario no se modifique
      if (userFound.email != body.email) {
        // No permito editar el email de usuario
        return {
          status: 404,
          data: "El email del usuario no se puede editar",
        };
      }
      await this.usersRepository.put(id, body);
      return { status: 201, data: "Usuario editado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async delete(id) {
    if (!isValid(id)) {
      return { status: 404, data: "ID de usuario invalido" };
    }
    try {
      if (!id) {
        return { status: 400, data: "Debe enviar un ID valido" };
      }
      const isSuperAdmin = await this.usersRepository.getById(id);
      console.log(isSuperAdmin)
      if (isSuperAdmin?.email == "superadmin@superadmin.com") {
        return {
          status: 404,
          data: "No se puede eliminar este usuario, usuario SuperAdmin",
        };
      }
      const result = await this.usersRepository.delete(id);
      if (result.deletedCount == 0) {
        return { status: 404, data: "Usuario no encontrado" };
      }
      return { status: 201, data: "Usuario eliminado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  static deleteInactiveUsers = async () => {
    try {
      const usersService = new UsersService();
      const users = await usersService.get();
      const fechaActual = new Date();
      const fecha2DiasAntes = new Date();
      const deletedUsers = users.data.map(async (user) => {
        if (user.rol == "admin" || user.rol == "premium") return; // Evito eliminar usuarios admin o premium
        const updatedAt = user.updatedAt;
        // Resta 2 días a la fecha actual
        fecha2DiasAntes.setDate(fechaActual.getDate() - 2);
        //fecha2DiasAntes.setMinutes(fechaActual.getMinutes() - 1); // Ejecuta cada 1 Minutos
        //Compara si la fecha updatedAt está dentro de los últimos 2 días
        if (updatedAt >= fecha2DiasAntes && updatedAt <= fechaActual) {
          console.log(
            `Usuario: ${user.name}, NO superar los 2 días de inactividad`
          );
          return;
        } else {
          const deletedUser = await usersService.delete(user._id);
          console.log(
            `Usuario ${user.name} eliminado por superar los 2 días de inactividad. id: ${user._id}`
          );
          return;
        }
      });
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  };

  async userCreateRegister(req, username, password) {
    const { name, lastname, age, passwordRepit } = req.body;
    //IMPORTANTE: username es el email

    if (!name || !lastname || !age || !password || !passwordRepit) {
      console.log(`Campos incompletos`);
      return { message: `Campos incompletos` };
    }

    function validateEmail(correo) {
      // Expresión regular para validar el formato de un correo electrónico
      const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return patronCorreo.test(correo);
    }
    if (!validateEmail(username)) {
      console.log(`Formato de email inválido`);
      return { message: `Formato de email inválido` };
    }

    //username es el email
    if (password != passwordRepit || password == "") {
      return { message: `Contraseñas incorrectas` };
    }
    try {
      let exist = await this.getByEmail(username); //username es el email
      if (exist.status == 200) {
        return { message: `El usuario ${username} ya existe` };
      }
      const body = req.body;
      body.password = hashPassword(body.password); // Llamamos a la funcion para hashear la password
      let user = await this.postRegister(body);
      if (user.status != 201) {
        return { message: user.data };
      }
      user = await this.getByEmail(username); // Consulto el nuevo usuario para retornarlo
      return user.data;
    } catch (e) {
      console.log(e);
      return { message: `Error inesperado al registrar el usuario. ${e}` };
    }
  }

  async userCreateRegisterGitHub(profile) {
    const username = profile.username;
    try {
      let user = await this.usersRepository.getByUsername(username); // hago el registro con username porq github no me retorna el email
      if (user?.username == username ) {
        //console.log(`El usuario ${profile.username} ya existe`);
        return user
      }
      // El usuario no existe, lo creo.
      let newUser = {
        username: profile.username,
        name: profile._json.name,
      };
      //newUser = await usersModel.create(newUser)
      newUser = await this.usersRepository.post(newUser); // Creo el usuario
      if (!newUser.username) {
        return { message: "Error al crear el registro de usuario" };
      }
      //user = await this.getByEmail(username); // Consulto el nuevo usuario para retornarlo
      return newUser;
    } catch (e) {
      console.log(e);
      return { message: `Error inesperado al registrar el usuario. ${e}` };
    }
  }

  async userLogin(username, password) {
    try {
      let user = await this.usersRepository.getByEmail(username);
      if (!user) {
        return { message: `Usuario o password incorrecto` };
      }
      if (isValidPassword(user.password, password)) {
        return { message: `Usuario o password incorrectooooooo` };
      }
      console.log(`${user.email} a iniciado sesion`);
      delete user.password; // Borro la contraseña
      return user;
    } catch (e) {
      return { message: `Error inesperado al loguear el usuario. ${e}` };
    }
  }
}

module.exports = UsersService;
