import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

const JWT = 'access_token';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private router = inject(Router);
  constructor() {}

  public setJwt(jwt: string): void {
    localStorage.removeItem(JWT);
    localStorage.setItem(JWT, jwt);
  }

  public getJwt(): string {
    return localStorage.getItem(JWT) || '';
  }

  public clearJwt(): void {
    localStorage.clear();
  }

  public isLogged(): boolean {
    if (this.getJwt()) {
      return true;
    } else {
      return false;
    }
  }
}
