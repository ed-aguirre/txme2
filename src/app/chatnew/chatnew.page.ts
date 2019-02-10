import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-chatnew',
  templateUrl: './chatnew.page.html',
  styleUrls: ['./chatnew.page.scss'],
})
export class ChatnewPage implements OnInit {

  id: string;
  constructor(private route: ActivatedRoute,
              private navCtrl: NavController ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('uid')
  }

  close(){
    this.navCtrl.goBack();
  }

}
