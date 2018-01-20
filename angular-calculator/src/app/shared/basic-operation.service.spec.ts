import { TestBed, inject, async } from '@angular/core/testing';

import { BasicOperationService } from './basic-operation.service';

describe('BasicOperationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicOperationService]
    });
  });

  it('should be created', inject([BasicOperationService], (service: BasicOperationService) => {
    expect(service).toBeTruthy();
  }));

  it('should return 4 basic operations', async(() => {
    const service = new BasicOperationService();
    expect(service.fetchBasicOperations().length).toBe(4);
  }));

  it('should contain plus operation', async(() => {
    const service = new BasicOperationService();
    const plusOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '+');
    expect(plusOperation.length).toBe(1);
  }));

  it('should contain subtract operation', async(() => {
    const service = new BasicOperationService();
    const subtractOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '-');
    expect(subtractOperation.length).toBe(1);
  }));

  it('should contain multiply operation', async(() => {
    const service = new BasicOperationService();
    const multiplyOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '*');
    expect(multiplyOperation.length).toBe(1);
  }));

  it('should contain divide operation', async(() => {
    const service = new BasicOperationService();
    const divideOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '/');
    expect(divideOperation.length).toBe(1);
  }));

  it('should return 5 for 3 + 2', async(() => {
    const service = new BasicOperationService();
    const subtractOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '+');
    const computeResult = subtractOperation[0].handler('3', '2');
    expect(computeResult.isValidNumber).toBe(true);
    expect(computeResult.result).toBe(5);
  }));

  it('should return 6 for 3 + undefined', async(() => {
    const service = new BasicOperationService();
    const subtractOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '+');
    const computeResult = subtractOperation[0].handler('3');
    expect(computeResult.isValidNumber).toBe(true);
    expect(computeResult.result).toBe(6);
  }));

  it('should return 7 for 3.5 + null', async(() => {
    const service = new BasicOperationService();
    const subtractOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '+');
    const computeResult = subtractOperation[0].handler('3.5', null);
    expect(computeResult.isValidNumber).toBe(true);
    expect(computeResult.result).toBe(7);
  }));

  it('should return -3 for 3 - 6', async(() => {
    const service = new BasicOperationService();
    const subtractOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '-');
    const computeResult = subtractOperation[0].handler('3', '6');
    expect(computeResult.isValidNumber).toBe(true);
    expect(computeResult.result).toBe(-3);
  }));

  it('should return 150 for 250 - 100', async(() => {
    const service = new BasicOperationService();
    const subtractOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '-');
    const computeResult = subtractOperation[0].handler('250', '100');
    expect(computeResult.isValidNumber).toBe(true);
    expect(computeResult.result).toBe(150);
  }));

  it('should return 0 for  10 + undefined', async(() => {
    const service = new BasicOperationService();
    const subtractOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '-');
    const computeResult = subtractOperation[0].handler('10');
    expect(computeResult.isValidNumber).toBe(true);
    expect(computeResult.result).toBe(0);
  }));

  it('should return 0 for 3.5 + null', async(() => {
    const service = new BasicOperationService();
    const subtractOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '-');
    const computeResult = subtractOperation[0].handler('3.5', null);
    expect(computeResult.isValidNumber).toBe(true);
    expect(computeResult.result).toBe(0);
  }));

  it('should return 48 for 4 * 12', async(() => {
    const service = new BasicOperationService();
    const multiplyOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '*');
    const computeResult = multiplyOperation[0].handler('4', '12');
    expect(computeResult.isValidNumber).toBe(true);
    expect(computeResult.result).toBe(48);
  }));

  it('should return 14.82 for 4.56 * 3.25', async(() => {
    const service = new BasicOperationService();
    const multiplyOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '*');
    const computeResult = multiplyOperation[0].handler('4.56', '3.25');
    expect(computeResult.isValidNumber).toBe(true);
    expect(computeResult.result).toBe(14.82);
  }));


  it('should return -24 for -6 * 4', async(() => {
    const service = new BasicOperationService();
    const multiplyOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '*');
    const computeResult = multiplyOperation[0].handler('-6', '4');
    expect(computeResult.isValidNumber).toBe(true);
    expect(computeResult.result).toBe(-24);
  }));

  it('should return 25 for  5 * undefined', async(() => {
    const service = new BasicOperationService();
    const multiplyOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '*');
    const computeResult = multiplyOperation[0].handler('5');
    expect(computeResult.isValidNumber).toBe(true);
    expect(computeResult.result).toBe(25);
  }));

  it('should return 16 for 4 * null', async(() => {
    const service = new BasicOperationService();
    const multiplyOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '*');
    const computeResult = multiplyOperation[0].handler('4', null);
    expect(computeResult.isValidNumber).toBe(true);
    expect(computeResult.result).toBe(16);
  }));

  it('should return 0.3333333 for 10 * 3', async(() => {
    const service = new BasicOperationService();
    const divideOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '/');
    const computeResult = divideOperation[0].handler('10', '3');
    expect(computeResult.isValidNumber).toBe(true);
    expect(computeResult.result).toBe(3.33333333333);
  }));

  it('should return  for -4 / 2', async(() => {
    const service = new BasicOperationService();
    const divideOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '/');
    const computeResult = divideOperation[0].handler('-4', '2');
    expect(computeResult.isValidNumber).toBe(true);
    expect(computeResult.result).toBe(-2);
  }));


  it('should return 35 for 70 / 2', async(() => {
    const service = new BasicOperationService();
    const divideOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '/');
    const computeResult = divideOperation[0].handler('70', '2');
    expect(computeResult.isValidNumber).toBe(true);
    expect(computeResult.result).toBe(35);
  }));

  it('should return -5 for  -5 / undefined', async(() => {
    const service = new BasicOperationService();
    const divideOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '/');
    const computeResult = divideOperation[0].handler('-5');
    expect(computeResult.isValidNumber).toBe(true);
    expect(computeResult.result).toBe(1);
  }));

  it('should return 0 for 8 / null', async(() => {
    const service = new BasicOperationService();
    const divideOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '/');
    const computeResult = divideOperation[0].handler('8', null);
    expect(computeResult.isValidNumber).toBe(true);
    expect(computeResult.result).toBe(1);
  }));

  it('should return Not a Number for 34 / 0', async(() => {
    const service = new BasicOperationService();
    const divideOperation = service.fetchBasicOperations().filter(operation => operation.displayName === '/');
    const computeResult = divideOperation[0].handler('34', '0');
    expect(computeResult.isValidNumber).toBe(false);
    expect(computeResult.errorMessage).toBe('Not a number');
  }));


});
