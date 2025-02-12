import { Routes } from '@angular/router';
import { loggedGuard } from './shared/guards/logged.guard';
import { SigninComponent } from './shared/components/signin/signin.component';

export const routes: Routes = [
  { path: '', component: SigninComponent },
  {
    path: 'detail/:id',
    loadComponent: () =>
      import('./shared/components/detail-notice/detail-notice.component').then(
        (c) => c.DetailNoticeComponent
      ),
    canActivate: [loggedGuard],
  },
  {
    path: 'recommended',
    loadComponent: () =>
      import(
        './shared/components/recommended-notice/recommended-notice.component'
      ).then((c) => c.RecommendedNoticeComponent),
    canActivate: [loggedGuard],
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./shared/components/signin/signin.component').then(
        (c) => c.SigninComponent
      ),
  },
  {
    path: 'notices',
    loadComponent: () =>
      import('./shared/components/notices/notices.component').then(
        (c) => c.NoticesComponent
      ),
    canActivate: [loggedGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./shared/components/signup/signup.component').then(
        (c) => c.SignupComponent
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
