import { Component, Input } from '@angular/core';
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
export class MainPlayerComponent {

  @Input() currentAudio: EpisodesByIdItem | undefined;

  constructor(private messageService: MessageService) {}

  hideMainPlayer() {
    this.messageService.hideMainPlayer();
  }

}
