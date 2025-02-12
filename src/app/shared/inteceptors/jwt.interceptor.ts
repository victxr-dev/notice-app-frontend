import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class jwtProcess {
  constructor(private storage: StorageService) {}

  getJwt(): string {
    return this.storage.getJwt();
  }
}

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let initReq = req;
  const jwt = inject(jwtProcess).getJwt();
  if (jwt != null || jwt != '') {
    initReq = req.clone({
      headers: req.headers.set(
        environment.AUTHORIZATION,
        environment.BEARER + jwt
      ),
    });
  }
  return next(initReq);
};
