import { TestBed } from '@angular/core/testing';

import { MyartService } from './myart.service';

describe('MyartService', () => {
  let service: MyartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
