import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../providers/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.page.html',
  styleUrls: ['./cargando.page.scss'],
})
export class CargandoPage implements OnInit {

  constructor( public _us: UsuarioService, public router: Router ) {
    // this.confirmar();
  }

  ngOnInit() {
  }

  confirmar() {
    if (this._us.user_data != null) {
      this.router.navigate(['home']);
    } else {

      this.confirmar();
    }
  }

  // verificar() {

  // }

}
