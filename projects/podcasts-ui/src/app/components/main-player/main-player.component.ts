import { Component, Input, OnInit } from '@angular/core';
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
export class MainPlayerComponent implements OnInit {

  @Input() currentAudio: EpisodesByIdItem | undefined;
  isPlaying = false;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.isPlaying$.subscribe({
      next: result => this.isPlaying = result,
      error: error => console.error(error),
      complete: () => console.info('isPlaying$ complete')
    });
  }

  hideMainPlayer() {
    this.messageService.hideMainPlayer();
  }

}
