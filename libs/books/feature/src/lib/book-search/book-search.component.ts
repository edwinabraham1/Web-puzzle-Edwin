import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Book } from '@tmo/shared/models';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  public books: ReadingListBook[];
  public searchForm: FormGroup;
  

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      term: ''
    });
  }

  // getter for the search term
  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }

  // format the date of publish
  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  // dispatch an event to add the book to reading list
  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  // function to search the javascript(default) books 
  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  // function to search books by typing in the term/words
  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
