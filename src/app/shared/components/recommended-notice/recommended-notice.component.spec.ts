import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedNoticeComponent } from './recommended-notice.component';

describe('RecommendedNoticeComponent', () => {
  let component: RecommendedNoticeComponent;
  let fixture: ComponentFixture<RecommendedNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendedNoticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendedNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
