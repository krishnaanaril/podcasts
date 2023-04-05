import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { DataService } from '../../services/data.service';
import { SearchFeed } from '../../models/shared.type';
import { InfoCardComponent } from '../info-card/info-card.component';

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

  constructor(private location: Location, private dataService: DataService){

  }

  ngOnInit(): void {
    this.searchSub$.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((searchText: string) => {
      const normalizedSearchText = searchText.trim().toLowerCase();
      this.dataService.searchByTerm(normalizedSearchText).subscribe({
        next: result => this.searchFeeds = result.feeds,
        error: error => console.error(error),
        complete: () => console.info('searchByTerm complete')
      });
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
