import { Component, OnInit, Input, Injectable, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, AlertController, LoadingController, ToastController, IonContent } from '@ionic/angular';
import { URL_SERVICIOS } from 'src/config/url.service';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../providers/usuario.service';

// import {AfterViewInit} from '@angular/core';

// declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-chatnew',
  templateUrl: './chatnew.page.html',
  styleUrls: ['./chatnew.page.scss'],
})

// tslint:disable-next-line:label-position
export class ChatnewPage implements OnInit {
  @ViewChild(IonContent) conte: IonContent;
  // el: HTMLElement;

  contact = '';
  chat_id = '';
  mensaje = '';
  usuario = '';
  hora = true;
  // contact: any;
  chat: any = [];
  limite = 50;

  tipoBoton = 'clear'; // cuando se llene el chat debe cambiar a "outline"
  colorBoton = 'dark'; // cuando se llene el chat debe cambiar a "danger"
  // tslint:disable-next-line:max-line-length
  textAlert = 'Solo puedes enviar un cantidad especifica de mensajes a esta persona. Cuando se llegue al límite especificado no se permitirá enviar más mensajes.';
  scrollElement;

  constructor(private route: ActivatedRoute,
              private loadCtrl: LoadingController,
              private navCtrl: NavController,
              private toastCtrl: ToastController,
              private http: HttpClient,
              private alertCtrl: AlertController,
              private _us: UsuarioService,
              public router: Router) {

    this.usuario = this._us.user_data['matricula'];


  }

  ngOnInit() {
    this.ver_chat();

    this.chat_id = this.route.snapshot.params[('uid')];
    this.contact = this.route.snapshot.params[('contact')];

  }

  verHora(i: number) {
      $('#ora' + i).slideToggle();
  }

  async doRefresh() {
    const uno = await this.ver_chat();
    return uno;
  }

  async alert() {
    const alert = await this.alertCtrl.create({
      header: 'Límite de mensajes',
      subHeader: 'Llevan ' + this.chat.length + ' mensaje(s) enviados de ' + this.limite,
      message: this.textAlert,
      buttons: ['OK']
    });

    await alert.present();
  }

  close() {
     this.router.navigate(['tabs/noticias']);
  } 

  async presentToast(data: any) {
    // console.log(data);
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async ver_chat() {
    const loading = await this.loadCtrl.create({
      message: 'Cargando...',
    });
    loading.present();

    const url = URL_SERVICIOS + 'Amigos/chat';

    const ver = () => {
      return new Promise(resolve => {
        this.http.post(url, {
          chat_id: this.chat_id
        }).subscribe((resp: any[]) => {
          if (resp['error'] === true) {
            this.presentToast(resp['Mensaje']);
          } else {
            this.chat = resp['chat'];
          }
          resolve(resp);
        }, error => {
          console.log('ocurrio un error: ' + error);
          loading.dismiss();
        });
      });
    };

    const limit = () => {
      console.log(this.chat.length);
      if (this.chat.length >= this.limite) {
      this.colorBoton = 'danger';
      this.tipoBoton = 'outline';
      this.textAlert = 'Se ha alcanzado el límite de mensajes por chat. Gracias por usar talk2me!';
      };
    };

    const fondo = () => {
     setTimeout(() => {
       this.conte.scrollToBottom(800);
     }, 500);
    };

    const verArync = async() => {
      const uno = await ver();
      const dos = await limit();
      const tres = await fondo();
      loading.dismiss();
      return tres;
    };

    verArync().then( fin => {
      // console.log(fin);
    });

  }

  async enviar() {
    this.presentToast('Enviando...');

    const url = URL_SERVICIOS + 'Amigos/enviarMsj';

    const send = () => {
      return new Promise(resolve => {
        this.http.post(url, {
          chat_id: this.chat_id,
          texto: this.mensaje,
          remitente: this._us.user_data['matricula']
        }).subscribe((resp: any[]) => {
            if ( resp['error'] === true) {
              this.presentToast(resp['Mensaje']);
            } else {
              this.presentToast('Enviado.');
            }
            resolve(resp);
        }, error => {
          this.presentToast('Ha ocurrido un error :' + error);
          console.log(error);
        });
      });
    };

    const enviarAsync = async() => {
      const uno = await send();
      this.mensaje = '';
      const dos = await this.ver_chat();
      return dos;
    };

    enviarAsync().then(fin => {
     // console.log('ok');
    });
  }

}
