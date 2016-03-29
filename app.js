'use strict';

var imageObjectArray = [];

// Instantiates new image object
function ImageObject(name, filepath, timesShown, timesClicked) {
  this.name = name;
  this.filepath = filepath;
  this.timesShown = timesShown;
  this.timesClicked = timesClicked;
}

// Accesses the imageObjectArray and returns a random value from that array
function getRandomImage(){
  var randomImage = imageObjectArray[Math.floor(Math.random() * imageObjectArray.length)];
  return randomImage;
}

// Pushes an object into the imageObjectArray
function pushImageObjectToArray(imageObject){
  imageObjectArray.push(imageObject);
}

// Creates new object for an image and then pushes it to the imageObjectArray
pushImageObjectToArray(new ImageObject('bag', 'img/bag.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('banana', 'img/banana.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('bathroom', 'img/bathroom.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('boots', 'img/boots.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('breakfast', 'img/breakfast.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('bubblegum', 'img/bubblegum.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('chair', 'img/chair.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('cthulhu', 'img/cthulu.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('dog-duck', 'img/dog-duck.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('dragon', 'img/dragon.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('pen', 'img/pen.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('pet-sweep', 'img/pet-sweep.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('scissors', 'img/scissors.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('shark', 'img/shark.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('sweep', 'img/sweep.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('tauntaun', 'img/tauntaun.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('unicorn', 'img/unicorn.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('usb', 'img/usb.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('water-can', 'img/water-can.jpg', 0, 0));
pushImageObjectToArray(new ImageObject('wine-glass', 'img/wine-glass.jpg', 0, 0));

document.getElementById('img1').src = getRandomImage().filepath;


// for (var i = 0; i < trackImages.length; i++) {
//   trackImages[i].addEventListener('click', handleImageClick);
// }
