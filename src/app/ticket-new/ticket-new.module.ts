import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketNewPageRoutingModule } from './ticket-new-routing.module';

import { TicketNewPage } from './ticket-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketNewPageRoutingModule
  ],
  declarations: [TicketNewPage]
})
export class TicketNewPageModule {}
