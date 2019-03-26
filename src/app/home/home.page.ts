import { Component } from '@angular/core';
import { UsuarioService } from '../providers/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( public _us: UsuarioService,
              public router: Router ) {
  }

  verificar() {
    this._us.VERIFICAR();
  }

  go() {
    //this.socket.connect();
    this.router.navigate(['trivia']);
  }


}
