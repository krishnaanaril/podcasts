import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { EpisodesByIdItem, PodcastsByIdFeed } from '../../models/shared.type';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'pc-feed-details',
  standalone: true,
  imports: [CommonModule],
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
      this.dataService.getPodcastsById(feedId).subscribe({
        next: result => this.feedDetails = result.feed,
        error: error => console.error(error),
        complete: () => console.info('getPodcastsById complete')
      });

      this.dataService.getEpisodesById(feedId).subscribe({
        next: result => this.episodeItems = result.items,
        error: error => console.error(error),
        complete: () => console.info('getEpisodesById complete')
      });
    }    
  }

  changeAudio(episode: EpisodesByIdItem) {
    console.log(episode);
    this.messageService.changeAudio(episode);
  }

  trackById = (index: number, feed: EpisodesByIdItem) => feed.id;
}
