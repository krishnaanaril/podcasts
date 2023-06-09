import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { EpisodesByIdItem, PodcastsByIdFeed } from '../../models/shared.type';
import { MessageService } from '../../services/message.service';
import { EpisodeListComponent } from '../episode-list/episode-list.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'pc-feed-details',
  standalone: true,
  imports: [CommonModule, EpisodeListComponent],
  templateUrl: './feed-details.component.html',
  styleUrls: ['./feed-details.component.css']
})
export class FeedDetailsComponent implements OnInit {

  feedDetails!: PodcastsByIdFeed;
  episodeItems: Array<EpisodesByIdItem> = [];
  

  constructor(private route: ActivatedRoute, private dataService: DataService, private messageService: MessageService) {}

  ngOnInit(): void {
    const feedId = this.route.snapshot.paramMap.get('id');
    if(feedId != null) {
      forkJoin([
        this.dataService.getPodcastsById(feedId),
        this.dataService.getEpisodesById(feedId)
      ]).subscribe({
        next: ([podcastResult, episodeResult]) => {
          this.feedDetails = podcastResult.feed;
          this.episodeItems = episodeResult.items;
        },
        error: error => console.error(error),
        complete: () => console.info('forkJoin complete')
      });
    }    
  } 

  trackById = (index: number, feed: EpisodesByIdItem) => feed.id;
}
