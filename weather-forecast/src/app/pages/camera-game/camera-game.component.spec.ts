import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraGameComponent } from './camera-game.component';

describe('CameraGameComponent', () => {
  let component: CameraGameComponent;
  let fixture: ComponentFixture<CameraGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
