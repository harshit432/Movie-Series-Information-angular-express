import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OmdbService } from '../api/omdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  viewDetailsSub: Subscription;
  movieInfo: any;
  movieTitle: string;
  stars = [];
  empty_stars = [];
  imdbLink: string;
  constructor(
    private omdbService: OmdbService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //this.imdbID= this.omdbService.imdbID;
    //this.movieTitle=this.omdbService.movieTitle;
    //console.log(this.movieTitle);
    //console.log("Movie Component");
    //console.log(this.imdbID);
    this.viewDetails();
    this.movieTitle = this.omdbService.movieTitle;
    //console.log("STOPPED");
  }

  ngOnDestroy() {
    this.viewDetailsSub.unsubscribe();
  }
  viewDetails() {
    this.viewDetailsSub = this.omdbService.viewDetails().subscribe(
      res => this.detailSuccess(res),
      err => this.detailError(err)
    )
  }
  detailSuccess(res) {
    this.movieInfo = res;
    console.log(res);
    var range = 0;
    if (this.movieInfo != undefined && this.movieInfo != null)
      range = Math.round(this.movieInfo.imdbRating);
    for (let i = 0; i < range; i++) {
      this.stars.push(100);
    }
    console.log("filled:");
    console.log(this.stars);
    for (let i = 0; i < 10 - range; i++) {
      this.empty_stars.push(100);
    }
    console.log("empty:");
    console.log(this.empty_stars);
    this.imdbLink = "https://www.imdb.com/title/" + this.movieInfo.imdbID;
    //console.log(res);
    //console.log("here");
    //console.log(this.imdbID);
  }
  detailError(err) {
    console.log(err);
  }

  onSearch() {
    this.omdbService.movieTitle = this.movieTitle;
    this.router.navigate(['/search']);
  }

}

