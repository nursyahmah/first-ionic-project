import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AllService } from '../api/all/all.service';

@Component({
  selector: 'app-ticket-update',
  templateUrl: './ticket-update.page.html',
  styleUrls: ['./ticket-update.page.scss'],
})
export class TicketUpdatePage implements OnInit {

  api_key:any
  ticket_id: any
  feedback: any
  constructor(
    private storage: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private allApi: AllService
  ) { }

  ngOnInit() {
  }

  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    })
  }

  async onSubmit(form: NgForm) {
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.storage.get('api_key').then((resp1: any) => {
      console.log(resp1);
      this.api_key = resp1;
      if (this.api_key !== null) {
        this.storage.get('vtid').then((resp2: any) => {
          console.log(resp2);
          this.ticket_id = resp2;
          if (this.ticket_id !== null) {
            let payload = {
              'api_key' : this.api_key,
              'ticket_id' : this.ticket_id,
              'feedback' : form.value.feedback
            }

            this.allApi.ticketUpdate(payload).subscribe(async (resp: any) => {
              console.log(resp);
              loading.dismiss();
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
                console.log(resp.data);
                loading.dismiss();
                let alert = await this.alertCtrl.create({
                  backdropDismiss: false,
                  header: 'Error!',
                  message: resp.data,
                  buttons: [
                     {
                      text: 'Dismiss',
                      handler: () => {
                        this.dismissModal();
                      }
                    }
                  ]
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
                buttons: [
                   {
                    text: 'Dismiss',
                    handler: () => {
                      this.dismissModal();
                    }
                  }
                ]
              });

              await alert.present();
            })
          }
        })
      }
    })
  }


}
