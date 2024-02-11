// IndexedDB
// crear la base de datos
export const db = indexedDB.open('CarritoDB', 1);

// INSERT en IndexedDB
export function insertProduct(productToInsert) {
  const transaction = db.result.transaction('carrito', 'readwrite');
  transaction.objectStore('carrito').add(productToInsert);
}

// DELETE from IndexedDB
export function deleteProduct(productToDelete) {
  const transaction = db.result.transaction('carrito', 'readwrite');
  transaction.objectStore('carrito').delete(productToDelete);
}

// DELETE all from IndexedDB
export function deleteAllProducts(productsToDelete) {
  productsToDelete.forEach((product) => {
    let productID = parseInt(product.dataset.productId);
    deleteProduct(productID);
  });
}

// UPDATE in IndexedDB
export function updateProduct(productId, nuevaCantidad) {
  const transaction = db.result.transaction('carrito', 'readwrite');
  const objectStore = transaction.objectStore('carrito');
  // Obtener el registro actual
  const getRequest = objectStore.get(productId);
  getRequest.onsuccess = function (event) {
    const producto = event.target.result;
    // Actualizar el campo necesario
    producto.cantidad = nuevaCantidad;
    // Utilizar el método put sin proporcionar la clave
    objectStore.put(producto);
  };
}
