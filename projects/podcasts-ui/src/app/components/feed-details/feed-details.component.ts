import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { EpisodesByIdItems, PodcastsByIdFeed } from '../../models/shared.type';

@Component({
  selector: 'pc-feed-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed-details.component.html',
  styleUrls: ['./feed-details.component.css']
})
export class FeedDetailsComponent implements OnInit {

  feedDetails!: PodcastsByIdFeed;
  episodeItems: Array<EpisodesByIdItems> = [];

  constructor(private route: ActivatedRoute, private dataService: DataService) {}

  ngOnInit(): void {
    const feedId = this.route.snapshot.paramMap.get('id');
    if(feedId != null) {
      this.dataService.getPodcastsById(feedId).subscribe({
        next: result => this.feedDetails = result.feed,
        error: error => console.error(error),
        complete: () => console.info('getPodcastsById complete')
      });

      this.dataService.getEpisodesById(feedId).subscribe({
        next: result => this.episodeItems = result.items,
        error: error => console.error(error),
        complete: () => console.info('getPodcastsById complete')
      });
    }    
  }

  trackById = (index: number, feed: EpisodesByIdItems) => feed.id;
}
