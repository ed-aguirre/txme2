import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})

export class EncuestaPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  indice: number = 0;
  temporal:number = 0;
  //bandera:boolean = true; // false = si deja, true = no deja

  data:number[]= []

  template = [
    {subti: "Pregunta 1", opc: "valor 1", opc2: "valor 2", opc3: "valor 3", val: 1, val2: 2 , val3: 3 },
    {subti: "Pregunta 2", opc: "valor 1", opc2: "valor 2", opc3: "valor 3", val: 1, val2: 2 , val3: 3},
    {subti: "Pregunta 3", opc: "valor 1", opc2: "valor 2", opc3: "valor 3", val: 1, val2: 2 , val3: 3},
    {subti: "Pregunta 4", opc: "valor 1", opc2: "valor 2", opc3: "valor 3", val: 1, val2: 2 , val3: 3},
    {subti: "Pregunta 5", opc: "valor 1", opc2: "valor 2", opc3: "valor 3", val: 1, val2: 2 , val3: 3},
    {subti: "Pregunta 6", opc: "valor 1", opc2: "valor 2", opc3: "valor 3", val: 1, val2: 2 , val3: 3},
    {subti: "Pregunta 7", opc: "valor 1", opc2: "valor 2", opc3: "valor 3", val: 1, val2: 2 , val3: 3},
    {subti: "Pregunta 8", opc: "valor 1", opc2: "valor 2", opc3: "valor 3", val: 1, val2: 2 , val3: 3},
    {subti: "Pregunta 9", opc: "valor 1", opc2: "valor 2", opc3: "valor 3", val: 1, val2: 2 , val3: 3},
    {subti: "Pregunta 10", opc: "valor 1", opc2: "valor 2", opc3: "valor 3", val: 1, val2: 2 , val3: 3},
  ]

  constructor(public alertCtrl: AlertController) { 
    
  }
  async alert() {
    const alert = await this.alertCtrl.create({
      header: 'Listo',
      subHeader: 'Se ha enviado tu respuesta',
      message: 'Cuando encontremos a tu match se te notificará',
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
    let slides = document.querySelector('ion-slides');
    slides.options = {
      effect: 'flip'
    }
    this.slides.lockSwipeToNext(true)
    
    
    this.slides.ionSlideDidChange.subscribe(() =>{
      this.data[this.indice] = this.temporal;

      //console.log(this.data);
      //console.log(this.indice);
      this.slides.lockSwipeToNext(true)
      
    });
  }

  haber(e, index:number){
    this.temporal = e.detail['value'];
    this.indice = index;
    
    //this.bandera = false
    this.slides.lockSwipeToNext(false)

  }



}
