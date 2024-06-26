import express from 'express';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config()

const app = express();
const port = process.env.PORT || 3000;

// Obtener la ruta del archivo actual y su directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
    { src: "/img/img1.jpeg", url: "https://www.youtube.com/watch?v=aZLI14nFC4E" },
    { src: "/img/img2.jpeg", url: "https://www.youtube.com/watch?v=ga5Bo4YdgH4" },
    { src: "/img/img3.jpeg", url: "https://www.youtube.com/watch?v=5iQw_0vgB3M" },
];

// Configurar Handlebars como motor de plantillas
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Usar el directorio actual para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal 
app.get('/raiz', (req, res) => {
    res.render("titulo");
});

// Ruta adicional de las imagenes
app.get("/rutaalterna", (req, res) => {
    const randomImage = images[Math.floor(Math.random() * images.length)]
    res.render("saludo", { image: randomImage });
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
