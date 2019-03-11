import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { NoticiasPage } from './noticias.page';
import { TimeAgoPipe } from 'time-ago-pipe';
import { TraductorPipe } from '../traductor.pipe';

const routes: Routes = [
  {
    path: '',
    component: NoticiasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NoticiasPage, TimeAgoPipe, TraductorPipe]
})
export class NoticiasPageModule {}
