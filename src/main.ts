/// <reference src='typings/tsd.d.ts'>

import {CORE_DIRECTIVES, Component, View, bootstrap} from 'angular2/angular2';
import {bind, Injectable} from 'angular2/di';
import {FORM_DIRECTIVES} from 'angular2/forms'

import CanvasVideo from "./components/canvas-video";
import MainPass from "./services/main-pass";

@Component({
    selector: 'app'
})
@View({
    templateUrl: 'src/view/main.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, CanvasVideo]
})
class App {
  color:string = "#00FF00";

  constructor() {
    console.log('App Start');
  }

  onColorChanged() {
    var newColor = this.hexToRgb(this.color);
    var event = new CustomEvent('changeColor',{detail:{color: newColor}});

    document.querySelector('canvas-video').dispatchEvent(event);
  }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

}

bootstrap(App, []);
