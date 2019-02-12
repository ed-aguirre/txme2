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
    matricula: 'S17016273',
    contra: '123456'
  };

  constructor(private router: Router, private _us: UsuarioService) {

  }

  ngOnInit() {
  }

   /*login( ) {
     this._us.login(this.user).then(() => {
      //this._us.confirmar();
      console.log(this._us.user_data['token']);
     
    });
   } */

   login() {
    return new Promise(resolve => {
      this._us.login(this.user).then(() => {
        //this._us.confirmar();
        console.log(this._us.user_data['token']);
       
      });
    });
  }

  goRegistro( ) {
    
    this.router.navigate(['registro']);
  }

}
