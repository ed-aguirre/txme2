import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../providers/usuario.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-cargando',
  templateUrl: './cargando.page.html',
  styleUrls: ['./cargando.page.scss'],
})
export class CargandoPage implements OnInit {

  constructor( 
    public _us: UsuarioService, 
    public router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar ) {

    
    this.startApp();
   
  }

  ngOnInit() {
  }



  startApp() {
      console.log('primera');
      this._us.cargar_usuario().then(() => {

        // this._us.set_user();
        console.log('segunda');
        // aqui puedo cargar datos de la BD para cargar datos
        if ( localStorage.getItem('activo')) {
          console.log('aceptado');
          this.router.navigate(['tabs']);
        } else {
          this.router.navigate(['login']);
        }
      });

  }

}
