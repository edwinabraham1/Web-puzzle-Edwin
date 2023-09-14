import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  ReadingListBook,
  removeFromReadingList,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book,ReadingListItem } from '@tmo/shared/models';
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];
  tempBookForUndo : Book;
  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }

  showSnackbarDuration(content, action) {
    const snack = this.snackBar.open(content, action);
   
    snack.onAction().subscribe(() => {
      const item : ReadingListItem = {
        title: this.tempBookForUndo && this.tempBookForUndo.title ? this.tempBookForUndo.title : '',
        authors: this.tempBookForUndo && this.tempBookForUndo.authors ?  this.tempBookForUndo.authors : [],
        description: this.tempBookForUndo && this.tempBookForUndo.description ? this.tempBookForUndo.description: '',
        bookId: this.tempBookForUndo && this.tempBookForUndo.id ? this.tempBookForUndo.id: ''
      }

      this.store.dispatch(removeFromReadingList({item}));
      
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.tempBookForUndo = book
    this.store.dispatch(addToReadingList({ book }));
    this.showSnackbarDuration('undo what you have done','undo');
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
