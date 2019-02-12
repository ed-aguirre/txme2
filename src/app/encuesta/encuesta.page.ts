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

  private template = [
    {id: "1",  question: "¿Qué haces cuando estas aburrido?",
      opc: "Ver series y películas", opc2: "Platicar con amigos", opc3: "Dormir", val: 1, val2: 2 , val3: 3 },
    {id: "2",  question: "¿A qué horario frecuentas salir?",
      opc: "De noche", opc2: "Casi no salgo", opc3: "Mañana, Tarde y Noche.", val: 1, val2: 2 , val3: 3},
    {id: "3",  question: "¿Consideras importante la escuela?", 
      opc: "Super importante", opc2: "Me da igual", opc3: "Qué es una escuela?", val: 1, val2: 2 , val3: 3},
    {id: "4",  question: "¿Cúando ves a una persona en la calle de pocos recursos, cómo reaccionas?", 
      opc: "Trato de ayudar con lo que pueda", opc2: "Le doy dinero", opc3: "Nada", val: 1, val2: 2 , val3: 3},
    {id: "5",  question: "¿Te gustan los animales?", 
      opc: "Tengo mascotas y si", opc2: "Tengo mascotas y no", opc3: "Para nada", val: 1, val2: 2 , val3: 3},
    {id: "6",  question: "¿Consideras que la carrera que estudias es la mejor de todas?", 
      opc: "Por supuesto", opc2: "Me da igual", opc3: "Todas las carreras son importantes", val: 1, val2: 2 , val3: 3},
    {id: "7",  question: "Selecciona la cita perfecta:", 
      opc: "Pizza, Sabritas, Helado y Netflix", opc2: "Plaza, Cine, Marquesitas o Esquite", opc3: "Ir por un cafe y platicar", val: 1, val2: 2 , val3: 3},
    {id: "8",  question: "¿Te gusta bailar?", 
      opc: "Si, bailo de todo", opc2: "No", opc3: "No se bailar, pero hago el intento", val: 1, val2: 2 , val3: 3},
    {id: "9",  question: "Terminando la carrera, ¿que te gustaría hacer?", 
      opc: "Seguir estudiando", opc2: "Buscar un trabajo", opc3: "Emprender o viajar", val: 1, val2: 2 , val3: 3},
    {id: "10", question: "Esta preguntá es super sería. ¿Te gustaria tener hijos en un futuro?", 
      opc: "Espera.. khe?", opc2: "Super si", opc3: "En un futuro muy muy lejano pero si.", val: 1, val2: 2 , val3: 3},
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
