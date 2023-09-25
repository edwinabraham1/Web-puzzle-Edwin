import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  removeFromReadingList,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Book,ReadingListItem } from '@tmo/shared/models';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  public books: ReadingListBook[];
  public searchForm: FormGroup;
  tempBookForUndo : Book;
  snackbarsubscription: Subscription;

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar
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

  // open snackbar
  showSnackbarDuration(content, action) {
    const snackBarDuration = 1500;
    const snack = this.snackBar.open(content, action,{
      duration: snackBarDuration
    });

    this.snackbarsubscription = snack.onAction().subscribe(() => {
      const item : ReadingListItem = {...this.tempBookForUndo, bookId : this.tempBookForUndo?.id || '' };
      this.store.dispatch(removeFromReadingList({item}));

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
    this.tempBookForUndo = book;
    this.store.dispatch(addToReadingList({ book }));
    this.showSnackbarDuration('Added ' + book.title,'undo');
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

  ngOnDestroy() {
    if (this.snackbarsubscription) { // unsubscribe the observable
      this.snackbarsubscription.unsubscribe();
    }
  }
}