import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, bookMarkedAsFinished, getReadingList, markAsFinishedItem, removeFromReadingList } from '@tmo/books/data-access';
import { Book, ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  markCompleted(book ){
    const item: ReadingListItem = {...book, finished : true, finishedDate: ''}
    this.store.dispatch(markAsFinishedItem({item}));
    const temp = item;

      const updatedBook : Book = {
        id: temp && temp.bookId? temp.bookId: '',
        title: temp && temp.title? temp.title: '',
        authors: temp && temp.authors? temp.authors: [],
        description: temp && temp.description? temp.description: '',
        publisher: temp && temp.publisher? temp.publisher: '',
        publishedDate: temp && temp.publishedDate? temp.publishedDate: '',
        coverUrl: temp && temp.coverUrl? temp.coverUrl: '',
        finished: temp.finished,
        finishedDate: temp.finishedDate
      }
      this.store.dispatch(bookMarkedAsFinished({ bookId: book.id }));
   }
}
