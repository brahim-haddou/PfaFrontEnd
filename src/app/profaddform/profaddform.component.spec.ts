import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfaddformComponent } from './profaddform.component';

describe('ProfaddformComponent', () => {
  let component: ProfaddformComponent;
  let fixture: ComponentFixture<ProfaddformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfaddformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfaddformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
