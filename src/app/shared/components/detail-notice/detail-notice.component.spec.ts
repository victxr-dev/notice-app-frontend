import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailNoticeComponent } from './detail-notice.component';

describe('DetailNoticeComponent', () => {
  let component: DetailNoticeComponent;
  let fixture: ComponentFixture<DetailNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailNoticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
