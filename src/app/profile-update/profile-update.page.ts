import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AllService } from '../api/all/all.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.page.html',
  styleUrls: ['./profile-update.page.scss'],
})
export class ProfileUpdatePage implements OnInit {

  profile_data: any;

  constructor(
    private storage: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private allApi: AllService,
  ) { }

  ngOnInit() {
  }

  // onSubmit(form: NgForm) {
  //   console.log(form.value);
  // }

  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed' : true
    })
  }

  ionViewDidEnter() {
    this.loadProfile();
  }

  async loadProfile() {
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.storage.get('api_key').then((resp: any) => {
      console.log(resp);
      let payload = {
        'api_key' : resp,
      }
      this.allApi.profileView(payload).subscribe(async (resp: any) => {
        console.log(resp);
        loading.dismiss();

        if (resp.code == 0) {
          this.profile_data = resp.data;
          console.log(this.profile_data);
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
        console.log(error)
        loading.dismiss();
        let alert = await this.alertCtrl.create({
          backdropDismiss: false,
          header: 'Error!',
          message: error,
          buttons: ['Dismiss']
        });
        await alert.present();
      })
    })
  }

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
        'firstname': form.value.firstname,
        'lastname' : form.value.lastname,
        'email' : form.value.email,
      }

      this.allApi.profileUpdate(payload).subscribe(async (resp: any) => {
        console.log(resp);
        loading.dismiss();

        if (resp.code == 0) {
          let alert = await this.alertCtrl.create({
            backdropDismiss: false,
            header: 'Success!',
            message: 'Your profile has been successfully updated!',
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
