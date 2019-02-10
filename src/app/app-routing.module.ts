import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // { path: '',         redirectTo: 'cargando', pathMatch: 'full' },
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
  { path: 'login',    loadChildren: './login/login.module#LoginPageModule' },
  { path: 'cargando', loadChildren: './cargando/cargando.module#CargandoPageModule' },
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule' },
  { path: 'home',     loadChildren: './home/home.module#HomePageModule' },
  { path: 'chat',     loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'chat/:uid',  loadChildren: './chatnew/chatnew.module#ChatnewPageModule' },
  //{ path: 'perfil',   loadChildren: './perfil/perfil.module#PerfilPageModule' },
  { path: 'encuesta', loadChildren: './encuesta/encuesta.module#EncuestaPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
