import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, IonSearchbar, IonContent } from '@ionic/angular';

import { NoticiaService } from '../providers/noticia.service';
import { UsuarioService } from '../providers/usuario.service';

declare var $: any;

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  @ViewChild(IonItemSliding) slider: IonItemSliding;
  @ViewChild(IonSearchbar) barra:IonSearchbar;
  @ViewChild(IonContent) conten:IonContent;

  likes = 0;
  colorCora='dark'

  icono = 'search'

  constructor(private router: Router,
              public _ns: NoticiaService,
              public _us:UsuarioService ) 
  { 
   
  }

  ngOnInit() {
    // console.log(this._ns.news)
    // this.news = this._ns.news;
  }


  buscar(){
    $("#barra").animate({width:'toggle'},300);
    this.barra.setFocus();
    $("#news1").slideToggle();
    $("#crear").slideToggle();
    $("#news2").slideToggle();

    if( this.icono === 'search' ){
      this.icono = 'close-circle';
    } else {
      this.icono = 'search';
    }
  }

  doRefresh(e){
    this._ns.NEWS();
    e.target.complete();
  }

  buscarNoticia( e:any ) {
    let val = e.target.value;
    this._ns.buscarNews(val);
  }

  irA() {
    this.router.navigate(['/newnoticia']);
  }

}
