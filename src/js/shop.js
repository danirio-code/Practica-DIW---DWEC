// Probando tooltips con bootstrap
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
import { productosGym } from './productosGym.js';
import { db, insertProduct, deleteProduct, updateProduct } from './indexedDB_CRUD.js';
const formatearMoneda = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
const divProductos = document.getElementById('productos');
const carritoModal = document.getElementById('modalAbrirCarrito');
const notificacion = document.getElementById('notificacion');
const mainContent = document.getElementById('mainContent');

// Carga la base de datos de IndexedDB en caso de que la versión no sea la misma de la ya existente en el navegador
db.onupgradeneeded = (e) => {
  const dataBase = e.target.result;
  dataBase.createObjectStore('carrito', { keyPath: 'id' });
};

// Cargar los productos del array ProductosGym al html con una función autoInvoke
(function loadProducts() {
  divProductos.innerHTML = '';
  productosGym.forEach((product) => {
    const newProduct = `
    <div class="col-md-6 mb-4">
    <div class="card h-100" data-product-id="${product.id}">
      <div class="row no-gutters">
        <div class="col-md-4 d-flex align-items-center">
          <img src="${product.img}" class="card-img img-fluid" alt="${product.alt}" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title fs-5 font-weight-bold text-dark">${product.nombre}</h5>
            <p class="card-text fs-6 text-secondary">${product.descripcion}</p>
            <ul class="list-unstyled">
            ${generatePropertiesList(product.propiedades)}
            </ul>
            <p class="card-text fs-6 text-muted">Precio: ${formatearMoneda.format(
              product.precio
            )}</p>
            <a class="btn btn-primary" data-action="añadir-carrito">Añadir al carrito</a>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    divProductos.innerHTML += newProduct;
  });
})();

// Función para generar dinámicamente la lista de propiedades
function generatePropertiesList(properties) {
  let propertiesList = '';
  for (const key in properties) {
    propertiesList += `<li><strong class="text-muted">${key}:</strong> ${properties[key]}</li>`;
  }
  return propertiesList;
}

// Funcíon para generar dinámicamente las propiedades de los productos como un span (para el carrito)
function generatePropertiesSpan(properties) {
  let propertiesSpan = '';
  for (const key in properties) {
    propertiesSpan += `<span>${key}</span>: <span>${properties[key]}</span><span class="ms-3"></span>`;
  }
  return propertiesSpan;
}

// Función que carga los datos de la base de datos para poder mostrarlos en el modal
function loadModal() {
  // SELECT en IndexedDB
  const transaction = db.result.transaction('carrito', 'readonly');
  const productsCarrito = transaction.objectStore('carrito').getAll();

  productsCarrito.onsuccess = (e) => {
    let productsFromDB = e.target.result;
    let precioTotal = 0;

    const modalBody = carritoModal.querySelector('.modal-body');
    modalBody.innerHTML = '';
    // Para cada registro de la tabla 'carrito' se crea una row con información para el carrito
    if (productsFromDB.length > 0) {
      productsFromDB.forEach((product) => {
        let newCartRow = `
        <div
        class="d-flex justify-content-between border-bottom cartElement"
        data-product-id="${product.id}">
          <div class="d-flex gap-3 align-items-center">
            <img src="${product.img}" alt="${product.alt}" class="rounded-2" style="width: 65px" />
            <div>
              <p class="mb-1 fs-6"><span>${product.cantidad} x </span><b>${product.nombre}</b></p>
              <small
                class="text-uppercase"
                style="font-size: 12px; font-weight: lighter; color: grey">
                ${generatePropertiesSpan(product.propiedades)}
              </small>
            </div>
          </div>
          <div class="d-flex flex-column justify-content-center">
            <p class="mb-1">Editar cantidad:</p>
            <input type="number" data-action="modificar-cantidad" value="${
              product.cantidad
            }" min="1" class="w-25" />
          </div>
          <div>
            <button class="btn-eliminar-producto" title="Eliminar del Carrito" data-action="eliminar-item-carrito">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16">
                <path
                  d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
              </svg>
            </button>
            <p class="fs-6">${formatearMoneda.format(product.precio * product.cantidad)}</p>
          </div>
        </div>
      `;
        precioTotal += product.precio * product.cantidad;
        modalBody.innerHTML += newCartRow;
      });
    } else {
      modalBody.innerHTML = '<h4>El carrito está vacío</h4>';
    }
    const modalPrecioTotal = carritoModal.querySelector('.precioTotal');
    modalPrecioTotal.innerHTML = formatearMoneda.format(precioTotal);
  };
}

// Carga el contenido cuando se abre el modal
if (carritoModal) {
  carritoModal.addEventListener('show.bs.modal', loadModal);
}

// Se añade el evento para añadir un producto a la base de datos usando propagación de eventos
mainContent.addEventListener('click', (e) => {
  if (e.target.dataset.action === 'añadir-carrito') {
    const idProduct = parseInt(e.target.closest('.card').dataset.productId);
    const productClick = productosGym.find((product) => product.id === idProduct);
    // Se añade el producto a la base de datos
    insertProduct(productClick);

    // Hacemos que cuando se agregue un producto al carrito aparezca la notificación
    notificacion.querySelector('.notificacion__thumb').src = productClick.img;
    notificacion.classList.add('notificacion--active');
    // Despues de 5 segundos ocultamos la notificación
    setTimeout(() => notificacion.classList.remove('notificacion--active'), 5000);
  }
});

// Se añade el evento para eliminar un producto de la base de datos usando propagación de eventos
carritoModal.addEventListener('click', (e) => {
  if (e.target.closest('button')?.dataset.action === 'eliminar-item-carrito') {
    const idProduct = parseInt(e.target.closest('.cartElement').dataset.productId);
    // Se elimina el producto de la base de datos
    deleteProduct(idProduct);
    loadModal();
  } else if (e.target.dataset.action === 'comprar-productos') {
    // Si se clica el botón de comprar sale una animación de progreso y se eliminan todos los registros de la tabla
    const allProducts = carritoModal.querySelectorAll('.cartElement');
    if (allProducts.length > 0) {
      const modalBody = carritoModal.querySelector('.modal-body');
      modalBody.innerHTML = `
      <div>
      <h3>Procediendo con el pago...</h3>
      </div>
      <div class="progress" id="progressCompra" role="progressbar" aria-label="progress compra" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar progress-bar-striped" style="width: 0%">0%</div>
      </div>`;
      let currentValue = 0;
      let progressInterval = setInterval(() => {
        let progressBar = document.getElementById('progressCompra');
        // Actualizar el valor de aria-valuenow
        progressBar.setAttribute('aria-valuenow', currentValue);
        // Actualizar el ancho de la barra de progreso
        progressBar.querySelector('.progress-bar').style.width = currentValue + '%';
        // Mostrar el valor actual en el texto dentro del div con la clase "progress-bar"
        progressBar.querySelector('.progress-bar').innerText = currentValue + '%';
        // Incrementar el valor para la próxima actualización
        currentValue++;
        // Detener el intervalo cuando alcanza el 100%
        if (currentValue > 100) {
          clearInterval(progressInterval);
        }
      }, 40);
      setTimeout(() => {
        allProducts.forEach((product) => {
          let productID = parseInt(product.dataset.productId);
          deleteProduct(productID);
        });
        loadModal();
        setTimeout(() => {
          modalBody.innerHTML = '<h3>Compra realizada con éxito</h3>';
        }, 10);
      }, 5000);
    }
  }
});

// Se añade el evento para cambiar la cantidad de un producto de la base de datos usando propagación de eventos
carritoModal.addEventListener('input', (e) => {
  if (e.target.dataset.action === 'modificar-cantidad') {
    const nuevaCantidad = parseInt(e.target.value);
    if (Number.isInteger(nuevaCantidad) && nuevaCantidad > 0) {
      const idProduct = parseInt(e.target.closest('.cartElement').dataset.productId);
      // Se edita la cantidad del producto a la base de datos
      updateProduct(idProduct, nuevaCantidad);
      loadModal();
    }
  }
});
