import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../providers/usuario.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {


  matches: any = [];
  contactos: any = [];

  constructor( private _us: UsuarioService ) {

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
      console.log(this.contactos);
   }

  ngOnInit() {
    // this._us.friends();
  }

}
