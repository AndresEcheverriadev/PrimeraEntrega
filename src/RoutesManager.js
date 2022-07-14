import { Router } from "express";
import { Productos } from './FilesManager.js'

const productsRouter = Router();
const cartsRouter = Router();
const ProductApi = new Productos("products");
const CartApi = new Productos("carts");
const isAdmin = true;
const errorHandles = {
  noAdmin : 'Usuario no autorizado',
  noCart : 'Carrito no encontrado',
  noProduct : 'Producto no encontrado'
};

const adminState = (req, res, next) => {
  if (!isAdmin) res.send({ error: errorHandles.noAdmin });
  next();
};

productsRouter.get("/", async (req, res) => {
  try {
    const AllProducts = await ProductApi.getAll();
    res.send(AllProducts);
  } catch (error) {
    res.send(error);
  }
});

productsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const filteredProduct = await ProductApi.getById(id);

    if (!filteredProduct) res.send({ error: errorHandles.noProduct });

    res.send(filteredProduct);
  } catch (error) {
    res.send(error);
  }
});

productsRouter.post("/", adminState, async (req, res) => {
  try {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

    const product = ({
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    });

    const savedProduct = await ProductApi.save(product);

    res.send(savedProduct);
  } catch (error) {
    res.send(error);
  }
});

productsRouter.put("/:id", adminState, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;

    const product = ({
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    });

    const UpdatedProduct = await ProductApi.updateById(id,product);

    res.send(UpdatedProduct);
  } catch (error) {
    res.send(error);
  }
});

productsRouter.delete("/:id",adminState, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await ProductApi.deleteById(id);

    if (!deletedProduct ) res.send({ error: errorHandles.noProduct });

    res.send(deletedProduct);
  } catch (error) {
    res.send(error);
  }
});

const newCart = {
    products: [],
};

cartsRouter.post("/", async (req, res) => {
  try {
      const cart = await CartApi.save(newCart);
      const cartId = cart.id;
      res.send({ id: cartId });
  } catch (error) {
      res.send(error);
  }
});

cartsRouter.delete("/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const deletedCart = await CartApi.deleteById(id);

      if (!deletedCart) res.send({ error: errorHandles.noCart });

      res.send(deletedCart);
  } catch (error) {
      res.send(error);
  }
});

cartsRouter.get("/:id/productos", async (req, res) => {
  try {
      const { id } = req.params;
      const cart = await CartApi.getById(id);
  
      if (!cart) res.send({ error: errorHandles.noCart });
  
      res.send(cart);
  } catch (error) {
      res.send(error);
  }
});

cartsRouter.post("/:id/productos", async (req, res) => {
try {
    const { id } = req.params;
    const { productId } = req.body;

    const cart = await CartApi.getById(id);

    if (!cart) res.send({ error: errorHandles.noCart });

    const product = await ProductApi.getById(productId);

    if (!product) res.send({ error: errorHandles.noProduct });

    cart.products.push(product);

    const updatedCart = await CartApi.updateById(id, cart);

    res.send(updatedCart);
} catch (error) {
    res.send(error);
}
});

cartsRouter.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    const { id,id_prod } = req.params;

    const cart = await CartApi.getById(id);
      if (!cart) res.send({ error: errorHandles.noCart });

    const product = await ProductApi.getById(id_prod);
      if (!product) res.send({ error: errorHandles.noProduct });
    
    const deletedProduct = await cart.product.deleteById(id_prod);

    res.send(deletedProduct);
  } catch (error) {
      res.send(error);
  }
});

export { productsRouter,cartsRouter }