import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AllService } from '../api/all/all.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  onShowPassword  : boolean = true;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
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

  async onSubmit(form: NgForm) {
    console.log(form.value);
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    if (form.value.newPass == form.value.confirmNewPass) {
      let payload = {
        "firstname": form.value.firstname,
        "lastname": form.value.lastname,
        "email": form.value.email,
        "password": form.value.newPass
      }

      this.allApi.register(payload).subscribe(async (resp: any) => {
        console.log(resp);
        loading.dismiss();
        if (resp.code == 0) {
          this.storage.set('api_key', resp.data).then(async (resp: any) => {
            console.log(resp);
            let alert = await this.alertCtrl.create({
              backdropDismiss: false,
              header: 'Success!',
              message: 'Account successfully registered! You will be login automatically.',
              buttons: [
                 {
                  text: 'OK',
                  handler: () => {
                    this.router.navigate(['tabs']);
                  }
                }
              ]
            });

            await alert.present();
          }, (error: any) => {
            console.log(error);
          })
        } if (resp.code !== 0) {
          let alert = await this.alertCtrl.create({
            backdropDismiss: false,
            header: 'Error!',
            message: resp.data,
            buttons: ['Dismiss']
          });

          await alert.present();
        }
      }, async (error: any) => {
        loading.dismiss();
        let alert = await this.alertCtrl.create({
          backdropDismiss: false,
          header: 'Error!',
          message: error,
          buttons: ['Dismiss']
        });

        await alert.present();
      })
    } else if (form.value.newPass !== form.value.confirmNewPass) {
      loading.dismiss();
      let alert = await this.alertCtrl.create({
        backdropDismiss: false,
        header: 'Error!',
        message: 'Your new password does not match with the confirm new password!',
        buttons: ['Dismiss']
      });

      await alert.present();
    }
  }



}
