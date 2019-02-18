import { Injectable, Component } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.service';
import { LoadingController, ToastController, Platform } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http'; // siempre usar el HTTP DE angular
import { Router } from '@angular/router';
import { async } from 'q';
import { serializePaths } from '@angular/router/src/url_tree';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public user_data: any[];
  // tiene que ser publica para que puedas llamar la variable en otros componentes yep...
  mensaje: any;
  bandera: boolean;

  public amigos: any[] = [];

  constructor(private http: HttpClient,
              private loadCtrl: LoadingController,
              private toastCtrl: ToastController,
              private plt: Platform,
              private storage: Storage,
              private router: Router) {
    // this.guarda();

  }

  /* Creo que no sirve...
  confirmar() {
    if (this.user_data) {
      this.router.navigate(['tabs/home']);
    } else {

      this.confirmar();
    }
  }*/

  async presentToast(data: any) {
    console.log(data);
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 2000
    });
    toast.present();
  }

  async LOGIN(datos: any[]) {
      const loading = await this.loadCtrl.create({
        message: 'Cargando...',
      });
      loading.present();

    const url = URL_SERVICIOS + 'Login' ;

    const loggear = (data: any[]) => {
      return new Promise (resolve =>
      this.http.post(url, {
        matricula: data['matricula'].toUpperCase(),
        contra: data['contra']
      }).subscribe((resp: any[]) => {
            // console.log(resp);
            if( resp['error'] == true ) {
              this.presentToast(resp['Mensaje']);
            }
            this.user_data = resp;
            resolve(resp);
        }, error => {
          console.log(error);
          loading.dismiss();
        })
      );
    };

    const  vamonos = () =>{
      if( this.user_data['error'] == false ) {
        this.router.navigate(['tabs/home']);
      }else{
        this.router.navigate(['login'])
      }
    }

    const LOGINasync = async(da:any[]) => {
      const uno = await loggear(da);
      console.log(uno)
      const dos = await this.set_user()
      console.log('Guardando usuario');
      const tres = await vamonos();
      loading.dismiss();
      return tres
   }

   LOGINasync(datos).then(fin =>{
    console.log(this.user_data)
   })
  }

  async SIGNIN(datos:any[]) {
    const loading = await this.loadCtrl.create({
      message: 'Cargando...',
    });
    loading.present();

    const url = URL_SERVICIOS + 'Login/registrar';

    const signer = (data:any[]) => {
      return new Promise (resolve => {
        this.http.post(url, {
          matricula: data['matricula'].toUpperCase(),
          nombre: data['nombre'],
          contra: data['contra'],
          gen: data['gen']
        }).subscribe((resp:any) =>{
            if( resp['error'] == true ) {
              this.presentToast(resp['Mensaje']);
             
            }else {
              this.presentToast("Usuario registrado correctamente.");
            }
            this.user_data = resp
            resolve(resp);
        }, error =>{
          loading.dismiss();
          console.log('Ocurrio un error: '+ error);
        })
      })
    };

    const vamonos = () =>{
      if( this.user_data['error'] === true ) {
        console.log("Vuelve a intentarlo!")
      }else{
        this.router.navigate(['login']);
      }
    };

    const SIGNINasync = async(data:any[]) =>{
      const uno = await signer(data);
      console.log(uno);
      const dos = await vamonos();
      console.log("Registro asincrono completo");
      loading.dismiss();
      return dos;
    }

    SIGNINasync(datos).then( fin =>{
      console.log(fin); // este console imprime un undefined pero esta ok
    });

  }


    set_user = async() => {

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

    cargar_usuario = async() => {

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
      /*creo quue era para el guard...*/
      if ( this.user_data['token'] != null ) {
        return true;
      } else {
        return false;
      }

    }


  /**  Encuesta  **/
    async VERIFICAR(datos: string) {
      const loading = await this.loadCtrl.create({
        message: 'Verificando...',
      });
      loading.present();

      const url = URL_SERVICIOS + 'Encuesta';

      const ver = (datos:string) => {
        return new Promise(resolve => 
          this.http.post(url, {
            matricula: datos
          }).subscribe((resp:any[])=> {
              if( resp['error'] == false ){
                this.presentToast(resp['Mensaje']);
               
              }else{
                this.presentToast(resp['Mensaje']);
               
              }
              resolve(resp)
          }, error =>{
            console.log('Ocurrio un error: '+ error);
            loading.dismiss();
          })
        )
      };

      const vamonos = (band: any ={}) =>{
        console.log(band)
        if( band['error'] == false ) {
          this.router.navigate(['encuesta'])
        }else{
          this.router.navigate(['tabs/home'])
        }
      };

      const VERIFIasync = async(datos:string) =>{
        const uno = await ver(datos);
        const dos = await vamonos(uno);
        loading.dismiss();
        return dos;
      };

      VERIFIasync(datos).then( fin =>{
        console.log(fin)
      })
    }

    friends = async() => {
      const url = URL_SERVICIOS + 'Amigos/' + this.user_data['matricula'];
      this.amigos = [];

      this.http.get( url ).subscribe((resp: any) => {
        console.log(resp);
          this.amigos.push(...resp.amigos);
          console.log(this.amigos);
      }, error => {
        console.log('ocurrio un error ' + error);
      });

    }

}
