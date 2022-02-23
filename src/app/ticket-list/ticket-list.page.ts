import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AllService } from '../api/all/all.service';
import { Storage } from '@ionic/storage-angular';
import { TicketNewPage } from '../ticket-new/ticket-new.page';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.page.html',
  styleUrls: ['./ticket-list.page.scss'],
})
export class TicketListPage implements OnInit {

  tickets_list:any

  constructor(
    private router: Router,
    private storage: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private allApi: AllService

  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    // this.getTicketList();
  }


  goToTicket(ticket_id: any) {
    this.router.navigate(['ticket-view']);
  }

  // newTicket() {
  //   this.router.navigate(['ticket-new']);
  // }
  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    })
  }

  async newTicket() {
    let modal = await this.modalCtrl.create({
      swipeToClose : true,
      component : TicketNewPage,
    })

    modal.onDidDismiss().then((resp:any) => {
      console.log(resp);
      this.ionViewDidEnter();
    })

    return await modal.present();
  }

  async getTicketList() {
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.storage.get('api_key').then((resp: any) => {
      console.log(resp);
      let payload = {
        'api_key' : resp,
      }

      this.allApi.ticketAll(payload).subscribe(async (resp: any) => {
        console.log(resp);
        console.log(resp.data.length);
        loading.dismiss();

        if (resp.code == 0) {
          this.tickets_list = resp.data;
        } else if (resp.code !== 1) {
          let alert = await this.alertCtrl.create({
            backdropDismiss: false,
            header: 'Error!',
            message: resp.message,
            buttons: ['Dismiss']
          });

          await alert.present();
        }
      }, async (error: any) => {
        console.log(error);
        loading.dismiss();
        let alert = await this.alertCtrl.create({
          backdropDismiss: false,
          header: 'Error!',
          message: error,
          buttons: ['Dismiss']
        });

        await alert.present();
      })
    }, (error: any) => {
      console.log(error);
      loading.dismiss();
    })
  }


}
