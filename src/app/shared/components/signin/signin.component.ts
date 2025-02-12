import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { SignIngInteface } from '../../inteface/signin.interface';
import { StorageService } from '../../services/storage.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PASSWORD } from '../../constant/regex/constant.password';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent implements OnInit {
  email!: string;
  password!: string;

  private readonly api = inject(ApiService);
  private storage = inject(StorageService);
  private readonly router = inject(Router);
  private toastr = inject(ToastrService);

  ngOnInit(): void {}

  onSignIn(): void {
    const signIn: SignIngInteface = {
      email: this.email,
      password: this.password,
    };

    this.api.signIn(signIn).subscribe({
      next: (data) => {
        this.storage.setJwt(data.message);
        this.toastr.success('Welcome');
        this.router.navigate(['/notices']);
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message, 'Error');
      },
    });
  }
}
