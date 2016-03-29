'use strict';

var imageObjectArray = [];
var imagesOnPageNames = [];
var imageObjectsOnPage = [];

// Accesses the imageObjectArray and returns a random value from that array
function getRandomImage(){
  var randomImage = imageObjectArray[Math.floor(Math.random() * imageObjectArray.length)];
  return randomImage;
}

// Pushes an object into the imageObjectArray
function pushImageObjectToArray(imageObject){
  imageObjectArray.push(imageObject);
}

// Adds an ID to each image on the page, reinitializes imagesOnPage so that new images will be added to the page, adds new images to the page, and reinitializes the event handler.
function handleImageClick(event) {
  for (var i = 0; i < document.getElementsByClassName('researchImage').length; i++) {
    document.getElementsByClassName('researchImage')[i].setAttribute('id', imagesOnPageNames[i]);
  }
  // Adds to the times shown counter for all the images on the page
  for (var i = 0; i < imageObjectsOnPage.length; i++) {
    imageObjectsOnPage[i].timesShown++;
    if (event.target.id === imageObjectsOnPage[i].name) {
      imageObjectsOnPage[i].timesClicked++;
    }
  }
  console.log('you clicked on: ', event.target.id);
  console.log(imageObjectArray);
  imageObjectsOnPage = [];
  imagesOnPageNames = [];
  addImagesToPage();
  initializeEventHandler();
};

// Instantiates new image object
function ImageObject(name, filepath, timesShown, timesClicked) {
  this.name = name;
  this.filepath = filepath;
  this.timesShown = timesShown;
  this.timesClicked = timesClicked;
}

// Adds event listeners to each image
function initializeEventHandler() {
  for (var i = 0; i < document.getElementsByClassName('researchImage').length; i++) {
    document.getElementsByClassName('researchImage')[i].addEventListener('click', handleImageClick);
  }
};

// Targets img classes on the HTML page and changes the src value to the filepath of the image object returned by the getRandomImage function, one at a time. Returns an array of the names of these image objects on the page in an array called imagesOnPage, so that they can later be identified.
function addImagesToPage() {
  for (var i = 0; i < document.getElementsByClassName('researchImage').length; i++) {
    var randomImage = getRandomImage();
    document.getElementsByClassName('researchImage')[i].src = randomImage.filepath;
    imagesOnPageNames.push(randomImage.name);
    imageObjectsOnPage.push(randomImage);
  }
  return imagesOnPageNames, imageObjectsOnPage;
}

// Creates new object for an image and then pushes it to the imageObjectArray
pushImageObjectToArray(new ImageObject('bag', 'img/bag.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('banana', 'img/banana.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('bathroom', 'img/bathroom.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('boots', 'img/boots.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('breakfast', 'img/breakfast.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('bubblegum', 'img/bubblegum.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('chair', 'img/chair.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('cthulhu', 'img/cthulhu.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('dog-duck', 'img/dog-duck.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('dragon', 'img/dragon.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('pen', 'img/pen.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('pet-sweep', 'img/pet-sweep.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('scissors', 'img/scissors.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('shark', 'img/shark.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('sweep', 'img/sweep.png', 0, 0));
pushImageObjectToArray(new ImageObject('tauntaun', 'img/tauntaun.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('unicorn', 'img/unicorn.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('usb', 'img/usb.gif', 0, 0));
pushImageObjectToArray(new ImageObject('water-can', 'img/water-can.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('wine-glass', 'img/wine-glass.jpg', 0, 0));

addImagesToPage();
initializeEventHandler();
