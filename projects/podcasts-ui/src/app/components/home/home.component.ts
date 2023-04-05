import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Feed, RecentPodcastFeed } from '../../models/shared.type';
import { InfoCardComponent } from '../info-card/info-card.component';

@Component({
  selector: 'pc-home',
  standalone: true,
  imports: [CommonModule, InfoCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recentFeeds: Array<RecentPodcastFeed> = [];
  trendingFeeds: Array<Feed> = [];
  /**
   *
   */
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const userLanguage = navigator.language;
    this.dataService.getRecentFeeds(5,userLanguage).subscribe({
      next: result => this.recentFeeds = result.feeds,
      error: error => console.error(error),
      complete: () => console.info('getRecentFeeds complete')
    });
    this.dataService.getTrending(5,userLanguage).subscribe({
      next: result => this.trendingFeeds = result.feeds,
      error: error => console.error(error),
      complete: () => console.info('getRecentFeeds complete')
    });
  }

  trackById = (index: number, feed: Feed) => feed.id;
}
