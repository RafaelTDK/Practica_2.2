import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const __filename =  fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const images = [
    { src: "/img/img1.jpeg", url: "https://www.apple.com/us-edu/store" },
    { src: "/img/img2.jpeg", url: "https://www.consejonacionalmorena.mx" },
    { src: "/img/img3.jpeg", url: "https://www.youtube.com/watch?v=EQqj7TMqfYM" },
    { src: "/img/img4.jpeg", url: "https://www.youtube.com" },
];


// Configurar Handlebars como motor de plantillas
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(__dirname + "/public"));

// Ruta principal 
app.get('/', (req, res) => {
    res.render("inicio");
});

// Ruta adicional de las imagenes
app.get("/hola/", (req, res) => {
    const randomImage = images[Math.floor(Math.random()*images.length)]
    res.render("hola", {image: randomImage});
});

// Custom 404 page 
app.use((req, res) => {
    res.status(404).render('404');
});

// Custom 500 page
app.use((err, req, res, next) => {
    res.status(500).render('500');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}; press Ctrl-C to terminate`);
});
