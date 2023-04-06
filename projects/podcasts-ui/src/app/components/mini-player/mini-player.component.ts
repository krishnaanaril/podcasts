import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
export class MiniPlayerComponent  implements OnInit {

  @Input() currentAudio: EpisodesByIdItem | undefined;
  @Output() miniPlayerClick = new EventEmitter<boolean>();
  isPlaying = false;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.isPlaying$.subscribe({
      next: result => this.isPlaying = result,
      error: error => console.error(error),
      complete: () => console.info('isPlaying$ complete')
    });
  }

  showMainPlayer() {
    this.miniPlayerClick.emit(true);
  }

  playAudio() {
    this.messageService.playAudio();
  }

  pauseAudio() {
    this.messageService.pauseAudio();
  }

}
