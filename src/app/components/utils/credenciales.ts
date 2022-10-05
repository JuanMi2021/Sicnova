// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: "AIzaSyC6RkdiG82rcg8kwdzQqXAMzUZeK3WpDw4",
  authDomain: "fireauth-7f526.firebaseapp.com",
  projectId: "fireauth-7f526",
  storageBucket: "fireauth-7f526.appspot.com",
  messagingSenderId: "1090586945697",
  appId: "1:1090586945697:web:40feb5cf22a3724c48a8e0"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;



