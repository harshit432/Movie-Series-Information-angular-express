import { Component, OnInit, OnDestroy } from '@angular/core';
import { OmdbService } from '../api/omdb.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  movies=[] //Initial Value of movies is kept as an empty array, so that if no search results are there, 
  //we dont get an exception-i.e. it does not becomes NULL. Later we will still handle such cases.
  /*
  The main reason is that initially our array will be empty as the search will take some time to execute.
  To avoid any nuch NULL exceptions, it is kept empty so that for loop doesn't run.
  */
 movieTitle: string;
 searchMovieSub: Subscription;
  constructor(
    private omdbService: OmdbService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    //Reached from home component
    /*
    ngOnInit function is a part of Angular Lifecycle Stage Hooks. In this, eachcomponent is created, changed 
    and destroyed. There are others like ngOnDestroy,ngOnChange and AfterViewInit. Each component has its own lifecycle.
    Its lifecycle starts with the initialization and ends with the destruction of the component. Read more about
    Angular Lifecycle Stages Hooks from Angular Documentation.
    Next move- Implementing REST Calls on Service. Implementing REST Calls in the service is a good idea becuae you may
    want other components to call the same service.
    */
    console.log('HELLO WORLD');
    console.log(this.omdbService.movieTitle);
    this.movieTitle=this.omdbService.movieTitle;
    this.searchMovies();
  }
  /*
  OnDestroy is good coding practice while working with JS. It basically destroys the initiated component
  Suppose it may happen that sometimes you reload/back button, then the component may not work as 
  expected. For this purpose OnDestroy is used. It will never garbage collect it.
  If the observable hasn't been completed then its reference would be stored but if it is completed, it will 
  be destroyed automatically by JS. That component may not have a reference but it will live on if it has 
  a subscription that still exists.
  */
  ngOnDestroy(){
    this.searchMovieSub.unsubscribe();
  }
  searchMovies(){
    this.searchMovieSub=this.omdbService.searchMovies().subscribe(
      //We and Observable and are subscrbing on that Observable.
      //We are Publishing on the subject and subscribing on the Observable
      res => this.searchSuccess(res),  //the success function
      err => this.searchError(err),   //the call back functions
    )
  }
  searchSuccess(res){
    this.movies=res.Search;
    //this.imdbID=this.movies.imdbID;
    console.log(this.movies);
    console.log(res);
  }
  searchError(err){
    console.log(err);
  }
  onSearch() {
    console.log(this.movieTitle); //This will handle the variable values, i.e. the movie name which will automatically be 
    // imported from home.component.html
    this.omdbService.movieTitle = this.movieTitle;
    //Navigate to the Search Component using the service. Services are called "SINGLETONS"
    //When you to omdbService now, it has the movieTitle now onwards.
    //Now we will implement the Search Component so that it can be navigated from the home page
    this.searchMovies();
    this.router.navigate(['/search']);
    //this will take us to the search web page using the omdbService.
  }
  onDetails(imdbID:string){
    console.log(imdbID);
    this.omdbService.imdbID=imdbID;
    this.router.navigate(['/movie']);
  }
}

