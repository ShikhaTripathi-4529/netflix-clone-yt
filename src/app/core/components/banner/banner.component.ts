import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnChanges {

@Input({required:true}) bannerTitle = '';
@Input() bannerOverview = '';
@Input() key = '';
private sanitizor = inject(DomSanitizer)
videoUrl = this.sanitizor.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
ngOnChanges(changes: SimpleChanges): void {
 
if (changes['key']) {
  this.videoUrl = this.sanitizor.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.key}?autoplay=1&mute=1&loop=1&controls=0`);
}
}
}

