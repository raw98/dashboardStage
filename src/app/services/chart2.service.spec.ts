import { TestBed } from '@angular/core/testing';

import { Chart2Service } from './chart2.service';

describe('Chart2Service', () => {
  let service: Chart2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Chart2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
