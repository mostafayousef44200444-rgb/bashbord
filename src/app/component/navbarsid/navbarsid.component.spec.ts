import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarsidComponent } from './navbarsid.component';

describe('NavbarsidComponent', () => {
  let component: NavbarsidComponent;
  let fixture: ComponentFixture<NavbarsidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarsidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarsidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
