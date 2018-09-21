import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySettingsComponent } from './city-settings.component';

describe('CitySettingsComponent', () => {
  let component: CitySettingsComponent;
  let fixture: ComponentFixture<CitySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
