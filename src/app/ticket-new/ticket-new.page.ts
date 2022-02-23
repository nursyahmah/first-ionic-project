import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AllService } from '../api/all/all.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.page.html',
  styleUrls: ['./ticket-new.page.scss'],
})
export class TicketNewPage implements OnInit {

  // Order_Product_ID: any;
  // Order_ID: any;
  // Item_Name: any;
  // Normal_Price: any;
  // Promotion_Price: any;


  constructor(
    // public _apiService: ApiService,
    private storage: Storage,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private allApi: AllService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  // addTicket(){
  //   // console.log(this.Order_Product_ID, this.Order_ID, this.Item_Name, this.Normal_Price, this.Promotion_Price);

  //   let data = {
  //     Order_Product_ID: this.Order_Product_ID,
  //     Order_ID: this.Order_ID,
  //     Item_Name: this.Item_Name,
  //     Normal_Price: this.Normal_Price,
  //     Promotion_Price: this.Promotion_Price
  //   }
  //   console.log("Order_Product_ID = " + data.Order_Product_ID);
  //   console.log("Order_ID = " + data.Order_ID);
  //   console.log("Item_Name = " + data.Item_Name);
  //   console.log("Normal_Price = " + data.Normal_Price);
  //   console.log("Promotion_Price = " + data.Promotion_Price);
  //   // this._apiService.addTicket(data).subscribe((res:any) => {
  //   //   console.log("SUCCESS ===", res);
  //   // },(error:any) => {
  //   //   console.log("ERROR ===", error);
  //   // })
  // }
  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    })
  }

  // async onSubmit(form: NgForm) {
  //   let loading = await this.loadingCtrl.create({
  //     message: 'Please wait...',
  //   });
  //   await loading.present();

  //   console.log(form.value);

  //   this.storage.get('api_key').then((resp: any) => {
  //     console.log(resp);

  //     let payload = {
  //       'api_key': resp,
  //       'email' : form.value.email,
  //       'name': form.value.firstname + " " + form.value.lastname,
  //       'title': form.value.title,
  //       'feedback' : form.value.feedback,
  //       'source' : 'Via App'
  //     }

  //     this.allApi.ticketNew(payload).subscribe(async (resp: any) => {
  //       console.log(resp);
  //       loading.dismiss();

  //       if (resp.code == 0) {
  //         let alert = await this.alertCtrl.create({
  //           backdropDismiss: false,
  //           header: 'Success!',
  //           message: 'Ticket #' + resp.data + ' has been created!',
  //           buttons: [
  //              {
  //               text: 'OK',
  //               handler: () => {
  //                 this.dismissModal();
  //               }
  //             }
  //           ]
  //         });

  //         await alert.present();
  //       } else if (resp.code !== 0) {
  //         let alert = await this.alertCtrl.create({
  //           backdropDismiss: false,
  //           header: 'Error!',
  //           message: resp.message,
  //           buttons: ['Dismiss']
  //         });

  //         await alert.present();
  //       }
  //     }, async (error: any) => {
  //       console.log(error);
  //       loading.dismiss();

  //       let alert = await this.alertCtrl.create({
  //         backdropDismiss: false,
  //         header: 'Error!',
  //         message: error,
  //         buttons: ['Dismiss']
  //       });

  //       await alert.present();
  //     })
  //   }, async (error: any) => {
  //     loading.dismiss();
  //     console.log(error);

  //     let alert = await this.alertCtrl.create({
  //       backdropDismiss: false,
  //       header: 'Error!',
  //       message: error,
  //       buttons: ['Dismiss']
  //     });

  //     await alert.present();
  //   })
  // }
  async onSubmit(form: NgForm) {
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    console.log(form.value);

    this.storage.get('api_key').then((resp: any) => {
      console.log(resp);

      let payload = {
        'api_key': resp,
        'Order_Product_ID' : form.value.Order_Product_ID,
        'Order_ID': form.value.Order_ID,
        'Item_Name': form.value.Item_Name,
        'Normal_Price' : form.value.Normal_Price,
        'Promotion_Price' : form.value.Promotion_Price,
      }

      this.allApi.ticketNew(payload).subscribe(async (resp: any) => {
        console.log(resp);
        loading.dismiss();

        if (resp.code == 0) {
          let alert = await this.alertCtrl.create({
            backdropDismiss: false,
            header: 'Success!',
            message: 'Ticket #' + resp.data + ' has been created!',
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
    }, async (error: any) => {
      loading.dismiss();
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

}
