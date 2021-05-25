import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBottonComponent } from './menu-botton.component';

describe('MenuBottonComponent', () => {
  let component: MenuBottonComponent;
  let fixture: ComponentFixture<MenuBottonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBottonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBottonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
