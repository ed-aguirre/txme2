import { Injectable, Component } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.service';
import { LoadingController, ToastController, Platform } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http'; // siempre usar el HTTP DE angular
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  user_data: any = {};
  mensaje: any;
  bandera: boolean;

  constructor(private http: HttpClient,
              private loadCtrl: LoadingController,
              private toastCtrl: ToastController,
              private plt: Platform,
              private storage: Storage,
              private router: Router) {
    console.log('us funciona');
    this.guarda();
    // ejemplo de función asyncrona
    const sumaAfter2seg =(a , b) => {
      return new Promise (resolve => 
        setTimeout(() => 
        resolve(a + b),
        2000 ))
    }

    const sumaAsync = async() => {
      const cuatro = await sumaAfter2seg(2,2);
      const six = await sumaAfter2seg(cuatro,2);
      const ocho = await sumaAfter2seg(six,2);

      return ocho;
    }

    sumaAsync().then(tot =>
       console.log('Promesa', tot)
       );

  }

  confirmar() {
    if (this.user_data != null) {
      this.router.navigate(['tabs/home']);
    } else {

      this.confirmar();
    }
  }

  async presentToast(data: string) {
    console.log();
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 2000
    });
    toast.present();
  }


  async login( data: any[]  ) {
    console.log('logeando..');

    const loading = await this.loadCtrl.create({
      message: 'Cargando...',
    });
    loading.present();

    const url = URL_SERVICIOS + 'Login';

      const resp = await this.http.post( url, {
                  correo: data['correo'],
                  contra: data['contra']
               }).subscribe((res) => {

                  console.log(res);
                  /* var objeto convertido en array, cool*/
                      const result = Object.keys(res).map(function(key) {
                        return [Number(key), res[key]];
                      });
                      result.forEach(element => {
                          this.mensaje = element[1];
                          if ( this.mensaje === true) {
                            this.bandera = element[1];
                          }
                      });
                      /* aqui acaba*/
                    if (this.bandera === true) {

                      this.presentToast(this.mensaje);

                    } else {
                      this.user_data = res;
                      this.set_user();
                      }
                  }, error => {
                    console.log(error);
                    });

                  //this.bandera = false;
                  loading.dismiss();
                  return resp;
    }

  async signIn( user: any = []) {
      console.log('registrando...');
      const loading = await this.loadCtrl.create({
        message: 'Cargando...',
      });
      loading.present();

      const url = URL_SERVICIOS + 'Login/registrar';

      const resp = await this.http.post( url, {
                          correo : user['correo'],
                          nombres: user['nombres'],
                          contra: user['contra'],
                          nick: user['nick']
                        }).subscribe((res) => {
                          console.log(res);

                          /* var objeto convertido en array, cool*/
                          const result = Object.keys(res).map(function(key) {
                           return [Number(key), res[key]];
                           });
                          result.forEach(element => {
                          this.mensaje = element[1];
                          if ( this.mensaje === true) {
                            this.bandera = element[1];
                          }
                        });
                      /* aqui acaba*/
                      if (this.bandera === true) {

                        this.presentToast(this.mensaje);

                      } else {

                        this.login(user);
                      }
                  }, err => {
                    this.presentToast(err.error['Mensaje']);
                  });
    }

    set_user() {

      if (this.plt.is('cordova')) {
        // console.log("cel");
        this.storage.ready()
        .then(() => {

          this.storage.set('activo', this.user_data);
        });

      } else {
        console.log('compu');
        // localStorage.setItem( "pedido", JSON.stringify(this.elementos) )
        if (this.user_data['token']) {
          localStorage.setItem('activo', JSON.stringify(this.user_data));
          } else {
            localStorage.removeItem('activo');
          }
      }
    }

    logout() {
      this.user_data['token'] = null;
      this.set_user();
      this.router.navigate(['login']);
    }

    cargar_usuario() {

      const promesa = new Promise((resolve, reject) => {

        if (this.plt.is('cordova')) {
          console.log('storage listo');

          this.storage.ready()
            .then(() => {
              console.log('storage listo');

              this.storage.get('activo')
                .then(activo => {

                  if (activo) {
                    this.user_data = activo;
                  }
                  resolve();
                });
            });
        } else {
          if (localStorage.getItem('activo')) {
            this.user_data = JSON.parse(localStorage.getItem('activo'));
          }
        }
        resolve();
      });
      return promesa;
    }

    guarda(): boolean {

      if ( this.user_data['token'] != null ) {
        return true;
      } else {
        return false;
      }

    }
}
