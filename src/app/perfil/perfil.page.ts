import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../providers/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor( private _us: UsuarioService ) { }

  ngOnInit() {
  }

}
