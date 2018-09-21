import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermailerComponent } from './usermailer.component';

describe('UsermailerComponent', () => {
  let component: UsermailerComponent;
  let fixture: ComponentFixture<UsermailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsermailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
