import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book, ReadingListItem } from '@tmo/shared/models';
@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);
  tempBookForUndo:ReadingListItem;
  constructor(
    private readonly store: Store,
    private snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.tempBookForUndo = item;
    this.store.dispatch(removeFromReadingList({ item }));
    this.showSnackbarDuration('Undo the action','undo')
  }

  showSnackbarDuration(content, action) {
    const snack = this.snackBar.open(content, action);
   
    snack.onAction().subscribe(() => {
      const temp = this.tempBookForUndo
      const book : Book = {
        id: temp && temp.bookId? temp.bookId: '',
        title: temp && temp.title? temp.title: '',
        authors: temp && temp.authors? temp.authors: [],
        description: temp && temp.description? temp.description: '',
        publisher: temp && temp.publisher? temp.publisher: '',
        publishedDate: temp && temp.publishedDate? temp.publishedDate: '',
        coverUrl: temp && temp.coverUrl? temp.coverUrl: '',
      
      }

      this.store.dispatch(addToReadingList({ book }));
      
    });
  }
}
