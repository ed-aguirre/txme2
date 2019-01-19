import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioService } from './providers/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  public bandera:boolean;

  constructor( private router: Router, public _us: UsuarioService ) {
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    Observable<boolean> | Promise<boolean> | boolean {
      console.log(this._us.guarda());
      // no funciona arreglar despues, pero el cargando funciona gg
      return this._us.guarda();
  }

}
