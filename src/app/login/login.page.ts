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
    matricula: 's17016273',
    contra: '123456'
  };

  constructor(private router: Router, private _us: UsuarioService) {

  }

  ngOnInit() {
  }


   login() {
    this._us.LOGIN(this.user)
  }

  goRegistro( ) {

    this.router.navigate(['registro']);
  }

}
