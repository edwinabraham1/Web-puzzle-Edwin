import { Injectable } from '@nestjs/common';
import { StorageService } from '@tmo/shared/storage';
import { Book, ReadingListItem } from '@tmo/shared/models';

const KEY = '[okreads API] Reading List';

@Injectable()
export class ReadingListService {
  private readonly storage = new StorageService<ReadingListItem[]>(KEY, []);

  async getList(): Promise<ReadingListItem[]> {
    return this.storage.read();
  }

  async addBook(b: Book): Promise<void> {
    this.storage.update(list => {
      const { id, ...rest } = b;
      list.push({
        bookId: id,
        ...rest
      });
      return list;
    });
  }

  async removeBook(id: string): Promise<void> {
    this.storage.update(list => {
      return list.filter(x => x.bookId !== id);
    });
  }

  async markComplete(id: string, payload): Promise<void> {
    this.storage.update(list => {
        const newList =[];
         list.forEach(book=>{
           if(book.bookId == id){
              book.finished = payload.finished;
              book.finishedDate = payload.finishedDate;
              newList.push(book)
           }else{
            newList.push(book)
           }
         })

      return newList
    });
  }
}
