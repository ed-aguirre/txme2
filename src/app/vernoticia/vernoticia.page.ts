import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NoticiaService } from '../providers/noticia.service';

@Component({
  selector: 'app-vernoticia',
  templateUrl: './vernoticia.page.html',
  styleUrls: ['./vernoticia.page.scss'],
})
export class VernoticiaPage implements OnInit {
  verNew:any = [];
  mensaje= '';

  constructor(private ruta: ActivatedRoute,
              private navCtrl: NavController,
              private _ns: NoticiaService ) 
  {

    this._ns.news.forEach(e => {
        if( e['id_noticia'] === this.ruta.snapshot.params[('uid')] ) {
          return this.verNew = e;
        }
    });
      // console.log(  this.verNew )
    }

  ngOnInit() {
  
  }

  close() {
    this.navCtrl.goBack();
  }

  enviar() {
    console.log('yep');
  }
}
