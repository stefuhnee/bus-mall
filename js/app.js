'use strict';

var imageObjectArray = [];
var imageNamesOnPage = [];
var imageObjectsOnPage = [];
var totalNumOfClicks = 0;
var currentObject = {};
var canvasChart = document.createElement('canvas');
var mainSection = document.getElementById('canvas-chart');
var canvasContext = canvasChart.getContext('2d');
var allImageNames = [];
var allTimesClicked = [];
var allTimesShown = [];

// Pushes an object into the imageObjectArray
function pushImageObjectToArray(imageObject){
  imageObjectArray.push(imageObject);
}

// Accesses the imageObjectArray and returns a random value from that array
function getRandomImage(){
  var randomImage = imageObjectArray[Math.floor(Math.random() * imageObjectArray.length)];
  return randomImage;
}

function initializeChartInfo() {
  for (var i = 0; i < imageObjectArray.length; i++) {
    allImageNames.push(imageObjectArray[i].name);
    allTimesClicked.push(imageObjectArray[i].timesClicked);
    allTimesShown.push(imageObjectArray[i].timesShown);
  }
  var chartData = {
    labels: allImageNames,
    objectData: [
      {
        label: 'Times Clicked',
        fillColor: 'rgba(220,220,220,0.5)',
        highlightFill: 'rgba(220,220,220,0.75)',
        highlightStroke: 'rgba(220,220,220,1)',
        timesClicked: allTimesClicked
      },
      {
        label: 'Times Shown',
        fillColor: 'rgba(220,220,220,0.5)',
        highlightFill: 'rgba(220,220,220,0.75)',
        highlightStroke: 'rgba(220,220,220,1)',
        timesShown: allTimesShown
      }
    ]
  };
  var chartOptions = {
    scaleBeginAtZero : true,
    scaleShowGridLines : true,
    scaleGridLineColor : 'rgba(0,0,0,.05)',
    scaleGridLineWidth : 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    barShowStroke : true,
    barStrokeWidth : 2,
    barValueSpacing : 5,
    barDatasetSpacing : 1,
  };
  var createCanvasChart = new Chart(canvasContext).Bar(chartData, chartOptions);
  canvasChart.style.width = '800px';
  canvasChart.style.height = '400px';
  mainSection.appendChild(canvasChart);
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
    initializeChartInfo();
    console.log('All image names: ', allImageNames + ' All times clicked: ', allTimesClicked + ' All times shown: ', allTimesShown);

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

// Instantiates new image object
function ImageObject(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.timesShown = 0;
  this.timesClicked = 0;
}

// Creates new object for an image and then pushes it to the imageObjectArray
pushImageObjectToArray(new ImageObject('bag', 'img/bag.jpg'));
pushImageObjectToArray(new ImageObject('banana', 'img/banana.jpg'));
pushImageObjectToArray(new ImageObject('bathroom', 'img/bathroom.jpg'));
pushImageObjectToArray(new ImageObject('boots', 'img/boots.jpg'));
pushImageObjectToArray(new ImageObject('breakfast', 'img/breakfast.jpg'));
pushImageObjectToArray(new ImageObject('bubblegum', 'img/bubblegum.jpg'));
pushImageObjectToArray(new ImageObject('chair', 'img/chair.jpg'));
pushImageObjectToArray(new ImageObject('cthulhu', 'img/cthulhu.jpg'));
pushImageObjectToArray(new ImageObject('dog-duck', 'img/dog-duck.jpg'));
pushImageObjectToArray(new ImageObject('dragon', 'img/dragon.jpg'));
pushImageObjectToArray(new ImageObject('pen', 'img/pen.jpg'));
pushImageObjectToArray(new ImageObject('pet-sweep', 'img/pet-sweep.jpg'));
pushImageObjectToArray(new ImageObject('scissors', 'img/scissors.jpg'));
pushImageObjectToArray(new ImageObject('shark', 'img/shark.jpg'));
pushImageObjectToArray(new ImageObject('sweep', 'img/sweep.png'));
pushImageObjectToArray(new ImageObject('tauntaun', 'img/tauntaun.jpg'));
pushImageObjectToArray(new ImageObject('unicorn', 'img/unicorn.jpg'));
pushImageObjectToArray(new ImageObject('usb', 'img/usb.gif'));
pushImageObjectToArray(new ImageObject('water-can', 'img/water-can.jpg'));
pushImageObjectToArray(new ImageObject('wine-glass', 'img/wine-glass.jpg'));

addImagesToPage();
initializeEventListener();
