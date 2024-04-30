import { Component, DoCheck, OnInit } from '@angular/core';
import { SearchFilterService } from './search-filter.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements DoCheck {
  constructor(
    private searchFilterService: SearchFilterService,
    private location: Location
  ) {}
  searchTerm = '';
  disableSearch?: boolean;

  ngDoCheck(): void {
    this.disableSearch = this.location.path().includes('/listing/');
  }

  onSearch() {
    this.searchFilterService.setSearchTerm(this.searchTerm);
  }
}
