import { Component, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message.service';
import { EpisodesByIdItem } from '../../models/shared.type';

@Component({
  selector: 'pc-main-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-player.component.html',
  styleUrls: ['./main-player.component.css']
})
export class MainPlayerComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() currentEpisode: EpisodesByIdItem | undefined;
  currentAudio = new Audio();
  isPlaying = false;

  constructor(private messageService: MessageService) {
    this.currentAudio.preload = 'metadata';
  }

  ngOnInit(): void {
    this.messageService.isPlaying$.subscribe({
      next: result => this.isPlaying = result,
      error: error => console.error(error),
      complete: () => console.info('isPlaying$ complete')
    });
  }

  ngAfterViewInit(): void {
    console.log('afterview init');
    console.log(this.currentEpisode);


  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentValue: EpisodesByIdItem | undefined = changes['currentEpisode'].currentValue;
    const previousValue: EpisodesByIdItem | undefined = changes['currentEpisode'].previousValue;
    if (currentValue?.id !== previousValue?.id) {
      this.currentAudio.src = this.currentEpisode?.enclosureUrl ?? '';
      if (this.currentAudio.readyState > 0) {
        console.log('readyState is set');
      } else {
        this.currentAudio.addEventListener('loadedmetadata', () => {
          console.log('metaData loaded');
        });
      }
    }
  }

  playAudio() {
    this.currentAudio?.play();
  }

  pauseAudio() {
    this.currentAudio?.pause();
  }

  hideMainPlayer() {
    this.messageService.hideMainPlayer();
  }

}
