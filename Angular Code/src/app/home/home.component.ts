import { Component, OnInit } from '@angular/core';
import { OmdbService } from '../api/omdb.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movieTitle: string;
  constructor(
    private omdbService: OmdbService,  //this is Dependency Injection- Importing the Service Class
    //Now we will implement the Search Component so that it can be navigated from the home page
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  onSearch(){
    console.log(this.movieTitle); //This will handle the variable values, i.e. the movie name which will automatically be 
                                  // imported from home.component.html
    this.omdbService.movieTitle= this.movieTitle;
    //Navigate to the Search Component using the service. Services are called "SINGLETONS"
    //When you to omdbService now, it has the movieTitle now onwards.
    //Now we will implement the Search Component so that it can be navigated from the home page
    this.router.navigate(['/search']);
    //this will take us to the search web page using the omdbService.
  }
}

