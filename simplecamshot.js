/*
  SimpleCamShot by Christian Heilmann
  Homepage: http://codepo8.github.io/simplecamshot
  Copyright (c)2015 Christian Heilmann
  Code licensed under the BSD License:
  http://wait-till-i.com/license.txt
*/
var simplecamshot = function() {

  var config = {
    startLabel: 'Start Camera',
    stopLabel: 'Stop Camera',
    width: 320,
    createImage: true
  }

  var height = 0;
  var currentstream = false;

  function init(container) {

    if (!container) { return; }

    var button = document.createElement('button');
    button.playing = false;
    button.innerHTML = config.startLabel;
    container.appendChild(button);

    navigator.getMedia = (
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    );

    if (!navigator.getMedia) {
      button.remove();
      return;
    }

    var canvas = document.createElement('canvas');
    var video = document.createElement('video');
    var videobutton = document.createElement('button');
    videobutton.className = 'video';
    videobutton.appendChild(video);
    videobutton.style.display = 'none';
    container.appendChild(videobutton);

    var photo = (config.createImage) ?
             document.createElement('img') :
             {style:{}};
    if (config.createImage) {
      container.appendChild(photo);
    }
    photo.style.display = 'none';

    button.addEventListener('click', function(ev) {
      if (!button.playing) {
        navigator.getMedia(
          {
            video: true,
            audio: false
          },
          function(stream) {
            if (navigator.mozGetUserMedia) {
              video.mozSrcObject = stream;
            } else {
              var vendorURL = window.URL || window.webkitURL;
              video.src = vendorURL.createObjectURL(stream);
            }
            videobutton.style.display = 'block';
            video.play();
            currentstream = stream;
          },
          function(err) {
            videobutton.style.display = 'none';
            photo.style.display = 'none';
          }
        );
        button.innerHTML = config.stopLabel;
        button.playing = true;
      } else {
        videobutton.style.display = 'none';
        if (!currentstream.stop) {
          currentstream.getVideoTracks()[0].stop();
        } else {
          currentstream.stop();
        }
        button.innerHTML = config.startLabel;
        button.playing = false;
      }
      ev.preventDefault();
    });

    video.addEventListener('canplay', function(ev) {
      height = video.videoHeight / (video.videoWidth/config.width);
      video.setAttribute('width', config.width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', config.width);
      canvas.setAttribute('height', height);
    }, false);

    videobutton.addEventListener('click', function(ev) {
      takepicture();
      photo.style.display = 'block';
    });

    function takepicture() {
      canvas.setAttribute('width', config.width);
      canvas.setAttribute('height', height);
      canvas.getContext('2d').drawImage(video, 0, 0, config.width, height);
      var data = canvas.toDataURL('image/png');
      if (config.createImage) {
      photo.width = config.width;
      photo.height = height;
      photo.setAttribute('src', data);
      }
      canvas.setAttribute('width', video.videoWidth);
      canvas.setAttribute('height', video.videoHeight);
      canvas.getContext('2d').drawImage(
      video, 0, 0, video.videoWidth, video.videoHeight
      );
      fireCustomEvent('imagetaken', canvas.toDataURL('image/png'));
    }
    function fireCustomEvent(name, payload) {
      var newevent = new CustomEvent(
        name, { detail: payload }
      );
      container.dispatchEvent(newevent);
    }
  }
  return {
    config: config,
    init: init
  }
}();


