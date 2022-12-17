import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollutionForecastElementComponent } from './pollution-forecast-element.component';

describe('PollutionForecastElementComponent', () => {
  let component: PollutionForecastElementComponent;
  let fixture: ComponentFixture<PollutionForecastElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PollutionForecastElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PollutionForecastElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
