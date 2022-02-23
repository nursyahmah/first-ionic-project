import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangePasswordPage } from '../change-password/change-password.page';
import { ProfileUpdatePage } from '../profile-update/profile-update.page';
import { Storage } from '@ionic/storage-angular';
import { AllService } from '../api/all/all.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
})
export class ProfileViewPage implements OnInit {

  profile_data: any

  constructor(
    private router: Router,
    private storage: Storage,
    private allApi: AllService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  // goToUpdateProfile() {
  //   this.router.navigate(['profile-update']);
  // }

  // goToChangePassword() {
  //   this.router.navigate(['change-password']);
  // }

  // doLogout() {
  //   this.router.navigate(['/']);
  // }

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

  async goToUpdateProfile() {
    let modal = await this.modalCtrl.create({
      swipeToClose: true,
      component: ProfileUpdatePage,
    });
    modal.onDidDismiss().then((resp: any) => {
      console.log(resp);
      this.ionViewDidEnter();
    })

    return await modal.present();
  }

  async goToChangePassword() {
    let modal = await this.modalCtrl.create({
      swipeToClose: true,
      component: ChangePasswordPage,
    });
    modal.onDidDismiss().then((resp: any) => {
      console.log(resp);
      this.ionViewDidEnter();
    })

    return await modal.present();
  }

  async doLogout() {
    let alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Confirm logout?',
      message: 'You will be redirected to the login page.',
      buttons: [
        {
          text: 'Dismiss',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: async () => {
            console.log('Confirm Okay');

            let loading = await this.loadingCtrl.create({
              message: 'Logging out...',
            });
            await loading.present();

            this.storage.get('api_key').then((resp: any) => {
              console.log(resp);
              let payload = {
                'api_key' : resp,
              }

              this.allApi.logout(payload).subscribe(async (resp: any) => {
                console.log(resp);
                loading.dismiss();
                if (resp.code == 0) {
                  this.storage.set('api_key', resp.data).then((resp: any) => {
                    console.log(resp);
                    this.router.navigate(['/']);
                  }, (error: any) => {
                    console.log(error);
                  })
                } else if (resp.code !== 0) {
                  let alert = await this.alertCtrl.create({
                    backdropDismiss: false,
                    header: 'Error!',
                    message: resp.message,
                    buttons: ['Dismiss']
                  });
                  await alert.present();
                }
              })
            }, (error: any) => {
              console.log(error)
              loading.dismiss();
            })
            this.allApi.logout()
          }
        }
      ]
    });

    await alert.present();
  }


}
