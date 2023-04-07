import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { DataService } from '../../services/data.service';
import { SearchFeed } from '../../models/shared.type';
import { InfoCardComponent } from '../info-card/info-card.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pc-search',
  standalone: true,
  imports: [CommonModule, InfoCardComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchSub$ = new Subject<string>();
  searchFeeds: Array<SearchFeed> = [];
  userInput = '';

  constructor(private location: Location, private route: ActivatedRoute, private router: Router, private dataService: DataService){

  }

  ngOnInit(): void {    
    this.route.queryParams.subscribe(params => {
      const searchText = params['text'];
      if(searchText) {        
        const decodedSearchText = decodeURIComponent(searchText);
        this.userInput = decodedSearchText;
        this.searchByText(decodedSearchText);
      }
    });    

    this.searchSub$.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((searchText: string) => {
      const normalizedSearchText = searchText.trim().toLowerCase();
      const encodedSearchText = encodeURIComponent(normalizedSearchText);
      console.log(this.userInput);
      const queryParams = {
        text: encodedSearchText,        
      };
      const urlTree = this.router.createUrlTree([], {
        queryParams: queryParams,
        relativeTo: this.route,
      });
      this.location.replaceState(urlTree.toString());      
      this.searchByText(normalizedSearchText);
    });
  }  

  searchByText(text: string) {
    this.dataService.searchByTerm(text).subscribe({
      next: result => this.searchFeeds = result.feeds,
      error: error => console.error(error),
      complete: () => console.info('searchByTerm complete')
    });
  }

  backButtonClick() {
    this.location.back();
  }

  searchPodcasts(inputEvent: Event) {
    const searchText = (inputEvent.target as HTMLInputElement).value;    
    this.searchSub$.next(searchText)
  }

  trackById = (index: number, feed: SearchFeed) => feed.id;
}
