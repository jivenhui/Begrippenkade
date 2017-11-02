import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

/*
  Generated class for the About page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  mySlideOptions = {
    initialSlide: 0,
    loop: false
  };

  public selectedPage: string = "copyright";

  @ViewChild('mySlider') slider: Slides;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello About Page');
  }

}
