import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature: string = 'recipe';

  ngOnInit() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCSBcaAnfY4EDBtWbDcgCNY3ZQGkLJC9Js',
      authDomain: 'https://angularfirstapp-49dd7-default-rtdb.firebaseio.com'
    };
    firebase.default.initializeApp(firebaseConfig);
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
