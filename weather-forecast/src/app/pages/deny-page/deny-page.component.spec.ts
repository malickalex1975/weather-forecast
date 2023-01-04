import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenyPageComponent } from './deny-page.component';

describe('DenyPageComponent', () => {
  let component: DenyPageComponent;
  let fixture: ComponentFixture<DenyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenyPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
