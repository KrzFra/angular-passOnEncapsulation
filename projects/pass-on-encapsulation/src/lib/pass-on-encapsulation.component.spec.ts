import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassOnEncapsulationComponent } from './pass-on-encapsulation.component';

describe('PassOnEncapsulationComponent', () => {
  let component: PassOnEncapsulationComponent;
  let fixture: ComponentFixture<PassOnEncapsulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassOnEncapsulationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassOnEncapsulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
