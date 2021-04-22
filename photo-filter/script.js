//variable
const inputsFilters = document.querySelectorAll('.filters input');
const resetBtn = document.querySelector('.btn-reset');
const images = document.querySelector('img');
const nextImages = document.querySelector('.btn-next');
const btnFullScreen = document.querySelector('.fullscreen');
const btnUploadFile = document.querySelector('#btnInput');

//add value input into output + filter add photo
function inputFilterUpdate() {
  const suffix = this.dataset.sizing;
  images.style.setProperty(`--${this.name}`, this.value + suffix);
  this.nextElementSibling.value = this.value;
}

inputsFilters.forEach((input) => {
  input.addEventListener('input', inputFilterUpdate)
});

// function reset
function defaultFilters() {
  inputsFilters.forEach((input) => {
    const suffix = input.dataset.sizing
    input.value = input.defaultValue
    images.style.setProperty(`--${input.name}`, input.value + suffix)
    input.nextElementSibling.value = input.value
  })
}

resetBtn.addEventListener('click', defaultFilters);

// function next picture
const baseUrl = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
let count = 1;
const countEnd = 20;
let baseUrlNew = '';

const hour = new Date().getHours();

if (hour >= 6 && hour < 12) {
  baseUrlNew = `${baseUrl}morning/`;
} else if (hour >= 12 && hour < 18) {
  baseUrlNew = `${baseUrl}day/`;
} else if (hour >= 18 && hour < 24) {
  baseUrlNew = `${baseUrl}evening/`;
} else if (hour >= 0 && hour < 6) {
  baseUrlNew = `${baseUrl}night/`;
};

function changeNextImages() {
  if (count > countEnd) {
    count = 1;
  }
  images.src = count < 10 ? `${baseUrlNew}0${count}.jpg` : `${baseUrlNew}${count}.jpg`;
  count++;
}

nextImages.addEventListener('click', changeNextImages);


// Load file
function uploadFile(e) {
  const file = btnUploadFile.files[0];
  const reader = new FileReader();

  if (file) {
    reader.readAsDataURL(file);
  }
  reader.onload = () => {
    // const img = new Image();
    // img.src = reader.result;
    images.src = reader.result;
    console.log(images);
  }
  // reader.readAsDataURL(file);
}

btnUploadFile.addEventListener('change', uploadFile);


//Event fullscreen
btnFullScreen.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});