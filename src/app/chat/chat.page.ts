import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../providers/usuario.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  /* template: any[] = [
    {uid: "Alexa"}
  ]; */

  template: any = [];

  constructor( private _us: UsuarioService ) { }

  ngOnInit() {
    // this._us.friends();
  }

}
