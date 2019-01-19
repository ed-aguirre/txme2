import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../providers/usuario.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: any = {
    correo: 'luis@prueba.com',
    contra: '23456'
  };

  constructor(private router: Router, private _us: UsuarioService) {

  }

  ngOnInit() {
  }

  login( ) {
    this._us.login(this.user).then(() => {
      this._us.confirmar();
      console.log(this._us.user_data['token']);
      // this.router.navigate(["cargando"]);
    });

  }

  goRegistro( ) {
    this.router.navigate(['registro']);
  }

}
