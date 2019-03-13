import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { UsuarioService } from '../providers/usuario.service';

import { URL_SERVICIOS  } from "../../config/url.service";
import { HttpClient } from '@angular/common/http';
import { NoticiaService } from '../providers/noticia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newnoticia',
  templateUrl: './newnoticia.page.html',
  styleUrls: ['./newnoticia.page.scss'],
})
export class NewnoticiaPage implements OnInit {

  title: '';
  colors= '';
  icono='help';
  texto='';
  // noticiaid= '';

  constructor(
    private _us: UsuarioService,
    private loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    private http: HttpClient,
    private _ns: NoticiaService,
    public router:Router) { }

  ngOnInit() {
   
  }

  async presentToast(data: any) {
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 2000
    });
    toast.present();
  }

  close() {
    this.router.navigate(['tabs/noticias']);
  }

  async publicar() {
    const loading = await this.loadCtrl.create({
      message: 'Cargando...',
    });
    loading.present();

    const url = URL_SERVICIOS + 'Noticia/crear';

    const crear = () => {
      return new Promise (resolve => {
        this.http.post(url, {
          matricula: this._us.user_data['matricula'],
          title: this.title,
          icon: this.icono,
          color: this.colors,
          text: this.texto
        }).subscribe(( resp:any ) => {
          if( resp['error'] === true ){
            this.presentToast(resp['Mensaje']);

          } else {
            this.presentToast(resp['Mensaje']);

          }
          resolve(resp);
        }, error => {
          console.log( 'Ha ocurrido un erro '+ error );
          loading.dismiss();
        });
      });
    };

    const vamos = (resp:any) => {
      if ( resp['error'] === true ) {
        console.log('No se va');
      } else {
        this.router.navigate(['tabs/noticias']);
      }
    };

    const crearASYNC = async() => {
      const uno = await crear();
      const unuymedio = await this._ns.NEWS();
      const dos = await vamos(uno);
      loading.dismiss();
      return dos;
    };

    crearASYNC().then(fin => {
      console.log(fin);
    });
  }

}
