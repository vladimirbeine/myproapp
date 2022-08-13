import { Component, OnInit } from '@angular/core';
import { AdMob, AdOptions, BannerAdOptions, BannerAdPosition, BannerAdSize, RewardAdOptions } from '@capacitor-community/admob';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-lenmbo',
  templateUrl: './lenmbo.page.html',
  styleUrls: ['./lenmbo.page.scss'],
})
export class LenmboPage implements OnInit {

  constructor() {
    this.initialize();
  }

  ngOnInit() {}

  async initialize(): Promise<void> {
    const { status } = await AdMob.trackingAuthorizationStatus();

    if (status === 'notDetermined') {
      console.log("AdMob Status: display information before admob loads first time!");
    }

    AdMob.initialize({
      requestTrackingAuthorization: true,
      testingDevices: [''],
      initializeForTesting: true,
    });
  }

  async showBanner() {
    const adId = isPlatform('ios') ? 'ios-ad-id' : 'android-ad-id';

    const options: BannerAdOptions = {
      adId,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true,
    };

    await AdMob.showBanner(options);
  }

  async hideBanner() {
    await AdMob.hideBanner();
  }

  async showInterstitial() {
    const options: AdOptions = {
      adId: '',
      isTesting: true,
      //  npa: true,
    };

    await AdMob.prepareInterstitial(options);
    await AdMob.showInterstitial();
  }

  async showRewardVideo() {
    const options: RewardAdOptions = {
      adId: '',
      isTesting: true,
      // npa: true,
      // ssv: {...}
    };

    await AdMob.prepareRewardVideoAd(options);
    await AdMob.showRewardVideoAd();
  }

}
