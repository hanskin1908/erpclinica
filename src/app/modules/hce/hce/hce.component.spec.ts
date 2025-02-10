import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HceComponent } from './hce.component';

describe('HceComponent', () => {
  let component: HceComponent;
  let fixture: ComponentFixture<HceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
