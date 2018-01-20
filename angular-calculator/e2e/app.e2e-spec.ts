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

    expect(page.getDisplayText()).toEqual('8');
  });

  it('should display 8 when 3+5= operation is performed', () => {
    page.navigateTo();
    page.getKeyButton('3').click();
    page.getOperationButton('+').click();
    page.getKeyButton('5').click();
    page.getControlButton('=').click();

    expect(page.getDisplayText()).toEqual('8');
  });

});
