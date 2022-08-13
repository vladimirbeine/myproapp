import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LenmboPage } from './lenmbo.page';

const routes: Routes = [
  {
    path: '',
    component: LenmboPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LenmboPageRoutingModule {}
