const btnSearchExercise = document.getElementById('btnBuscarEjercicio');
const divEjercicios = document.querySelector('.info-ejercicios');
const exerciseContent = document.querySelector('.exercise-content');
const divMuscleIcons = document.querySelector('.muscle_icons');
const dragMuscleIcons = document.querySelectorAll('.muscle_icons img');
const divToDropIcon = document.getElementById('selected_muscle');
import Tabs from './tabs';
let iconToSearch;
let iconOnDiv = false;

if (btnSearchExercise) {
  btnSearchExercise.addEventListener('click', async (e) => {
    btnSearchExercise.innerHTML = 'Arrastra aquí el icono';
    mostrarCargando();
    if (iconToSearch) {
      const exercises = await fetchExercisesFromApi(iconToSearch);
      divEjercicios.innerHTML = '';
      loadExercises(exercises);
      let exerciseCards = exerciseContent.querySelectorAll('.card');
      addTabsFunctionality(exerciseCards);
      resetSelectedMuscle();
    }
  });
}

async function fetchExercisesFromApi(exerciseToSearch) {
  const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${exerciseToSearch}?limit=20`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '44243a6830msh96349436a76539ep1cd25fjsn2e155719b8cd',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    },
  };
  try {
    const fetchExercises = await fetch(url, options);
    const arrayExercises = await fetchExercises.json();
    return arrayExercises;
  } catch (error) {
    console.error(error);
  }
}
function mostrarCargando() {
  let loadersString = '';
  loadersString += `
  <div class="w-100 d-flex flex-row justify-content-center align-items-center">
  `;
  for (let i = 0; i <= 4; i++) {
    loadersString += `
    <div
      class="spinner-grow text-primary m-5"
      role="status"
      style="width: 4rem; height: 4rem">
      <span class="visually-hidden">Loading...</span>
    </div>
  `;
  }
  loadersString += `</div>`;
  divEjercicios.innerHTML = loadersString;
}

const addSpacesToIconId = {
  upper_arms: 'upper arms',
  upper_legs: 'upper legs',
  lower_arms: 'lower arms',
  lower_legs: 'lower legs',
};

// DRAG & DROP
if (dragMuscleIcons) {
  dragMuscleIcons.forEach((element) => {
    element.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('muscle', e.target.id);
      divToDropIcon.classList.add('selected-muscle__active');
      setTimeout(() => {
        divToDropIcon.classList.remove('selected-muscle__active');
      }, 2000);
    });
  });
}

if (divToDropIcon) {
  divToDropIcon.addEventListener('drop', (e) => {
    e.preventDefault();
    let data = e.dataTransfer.getData('muscle');
    e.target.appendChild(document.getElementById(data));
    iconToSearch = data in addSpacesToIconId ? addSpacesToIconId[data] : data;
    iconOnDiv = true;
    divToDropIcon.classList.remove('selected-muscle__active');
    btnSearchExercise.innerHTML = 'Buscar ejercicios';
  });

  divToDropIcon.addEventListener('dragover', (e) => {
    if (!iconOnDiv) {
      e.preventDefault();
    }
  });
}

// Función para restablecer el contenido del div selected_muscle
function resetSelectedMuscle() {
  let selectedMuscleImage = divToDropIcon.querySelector('img');
  if (selectedMuscleImage) {
    divMuscleIcons.appendChild(selectedMuscleImage);
    iconOnDiv = false;
    iconToSearch = null;
  }
}

function loadExercises(exercisesInfo) {
  let exercisesCardDiv = '<div class="container exercises d-flex flex-column align-items-center">';
  exercisesInfo.forEach((exercise) => {
    let cardId = `card${exercise.id}`;
    exercisesCardDiv += `
    <div class="card w-75 mb-4" id="${cardId}">
        <div class="card-header bg-secondary bg-opacity-50">
          <ul class="nav nav-tabs card-header-tabs tabs">
            <li class="nav-item">
              <a class="nav-link tabs__button tabs__button--active" data-tab="info">Info</a>
            </li>
            <li class="nav-item">
              <a class="nav-link tabs__button" data-tab="instrucciones">Instrucciones</a>
            </li>
          </ul>
        </div>
        <div class="tab tab--active" id="info">
          <div class="row no-gutters">
            <div class="col-md-4 d-flex align-items-center">
              <img
                src="${exercise.gifUrl}"
                class="card-img img-fluid h-100"
                alt="ejercicio${exercise.id}" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${capitalizeStrings(exercise.name)}</h5>
                <p class="card-text text-secondary"><b>Parte del cuerpo</b>: ${capitalizeStrings(
                  exercise.bodyPart
                )}</p>
                <p class="card-text text-secondary"><b>Músculo objetivo</b>: ${capitalizeStrings(
                  exercise.target
                )}</p>
                <p class="card-text text-secondary"><b>Músculos secundarios a entrenar</b>:${secondaryMusclesArrayToString(
                  exercise.secondaryMuscles
                )}</p>
                <p class="card-text text-secondary"><b>Equipamento necesario o ayudas</b>: ${capitalizeStrings(
                  exercise.equipment
                )}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="tab" id="instrucciones">
          <div class="card-body">
            <h5 class="card-title">Instrucciones</h5>
            <ul class="list-group list-group-flush">
              ${listExerciseInstructions(exercise.instructions)}
            </ul>
          </div>
        </div>
      </div>
    `;
  });
  exercisesCardDiv += '</div>';
  exerciseContent.innerHTML = exercisesCardDiv;
}

function capitalizeStrings(string) {
  return string[0].toUpperCase() + string.substring(1);
}

function secondaryMusclesArrayToString(secondaryMuscles) {
  let muscles = '';
  if (secondaryMuscles.length > 0) {
    secondaryMuscles.forEach((muscle) => {
      muscles += ' ' + capitalizeStrings(muscle) + ',';
    });
    return muscles.substring(0, muscles.length - 1);
  } else {
    return '---';
  }
}

function listExerciseInstructions(instructions) {
  let listExercises = '';
  instructions.forEach((instruction, index) => {
    listExercises += `
    <li class="list-group-item">${index + 1}- ${instruction}</li>
    `;
  });
  return listExercises;
}

function addTabsFunctionality(cards) {
  cards.forEach((card) => {
    new Tabs(card.id);
  });
}
