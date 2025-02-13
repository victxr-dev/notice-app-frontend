import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NoticeInterface } from '../../inteface/notice.interface';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { RecommendedNoticeComponent } from '../recommended-notice/recommended-notice.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-detail-notice',
  standalone: true,
  imports: [RouterLink, RecommendedNoticeComponent, NgxSpinnerModule],
  templateUrl: './detail-notice.component.html',
  styleUrl: './detail-notice.component.css',
})
export class DetailNoticeComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly api = inject(ApiService);
  public noticeDetails!: NoticeInterface;
  public recommendedNotices = signal<NoticeInterface[]>([]);
  private authService = inject(AuthService);
  private router = inject(Router);
  private storeService = inject(StorageService);
  private params: any;
  private spinnerService = inject(NgxSpinnerService);

  ngOnInit(): void {
    this.detailNotice();
    //this.recommendAllNotice();
    //this.handleError();
  }

  detailNotice(): void {
    this.spinnerService.show();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.params = params.get('id');
      this.api.findByIdNotice(this.params).subscribe({
        next: (data) => {
          this.noticeDetails = data;
          this.spinnerService.hide();
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
    });
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
