import { Component } from '@angular/core';
import { UsuarioService } from '../providers/usuario.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( public _us: UsuarioService ) {
  }

  verificar() {
    console.log(this._us.user_data['token']);
    this._us.VERIFICAR();
  }

}
