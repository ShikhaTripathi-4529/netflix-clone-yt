import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  private getParams() {
    return new HttpParams()
      .set('include_adult', 'false')
      .set('include_video', 'true')
      .set('language', 'en-US')
      .set('page', '1')
      .set('sort_by', 'popularity.desc');
  }

  getMovies() {
    return this.http.get<any>(`${this.baseUrl}/discover/movie`, { params: this.getParams(), ...environment.getHeaders() });
  }

  getTvShows() {
    return this.http.get(`${this.baseUrl}/discover/tv`, { params: this.getParams(), ...environment.getHeaders() });
  }

  getRatedMovies(guestSessionId: string) {
    return this.http.get(`${this.baseUrl}/guest_session/${guestSessionId}/rated/movies`, environment.getHeaders());
  }

  getBannerImage(id: number) {
    return this.http.get(`${this.baseUrl}/movie/${id}/images`, environment.getHeaders());
  }

  getBannerVideo(id: number) {
    return this.http.get(`${this.baseUrl}/movie/${id}/videos`, environment.getHeaders());
  }

  getBannerDetail(id: number) {
    return this.http.get(`${this.baseUrl}/movie/${id}`, environment.getHeaders());
  }

  getNowPlayingMovies() {
    return this.http.get(`${this.baseUrl}/movie/now_playing`, environment.getHeaders());
  }

  getPopularMovies() {
    return this.http.get(`${this.baseUrl}/movie/popular`, environment.getHeaders());
  }

  getTopRated() {
    return this.http.get(`${this.baseUrl}/movie/top_rated`, environment.getHeaders());
  }

  getUpcomingMovies() {
    return this.http.get(`${this.baseUrl}/movie/upcoming`, environment.getHeaders());
  }
}
