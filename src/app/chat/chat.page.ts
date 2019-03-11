import { Component, OnInit, Injectable } from '@angular/core';
import { UsuarioService } from '../providers/usuario.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage implements OnInit {

  num: number;
  matches: any = [];
  contactos: any = [];

  constructor( public _us: UsuarioService, private alertCtrl: AlertController ) {
      this.num = 2;
      this._us.amigos.forEach(e => {
        this.matches = e['nombres'].split('|'); // aqui separa el string con el metodo split, delimitador |

            for (let i = 0; i < this.matches.length; i++) {
              if ( this.matches[i] === this._us.user_data['nombre'] ) {
               //  console.log('es tu nombre.');
              } else {
                this.contactos.push(this.matches[i]);
              }
            }

      });
   }

  ngOnInit() {
    // this._us.friends()
  }

  async block(i) {
    const alert = await this.alertCtrl.create({
      header: 'Bloquear a ' + this.contactos[i],
      subHeader: 'Estas a punto de bloquear a esta persona',
      message: 'Una vez aceptado no podras recibir ni mandar mensajes a esta persona.',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Si',
          handler: () => {
            this._us.bloquear(i);
          }
        }
      ]
    });

    await alert.present();
    console.log('bloquedo');
  }

  async info() {
    const alert = await this.alertCtrl.create({
      header: 'Porcentaje',
      subHeader: 'El porcentaje muestra la compatibilidad que puedes tener con esa persona',
      message: 'Si lo deseas, puedes bloquear a un amigo deslizando hacia la izquierda el chat.',
      buttons: ['ok']
    });
    alert.present();
  }

}
