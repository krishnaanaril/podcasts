import { Component, OnInit } from '@angular/core';
import { MessageService } from './services/message.service';

@Component({
  selector: 'pc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'podcasts-ui';
  isMainPlayerVisible: boolean = false;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.mainPlayerState$.subscribe({
      next: result => this.isMainPlayerVisible = result,
      error: error => console.error(error),
      complete: () => console.info('mainPlayerState$ complete')
    });
  }

  showMainPlayer() {
    this.isMainPlayerVisible = true;
  }
}
