import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../providers/usuario.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor( private _us: UsuarioService ) {
  }

  ngOnInit() {
  }

}
