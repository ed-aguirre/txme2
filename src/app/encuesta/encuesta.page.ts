import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController, LoadingController, NavController } from '@ionic/angular';

import { URL_SERVICIOS } from '../../config/url.service';
import { UsuarioService } from '../providers/usuario.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})

export class EncuestaPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  indice = 0;
  temporal = 0;
  bandera: boolean; // false = si deja, true = no deja
  mensaje: string;
  test: number[] = [];
  //ultimo:boolean = false;

  public template = [];

  constructor(public alertCtrl: AlertController,
              public _us: UsuarioService,
              public loadCtrl: LoadingController,
              private http: HttpClient,
              public router: Router) {

  }

  ngOnInit() {

    this.encuesta();

    const slides = document.querySelector('ion-slides');
    slides.options = {
      effect: 'flip'
      };
    this.slides.lockSwipeToNext(true);
    

    this.slides.ionSlideDidChange.subscribe(() => {
      this.test[this.indice] = this.temporal;
     /*  if( this.indice > 9 ){
        this.ultimo == true;
      } */
       
      // console.log(this.test);
      // console.log(this.indice); 2312312312
      this.slides.lockSwipeToNext(true);

    });
  }

  async encuesta() {
    const loading = await this.loadCtrl.create({
      message: 'Cargando...',
    });
    loading.present();

    const url = URL_SERVICIOS + 'Encuesta';

    const mostrar = () => {
        this.http.get(url).subscribe((resp: any) => {
          // console.log(resp);
            this.template.push(...resp.slides);
          // console.log(this.template);
        }, error => {
          console.log(error);
          loading.dismiss();
        });
      };

      const slidesAsync = async() => {
        const uno = await mostrar();
        loading.dismiss();
        return uno;
      };

      slidesAsync().then(fin => {
        // console.log(fin);
      });
    }


  async alert() {
    const alert = await this.alertCtrl.create({
      header: 'Listo',
      subHeader: 'Se ha enviado tu respuesta',
      message: 'Cuando encontremos a tu match se te notificará',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertErr(data: string) {
    const toast = await this.alertCtrl.create({
      header: 'Ha ocurrido un error',
      message: data,
      buttons: ['OK']
    });
    toast.present();
  }

  async ENVIAR() {
    const loading = await this.loadCtrl.create({
      message: 'Cargando...',
    });
    loading.present();

    const val: string = this.test.join('');

    const url = URL_SERVICIOS + 'Encuesta/enviar';
    // tslint:disable-next-line:max-line-length
    //const url_match = URL_SERVICIOS + 'Encuesta/emparejar/' + this._us.user_data['token'] + '/' + val + '/' + this._us.user_data['gen'] + '/' + this._us.user_data['nombre'];
    const url_match = URL_SERVICIOS + 'Encuesta/emparejar';

    const env = () => {
      return new Promise(resolve =>
          this.http.post(url, {
            token: this._us.user_data['token'],
            test: val,
            gen: this._us.user_data['gen'],
            nombre: this._us.user_data['nombre']
          }).subscribe((resp: any[]) => {
              // console.log(resp);
              if ( resp['error'] === true) {
                this.alertErr(resp['Mensaje']);
              } else {
                this.alert();
              }
              resolve(resp);
          }, error => {
            console.log('Ha ocurrido un error: ' + error);
            loading.dismiss();
          })
        );
    };

    const vamonos = (band: any = {}) => {
      console.log(band);
      if ( band['error'] === false ) {
        this.router.navigate(['tabs/home']);
      } else {
        this.router.navigate(['encuesta']);
      }
    };

    const empareja = () => {
      return new Promise(resolve => {
        this.http.post( url_match, {
          token: this._us.user_data['token'],
          test: val,
          gen: this._us.user_data['gen'],
          nombre: this._us.user_data['nombre']
        }).subscribe((resp:any[]) => {
          if( resp['error'] === true){
            this.alertErr(resp['Mensaje']);
          } else {
            this.alert();
          }
          resolve(resp);
        }, error =>{
          console.log('Ha ocurrido un error '+ error);
          loading.dismiss();
        });
      });
    };

    const ENVIARasync = async() => {
      const uno = await env();
      const dos = await vamonos(uno);
      const tres = await empareja();
      loading.dismiss();
      return tres;
    };

    ENVIARasync().then( fin => {
      console.log(fin); /*imprime el query dela ultima funcion cool*/
    });
  }

  haber(e, index: number) {
    this.temporal = e.detail['value'];
    this.indice = index;
    // console.log(this.indice);
    // this.bandera = false
    this.slides.lockSwipeToNext(false);

  }



}
