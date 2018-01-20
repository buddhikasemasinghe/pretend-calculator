import { async, inject, TestBed } from '@angular/core/testing';
import { ComputeResult } from '../model/calculator-button';

import { DisplayService } from './display.service';

describe('DisplayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisplayService]
    });
  });

  it('should be created', inject([DisplayService], (service: DisplayService) => {
    expect(service).toBeTruthy();
  }));

  it('should set correct value for screen display for valid number', async(() => {
    const service = new DisplayService();
    const computeResult = new ComputeResult();
    computeResult.isValidNumber = true;
    computeResult.result = 20;

    service.updateComputeResult(computeResult);
    expect(service.getScreenDisplay()).toEqual('20');
  }));

  it('should set error message for screen display for invalid valid number', async(() => {
    const service = new DisplayService();
    const computeResult = new ComputeResult();
    computeResult.isValidNumber = false;
    computeResult.errorMessage = 'Not a number';

    service.updateComputeResult(computeResult);
    expect(service.getScreenDisplay()).toEqual('Not a number');
  }));

  it('should set empty screen for reset()', async(() => {
    const service = new DisplayService();

    service.resetScreen();
    expect(service.getScreenDisplay()).toEqual('');
  }));

  it('should set empty screen and return false if start key of right operand clicked', async(() => {
    const service = new DisplayService();

    const result = service.handleNumberKeyPress('5', true);
    expect(service.getScreenDisplay()).toEqual('5');
    expect(result).toEqual(false);
  }));

});
