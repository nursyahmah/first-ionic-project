import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AllService } from '../api/all/all.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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

  goToRegister() {
    this.router.navigate(['register']);
  }

  // onSubmit(form: NgForm) {
  //   console.log(form.value);
  //   this.router.navigate(['/profile-view']);
  // }
  async onSubmit(form: NgForm) {
    let loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();

    console.log(form.value);
    let payload = {
      'email' : form.value.email,
      'password' : form.value.password,
    }

    this.allApi.login(payload).subscribe(async (resp: any) => {
      console.log(resp);
      loading.dismiss();
      if (resp.code == 0) {
        this.storage.set('api_key', resp.data).then((resp: any) => {
          console.log(resp);
          this.router.navigate(['tabs']);
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
  }


}
