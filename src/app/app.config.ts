import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { jwtInterceptor } from './shared/inteceptors/jwt.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { errorResponseInterceptor } from './shared/inteceptors/errors.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([jwtInterceptor, errorResponseInterceptor])
    ),
    provideAnimations(), // required animations providers
    provideToastr(), // Toastr providers
  ],
};
