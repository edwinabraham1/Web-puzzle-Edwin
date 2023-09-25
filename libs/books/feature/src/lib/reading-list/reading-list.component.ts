import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, markAsFinishedItem, removeFromReadingList } from '@tmo/books/data-access';
import { Book, ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}
  // remove book from reading list
  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }
  // mark the book finished
  markCompleted(book ){
    const item: ReadingListItem = {...book, finished : true, finishedDate: new Date().toISOString()}
    this.store.dispatch(markAsFinishedItem({item}));
   }
}
