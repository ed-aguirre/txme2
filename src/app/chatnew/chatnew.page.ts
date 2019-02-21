import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-chatnew',
  templateUrl: './chatnew.page.html',
  styleUrls: ['./chatnew.page.scss'],
})
export class ChatnewPage implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('id') contact: any[];
  // contact: string;
  mensaje = '';
  // contact: any;
  chat: any = [
    {user: 1, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},
    {user: 0, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},
    {user: 1, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},
    {user: 0, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},
    {user: 1, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},
    {user: 0, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},
    {user: 1, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},
    {user: 0, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},
    {user: 1, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},
    {user: 0, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},
    {user: 1, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},
    {user: 0, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},
    {user: 1, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},
    {user: 0, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},
    {user: 1, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},
    {user: 0, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},
    {user: 1, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},
    {user: 0, time: "05:16 pm", txt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis sapien sed euismod lacinia. Nam dignissim posuere eleifend. Quisque nibh felis, elementum eget enim sed, porttitor mollis eros.  Donec euismod quam quis congue elementum."},

  ] 

  tipoBoton = 'clear'; // cuando se llene el chat debe cambiar a "outline"
  colorBoton = 'dark'; // cuando se llene el chat debe cambiar a "danger"
  // tslint:disable-next-line:max-line-length
  textAlert = 'Solo puedes enviar un cantidad especifica de mensajes a esta persona. Cuando se llegue al límite especificado no se permitirá enviar más mensajes a esta persona.';

  constructor(private route: ActivatedRoute,
              private navCtrl: NavController,
              private alertCtrl: AlertController) {
    console.log(this.contact);
               }

  ngOnInit() {
    // this.contact = this.navParams.get('id');

    if (this.chat.length >= 30) {
      this.colorBoton = 'danger';
      this.tipoBoton = 'outline';
      this.textAlert = 'Se ha alcanzado el límite de mensajes por chat. Gracias por usar txt.me!'
    }
  }

  async alert() {
    const alert = await this.alertCtrl.create({
      header: 'Límite de mensajes',
      subHeader: 'Llevan ' + this.chat.length +' mensaje(s) enviados de 30.',
      message: this.textAlert,
      buttons: ['OK']
    });

    await alert.present();
  }

  close() {
    this.navCtrl.goBack();
  }

  enviar() {
   console.log('hay que programas');
  }

}
