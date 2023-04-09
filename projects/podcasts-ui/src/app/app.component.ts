import { Component, OnInit } from '@angular/core';
import { MessageService } from './services/message.service';
import { EpisodesByIdItem } from './models/shared.type';

@Component({
  selector: 'pc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'podcasts-ui';
  isMainPlayerVisible: boolean = false;
  currentEpisode!: EpisodesByIdItem;
  mainPlayerClass: string = 'hide-main-player';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.mainPlayerState$.subscribe({
      next: result => {
        this.isMainPlayerVisible = result;
        this.mainPlayerClass = result ? 'show-main-player' : 'hide-main-player';
      },
      error: error => console.error(error),
      complete: () => console.info('mainPlayerState$ complete')
    });

    this.messageService.activeAudio$.subscribe({
      next: result => this.currentEpisode = result,
      error: error => console.error(error),
      complete: () => console.info('activeAudio$ complete')
    });
  }

  showMainPlayer() {
    this.isMainPlayerVisible = true;
    this.mainPlayerClass = 'show-main-player';
  }
}
