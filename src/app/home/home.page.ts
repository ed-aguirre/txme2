import { Component } from '@angular/core';
import { UsuarioService } from '../providers/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( public _us: UsuarioService ) {}

}
