import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from "../../shared/services/auth.service";
import { HeaderComponent } from "../../core/components/header/header.component";
import { BannerComponent } from 'src/app/core/components/banner/banner.component';
import { MoviesService } from 'src/app/shared/services/movies.service';
import { MoviesCarouselComponent } from 'src/app/shared/components/movies-carousel/movies-carousel.component';
import { IVideoContent } from 'src/app/shared/models/vedio-content.interface';
import { forkJoin, map } from 'rxjs';

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
  private moviesService = inject(MoviesService);

  // ✅ Fixed: Safely parse sessionStorage data
  private loggedInUser = sessionStorage.getItem('loggedInUser') ? JSON.parse(sessionStorage.getItem('loggedInUser')!) : null;
  public name = this.loggedInUser?.name || 'Guest';
  public userProfileImg = this.loggedInUser?.picture || '';
  public email = this.loggedInUser?.email || '';

  // ✅ Fixed: Renamed `nowPlayongMovies` to `nowPlayingMovies`
  movies: IVideoContent[] = [];
  tvShows: IVideoContent[] = [];
  ratedMovies: IVideoContent[] = [];
  nowPlayingMovies: IVideoContent[] = [];
  popularMovies: IVideoContent[] = [];
  topRatedMovies: IVideoContent[] = [];
  upcomingMovies: IVideoContent[] = [];

  private sources = [
    this.moviesService.getMovies(),
    this.moviesService.getTvShows(),
    this.moviesService.getRatedMovies(),
    this.moviesService.getNowPlayingMovies(),
    this.moviesService.getUpcomingMovies(),
    this.moviesService.getPopularMovies(),
    this.moviesService.getTopRated()
  ];

  ngOnInit() {
    forkJoin(this.sources)
      .pipe(
        map(([movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated]) => {
          return { movies, tvShows, ratedMovies, nowPlaying, upcoming, popular, topRated };
        })
      )
      .subscribe((res: any) => {
        this.movies = res.movies.results as IVideoContent[];
        this.tvShows = res.tvShows.results as IVideoContent[];
        this.ratedMovies = res.ratedMovies.results as IVideoContent[];
        this.nowPlayingMovies = res.nowPlaying.results as IVideoContent[]; // ✅ Fixed variable name
        this.upcomingMovies = res.upcoming.results as IVideoContent[];
        this.popularMovies = res.popular.results as IVideoContent[];
        this.topRatedMovies = res.topRated.results as IVideoContent[];
      });

    console.log("\n\nMovies:", this.movies);
    console.log("TV Shows:", this.tvShows);
    console.log("Rated Movies:", this.ratedMovies);
    console.log("Now Playing Movies:", this.nowPlayingMovies);
    console.log("Upcoming Movies:", this.upcomingMovies);
    console.log("Popular Movies:", this.popularMovies);
    console.log("Top Rated Movies:", this.topRatedMovies);
  }

  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.auth.signOut();
  }
}
