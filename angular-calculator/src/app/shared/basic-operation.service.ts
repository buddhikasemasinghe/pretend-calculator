import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { environment } from '../../environments/environment';
import { ComputeResult, OperationButton } from '../model/calculator-button';

/**
 * The purpose of this service to dynamically add operations to the component. The operations logic can be separately testable
 * and they are not coupled with the UI. Complex services like sin, cos can be injected sperately when the application grows and
 * it won't affect the basic operations functionality.
 */
@Injectable()
export class BasicOperationService {

  constructor() {
  }

  /**
   * Fetch all basic operations as an array of operation handlers as a function parameter.
   * @returns {OperationButton[]}
   */
  fetchBasicOperations(): OperationButton[] {
    const operations: OperationButton[] = [];
    operations.push(this.populateAddOperation());
    operations.push(this.populateSubtractOperation());
    operations.push(this.populateMultiplyOperation());
    operations.push(this.populateDivideOperation());
    return operations;
  }

  /**
   * Handler:
   *  Note: If the right operand is not passed it will be treated as the left operand as how it works in most of the
   *  calculators.
   * @returns {OperationButton}
   */
  private populateAddOperation(): OperationButton {
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
    return addOperation;
  }

  private populateSubtractOperation(): OperationButton {
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
    return subtractOperation;
  }

  private populateMultiplyOperation(): OperationButton {
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
    return multiplyOperation;
  }

  private populateDivideOperation(): OperationButton {
    const divideOperation = new OperationButton();
    divideOperation.displayName = '/';
    divideOperation.handler = function (leftOperation: string, rightOperand: string) {
      const computeResult = new ComputeResult();
      if (isNullOrUndefined(rightOperand)) {
        rightOperand = leftOperation;
      }
      // Otherwise it will display as NaN which is not user friendly message
      if (rightOperand === '0') {
        computeResult.isValidNumber = false;
        computeResult.errorMessage = 'Not a number';
      } else {
        computeResult.result = +((+leftOperation) / (+rightOperand)).toPrecision(environment.fractionDigits);
      }
      return computeResult;
    };
    return divideOperation;
  }
}
