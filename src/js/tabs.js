export default class Tabs {
  constructor(idElemento) {
    this.tabs = document.getElementById(idElemento);
    this.nav = this.tabs.querySelector('.tabs');

    this.nav.addEventListener('click', (e) => {
      if ([...e.target.classList].includes('tabs__button')) {
        const tab = e.target.dataset.tab;

        // Quita la clase active de la tab que estaba activa antes de clicar
        if (this.tabs.querySelector('.tab--active')) {
          this.tabs.querySelector('.tab--active').classList.remove('tab--active');
        }

        // Agregamos la clase active al tab
        this.tabs.querySelector(`#${tab}`).classList.add('tab--active');

        // Quita la clase active del botón que estaba activo antes de clicar
        if (this.tabs.querySelector('.tabs__button--active')) {
          this.tabs.querySelector('.tabs__button--active').classList.remove('tabs__button--active');
        }

        // Agregamos la clase active al boton
        e.target.classList.add('tabs__button--active');
      }
    });
  }
}
