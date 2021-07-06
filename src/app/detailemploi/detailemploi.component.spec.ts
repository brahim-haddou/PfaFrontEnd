import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailemploiComponent } from './detailemploi.component';

describe('DetailemploiComponent', () => {
  let component: DetailemploiComponent;
  let fixture: ComponentFixture<DetailemploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailemploiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailemploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
