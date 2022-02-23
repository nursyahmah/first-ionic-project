import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketUpdatePage } from './ticket-update.page';

const routes: Routes = [
  {
    path: '',
    component: TicketUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketUpdatePageRoutingModule {}
