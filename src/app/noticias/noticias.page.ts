import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { NoticiaService } from '../providers/noticia.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  @ViewChild(IonItemSliding) slider: IonItemSliding;

  likes = 0;
  colorCora='dark'

  constructor(private router: Router,
              public _ns: NoticiaService ) { 
              
              }

  ngOnInit() {
    console.log(this._ns.news)
    // this.news = this._ns.news;
  }

  doRefresh(e){
    this._ns.NEWS();
    e.target.complete();
  }

  irA() {
    this.router.navigate(['/newnoticia']);
  }

}
