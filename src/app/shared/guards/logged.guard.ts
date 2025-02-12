import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoggedProcess {
  constructor(private route: Router, private storage: StorageService) {}

  canAtivated(): boolean {
    if (this.storage.isLogged()) {
      return true;
    } else {
      this.route.navigate(['/']);
      return false;
    }
  }
}

export const loggedGuard: CanActivateFn = (route, state) => {
  return inject(LoggedProcess).canAtivated();
};
