import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-botton',
  templateUrl: './menu-botton.component.html',
  styleUrls: ['./menu-botton.component.scss']
})
export class MenuBottonComponent implements OnInit {

  menu: Array<any> = [
    { name: 'Muted', icon:'fas fa-microphone' },
    { name: 'Home', icon:'fas fa-home' },
    { name: 'Share', icon:'fas fa-share-alt' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
