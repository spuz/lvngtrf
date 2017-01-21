var windowWidth = window.innerWidth
var windowHeight = window.innerHeight;

var naturalWidth = +Infinity;
var naturalHeight = +Infinity;

var zoomableImages = document.querySelectorAll('.js-zoom');

var body = document.querySelector('body');
var overlay = document.createElement('div');
overlay.setAttribute('class', 'overlay');

function zoomImage() {

}

function unzoomImage() {

}

for (var i=0; i<zoomableImages.length; i++) {
    var zoomableImage = zoomableImages[i];

    zoomableImage.addEventListener('click', function() {
        if (body.classList.contains('zoomed')) {

            body.classList.remove('zoomed');
            document.body.removeChild(overlay);
            this.style.transform = 'none';
            console.log('unzoom');

        } else {

            body.classList.add('zoomed');
            document.body.appendChild(overlay);
            var positionInfo = this.getBoundingClientRect();
            var height = positionInfo.height;
            var width = positionInfo.width;
            var top = positionInfo.top;
            var left = positionInfo.left;

            var scaleX = windowWidth / width;
            var scaleY = windowHeight / height;
            var scale = Math.min(scaleX, scaleY);

            var translateX = (-left + (windowWidth - width) / 2) / scale;
            var translateY = (-top + (windowHeight - height) / 2) / scale;

            console.log(scale, translateX, translateY);
            this.style.transform = 'scale(' + scale + ') translate3d(' + translateX +'px, ' + translateY + 'px, 0)';
            console.log('top: ' + top + ', left: ' + left);

        }
    })
}


//window.addEventListener('keyup', onKeyUp);









module.exports = function() {
    console.log('moo!');
};
