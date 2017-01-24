var windowWidth = window.innerWidth
var windowHeight = window.innerHeight;


var body = document.querySelector('body');
var overlay = document.createElement('div');
overlay.classList.add('overlay');




var toogleImageZoom = function () {
    if(!body.classList.contains('active-zoom') && !this.classList.contains('zoomableimage--zoomed')) {
        var positionInfo = this.getBoundingClientRect();
        var height = positionInfo.height;
        var width = positionInfo.width;
        var top = positionInfo.top;
        var left = positionInfo.left;

        var scaleX = windowWidth / width;
        var scaleY = windowHeight / height;
        var scale = Math.min(scaleX, scaleY) * .95;

        var translateX = (-left + (windowWidth - width) / 2) / scale;
        var translateY = (-top + (windowHeight - height) / 2) / scale;

        this.style.transform = 'scale(' + scale + ') translate3d(' + translateX +'px, ' + translateY + 'px, 0)';

        this.classList.add('zoomableimage--zoomed');
        body.classList.add('active-zoom');
        document.body.appendChild(overlay);
    } else if (body.classList.contains('active-zoom') && this.classList.contains('zoomableimage--zoomed')) {
        body.classList.remove('active-zoom');
        document.body.removeChild(overlay);
        this.style.transform = 'none';
        this.classList.remove('zoomableimage--zoomed');
    }
}

var zoomableImages = document.querySelectorAll('.js-zoom');

for (var i=0; i<zoomableImages.length; i++) {
    var image = zoomableImages[i];

    (function(index) {
        zoomableImages[index].addEventListener('click', toogleImageZoom, false);
    })(i);
}





