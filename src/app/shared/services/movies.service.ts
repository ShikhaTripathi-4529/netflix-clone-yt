import { inject, Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTUzZjY3Y2JmY2UxOGI5MTcyNGJhNzI1NGMzNjMwMiIsIm5iZiI6MTc0MDU3MjAwMC4zNjYwMDAyLCJzdWIiOiI2N2JmMDU2MGY5NzU1ZmUwOWQ1NjI0YzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VnyL2-dpJ73T5Q8LAG8VS9imS93GXTSBYQ0TiSoCmr0'
const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const headers = new HttpHeaders({
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
});
const options = {
  method: 'GET',
  params: {
    include_adults: true,
    include_videos: true,
    language : 'en-US',
    page:1,
    sort_by: 'popularity.desc'
  },
  headers: headers
};


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private guestSessionId = 'c553f67cbfce18b91724ba7254c36302'; // Replace with a valid session ID

  private http = inject(HttpClient); // Injecting without a constructor

  getMovies():Observable<any> {
    const data =  this.http.get<any>(url, options);
    console.log(data)
    return data;
  }

  getTvShows():Observable<any> {
    const data =  this.http.get('https://api.themoviedb.org/3/discover/tv', options);
    console.log(data)
    return data;
  }

  getRatedMovies():Observable<any> {
    const data =  this.http.get(`https://api.themoviedb.org/3/guest_session/${this.guestSessionId}/rated/movies`, options)
    console.log(data)
    return data;
  }

  getBannerImage(id: number):Observable<any> {
    const data =   this.http.get(`https://api.themoviedb.org/3/movie/${id}/images`, options);
    console.log(data)
    return data;

  }

  getBannerVideo(id: number):Observable<any> {
    const data =   this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
    console.log(data)
    return data;

  }

  getBannerDetail(id: number):Observable<any>{
    const data =   this.http.get(`https://api.themoviedb.org/3/movie/${id}`, options);
    console.log(data)
    return data;

  }

  getNowPlayingMovies():Observable<any> {
    const data =   this.http.get('https://api.themoviedb.org/3/movie/now_playing', options);
    console.log(data)
    return data;

  }

  getPopularMovies():Observable<any> {
    const data =   this.http.get('https://api.themoviedb.org/3/movie/popular', options);
    console.log(data);
    return data;

  }

  getTopRated():Observable<any> {
    const data =   this.http.get('https://api.themoviedb.org/3/movie/top_rated', options)
    console.log(data)
    return data;

  }

  getUpcomingMovies():Observable<any> {
    const data =   this.http.get('https://api.themoviedb.org/3/movie/upcoming', options);
    console.log(data);
    return data;

  }
}
