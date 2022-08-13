import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LenmboPageRoutingModule } from './lenmbo-routing.module';

import { LenmboPage } from './lenmbo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LenmboPageRoutingModule
  ],
  declarations: [LenmboPage]
})
export class LenmboPageModule {}
