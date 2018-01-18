import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { CalculatorButton, numberButtons, operationButtons } from './calculator-button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Angular Calculator';
  nonOperationalKeys: CalculatorButton[]; // Todo add them to a service
  operationalKeys: CalculatorButton[]; // Todo add them to a service
  displayBoard: String;

  ngOnInit(): void {
    this.clearDisplayBoard();
    this.nonOperationalKeys = numberButtons;
    this.operationalKeys = operationButtons;
  }

  onNumberKeyPress(keyValue: string): void {
    this.displayValue(keyValue);
  }

  onOperationalKeyPress(keyValue: string): void {
    this.clearDisplayBoard();
  }

  private clearDisplayBoard(): void {
    this.displayBoard = String('');
  }

  private displayValue(value: string) {
    if (!isNullOrUndefined(value)) {
      this.displayBoard = this.displayBoard.concat(value);
    }
  }
}
