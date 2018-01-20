import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { BasicOperationService } from './basic-operation.service';
import {
  CalculatorButton, ControlButton, controlButtons, numberButtons, OperationButton,
  OperationFunctionHandler
} from './calculator-button';

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
  displayBoard: String;
  leftOperand: number;
  rightOperand?: number;
  currentOperation: OperationFunctionHandler;

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
    this.leftOperand = +this.displayBoard;
    this.displayBoard = String('');
  }

  onControlButtonClick(value: string): void {
    switch (value) {
      case '=':
        this.rightOperand = +this.displayBoard;
        const result = this.currentOperation(this.leftOperand, this.rightOperand);
        this.updateResult(result.result);
        break;
      case 'AC':
        this.clearDisplayBoard();
        break;
      default:
        this.clearDisplayBoard();
    }
  }

  clearDisplayBoard(): void {
    this.displayBoard = String('');
    this.leftOperand = 0;
    this.rightOperand = 0;
    this.currentOperation = null;
  }

  displayValue(value: string) {
    if (!isNullOrUndefined(value)) {
      this.displayBoard = this.displayBoard.concat(value);
    }
  }

  updateResult(value: number) {
    this.displayBoard = value + '';
  }
}
