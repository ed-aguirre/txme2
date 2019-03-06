import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-newnoticia',
  templateUrl: './newnoticia.page.html',
  styleUrls: ['./newnoticia.page.scss'],
})
export class NewnoticiaPage implements OnInit {

  colors= '';
  icono='help';
  texto='';
  noticiaid= '';

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
   
  }

  close() {
    this.navCtrl.goBack();
  }

  publicar() {
    console.log('yerp');
  }

}
