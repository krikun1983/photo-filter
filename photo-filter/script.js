//variable
const inputsFilters = document.querySelectorAll('.filters input');
const resetBtn = document.querySelector('.btn-reset');
const images = document.querySelector('img');
const nextImages = document.querySelector('.btn-next');
const btnFullScreen = document.querySelector('.fullscreen');
const btnUploadFile = document.querySelector('#btnInput');
const btnSaveFile = document.querySelector('.btn-save');

//add value input into output + filter add photo
function inputFilterUpdate() {
  const suffix = this.dataset.sizing;
  images.style.setProperty(`--${this.name}`, this.value + suffix);
  this.nextElementSibling.value = this.value;
  drawImage()
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
    drawImage()
  })
}

resetBtn.addEventListener('click', defaultFilters);

// function next picture

function getImageDateUrl() {
  const baseUrl = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
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
  }
  return baseUrlNew;
}

let count = 1;
function changeNextImages() {
  const countEnd = 20;
  if (count > countEnd) count = 1;
  images.src = count < 10 ? `${getImageDateUrl()}0${count}.jpg` : `${getImageDateUrl()}${count}.jpg`;
  count++;
  drawImage();
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
    images.src = reader.result;
    btnUploadFile.value = "";
    drawImage();
  }
}

btnUploadFile.addEventListener('change', uploadFile);

// Save file
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

function drawImage() {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.src = images.src;
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;

    const heightOrig = images.height;
    const heightImage = images.naturalHeight;
    let factor = (heightOrig > heightImage) ? heightOrig / heightImage : heightImage / heightOrig;

    let blur = document.querySelector("input[name='blur'] ~ output").value;
    let invert = document.querySelector("input[name='invert'] ~ output").value;
    let sepia = document.querySelector("input[name='sepia'] ~ output").value;
    let saturate = document.querySelector("input[name='saturate'] ~ output").value;
    let hue = document.querySelector("input[name='hue'] ~ output").value;
    ctx.filter = `blur(${blur * factor}px) invert(${invert}%) sepia(${sepia}%) saturate(${saturate}%) hue-rotate(${hue}deg)`;
    ctx.drawImage(img, 0, 0);
  };
}
drawImage();

btnSaveFile.addEventListener('click', function (e) {
  console.log(canvas.toDataURL());
  let link = document.createElement("a");
  link.download = "photochangefilter.png";
  link.href = canvas.toDataURL();
  link.click();
  link.delete;
});


//Event fullscreen
btnFullScreen.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});