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

  private template = [
    {id: '1',  question: '¿Qué haces cuando estas aburrido?',
      opc: 'Ver series y películas', opc2: 'Platicar con amigos', opc3: 'Dormir', val: 1, val2: 2 , val3: 3 },
    {id: '2',  question: '¿A qué horario frecuentas salir?',
      opc: 'De noche', opc2: 'Casi no salgo', opc3: 'Mañana, Tarde y Noche.', val: 1, val2: 2 , val3: 3},
    {id: '3',  question: '¿Consideras importante la escuela?',
      opc: 'Super importante', opc2: 'Me da igual', opc3: 'Qué es una escuela?', val: 1, val2: 2 , val3: 3},
    {id: '4',  question: '¿Sueles apoyar a las personas de bajos recursos?',
      opc: 'Ayudo con lo que pueda', opc2: 'Le doy dinero', opc3: 'Nada', val: 1, val2: 2 , val3: 3},
    {id: '5',  question: '¿Te gustan los animales?',
      opc: 'Tengo mascotas y si', opc2: 'Tengo mascotas y no', opc3: 'Para nada', val: 1, val2: 2 , val3: 3},
    {id: '6',  question: '¿Qué opinas de tu carrera?',
      opc: 'Es la mejor', opc2: 'Me da igual', opc3: 'Todas son importantes', val: 1, val2: 2 , val3: 3},
    {id: '7',  question: 'Elige la cita perfecta:',
      // tslint:disable-next-line:max-line-length
      opc: 'Pizza, Sabritas, Helado y Netflix', opc2: 'Plaza, Cine, Marquesitas o Esquite', opc3: 'Ir por un cafe y platicar', val: 1, val2: 2 , val3: 3},
    {id: '8',  question: '¿Te gusta bailar?',
      opc: 'Si, bailo de todo', opc2: 'No', opc3: 'No se bailar, pero hago el intento', val: 1, val2: 2 , val3: 3},
    {id: '9',  question: 'Terminando la carrera, ¿que te gustaría hacer?',
      opc: 'Seguir estudiando', opc2: 'Buscar un trabajo', opc3: 'Emprender o viajar', val: 1, val2: 2 , val3: 3},
    {id: '10', question: '¿Te gustaria tener hijos?',
      opc: 'Espera.. khe?', opc2: 'Super si', opc3: 'En un futuro, pero si.', val: 1, val2: 2 , val3: 3},
    {id: '11', question: 'Fin del Test',
      opc: '', opc2: '', opc3: '', val: null, val2: null , val3: null},
  ];

  constructor(public alertCtrl: AlertController,
              public _us: UsuarioService,
              public loadCtrl: LoadingController,
              private http: HttpClient,
              public router: Router) {

  }

  ngOnInit() {
    const slides = document.querySelector('ion-slides');
    slides.options = {
      effect: 'flip'
      };
    this.slides.lockSwipeToNext(true);

    this.slides.ionSlideDidChange.subscribe(() => {
      this.test[this.indice] = this.temporal;

      console.log(this.test);
      // console.log(this.indice); 2312312312
      this.slides.lockSwipeToNext(true);

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
    console.log();
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
    const url_match = URL_SERVICIOS + 'Encuesta/emparejar/' + this._us.user_data['token'] + '/' + val + '/' + this._us.user_data['gen'] + '/' + this._us.user_data['nombre'];

    const env = () => {
      return new Promise(resolve =>
          this.http.post(url, {
            token: this._us.user_data['token'],
            test: val,
            gen: this._us.user_data['gen'],
            nombre: this._us.user_data['nombre']
          }).subscribe((resp: any[]) => {
              console.log(resp);
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
        this.http.get(url_match).subscribe((resp: any[]) => {
          console.log(resp);
            resolve(resp);
        }, error => {
          console.log(error);
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
    console.log(this.indice);
    // this.bandera = false
    this.slides.lockSwipeToNext(false);

  }



}
