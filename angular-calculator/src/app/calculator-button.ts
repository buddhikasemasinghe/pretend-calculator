export class CalculatorButton {
  name: string;
  value: string;
}

export const numberButtons: CalculatorButton[] = [
  {name: '7', value: '7'}, {name: '8', value: '8'}, {name: '9', value: '9'}, {name: '4', value: '4'},
  {name: '5', value: '5'}, {name: '6', value: '6'}, {name: '1', value: '1'}, {name: '2', value: '2'},
  {name: '3', value: '3'}, {name: '0', value: '0'}, {name: '.', value: '.'}];

export const operationButtons: CalculatorButton[] = [
  {name: '+', value: '+'}, {name: '-', value: '-'}, {name: '*', value: '*'}, {name: '/', value: '/'},
  {name: 'AC', value: 'AC'}, {name: '=', value: '='}];
