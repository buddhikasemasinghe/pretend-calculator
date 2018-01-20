import { Injectable } from '@angular/core';
import { ComputeResult, OperationButton } from './calculator-button';

@Injectable()
export class BasicOperationService {


  constructor() {
  }

  fetchBasicOperations(): OperationButton[] {
    const operations: OperationButton[] = [];
    const addOperation = new OperationButton();
    addOperation.displayName = '+';
    addOperation.handler = function (leftOperation: number, rightOperand: number) {
      const computeResult = new ComputeResult();
      computeResult.result = leftOperation + rightOperand;
      return computeResult;
    };
    operations.push(addOperation);

    const subtractOperation = new OperationButton();
    subtractOperation.displayName = '-';
    subtractOperation.handler = function (leftOperation: number, rightOperand: number) {
      const computeResult = new ComputeResult();
      computeResult.result = leftOperation - rightOperand;
      return computeResult;
    };
    operations.push(subtractOperation);

    const multiplyOperation = new OperationButton();
    multiplyOperation.displayName = '*';
    multiplyOperation.handler = function (leftOperation: number, rightOperand: number) {
      const computeResult = new ComputeResult();
      computeResult.result = leftOperation * rightOperand;
      return computeResult;
    };
    operations.push(multiplyOperation);

    const divideOperation = new OperationButton();
    divideOperation.displayName = '/';
    divideOperation.handler = function (leftOperation: number, rightOperand: number) {
      const computeResult = new ComputeResult();
      if (rightOperand === 0) {
        computeResult.isNumber = false;
        computeResult.errorMessage = 'Not a number';
      } else {
        computeResult.result = leftOperation / rightOperand;
      }
      return computeResult;
    };
    operations.push(divideOperation);

    return operations;
  }

}
