import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../providers/usuario.service';
import { NoticiaService } from '../providers/noticia.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: any = {
    matricula: '',
    contra: ''
  };

  constructor(
    private router: Router, 
    private _us: UsuarioService,
    private _ns: NoticiaService) {

  }

  ngOnInit() {
  }


   login() {
    this._us.LOGIN(this.user);
    this._ns.NEWS();
  }

  goRegistro( ) {

    this.router.navigate(['registro']);
  }

}
