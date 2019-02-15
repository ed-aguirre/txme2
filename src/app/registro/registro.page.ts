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
    gen: ''
  };

  constructor( private router: Router, private _us: UsuarioService,
               private navCtrl: NavController) {
  }

  ngOnInit() {
  }

  atras() {
    this.navCtrl.goBack();
  }

  registrar() {
    this._us.SIGNIN(this.user);
    //this.router.navigate(['cargando']);
  }


}
