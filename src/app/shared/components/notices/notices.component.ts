import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NoticeInterface } from '../../inteface/notice.interface';
import { Router, RouterLink } from '@angular/router';
import { CategoryStore } from '../../stores/category.store';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [RouterLink, NavbarComponent, NgxSpinnerModule, NgFor],
  templateUrl: './notices.component.html',
  styleUrl: './notices.component.css',
})
export class NoticesComponent {
  private readonly api = inject(ApiService);
  public notices = signal<NoticeInterface[]>([]);
  public categoryStore = inject(CategoryStore);
  private authService = inject(AuthService);
  private router = inject(Router);
  private storeService = inject(StorageService);
  private spinnerService = inject(NgxSpinnerService);

  ngOnInit(): void {
    this.allNotice();
    //this.handleError();
  }

  allNotice(): void {
    this.spinnerService.show();
    this.api.allNotices().subscribe({
      next: (data) => {
        this.notices.set(data);
        this.spinnerService.hide();
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  handleError(): void {
    this.authService.authError$.subscribe((hasError) => {
      if (hasError) {
        console.warn('Redirigiendo al Home...');
        this.storeService.clearJwt();
        this.router.navigate(['/']);
      }
    });
  }
}
