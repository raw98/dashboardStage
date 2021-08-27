import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLeafletComponent } from '@src/app/map-leaflet/map-leaflet.component';

describe('MapLeafletComponent', () => {
  let component: MapLeafletComponent;
  let fixture: ComponentFixture<MapLeafletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapLeafletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLeafletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
