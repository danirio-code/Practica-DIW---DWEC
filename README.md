# Práctica final DIW & DWEC, Workout Wizard

Trabajo realizado por Daniel Río Arizti y Raúl Velásquez Vega

## Descripción del proyecto y sus objetivos

Nuestro proyecto "Workout Wizard" es una página web de un gimnasio que consta de varias secciones, incluyendo una landing page, una tienda con funcionalidad de carrito utilizando IndexedDB, un apartado de búsqueda de ejercicios utilizando una API, y un módulo de geolocalización para mostrar la ubicación del gimnasio en un mapa con rutas y excursiones programadas.

### Objetivos:

- Desarrollar una web FrontEnd sencilla que suponga una experiencia intuitiva y atractiva al explorar los servicios del gimnasio.
- Implementar funcionalidades avanzadas aprendidas durante el curso, como la tienda con carrito utilizando IndexedDB, peticiones a una API pública usando asincronía, geolocalización con mapas y rutas, y un Drag & Drop básico.
- Demostrar habilidades en diseño web y desarrollo frontend utilizando Bootstrap y Webpack.

## Instrucciones para la configuración y ejecución del proyecto.

1. Clonar el repositorio

```
git clone https://github.com/danirio-code/Practica-DIW-DWEC [NOMBRE QUE LE QUIERAS DAR]
cd [NOMBRE QUE LE QUIERAS DAR]
```

2. Instalar las dependencias mediante npm

```
npm install
```

3. Inicializar el proyecto usando los scripts del package.json

- Compilando el proyecto y iniciando ‘dist/index.html’

```
npm run build
```

- Ejecutando un servidor en local

```
npm run start
```

Abre tu navegador y visita http://localhost:8081.

## Explicación de las decisiones de diseño, la elección del framework y el uso de los componentes de Bootstrap o Google Material

### Decisiones de diseño:

Aunque no somos expertos en diseño, intentamos elegir los diferentes elementos para ofrecer una experiencia visualmente atractiva y un diseño moderno.

#### Paleta de Colores:

Se empleó una paleta de colores generada a través de la herramienta aprendida en clase https://coolors.co, donde el color amarillo (#e2c044) predomina, contrastando con el negro (#1e2019) y un gris azulado (#393e41). Estos tonos fueron seleccionados para transmitir energía, dinamismo y profesionalismo.

#### Tipografía:

Se integró la fuente ‘Rubik’ para el texto normal, destacando por su claridad y elegancia. Para los títulos, se optó por la fuente ‘Bungee’, aportando carisma y una presencia llamativa que se alinea con la naturaleza dinámica de un gimnasio. Ambas a través de https://fonts.google.com/.

#### Iconos:

La elección de FontAwesome como biblioteca de iconos se fundamenta en su facilidad de uso, disponibilidad gratuita y su capacidad para enriquecer la comprensión de la web mediante elementos visuales. Estos iconos fueron instalados en el proyecto a través de npm y se importaron en el archivo principal de JavaScript gestionado por Webpack.

### Elección del Framework y uso de componentes:

#### Bootstrap:

- Flexibilidad y Adaptabilidad: Bootstrap destaca por su flexibilidad y capacidad de respuesta, garantizando una experiencia coherente en diversos dispositivos.
- Abundancia de Componentes: La extensa variedad de componentes predefinidos de Bootstrap facilita la creación rápida de interfaces cohesivas.
- Curva de Aprendizaje Accesible: Comparado con otras opciones como Material, Bootstrap ofrece una curva de aprendizaje más suave, acelerando el desarrollo.

#### Webpack:

- Gestión Eficiente de Dependencias: Webpack simplifica la gestión de dependencias y permite una modularización efectiva del código.
- Optimización de Activos: La capacidad de Webpack para optimizar y combinar activos contribuye a una carga eficiente de la aplicación.
- Integración con Ecosistema JavaScript: Webpack se integra sin problemas con el ecosistema JavaScript moderno, facilitando el desarrollo avanzado.

Ambas elecciones se respaldan no solo por sus beneficios inherentes, sino también por la familiaridad del equipo con estas tecnologías. En comparación con las alternativas (Material y Gulp), Bootstrap y Webpack demostraron ser la combinación más eficaz, alineándose con nuestras necesidades y el conocimiento previo del equipo.

## Capturas de pantalla que ilustren la aplicación en diferentes dispositivos y resoluciones.
