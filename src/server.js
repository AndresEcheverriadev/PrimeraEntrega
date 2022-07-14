import express from 'express'
import { productsRouter,cartsRouter } from './RoutesManager.js'

const app = express();
const port = 8080;
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartsRouter);

const server = app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
});

server.on("error", (error) => {
    console.error(`Error en el servidor ${error}`);
});