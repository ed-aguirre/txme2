import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-vernoticia',
  templateUrl: './vernoticia.page.html',
  styleUrls: ['./vernoticia.page.scss'],
})
export class VernoticiaPage implements OnInit {
  noticiaid= '';

  constructor(private ruta: ActivatedRoute,
              private navCtrl: NavController ) { }

  ngOnInit() {
    this.noticiaid = this.ruta.snapshot.params[('uid')];
  }

  close() {
    this.navCtrl.goBack();
  }

}
