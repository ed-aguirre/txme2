import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../providers/usuario.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public user: any = {
    matricula: '',
    nombre: '',
    contra: '',
  };

  constructor( private router: Router, private _us: UsuarioService,
               private navCtrl: NavController) {
  }

  ngOnInit() {
  }

  atras() {
    this.navCtrl.goBack();
    // this.router.navigate(['login']);
  }

  registrar() {
    this._us.signIn(this.user);
    this.router.navigate(['cargando']);
  }

}
