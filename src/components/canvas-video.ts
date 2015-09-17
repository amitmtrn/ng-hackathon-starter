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
  context2: any = undefined;
  vendorUrl: any = undefined;
  width: number = 400;
  height: number = 400;
  color = {r: 0, g: 255, b: 0}
  gap: number = 100;
  imageObj = new Image();

  constructor() {
    console.log('Canvas video load')

    var canvas = document.getElementById('canvas');
    var canvas2 = document.getElementById('canvas2');
    this.context = canvas.getContext('2d');
    this.context2 = canvas2.getContext('2d');
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
    this.imageObj.onload = () => this.context2.drawImage(this.imageObj, 69, 50);
    document.querySelector('canvas-video').addEventListener('changeColor', (e) => this.changeColor(e.detail.color));

    this.imageObj.src = 'resources/images/Messier82.jpg';
  }

  changeColor(newColor) {
    this.color = newColor;
  }

  draw() {
    var image;
    var image2;
    var data;
    var i;
    var r;
    var g;
    var b;

    this.context.drawImage(this.video, 0, 0, this.width, this.height);
    image = this.context.getImageData(0, 0, this.width, this.height);
    image2 = this.context2.getImageData(0, 0, this.width, this.height);

    data = image.data;

    for (i = 0; i < data.length; i = i + 4) {
      r = data[i];
      g = data[i + 1];
      b = data[i + 2];

      if ((r > this.color.r - this.gap && r < this.color.r + this.gap)&&
      (g > this.color.g - this.gap && g < this.color.g + this.gap)&&
      (b > this.color.b - this.gap && b < this.color.g + this.gap)) {
        data[i] = image2.data[i];
        data[i + 1] = image2.data[i + 1];
        data[i + 2] = image2.data[i + 2];
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
