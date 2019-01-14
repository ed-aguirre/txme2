import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../providers/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public user: any = {
    correo: '',
    nombres: '',
    contra: '',
    nick: ''
  };

  constructor( private router: Router, private _us: UsuarioService) {
  }

  ngOnInit() {
  }

  atras() {
    this.router.navigate(['login']);
  }

  registrar() {
    this._us.signIn(this.user);
    this.router.navigate(['cargando']);
  }

}
