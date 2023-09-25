import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Book, ReadingListItem } from '@tmo/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnDestroy{
  readingList$ = this.store.select(getReadingList);
  tempBookForUndo:ReadingListItem;
  snackbarsubscription: Subscription;

  constructor(
    private readonly store: Store,
    private snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.tempBookForUndo = item;
    this.store.dispatch(removeFromReadingList({ item }));
    this.showSnackbarDuration('Removed ' + item.title,'undo')
  }

  showSnackbarDuration(content, action) {

    const snackBarDuration = 1500;
    const snack = this.snackBar.open(content, action, {
      duration: snackBarDuration
    });
   
    this.snackbarsubscription = snack.onAction().subscribe(() => {
      const temp = this.tempBookForUndo
      const book : Book = {...temp, id: temp?.bookId || '' }
      this.store.dispatch(addToReadingList({ book }));
    });
  }

  ngOnDestroy() {
    if (this.snackbarsubscription) {
      this.snackbarsubscription.unsubscribe();
    }
  }
}
