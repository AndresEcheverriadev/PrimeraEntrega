const getProducts = async () => {
  const response = await fetch("/api/productos");
  const products = await response.json();
  return products;
};

const addProduct = () => {
  const nombre = document.getElementById("title");
  const precio = document.getElementById("price");
  const stock = document.getElementById("stock");
  const codigo = document.getElementById("code");
  const foto = document.getElementById("thumbnail");

  if (!nombre.value || !precio.value || !stock.value || !codigo.value || !foto.value) {
    alert("Debe completar todos los campos para agregar un producto");
  };

  const producto = {
    nombre: nombre.value,
    precio: precio.value,
    stock: stock.value,
    codigo: codigo.value,
    foto: foto.value
  };

  fetch("/api/productos", {
    method: "POST",
    body: JSON.stringify(producto),
    headers: {'Content-Type': 'application/json'}
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
};

const createProductTable = async (products) => {
  const archivoTemplate = await fetch("views/vistaProductos.hbs");
  const templateText = await archivoTemplate.text();
  const templateCompiled = Handlebars.compile(templateText);
  return templateCompiled({ products });
};

const productsContainer = document.getElementById("productsView");

const getProductos = async () => {
  const products = await getProducts();
  productsContainer.innerHTML = await createProductTable(products);
};

window.addEventListener("load", getProductos);
document.getElementById("add-product").addEventListener("click", addProduct);