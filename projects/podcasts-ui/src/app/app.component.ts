import { Component } from '@angular/core';

@Component({
  selector: 'pc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'podcasts-ui';
  isMainPlayerVisible: boolean = false;

  showMainPlayer() {
    this.isMainPlayerVisible = !this.isMainPlayerVisible;
  }
}
