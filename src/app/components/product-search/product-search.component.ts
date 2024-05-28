import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchService } from 'src/app/service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  searchTerm: string = '';
  private searchTerms = new Subject<string>();

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.searchTerms.
      pipe(debounceTime(300), distinctUntilChanged()).
      subscribe(term => {
        this.searchService.emitSearchTerm(term);
      });
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  clearInput(input: HTMLInputElement){
    this.searchTerm = '';
    input.value = '';
    this.searchService.emitSearchTerm('');
  }

}
