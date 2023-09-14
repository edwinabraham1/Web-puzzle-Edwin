import { createAction, props } from '@ngrx/store';
import { Book, ReadingListItem } from '@tmo/shared/models';

export const init = createAction('[Reading List] Initialize');

export const loadReadingListSuccess = createAction(
  '[Reading List API] Load list success',
  props<{ list: ReadingListItem[] }>()
);
export const loadReadingListError = createAction(
  '[Reading List API] Load list error',
  props<{ error: string }>()
);

export const addToReadingList = createAction(
  '[Books Search Results] Add to list',
  props<{ book: Book }>()
);

export const failedAddToReadingList = createAction(
  '[Reading List API] Failed add to list',
  props<{ book: Book }>()
);

export const confirmedAddToReadingList = createAction(
  '[Reading List API] Confirmed add to list',
  props<{ book: Book }>()
);

export const removeFromReadingList = createAction(
  '[Books Search Results] Remove from list',
  props<{ item: ReadingListItem }>()
);

export const failedRemoveFromReadingList = createAction(
  '[Reading List API] Failed remove from list',
  props<{ item: ReadingListItem }>()
);

export const confirmedRemoveFromReadingList = createAction(
  '[Reading List API] Confirmed remove from list',
  props<{ item: ReadingListItem }>()
);

export const markAsFinishedItem = createAction(
  '[Mark As Finished API] Mark it Finished',
  props<{ item: ReadingListItem }>()
);

export const failedmarkAsFinishedItem = createAction(
  '[Mark As Finished API] Failed to mark Finished',
  props<{ item: ReadingListItem }>()
);

export const confirmedmarkAsFinishedItem = createAction(
  '[Mark As Finished API] Finish completed',
  props<{ item: ReadingListItem }>()
);
export const bookMarkedAsFinished = createAction(
  '[Reading List] Book Marked as Finished',
  props<{ bookId: string }>()
);

