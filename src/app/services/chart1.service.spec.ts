import { TestBed } from '@angular/core/testing';

import { Chart1Service } from './chart1.service';

describe('Chart1Service', () => {
  let service: Chart1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Chart1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
