import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchTerms = new Subject<string>();
  
  searchTerms$ = this.searchTerms.asObservable();

  emitSearchTerm(term: string) {
    this.searchTerms.next(term);
  }
}
