/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GameWs.serviceService } from './game-ws.service.service';

describe('Service: GameWs.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameWs.serviceService]
    });
  });

  it('should ...', inject([GameWs.serviceService], (service: GameWs.serviceService) => {
    expect(service).toBeTruthy();
  }));
});
