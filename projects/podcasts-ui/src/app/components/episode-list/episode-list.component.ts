import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodesByIdItem } from '../../models/shared.type';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'pc-episode-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css']
})
export class EpisodeListComponent {

  @Input() episode: EpisodesByIdItem | undefined;
  @Input() author: string | undefined;
  @Input() feedTitle: string | undefined
  isPlaying = false;

  constructor(private messageService: MessageService) {}

  changeAudio(episode: EpisodesByIdItem) {    
    episode.author = this.author ?? '';
    episode.feedTitle = this.feedTitle ?? '';
    this.messageService.changeAudio(episode);
    this.isPlaying = true;
  }

  pauseAudio() {
    this.isPlaying = false;
    this.messageService.pauseAudio();
  }

}
