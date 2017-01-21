var windowWidth = window.innerWidth
var windowHeight = window.innerHeight;

var naturalWidth = +Infinity;
var naturalHeight = +Infinity;



var zoomableImages = document.querySelectorAll('.js-zoom');

var body = document.querySelector('body');
var overlay = document.createElement('div');
overlay.setAttribute('class', 'overlay');

function zoomImage() {
  body.classList.add('zoomed');
  document.body.appendChild(overlay);
}

function unzoomImage() {
  body.classList.remove('zoomed');
  document.body.removeChild(overlay);
}

for (var i=0; i<zoomableImages.length; i++) {
  var zoomableImage = zoomableImages[i];

  var positionInfo = zoomableImage.getBoundingClientRect();
  var height = positionInfo.height;
  var width = positionInfo.width;

  console.log(width);

  zoomableImage.addEventListener('click', function() {
    if (body.classList.contains('zoomed')) {
      unzoomImage()
    } else {
      zoomImage();
    }
  })
}


//window.addEventListener('keyup', onKeyUp);









module.exports = function() {
  console.log('moo!');
};
