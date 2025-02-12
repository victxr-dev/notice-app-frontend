import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authErrorSubject = new BehaviorSubject<boolean>(false);
  authError$ = this.authErrorSubject.asObservable();

  triggerAuthError() {
    this.authErrorSubject.next(true);
  }
}
