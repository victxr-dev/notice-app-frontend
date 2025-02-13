import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { NoticeInterface } from '../../inteface/notice.interface';

@Component({
  selector: 'app-recommended-notice',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recommended-notice.component.html',
  styleUrl: './recommended-notice.component.css',
})
export class RecommendedNoticeComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly api = inject(ApiService);
  public noticeDetails!: NoticeInterface;
  public recommendedNotices = signal<NoticeInterface[]>([]);
  private authService = inject(AuthService);
  private router = inject(Router);
  private storeService = inject(StorageService);

  ngOnInit(): void {
    this.recommendAllNotice();
  }
  recommendAllNotice(): void {
    this.api.recommendedNotice(5).subscribe({
      next: (data) => {
        console.log('NOTICIAS RECOMENDADAS');
        this.recommendedNotices.set(data);
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
