import { browser, element, by } from 'protractor';

export class NgCliAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('a-root h1')).getText();
  }
}
