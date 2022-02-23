import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketUpdatePageRoutingModule } from './ticket-update-routing.module';

import { TicketUpdatePage } from './ticket-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketUpdatePageRoutingModule
  ],
  declarations: [TicketUpdatePage]
})
export class TicketUpdatePageModule {}
