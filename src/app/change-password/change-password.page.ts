import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AllService } from '../api/all/all.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  onShowPassword: boolean = true;

  constructor(
    private storage: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private allApi: AllService,
  ) { }

  ngOnInit() {
  }

  onPasswordToggle(): boolean {
    return this.onShowPassword = !this.onShowPassword;
  }

  // onSubmit(form: NgForm) {
  //   console.log(form.value);
  // }

  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed' : true
    })
  }
  async onSubmit(form: NgForm) {
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    console.log(form.value);

    if (form.value.oldPass !== form.value.newPass) {
      if (form.value.newPass == form.value.confirmNewPass) {
        this.storage.get('api_key').then((resp: any) => {
          console.log(resp);

          let payload = {
            'api_key': resp,
            'oldPass': form.value.oldPass,
            'newPass' : form.value.newPass,
          }
          console.log(payload);
          this.allApi.changePassword(payload).subscribe(async (resp: any) => {
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
              this.errorAlert(resp.message);
            }
          }, async (error: any) => {
            console.log(error);
            loading.dismiss();
            this.errorAlert(error);
          })
        }, async (error: any) => {
          loading.dismiss();
          console.log(error);
          this.errorAlert(error);
        })
      } else if (form.value.newPass !== form.value.confirmNewPass) {
        loading.dismiss();
        let message = 'Your new password does not match the new confirm password.';
        this.errorAlert(message);
      }
    } else if (form.value.oldPass == form.value.newPass) {
      loading.dismiss();
      let message = 'Your new password must not match your old password.';
      this.errorAlert(message);
    }
  }

  async errorAlert(message:any) {
    let alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Error!',
      message: message,
      buttons: ['Dismiss']
    })

    await alert.present();
  }

}
