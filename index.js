// Hola Prueba 2
import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';
dotenv.config()

const app = express();
const port = process.env.PORT || 3000;
const __filename =  fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const images = [
    { src: "/img/img1.jpeg", url: "" },
    { src: "/img/img2.jpeg", url: "" },
    { src: "/img/img3.jpeg", url: "" },
];

// Configurar Handlebars como motor de plantillas
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(__dirname + "/public"));