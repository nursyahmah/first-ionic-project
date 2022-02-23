import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketViewPageRoutingModule } from './ticket-view-routing.module';

import { TicketViewPage } from './ticket-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketViewPageRoutingModule
  ],
  declarations: [TicketViewPage]
})
export class TicketViewPageModule {}
