'use strict';

var imageObjectArray = [];
var imageNamesOnPage = [];
var imageObjectsOnPage = [];
var totalNumOfClicks = 0;
var data = {};
var allImageNames = [];
var allTimesClicked = [];
var allTimesShown = [];
var datasets = [];
var ctx;
var createCanvasChart;
var canvasChartEl;
var buttonSection = document.getElementById('user-form');
var imageSection = document.getElementById('image-section');
var canvasSection = document.getElementById('canvas-section');
var storedImageData = loadImageObjectData();
var storedNumClicks = loadClickData();

function saveClickData() {
  localStorage.setItem('totalClicks', JSON.stringify(totalNumOfClicks));
}

function loadClickData() {
  return JSON.parse(localStorage.getItem('totalClicks'));
}

function saveImageObjectData() {
  localStorage.setItem('objectData', JSON.stringify(imageObjectArray));
}

function loadImageObjectData() {
  return JSON.parse(localStorage.getItem('objectData'));
}

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
};

// Creates arrays with all of the relevant info to create chart (object names, times clicked, and times shown), creates datasets for chart, creates chart, and appends chart to page.
function initializeChartData() {
  buttonSection.innerHTML = '';
  var data = {
    labels: allImageNames,
    datasets: [timesClickedDataSet, timesShownDataSet]
  };
  var canvasChartEl = document.createElement('canvas');
  canvasChartEl.setAttribute('width', '1000');
  canvasChartEl.setAttribute('height', '500');
  canvasSection.appendChild(canvasChartEl);
  var ctx = canvasChartEl.getContext('2d');
  var createCanvasChart = new Chart(ctx).Bar(data);
  console.log('Data that should be displayed: ');
  console.log('Times Clicked: ', allTimesClicked);
  console.log('Times Shown: ', allTimesShown);
};

// Adds an ID to each image on the page, reinitializes imagesOnPage so that new images will be added to the page, adds new images to the page, and reinitializes the event handler.
function handleImageClick(event) {
  // Sets ID attributes of all images on page to the value of the image object's property name.
  for (var i = 0; i < document.getElementsByClassName('research-image').length; i++) {
    document.getElementsByClassName('research-image')[i].setAttribute('id', imageNamesOnPage[i]);
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
  console.log('total number of clicks: ', totalNumOfClicks);

  if (totalNumOfClicks < 25) {
    addImagesToPage();
    initializeEventListener();
  } else if ((totalNumOfClicks === 25) || ((totalNumOfClicks + 5) % 10 === 0)) {
    addImagesToPage();
    addButtons();
  } else {
    buttonSection.innerHTML = '';
    addImagesToPage();
    initializeEventListener();
  }
  saveImageObjectData();
  saveClickData();
};

// Adds event listeners to each image. Must be called after addImagesToPage because addImagesToPage needs to switch out images if there are matching images within ImageObjectsOnPage.
function initializeEventListener() {
  for (var i = 0; i < document.getElementsByClassName('research-image').length; i++) {
    document.getElementsByClassName('research-image')[i].addEventListener('click', handleImageClick);
  }
};

// Targets image classes on the HTML page and changes the src values. Returns an array of the names of these image objects on the page. Also returns an array of the image objects so that their timesClicked properties can be accessed and incremented when clicked.
function addImagesToPage() {
  // Gets random image object for each img element on the page and pushes both the object itself and the object's name into separate arrays.
  for (var i = 0; i < document.getElementsByClassName('research-image').length; i++) {
    var randomImage = getRandomImage();
    imageNamesOnPage.push(randomImage.name);
    imageObjectsOnPage.push(randomImage);
  }
  // If any of the objects in the imageObjectsOnPage array match replace the reference object with a new random object.
  for (var i = 0; i < imageObjectsOnPage.length; i++) {
    for (var j = 0; j < imageObjectsOnPage.length; j++) {
      if (imageObjectsOnPage[i] === imageObjectsOnPage[j] && i !== j) {
        imageObjectsOnPage[i] = getRandomImage();
      }
    }
  }
  // Add the appropriate filepath to the image object and update each img element's src on the page
  for (var i = 0; i < document.getElementsByClassName('research-image').length; i++) {
    document.getElementsByClassName('research-image')[i].src = imageObjectsOnPage[i].filepath;
  }
}

function addButtons() {
  var viewResultsButton = document.createElement('button');
  var voteMoreTimesButton = document.createElement('button');
  buttonSection.appendChild(viewResultsButton);
  buttonSection.appendChild(voteMoreTimesButton);
  viewResultsButton.textContent = 'View Results';
  voteMoreTimesButton.textContent = 'Vote 10 More Times';
  viewResultsButton.type = 'submit';
  voteMoreTimesButton.type = 'submit';
  viewResultsButton.addEventListener('click', initializeChartData);
  voteMoreTimesButton.addEventListener('click', initializeEventListener);
  getDataArrays();
  // Makes images unclickable when buttons come up
  for (var i = 0; i < document.getElementsByClassName('research-image').length; i++) {
    document.getElementsByClassName('research-image')[i].removeEventListener('click', handleImageClick, false);
  }
}

// Instantiates new image object and pushes it to the imageObjectArray.
function ImageObject(name, filepath) {
  this.name = name;
  this.filepath = filepath;
  this.timesShown = 0;
  this.timesClicked = 0;
  imageObjectArray.push(this);
}

// creates new data set object for use in canvas chart.
function CreateDataSet(information, fillColor, highlightFill, displayData) {
  this.label = information;
  this.fillColor = fillColor;
  this.strokeColor = '#000';
  this.highlightFill = highlightFill;
  this.highlightStroke = '#000';
  this.data = displayData;
};

// creates data set for canvas chart.
var timesClickedDataSet = new CreateDataSet('Times Clicked', '#66B220', '#F7B2FF', allTimesClicked);
var timesShownDataSet = new CreateDataSet('Times Shown', '#AA59B2', '#ff7a7a', allTimesShown);

// if there is imageObject array in localstorage, use it, else run these constructors
if (storedImageData) {
  imageObjectArray = storedImageData;
} else {
  // Creates new object for each image
  new ImageObject('bag', 'img/bag.jpg');
  new ImageObject('banana', 'img/banana.jpg');
  new ImageObject('bathroom', 'img/bathroom.jpg');
  new ImageObject('boots', 'img/boots.jpg');
  new ImageObject('breakfast', 'img/breakfast.jpg');
  new ImageObject('bubblegum', 'img/bubblegum.jpg');
  new ImageObject('chair', 'img/chair.jpg');
  new ImageObject('cthulhu', 'img/cthulhu.jpg');
  new ImageObject('dog-duck', 'img/dog-duck.jpg');
  new ImageObject('dragon', 'img/dragon.jpg');
  new ImageObject('pen', 'img/pen.jpg');
  new ImageObject('pet-sweep', 'img/pet-sweep.jpg');
  new ImageObject('scissors', 'img/scissors.jpg');
  new ImageObject('shark', 'img/shark.jpg');
  new ImageObject('sweep', 'img/sweep.png');
  new ImageObject('tauntaun', 'img/tauntaun.jpg');
  new ImageObject('unicorn', 'img/unicorn.jpg');
  new ImageObject('usb', 'img/usb.gif');
  new ImageObject('water-can', 'img/water-can.jpg');
  new ImageObject('wine-glass', 'img/wine-glass.jpg');
}

// If storedNumClicks exists in local storage, replace totalNumOfClicks with storeNumClicks.
if (storedNumClicks) {
  totalNumOfClicks = storedNumClicks;
}

addImagesToPage();
initializeEventListener();
