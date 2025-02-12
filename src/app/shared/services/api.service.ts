import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { SignIngInteface } from '../inteface/signin.interface';
import { Observable } from 'rxjs';
import { JwtInterface } from '../inteface/jwt.interface';
import { MessageInterface } from '../inteface/message.interface';
import { SignUpInterface } from '../inteface/singup.interface';
import { NoticeInterface } from '../inteface/notice.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private accountUrl = environment.accounUrl;
  private noticeUrl = environment.noticeUrl;

  private readonly http = inject(HttpClient);

  constructor() {}

  //endpoint account

  public signIn(signin: SignIngInteface): Observable<JwtInterface> {
    return this.http.post<JwtInterface>(
      environment.accounUrl + '/signin',
      signin
    );
  }
  public signUp(signup: SignUpInterface): Observable<MessageInterface> {
    return this.http.post<MessageInterface>(
      environment.accounUrl + '/signup',
      signup
    );
  }

  //endpoint notices

  public allNotices(): Observable<NoticeInterface[]> {
    return this.http.get<NoticeInterface[]>(this.noticeUrl + '/all');
  }

  public findByIdNotice(id: number): Observable<NoticeInterface> {
    return this.http.get<NoticeInterface>(`${this.noticeUrl}/${id}`);
  }
  public findByCategoryNotice(category: string): Observable<NoticeInterface[]> {
    return this.http.get<NoticeInterface[]>(
      `${this.noticeUrl}/category/${category}`
    );
  }

  public recommendedNotice(n: number): Observable<NoticeInterface[]> {
    return this.http.get<NoticeInterface[]>(
      `${this.noticeUrl}/recommended/${n}`
    );
  }
}
