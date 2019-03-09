import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { NoticiaService } from '../providers/noticia.service';

import { URL_SERVICIOS } from "../../config/url.service";
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../providers/usuario.service';

@Component({
  selector: 'app-vernoticia',
  templateUrl: './vernoticia.page.html',
  styleUrls: ['./vernoticia.page.scss'],
})
export class VernoticiaPage implements OnInit {
  verNew:any = [];
  mensaje= '';
  uid:string = '';

  constructor(private ruta: ActivatedRoute,
              private navCtrl: NavController,
              private _ns: NoticiaService,
              private _us: UsuarioService,
              private loadCtrl: LoadingController,
              private toastCtrl: ToastController,
              private http: HttpClient) 
  {

    this.uid = this.ruta.snapshot.params[('uid')];

    this._ns.news.forEach(e => {
        if( e['id_noticia'] === this.uid ) {
          return this.verNew = e;
        }
    });
      // console.log(  this.verNew )
  }

  async presentToast(data: any) {
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this._ns.comentarios( this.uid );
  }

  close() {
    this.navCtrl.goBack();
  }

  async enviar() {
    const loading = await this.loadCtrl.create({
        message: 'Cargando...',
        });
    loading.present();
  
    const url = URL_SERVICIOS + 'Noticia/hacerComent';

    const enviar = () => {
      return new Promise(resolve => {
        this.http.post( url,{
          id_noticia: this.uid,
          matricula: this._us.user_data['matricula'],
          mensaje: this.mensaje
        }).subscribe((resp:any) => {
          if (resp['error'] === true ){
            this.presentToast(resp['Mensaje']);

          } else {
            this.presentToast('Listo!');

          }
          resolve(resp);
        }, error => {
          console.log('Ocurrio un error '+ error);
          loading.dismiss();

        });
      });
    };

    const doAsync = async() => {
      const uno = await enviar();
      const dos = await this._ns.comentarios(this.uid);
      loading.dismiss();
      return dos
    };

    doAsync().then(fin => {
      // console.log(fin);
    })
  }

}
