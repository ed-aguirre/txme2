import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  @ViewChild(IonItemSliding) slider: IonItemSliding;

  uid= "S170";

  cora= 'text';
  likes = 0;
  colorCora='dark'
  constructor( private router: Router ) { }

  ngOnInit() {
  }
  jalar(e){

    this.slider.close().then(()=>{
      this.like();
    });
  }

  irA() {
    this.router.navigate(['/newnoticia']);
  }
  like() {
    this.cora = 'heart';
    this.likes++;
    this.colorCora= 'primary';
  }

}
