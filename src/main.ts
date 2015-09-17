/// <reference src='typings/tsd.d.ts'>

import {CORE_DIRECTIVES, Component, View, bootstrap} from 'angular2/angular2';
import {bind, Injectable} from 'angular2/di';

import CanvasVideo from "./components/canvas-video";

@Component({
    selector: 'app'
})
@View({
    templateUrl: 'src/view/main.html',
    directives: [CORE_DIRECTIVES, CanvasVideo]
})
class App {

  constructor() {
    console.log('App Start');
  }

}

bootstrap(App, []);
