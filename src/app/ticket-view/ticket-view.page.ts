import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AllService } from '../api/all/all.service';
import { TicketUpdatePage } from '../ticket-update/ticket-update.page';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.page.html',
  styleUrls: ['./ticket-view.page.scss'],
})
export class TicketViewPage implements OnInit {

  api_key: any
  vtid: any
  ticket_details:any

  constructor(
    private router: Router,
    private storage: Storage,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private allApi: AllService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.ticketDetails()
  }

  // goToTicketUpdate() {
  //   this.router.navigate(['ticket-update']);
  // }

  async deleteTicket() {
    //ticket will be deleted upon confirmation
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.storage.get('api_key').then((resp1: any) => {
      this.api_key = resp1;
      if (this.api_key !== null) {
        this.storage.get('vtid').then((resp2: any) => {
          this.vtid = resp2;
          if (this.vtid !== null) {
            let payload = {
              'api_key' : this.api_key,
              'ticket_id' : this.vtid,
            }
            this.allApi.ticketDelete(payload).subscribe(async (resp: any) => {
              console.log(resp);
              loading.dismiss()
              if (resp.code == 0) {
                console.log(resp.data);
                let alert = await this.alertCtrl.create({
                  backdropDismiss: false,
                  header: 'Success!',
                  message: resp.data,
                  buttons: [
                    {
                     text: 'OK',
                     handler: () => {
                       this.dismissModal();
                     }
                   }
                 ]
                });

                await alert.present();
              } else if (resp.code !== 0) {
                console.log(resp.message);
                let alert = await this.alertCtrl.create({
                  backdropDismiss: false,
                  header: 'Error!',
                  message: resp.data,
                  buttons: ['Dismiss']
                });

                await alert.present();
              }
            }, async (error: any) => {
              console.log(error);
              let alert = await this.alertCtrl.create({
                backdropDismiss: false,
                header: 'Error!',
                message: error,
                buttons: ['Dismiss']
              });

              await alert.present();
            })
          }
        })
      }
    })
  }


  async goToTicketUpdate() {
      let modal = await this.modalCtrl.create({
        swipeToClose: true,
        component: TicketUpdatePage,
      });

      modal.onDidDismiss().then((resp:any) => {
        console.log(resp);
        this.ionViewWillEnter();
      })

      return await modal.present();
    }

  dismissModal() {
  this.modalCtrl.dismiss({
      'dismissed': true
    })
  }

  async ticketDetails() {
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.storage.get('api_key').then((resp1: any) => {
      this.api_key = resp1;
      if (this.api_key !== null) {
        this.storage.get('vtid').then((resp2: any) => {
          this.vtid = resp2;
          if (this.vtid !== null) {
            let payload = {
              'api_key' : this.api_key,
              'ticket_id' : this.vtid,
            }
            this.allApi.ticketView(payload).subscribe(async (resp: any) => {
              console.log(resp);
              loading.dismiss()
              if (resp.code == 0) {
                console.log(resp.data);
                this.ticket_details = resp.data;
              } else if (resp.code !== 0) {
                console.log(resp.message);
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
              let alert = await this.alertCtrl.create({
                backdropDismiss: false,
                header: 'Error!',
                message: error,
                buttons: ['Dismiss']
              });

              await alert.present();
            })
          }
        })
      }
    })
  }

}


