import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastPlacesComponent } from './last-places.component';

describe('LastPlacesComponent', () => {
  let component: LastPlacesComponent;
  let fixture: ComponentFixture<LastPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastPlacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
