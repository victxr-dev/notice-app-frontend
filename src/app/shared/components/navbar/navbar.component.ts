import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { NoticeInterface } from '../../inteface/notice.interface';
import { FormsModule } from '@angular/forms';
import { CategoryStore } from '../../stores/category.store';
import { distinct } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf, NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, AfterViewInit {
  private readonly storage = inject(StorageService);
  private readonly router = inject(Router);
  private readonly api = inject(ApiService);
  public categorys: NoticeInterface[] = [];
  public optCategory!: string;
  private categoryStore = inject(CategoryStore);

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.allCategory();
  }
  clearSession(): void {
    this.storage.clearJwt();
    this.router.navigate(['/']);
  }

  isLogged(): boolean {
    return this.storage.isLogged();
  }

  onSelect(event: any): void {
    let category = event.target.value;
    if (category != 'Alls') {
      this.api.findByCategoryNotice(category).subscribe({
        next: (data) => {
          console.log('categorias');
          console.log(data);
          this.categoryStore.addCategory(data);
          this.categoryStore.addState(false);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      this.allCategorySelect();
    }
  }

  allCategory(): void {
    this.api.allNotices().subscribe({
      next: (data) => {
        this.categorys = data;
        console.log('prueba');
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  allCategorySelect(): void {
    this.api.allNotices().subscribe({
      next: (data) => {
        this.categoryStore.addCategory(data);
        this.categoryStore.addState(true);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
