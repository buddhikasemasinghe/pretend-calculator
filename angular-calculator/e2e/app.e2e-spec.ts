import { AppPage } from './app.po';

describe('angular-calculator App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to Buddhika\'s Angular Calculator!');
  });

  it('should display 3 when button 3 is clicked', () => {
    page.navigateTo();
    page.getKeyButton('3').click();

    expect(page.getDisplayText()).toEqual('3');
  });

  it('should display nothing when button 3 and operation key is clicked', () => {
    page.navigateTo();
    page.getKeyButton('3').click();
    page.getOperationButton('+').click();

    expect(page.getDisplayText()).toEqual('');
  });

  it('should display 5 when 3+5 operation is performed', () => {
    page.navigateTo();
    page.getKeyButton('3').click();
    page.getOperationButton('+').click();
    page.getKeyButton('5').click();

    expect(page.getDisplayText()).toEqual('5');
  });

  it('should display 8 when 3+5= operation is performed', () => {
    page.navigateTo();
    page.getKeyButton('3').click();
    page.getOperationButton('+').click();
    page.getKeyButton('5').click();
    page.getControlButton('=').click();

    expect(page.getDisplayText()).toEqual('8');
  });

  it('should display -34 when 23-57= operation is performed', () => {
    page.navigateTo();
    page.getKeyButton('2').click();
    page.getKeyButton('3').click();
    page.getOperationButton('-').click();
    page.getKeyButton('5').click();
    page.getKeyButton('7').click();
    page.getControlButton('=').click();

    expect(page.getDisplayText()).toEqual('-34');
  });

  it('should display 81 when 9*9= operation is performed', () => {
    page.navigateTo();
    page.getKeyButton('9').click();
    page.getOperationButton('*').click();
    page.getKeyButton('9').click();
    page.getControlButton('=').click();

    expect(page.getDisplayText()).toEqual('81');
  });

  it('should display 20 when 100/5= operation is performed', () => {
    page.navigateTo();
    page.getKeyButton('1').click();
    page.getKeyButton('0').click();
    page.getKeyButton('0').click();
    page.getOperationButton('/').click();
    page.getKeyButton('5').click();
    page.getControlButton('=').click();

    expect(page.getDisplayText()).toEqual('20');
  });

  it('should display 3.936 when 3.2*1.23= operation is performed', () => {
    page.navigateTo();
    page.getKeyButton('3').click();
    page.getKeyButton('.').click();
    page.getKeyButton('2').click();
    page.getOperationButton('*').click();
    page.getKeyButton('1').click();
    page.getKeyButton('.').click();
    page.getKeyButton('2').click();
    page.getKeyButton('3').click();
    page.getControlButton('=').click();

    expect(page.getDisplayText()).toEqual('3.936');
  });

  it('should display Not a number when 100/0= operation is performed', () => {
    page.navigateTo();
    page.getKeyButton('1').click();
    page.getKeyButton('0').click();
    page.getKeyButton('0').click();
    page.getOperationButton('/').click();
    page.getKeyButton('0').click();
    page.getControlButton('=').click();

    expect(page.getDisplayText()).toEqual('Not a number');
  });

});
