import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';

import { URL_SERVICIOS } from "../../config/url.service";

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  public news:any[] = [];

  public coments :any[] = [];

  constructor(private http: HttpClient,
              private loadCtrl: LoadingController,
              private toastCtrl: ToastController) {
                
   }
   async presentToast(data: any) {
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 2000
    });
    toast.present();
  }

   async NEWS() {
    const loading = await this.loadCtrl.create({
      message: 'Cargando...',
    });
    loading.present();

    this.news = [];

    const url = URL_SERVICIOS + 'Noticia';

    const cargar = () => {
      return new Promise(resolve => {
        this.http.get(url).subscribe(( resp:any) =>{
          if( resp['error'] === true){
            this.presentToast(resp['Mensaje']);

          } else {
            this.news.push(...resp.noticias);
            this.news.reverse();
            // console.table(this.news);
          }
          resolve(resp);
          
        }, error => {
          console.log('Ha ocurrido un error ' + error);
          loading.dismiss();
        });
      });
    };

    const verNews = async() => {
      const uno = await cargar();
      loading.dismiss();
      return uno;
    };

    verNews().then(fin => {
      // console.log(fin);
    });

   }

   async comentarios( id: string ) {
      //aqui debo de poner un colorsito de cargando
      this.coments = []

      const url = URL_SERVICIOS + 'Noticia/comentarios/' + id;

      const verComent = () => {
        return new Promise(resolve => {
          this.http.get( url ).subscribe((resp:any) => {
            //console.log(resp);
            this.coments.push(...resp.comentarios );
            //console.table(this.coments);
            resolve(resp);
          }, error => {
            console.log('Ocurrio un error '+ error);
          });
        });
      };

      const commentAsync = async() => {
        const uno = await verComent();
        return uno;
      };

      commentAsync().then(fin => {
        //console.log(fin);
      });
   }


}
