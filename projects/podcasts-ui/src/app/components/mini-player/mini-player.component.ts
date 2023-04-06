import { Component, Input } from '@angular/core';
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
export class MiniPlayerComponent {

  @Input() currentAudio: EpisodesByIdItem | undefined;

  constructor(private messageService: MessageService) {}

}
