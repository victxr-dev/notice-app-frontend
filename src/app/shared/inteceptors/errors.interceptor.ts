import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

export const errorResponseInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const storageService = inject(StorageService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn(
          'No autorizado, notificando al servicio de autenticación...'
        );
        //authService.triggerAuthError();
        storageService.clearJwt();
        router.navigate(['/']);
      }
      if (error.status === 403) {
        console.warn(
          'No autorizado, notificando al servicio de autenticación...'
        );
        //authService.triggerAuthError();
        storageService.clearJwt();
        router.navigate(['/']);
      }
      return throwError(() => error);
    })
  );
};
