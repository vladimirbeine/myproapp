import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';
import { Auth, onAuthStateChanged, Unsubscribe } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  authSubscriber: Unsubscribe;

  profile = null;

  constructor(
    private auth: AuthService,
    private ngAuth: Auth,
    private router: Router,
    private user: UserService,
    private loadingCtler: LoadingController,
    private alertCtler: AlertController) { }

  async ngOnInit() {
    
    this.authSubscriber = onAuthStateChanged(this.ngAuth, async user => {
      if (user) {
        // Here we have the user and can safely use it.
        await this.user.getUserProfile().subscribe((data) => {
          this.profile = data;
          console.log("Profile data: ", data);
       });
      } else {
        // No user is logged in.
        console.log("User Data: ", null)
      }
    });
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, //Camera, Photos or Prompt
    });
    console.log("Image file: ", image);

    if (image) {
      const loading = await this.loadingCtler.create();
      await loading.present();

      const result = await this.user.uploadProfilePicture(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertCtler.create({
          header: 'Upload failed',
          message: 'There was an eror uploading the avatar',
          buttons: ['Ok']
        });
        await alert.present();
      }
    }
  }

  async logOutUser() {
    const loading = await this.loadingCtler.create();
    await loading.present();

    await this.auth.logout();
    this.router.navigateByUrl('/tabs/home', {replaceUrl: true}).then(() => {
      loading.dismiss();
    });
  }

  ngOnDestroy(): void {
    this.authSubscriber();
  }

  toggleTheme(event) {
    if(event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
    console.log("Toggle: true");
  }

}
