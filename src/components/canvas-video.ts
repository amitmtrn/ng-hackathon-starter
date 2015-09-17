/// <reference src="typings/tsd.d.ts">

import {Component, View, bootstrap} from "angular2/angular2";

@Component({
    selector: 'canvas-video'
})
@View({
    templateUrl: 'src/view/canvas-video.html',
    styles: [`
      #video {
        display: none;
      }
    `]

})
export default class CanvasVideo {
  context: any = undefined;
  vendorUrl: any = undefined;
  width: number = 400;
  height: number = 400;

  constructor() {
    console.log('Canvas video load')

    var canvas = document.getElementById('canvas');
    this.context = canvas.getContext('2d');
    this.vendorUrl = window.URL || window.webkitURL;
    this.video = document.getElementById('video');

    navigator.getMedia = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

     navigator.getMedia({
       video: true,
       audio: false,
     },
        (stream) => this.stream(stream),
        (err) => this.errorConnecting(err));

    video.addEventListener('play', () => this.draw());
  }


  draw() {
    var image;
    var data;
    var i;
    var r;
    var g;
    var b;

    this.context.drawImage(this.video, 0, 0, this.width, this.height);
    image = this.context.getImageData(0, 0, this.width, this.height);

    data = image.data;

    for (i = 0; i < data.length; i = i + 4) {
      r = data[i];
      g = data[i + 1];
      b = data[i + 2];

      if (r <= 0 && g <= 255 && b <= 0) {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
      }

    }

    this.context.putImageData(image, 0, 0);

    setTimeout(() => this.draw(), 20);
  }

  errorConnecting(err) {
    console.log(err.data)
  }

  stream(stream) {
      video.src = this.vendorUrl.createObjectURL(stream);
      video.play();
  }
}
