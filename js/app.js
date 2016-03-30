'use strict';

var imageObjectArray = [];
var imageNamesOnPage = [];
var imageObjectsOnPage = [];
var totalNumOfClicks = 0;
// var chartData = {};
var data = {};
var allImageNames = [];
var allTimesClicked = [];
var allTimesShown = [];

// Accesses the imageObjectArray and returns a random value from that array
function getRandomImage(){
  var randomImage = imageObjectArray[Math.floor(Math.random() * imageObjectArray.length)];
  return randomImage;
}

// generates arrays of data to be used in the canvas chart
function getDataArrays(){
  for (var i = 0; i < imageObjectArray.length; i++) {
    allImageNames.push(imageObjectArray[i].name);
    allTimesClicked.push(imageObjectArray[i].timesClicked);
    allTimesShown.push(imageObjectArray[i].timesShown);
  };
  return allImageNames, allTimesClicked, allTimesShown;
}

// Creates arrays with all of the relevant info to create chart (object names, times clicked, and times shown), creates datasets for chart, creates chart, and appends chart to page.
function initializeChartData() {
  var data = {
    labels: allImageNames,
    datasets: [
      {
        label: 'Times Clicked',
        fillColor: 'rgba(220,220,220,0.5)',
        highlightFill: 'rgba(220,220,220,0.75)',
        highlightStroke: '#000000',
        data: allTimesClicked
      },
      {
        label: 'Times Shown',
        fillColor: 'rgba(220,220,220,0.5)',
        highlightFill: 'rgba(220,220,220,0.75)',
        highlightStroke: '#000000',
        data: allTimesShown
      }
    ]
  };
  var ctx = document.getElementById('canvasChart').getContext('2d');
  var createCanvasChart = new Chart(ctx).Bar(data);
};

// Adds an ID to each image on the page, reinitializes imagesOnPage so that new images will be added to the page, adds new images to the page, and reinitializes the event handler.
function handleImageClick(event) {
  // Sets ID attributes of all images on page to the value of the image object's property name.
  for (var i = 0; i < document.getElementsByClassName('researchImage').length; i++) {
    document.getElementsByClassName('researchImage')[i].setAttribute('id', imageNamesOnPage[i]);
  }
  // Adds to the timesShown counter property for all the images on the page
  for (var i = 0; i < imageObjectsOnPage.length; i++) {
    imageObjectsOnPage[i].timesShown++;
    // Adds to the timesClicked counter property specifically for the clicked image.
    if (event.target.id === imageObjectsOnPage[i].name) {
      imageObjectsOnPage[i].timesClicked++;
    }
  }
  imageObjectsOnPage = [];
  imageNamesOnPage = [];
  totalNumOfClicks++;
  if (totalNumOfClicks === 5) {
    getDataArrays();
    console.log('All image names: ', allImageNames + ' All times clicked: ', allTimesClicked + ' All times shown: ', allTimesShown);
    initializeChartData();
  } else {
    addImagesToPage();
    initializeEventListener();
  }
};

// Adds event listeners to each image. Must be called after addImagesToPage because addImagesToPage needs to switch out images if there are matching images within ImageObjectsOnPage.
function initializeEventListener() {
  for (var i = 0; i < document.getElementsByClassName('researchImage').length; i++) {
    document.getElementsByClassName('researchImage')[i].addEventListener('click', handleImageClick);
  }
};

// Targets image classes on the HTML page and changes the src value to the filepath of the image object returned by the getRandomImage function, one at a time. Returns an array of the names of these image objects on the page in an array called imagesOnPage, so that they can later be identified. Also returns an array of the image objects so that their timesClicked properties can be accessed and incremented when clicked.
function addImagesToPage() {
  // Gets random image object for each img element on the page and pushes both the object itself and the object's name into separate arrays.
  for (var i = 0; i < document.getElementsByClassName('researchImage').length; i++) {
    var randomImage = getRandomImage();
    imageNamesOnPage.push(randomImage.name);
    imageObjectsOnPage.push(randomImage);
  }
  // If any of the objects in the imageObjectsOnPage array match (if two images are the same on the page), replace the reference object with a new random object.
  for (var i = 0; i < imageObjectsOnPage.length; i++) {
    for (var j = 0; j < imageObjectsOnPage.length; j++) {
      if (imageObjectsOnPage[i] === imageObjectsOnPage[j] && i !== j) {
        imageObjectsOnPage[i] = getRandomImage();
      }
    }
  }
  // Add the appropriate filepath to the image object and update each img element's src on the page
  for (var i = 0; i < document.getElementsByClassName('researchImage').length; i++) {
    document.getElementsByClassName('researchImage')[i].src = imageObjectsOnPage[i].filepath;
  }
  return imageNamesOnPage, imageObjectsOnPage;
}

// Instantiates new image object and pushes it to the imageObjectArray.
function ImageObject(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.timesShown = 0;
  this.timesClicked = 0;
  imageObjectArray.push(this);
}

// Creates new object for each image
var bagImage = new ImageObject('bag', 'img/bag.jpg');
var bananaImage = new ImageObject('banana', 'img/banana.jpg');
var bathroomImage = new ImageObject('bathroom', 'img/bathroom.jpg');
var bootsImage = new ImageObject('boots', 'img/boots.jpg');
var breakfastImage = new ImageObject('breakfast', 'img/breakfast.jpg');
var bubblegumImage = new ImageObject('bubblegum', 'img/bubblegum.jpg');
var chairImage = new ImageObject('chair', 'img/chair.jpg');
var cthuluImage = new ImageObject('cthulhu', 'img/cthulhu.jpg');
var dogDuckImage = new ImageObject('dog-duck', 'img/dog-duck.jpg');
var dragonImage = new ImageObject('dragon', 'img/dragon.jpg');
var penImage = new ImageObject('pen', 'img/pen.jpg');
var petSweepImage = new ImageObject('pet-sweep', 'img/pet-sweep.jpg');
var scissorsImage = new ImageObject('scissors', 'img/scissors.jpg');
var sharkImage = new ImageObject('shark', 'img/shark.jpg');
var sweepImage = new ImageObject('sweep', 'img/sweep.png');
var tauntaunImage = new ImageObject('tauntaun', 'img/tauntaun.jpg');
var unicornImage = new ImageObject('unicorn', 'img/unicorn.jpg');
var usbImage = new ImageObject('usb', 'img/usb.gif');
var waterCanImage = new ImageObject('water-can', 'img/water-can.jpg');
var wineGlassImage = new ImageObject('wine-glass', 'img/wine-glass.jpg');

addImagesToPage();
initializeEventListener();
