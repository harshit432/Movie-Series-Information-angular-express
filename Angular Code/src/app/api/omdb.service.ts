import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable()
export class OmdbService {
  movieTitle: string;
  imdbID: string;
  constructor(
    private http: HttpClient
  ) { }
  searchMovies() :Observable<any>{
    if(this.movieTitle===null || this.movieTitle==undefined){
      this.movieTitle='';
    }
    const url="http://localhost:3000/omdb/search?title="+this.movieTitle;
    return this.http.get(url);
    //it returns the url of the webpage which will be directed to
    //Observable-Subject-Subscribe Logic is implemented here. Now go to SearchComponent.ts
  }
  viewDetails() :Observable<any>{
    //this function is made for viewing details of the movie
    const url="http://localhost:3000/omdb/result/"+this.imdbID;
    console.log(url);
    return this.http.get(url);
  }
}
