import { Component, OnInit } from '@angular/core';

import {
  CalculatorButton, ControlButton, controlButtons, numberButtons, OperationButton,
  OperationFunctionHandler
} from './model/calculator-button';

import { BasicOperationService } from './shared/basic-operation.service';
import { DisplayService } from './shared/display.service';

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

  constructor(private basicOperationService: BasicOperationService, private displayService: DisplayService) {
  }

  ngOnInit(): void {
    this.reset();
    this.nonOperationalKeys = numberButtons;
    this.operationalKeys = this.basicOperationService.fetchBasicOperations();
    this.displayService.resetScreen();
    this.controlKeys = controlButtons;
  }

  onNumberButtonClick(keyValue: string): void {
    this.isComputed = this.displayService.handleNumberKeyPress(keyValue, this.isComputed);
  }

  onOperationalButtonClick(handler: OperationFunctionHandler): void {
    this.currentOperation = handler;
    this.leftOperand = this.displayService.getScreenDisplay();
    this.rightOperand = null;
    this.displayService.resetScreen();
  }

  onControlButtonClick(value: string): void {
    switch (value) {
      case '=':
        const screenDisplay = this.displayService.getScreenDisplay();
        this.rightOperand = screenDisplay.length > 0 ? screenDisplay : null;
        const result = this.currentOperation(this.leftOperand, this.rightOperand);
        this.displayService.updateComputeResult(result);
        this.isComputed = true;
        break;
      case 'AC':
        this.reset();
        break;
      default:
        this.reset();
    }
  }

  reset(): void {
    this.displayService.resetScreen();
    this.leftOperand = null;
    this.rightOperand = null;
    this.currentOperation = null;
    this.isComputed = false;
  }

  display(): string {
    return this.displayService.getScreenDisplay();
  }
}
