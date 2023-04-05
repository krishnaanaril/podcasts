import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataService } from '../../services/data.service';
import { Category } from '../../models/shared.type';

@Component({
  selector: 'pc-explore',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  categories: Array<Category> = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCategories().subscribe({
      next: result => this.categories = result.feeds,
      error: error => console.error(error),
      complete: () => console.info('getCategories complete')
    });
  }

  trackById = (index: number, feed: Category) => feed.id;
}
