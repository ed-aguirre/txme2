import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../providers/usuario.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user: any[];
  band = true;
  tipo = 'password';
  tip = 0;

  constructor( private _us: UsuarioService, private alertCtrl: AlertController ) {
    this.user = this._us.user_data;
  }

  ngOnInit() {
  }

  cambiar() {
    if ( this.band ) {
      this.band = false;
    } else {
      this.band = true;
    }
  }

  ver() {
     this.tipo = 'text';
     setTimeout(() => {
       this.tipo = 'password';
     }, 2500);
  }

  async alert() {
      const alert = await this.alertCtrl.create({
        header: 'Deseas confirmar los cambios?',
        message: 'Message <strong>text</strong>!!!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            handler: () => {
              console.log('Confirm Okay');
            }
          }
        ]
      });
      await alert.present();
    }
}
