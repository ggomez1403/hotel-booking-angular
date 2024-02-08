import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsHeroComponent } from './rooms-hero.component';

describe('RoomsHeroComponent', () => {
  let component: RoomsHeroComponent;
  let fixture: ComponentFixture<RoomsHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomsHeroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
