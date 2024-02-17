import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private dataSubject = new Subject<any>();
  data$ = this.dataSubject.asObservable();

  sendData(data: any): void {
    this.dataSubject.next(data);
  }
}
