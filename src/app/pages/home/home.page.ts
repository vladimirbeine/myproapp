import { Component, OnInit } from '@angular/core';
import SwiperCore, { SwiperOptions,  Navigation, Pagination, Scrollbar, EffectFlip } from 'swiper';

SwiperCore.use([Navigation, Pagination, Scrollbar, EffectFlip]);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  
  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  constructor() { }

  ngOnInit() {
  }

  
  onSwiper(swiper) {
    console.log("Swiper data: ", swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

}
