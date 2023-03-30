import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'pc-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /**
   *
   */
  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.dataService.getCategories().subscribe({
      next: result => console.log(result),
      error: error => console.error(error),
      complete: () => console.info('complete')
    });
  }
}
