import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailclasseComponent } from './detailclasse.component';

describe('DetailclasseComponent', () => {
  let component: DetailclasseComponent;
  let fixture: ComponentFixture<DetailclasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailclasseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailclasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
