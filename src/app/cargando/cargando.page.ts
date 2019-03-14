import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../providers/usuario.service';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NoticiaService } from '../providers/noticia.service';

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
    private statusBar: StatusBar,
    public _ns: NoticiaService ) {


    this.startApp();

  }

  ngOnInit() {

  }



  async startApp() {
      // console.log('primera');

      const checar = () => {
        if ( localStorage.getItem('activo')) {
          // console.log('aceptado');
          this._us.friends();
          this.router.navigate(['tabs']);
        } else {
          this.router.navigate(['login']);
        }
      };

      const startAsync = async() => {
        const uno = await this._us.cargar_usuario();
        // const dos = await this._us.friends();
        const dos = await this._ns.NEWS();
        const tres = await checar();
        return tres;
      };

      startAsync().then(final => {
       // console.log(final);
      });

  }

}
