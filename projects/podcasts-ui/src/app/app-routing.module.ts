import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExploreComponent } from './components/explore/explore.component';
import { LibraryComponent } from './components/library/library.component';
import { SearchComponent } from './components/search/search.component';
import { FeedDetailsComponent } from './components/feed-details/feed-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'library', component: LibraryComponent },
  { path: 'search', component: SearchComponent },
  { path: 'feed/:id', component: FeedDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
