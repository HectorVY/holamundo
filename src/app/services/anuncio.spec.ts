import { TestBed } from '@angular/core/testing';
import { Anuncio } from '../anuncio/anuncio';

describe('Anuncio', () => {
  let service: Anuncio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Anuncio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});