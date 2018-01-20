import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h2')).getText();
  }

  getDisplayText() {
    return element(by.css('.display-view span')).getText();
  }

  getKeyButton(buttonValue) {
    return element(by.css('.number-panel [value="' + buttonValue + '"]'));
  }

  getOperationButton(buttonValue) {
    return element(by.css('.operation-panel [value="' + buttonValue + '"]'));
  }

  getControlButton(buttonValue) {
    return element(by.css('.operation-panel [value="' + buttonValue + '"]'));
  }
}
