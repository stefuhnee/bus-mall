'use strict';

function ImageObject(name, filepath, timesShown, timesClicked) {
  this.name = name;
  this.filepath = filepath;
  this.timesShown = timesShown;
  this.timesClicked = timesClicked;
}

var bagImage = new ImageObject('bag', 'img/bag.jpg', 0, 0);

document.createElement('img');

for (var i = 0; i < trackImages.length; i++) {
  trackImages[i].addEventListener('click', handleImageClick);
}
