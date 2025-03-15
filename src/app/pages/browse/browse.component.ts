import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from "../../shared/services/auth.service";
import { HeaderComponent } from "../../core/components/header/header.component";
import { BannerComponent } from 'src/app/core/components/banner/banner.component';
import { MovieService } from 'src/app/shared/services/movies.service';
import { MoviesCarouselComponent } from 'src/app/shared/components/movies-carousel/movies-carousel.component';
import { IVideoContent } from 'src/app/shared/models/vedio-content.interface';
import { forkJoin, map, Observable } from 'rxjs';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent, MoviesCarouselComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  public auth = inject(AuthService);
  private moviesService = inject(MovieService);

  private loggedInUser = sessionStorage.getItem('loggedInUser') ? JSON.parse(sessionStorage.getItem('loggedInUser')!) : null;
  public name = this.loggedInUser?.name || 'Guest';
  public userProfileImg = this.loggedInUser?.picture || '';
  public email = this.loggedInUser?.email || '';

  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];
  bannerDetail$ = new Observable<any>();
  bannerVideo$ = new Observable<any>();

  private sources = [
    this.moviesService.getMovies(),
    this.moviesService.getTvShows(),
  ];

  ngOnInit(): void {
    forkJoin(this.sources)
    .pipe(
      map(([movies, tvShows])=>{
        this.bannerDetail$ = this.moviesService.getBannerDetail(movies.results[1].id);
        this.bannerVideo$ = this.moviesService.getBannerVideo(movies.results[1].id);
        return {movies, tvShows}
      })
    ).subscribe((res:any)=>{
      this.movies = res.movies.results as IVideoContent[];
      this.tvShows = res.tvShows.results as IVideoContent[];
      // this.getMovieKey();
    })
  }

  singOut() {
    sessionStorage.removeItem("loggedInUser");
    this.auth.signOut();
  }
}
