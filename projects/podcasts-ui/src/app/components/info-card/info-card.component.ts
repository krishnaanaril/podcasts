import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentPodcastFeed } from '../../models/shared.type';

@Component({
  selector: 'pc-info-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent {
  @Input() feed!: RecentPodcastFeed;
}
