/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GameWsService } from './game-ws.service.service';


describe('Service: GameWs.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameWsService]
    });
  });

  it('should ...', inject([GameWsService], (service: GameWsService) => {
    expect(service).toBeTruthy();
  }));
});
