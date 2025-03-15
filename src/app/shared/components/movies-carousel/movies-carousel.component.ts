import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import Swiper from 'swiper';
import { IVideoContent } from '../../models/vedio-content.interface';
import { DescriptionPipe } from '../../pipe/description.pipe';
import { ImagePipe } from '../../pipe/image.pipe';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-movies-carousel',
  templateUrl: './movies-carousel.component.html',
  styleUrls: ['./movies-carousel.component.scss'],
  standalone: true,
  imports: [NgFor,CommonModule,DescriptionPipe,ImagePipe],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class MoviesCarouselComponent implements OnInit, AfterViewInit {
  @Input() videoContents:IVideoContent[] = [];
  @Input() title: string = '';
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  selectedContent: string | null = null;

  ngOnInit(): void {
    console.log("\n\n\n 20202020 videoContents ",this.videoContents);
    console.log("\n\n\n 2121212121 ",this.title)
  }
  ngAfterViewInit(): void {
    if (!this.swiperContainer) {
      console.error("Swiper container is undefined!");
      return;
    }

    this.initSwiper();
  }

  private initSwiper() {
    new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 3,
      slidesPerGroup: 2,
      centeredSlides: true,
      loop: true,
      breakpoints: {
        600: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 5, centeredSlides: true },
        900: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 5, centeredSlides: true },
        1200: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 5, centeredSlides: false },
        1500: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 5, centeredSlides: false },
        1800: { slidesPerView: 5, slidesPerGroup: 6, spaceBetween: 5, centeredSlides: false },
      }
    });
  }

  setHoverMovie(movies :IVideoContent){
    this.selectedContent = movies.title  ?? movies.name;
    console.log('\n\n\n 60606',this.selectedContent)

  }

  clearHoverMovie(){
    this.selectedContent = null;
  }
}
