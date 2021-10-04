import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {SearchComponent} from './search/search.component'
import {MovieComponent} from './movie/movie.component'

const routes: Routes = [
  // decalring Routes of your webpages(links of the webpages- Route of your website)
  /* 
  when you are at /index (homepage), there are 2 components running: SearchComponent and 
  AppComponent, which is the default Parent/Root component of all the other components.
  Within the app.component.html you have <router-outlet> which is the other components link.
  */
  {path: '', redirectTo: '/index', pathMatch: 'full' },
  {path: 'index', component:HomeComponent },
  {path: 'search', component:SearchComponent},
  {path: 'movie', component:MovieComponent}
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
