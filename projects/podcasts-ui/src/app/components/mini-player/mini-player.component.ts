import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodesByIdItem } from '../../models/shared.type';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'pc-mini-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mini-player.component.html',
  styleUrls: ['./mini-player.component.css']
})
export class MiniPlayerComponent implements OnInit, OnChanges {

  @Input() currentEpisode!: EpisodesByIdItem ;
  @Output() miniPlayerClick = new EventEmitter<boolean>();
  isPlaying = false;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.activeEpisode$.subscribe({
      next: result => {
        this.isPlaying = result.isPlaying;         
      },
      error: error => console.error(error),
      complete: () => console.info('isPlaying$ complete')
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    const currentValue: EpisodesByIdItem  = changes['currentEpisode'].currentValue;
    const previousValue: EpisodesByIdItem  = changes['currentEpisode'].previousValue;    
  }

  showMainPlayer() {
    this.miniPlayerClick.emit(true);
  }

  playAudio() {
    this.messageService.playAudio(this.currentEpisode.id);
  }

  pauseAudio() {
    this.messageService.pauseAudio(this.currentEpisode.id);
  }

}
