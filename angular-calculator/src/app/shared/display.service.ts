import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { ComputeResult } from '../model/calculator-button';

@Injectable()
export class DisplayService {
  private screenDisplay: string;

  constructor() {
    this.screenDisplay = '';
  }

  getScreenDisplay(): string {
    return this.screenDisplay;
  }

  updateComputeResult(computeResult: ComputeResult): void {
    if (computeResult.isValidNumber) {
      this.screenDisplay = computeResult.result + '';
    } else {
      this.screenDisplay = computeResult.errorMessage;
    }
  }

  handleNumberKeyPress(value: string, hasOperationInvoked: boolean): boolean {
    let operationInvokeStatus: boolean = hasOperationInvoked;
    if (!isNullOrUndefined(value)) {
      if (hasOperationInvoked) {
        this.screenDisplay = '';
        operationInvokeStatus = false;
      }
      this.screenDisplay = this.screenDisplay.concat(value);
    }
    return operationInvokeStatus;
  }

  resetScreen(): void {
    this.screenDisplay = '';
  }

}
