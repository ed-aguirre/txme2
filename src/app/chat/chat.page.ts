import { Component, OnInit, Injectable } from '@angular/core';
import { UsuarioService } from '../providers/usuario.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})

export class ChatPage implements OnInit {

  val = '1s';
  num: number;
  matches: any = [];
  contactos: any = [];

  constructor( private _us: UsuarioService ) {
      this.num = 2;
      this._us.amigos.forEach(e => {
        this.matches = e['nombres'].split('|'); // aqui separa el string con el metodo split, delimitador |

            for (let i = 0; i < this.matches.length; i++) {
              if ( this.matches[i] === this._us.user_data['nombre'] ) {
                console.log('es tu nombre.');
              } else {
                this.contactos.push(this.matches[i]);
              }
            }

      });
      console.log(this.val);
   }

  ngOnInit() {
    // this._us.friends()
  }
  random(): string {
    this.num = Math.floor(Math.random() * (5 - 0) + 0);
    return this.val = this.num.toString() + 's';
  }

}
