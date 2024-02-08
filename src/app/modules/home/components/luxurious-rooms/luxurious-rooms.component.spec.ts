import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxuriousRoomsComponent } from './luxurious-rooms.component';

describe('LuxuriousRoomsComponent', () => {
  let component: LuxuriousRoomsComponent;
  let fixture: ComponentFixture<LuxuriousRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuxuriousRoomsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuxuriousRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
