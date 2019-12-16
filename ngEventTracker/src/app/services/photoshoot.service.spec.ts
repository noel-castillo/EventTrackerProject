import { TestBed } from '@angular/core/testing';

import { PhotoshootService } from './photoshoot.service';

describe('PhotoshootService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotoshootService = TestBed.get(PhotoshootService);
    expect(service).toBeTruthy();
  });
});
