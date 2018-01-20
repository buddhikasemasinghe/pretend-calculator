import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { BasicOperationService } from './shared/basic-operation.service';
import {
  CalculatorButton, ComputeResult, ControlButton, controlButtons, numberButtons, OperationButton,
  OperationFunctionHandler
} from './model/calculator-button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Angular Calculator';
  nonOperationalKeys: CalculatorButton[];
  operationalKeys: OperationButton[];
  controlKeys: ControlButton[];
  displayBoard: string;
  leftOperand: string;
  rightOperand?: string;
  currentOperation: OperationFunctionHandler;
  isComputed: boolean;

  constructor(private basicOperationService: BasicOperationService) {
  }

  ngOnInit(): void {
    this.clearDisplayBoard();
    this.nonOperationalKeys = numberButtons;
    this.operationalKeys = this.basicOperationService.fetchBasicOperations();
    this.controlKeys = controlButtons;
  }

  onNumberButtonClick(keyValue: string): void {
    this.displayValue(keyValue);
  }

  onOperationalButtonClick(handler: OperationFunctionHandler): void {
    this.currentOperation = handler;
    this.leftOperand = this.displayBoard;
    this.rightOperand = null;
    this.displayBoard = '';
  }

  onControlButtonClick(value: string): void {
    switch (value) {
      case '=':
        this.rightOperand = this.displayBoard.length > 0 ? this.displayBoard : null;
        const result = this.currentOperation(this.leftOperand, this.rightOperand);
        this.updateResult(result);
        this.isComputed = true;
        break;
      case 'AC':
        this.clearDisplayBoard();
        break;
      default:
        this.clearDisplayBoard();
    }
  }

  clearDisplayBoard(): void {
    this.displayBoard = '';
    this.leftOperand = null;
    this.rightOperand = null;
    this.currentOperation = null;
    this.isComputed = false;
  }

  displayValue(value: string) {
    if (!isNullOrUndefined(value)) {
      if (this.isComputed) {
        this.displayBoard = '';
        this.isComputed = false;
      }
      this.displayBoard = this.displayBoard.concat(value);
    }
  }

  updateResult(result: ComputeResult) {
    if (result.isValidNumber) {
      this.displayBoard = result.result + '';
    } else {
      this.displayBoard = result.errorMessage;
    }
  }
}
