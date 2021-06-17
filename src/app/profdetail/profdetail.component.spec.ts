import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfdetailComponent } from './profdetail.component';

describe('ProfdetailComponent', () => {
  let component: ProfdetailComponent;
  let fixture: ComponentFixture<ProfdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
