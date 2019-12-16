import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoshootsComponent } from './photoshoots.component';

describe('PhotoshootsComponent', () => {
  let component: PhotoshootsComponent;
  let fixture: ComponentFixture<PhotoshootsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoshootsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoshootsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
