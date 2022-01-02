// oldskool
// fetch('https://dog.ceo/api/breeds/list/all').then((response) => {
//     return response.json()
//     }).then((data) => {
//         console.log(data.message);
//     })

let timer;
let deleteFirstPhotoDelay;

async function start() {
try {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();
    createBreedList(data.message);
} catch (e) {
    console.error('Error fetching breed list')
    }
}

start();

function createBreedList(breeds) {
  document.getElementById('breed').innerHTML = `
    <select onchange="loadByBreed(this.value)">
    <option>Choose a dog Breed</option>
    ${Object.keys(breeds)
      .map((breed) => {
        return `
            <option>${breed}</option>
        `;
      })
      .join('')}
    </select>
    `;
}

async function loadByBreed(breed) {
  if (breed != 'Choose a dog Breed') {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    createSlideshow(data.message);
  }
}

function createSlideshow(images) {
  let currentPosition = 0;
  clearInterval(timer);
  clearTimeout(deleteFirstPhotoDelay);

  if (images.length > 1) {
    document.querySelector('.slideshow').innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>
    `;
    currentPosition += 2;
    if (images.length ==2) currentPosition = 0
    timer = setInterval(nextSlide, 3000);
  } else {
    document.querySelector('.slideshow').innerHTML = `
    <div class="slide" style="background-image: url('${images[0]}')"></div>
    <div class="slide"></div>
`;
  }

  function nextSlide() {
    document.querySelector('.slideshow').insertAdjacentHTML(
      'beforeend',
      `
        <div class="slide" style="background-image: url('${images[currentPosition]}')"></div>
        `
    );
    deleteFirstPhotoDelay = setTimeout(() => {
      document.querySelector('.slide').remove();
    }, 1000);
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}
