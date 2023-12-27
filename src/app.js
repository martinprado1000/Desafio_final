const express = require("express")
const ioFn = require("./io/io.js");
const cors = require("cors")
const { Command } = require ('commander')
const dotenv = require('dotenv')
const configEnvFn = require ("./config.env/configEnv")
const handlebars = require("express-handlebars");
const session = require("express-session");
const UsersService = require("./services/usersService.js")

const cookieParser = require("cookie-parser"); // Requerimos cookie-parse
const MongoStore = require("connect-mongo");
const passport = require("passport");
const initializePassport = require("./config.passport/passportConfig.js");
const flash = require("connect-flash");

const app = express();

app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname+"/views");
app.set("view engine", "handlebars");

// Obtengo los argumentos, las variables de entorno y se lo paso al archivo config de mongo.
const program = new Command();
program.option("--mode <mode>", "Modo de trabajo", "dev"); // Por default ejecutamos en modo dev
program.parse(); // Finaliza la configuracion de argumentos
const options = program.opts(); // Obtengo los argumentos
dotenv.config({ // Le indico a dotenv el path donde se encuentra las variables de entorno
  path: `src/.env.${options.mode}` // path: inicia donde se hace el init de la app
});
console.log(`Sistema ejecutado en modo: ${options.mode}`);

const config = configEnvFn(); //Obtenemos las variables de entorno

const DbMongoSingleton = require('./connections/singleton') 
const dbConnectionSingleton = DbMongoSingleton.getConnection(config)
const CONNECTION_MONGO = DbMongoSingleton.urlConnection() // Obtengo la url de conexion

app.use(flash());
// Middleware de sessionon
app.use(cookieParser("estaEsMiLlaveSecreta"));
//Middleware de session
app.use(
  session({
    store: MongoStore.create({
      // MongoStore.create, crea una session en la db de mongo
      mongoUrl: CONNECTION_MONGO, // Le indicamos que db crear la session
      ttl: 1200,      // time to live; tiempo de vida, esta en SEGUNDOS.
      //retrien: 0    // Cantidad de reintentos que hace para leer el archivo de ssesion
    }),
    secret: "estaEsMiLlaveSecreta",
    resave: true, // Si esta opcion la ponemos en false es para que la sesion se mantenga activa en caso de inactividad.
    saveUninitialized: true, // Permite guardar la sesion aunque el objeto de session no tenga nada.
  })
);
initializePassport();
app.use(passport.initialize()); 
app.use(passport.session());

const PORT = process.env.PORT || 3000
const httpServer = app.listen(PORT, () =>
  console.log(`Servidor express corriendo en el puerto ${PORT}`)
);

const io = ioFn(httpServer);

const productsRoutesViews = require("./routes/productsRoutesView.js")
const productsRoutes = require("./routes/productsRoutes")
const cartsRoutesViews = require("./routes/cartsRoutesView")
const cartsRoutes = require("./routes/cartsRoutes")
const sessionsRoutesViews = require("./routes/sessionsRoutesView.js")
const sessionsRoutes = require("./routes/sessionsRoutes.js")
const usersRouterView = require("./routes/usersRoutesView.js")
const usersRoutes = require("./routes/usersRoutes.js")

app.use("/api",productsRoutes)
app.use("/api",cartsRoutes)
app.use("/api",sessionsRoutes)
app.use("/api",usersRoutes)
app.use("/",productsRoutesViews)
app.use("/",cartsRoutesViews)
app.use("/",sessionsRoutesViews)
app.use("/",usersRouterView)

// Ejecuto el chequeo de usuarios inactivos cada 1 hora
setInterval(UsersService.deleteInactiveUsers, 60 * 60 * 1000);

//Ruta incorrecta
app.use((req, res) => {
  res.status(404).send({ Error: "La ruta deseada no existe" });
});