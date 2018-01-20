import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { environment } from '../../environments/environment';
import { ComputeResult, OperationButton } from '../model/calculator-button';

@Injectable()
export class BasicOperationService {

  constructor() {
  }

  fetchBasicOperations(): OperationButton[] {
    const operations: OperationButton[] = [];
    const addOperation = new OperationButton();
    addOperation.displayName = '+';
    addOperation.handler = function (leftOperation: string, rightOperand: string) {
      const computeResult = new ComputeResult();
      if (isNullOrUndefined(rightOperand)) {
        rightOperand = leftOperation;
      }
      computeResult.result = +((+leftOperation) + (+rightOperand)).toString(environment.fractionDigits);
      return computeResult;
    };
    operations.push(addOperation);

    const subtractOperation = new OperationButton();
    subtractOperation.displayName = '-';
    subtractOperation.handler = function (leftOperation: string, rightOperand: string) {
      const computeResult = new ComputeResult();
      if (isNullOrUndefined(rightOperand)) {
        rightOperand = leftOperation;
      }
      computeResult.result = +((+leftOperation) - (+rightOperand)).toPrecision(environment.fractionDigits);
      return computeResult;
    };
    operations.push(subtractOperation);

    const multiplyOperation = new OperationButton();
    multiplyOperation.displayName = '*';
    multiplyOperation.handler = function (leftOperation: string, rightOperand: string) {
      const computeResult = new ComputeResult();
      if (isNullOrUndefined(rightOperand)) {
        rightOperand = leftOperation;
      }
      computeResult.result = +((+leftOperation) * (+rightOperand)).toPrecision(environment.fractionDigits);
      return computeResult;
    };
    operations.push(multiplyOperation);

    const divideOperation = new OperationButton();
    divideOperation.displayName = '/';
    divideOperation.handler = function (leftOperation: string, rightOperand: string) {
      const computeResult = new ComputeResult();
      if (isNullOrUndefined(rightOperand)) {
        rightOperand = leftOperation;
      }
      if (rightOperand === '0') {
        computeResult.isValidNumber = false;
        computeResult.errorMessage = 'Not a number';
      } else {
        computeResult.result = +((+leftOperation) / (+rightOperand)).toPrecision(environment.fractionDigits);
      }
      return computeResult;
    };
    operations.push(divideOperation);

    return operations;
  }

}
