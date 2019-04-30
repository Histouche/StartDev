import { TestBed } from '@angular/core/testing';

import { UrlApiService } from './url-api.service';

describe('UrlApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlApiService = TestBed.get(UrlApiService);
    expect(service).toBeTruthy();
  });
});
