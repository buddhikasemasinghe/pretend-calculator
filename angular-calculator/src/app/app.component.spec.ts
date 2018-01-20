import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { OperationButton } from './model/calculator-button';
import { BasicOperationService } from './shared/basic-operation.service';
import { DisplayService } from './shared/display.service';

describe('AppComponent', () => {

  beforeEach(() => {
  });
  describe('when override its provided AppComponent', overrideSetup);
});

function overrideSetup() {

  let fixture: ComponentFixture<AppComponent>;
  let basicOpServiceSpy: BasicOperationServiceSpy;
  let displayServiceSpy: DisplayServiceSpy;
  let compiled: any;

  class BasicOperationServiceSpy {

    fetchBasicOperations = jasmine.createSpy('fetchBasicOperations').and.callFake(
      () => []
    );
  }

  class DisplayServiceSpy {

    getScreenDisplay = jasmine.createSpy('getScreenDisplay').and.callFake(
      () => []
    );

    updateComputeResult = jasmine.createSpy('updateComputeResult').and.callFake(
      () => []
    );

    handleNumberKeyPress = jasmine.createSpy('handleNumberKeyPress').and.callFake(
      () => []
    );

    resetScreen = jasmine.createSpy('resetScreen').and.callFake(
      () => []
    );
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [{provide: BasicOperationService, useValue: {}},
        {provide: DisplayService, useValue: {}}]
    })
      .overrideComponent(AppComponent, {
        set: {
          providers: [
            {provide: BasicOperationService, useClass: BasicOperationServiceSpy},
            {provide: DisplayService, useClass: DisplayServiceSpy}
          ]
        }
      })

      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.debugElement.nativeElement;
  }));

  beforeEach(async(() => {
    basicOpServiceSpy = fixture.debugElement.injector.get(BasicOperationService) as any;
    displayServiceSpy = fixture.debugElement.injector.get(DisplayService) as any;
  }));

  it('should create the app', async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Angular Calculator'`, async(() => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Angular Calculator');
  }));

  it('should render title in a h2 tag', async(() => {
    fixture.detectChanges();
    expect(compiled.querySelector('h2').textContent).toContain('Welcome to Buddhika\'s Angular Calculator!');
  }));

  it('should have called `fetchBasicOperations`', () => {
    fixture.detectChanges();
    expect(basicOpServiceSpy.fetchBasicOperations.calls.count()).toBe(1, 'fetchBasicOperations called once');
  });

  it('should not render number button panel', async(() => {
    const numberButtonCount = compiled.querySelector('.number-panel').querySelectorAll('.number-key').length;
    expect(numberButtonCount).toBe(0);
  }));

  it('should render button panel', async(() => {
    fixture.detectChanges();
    const numberButtonCount = compiled.querySelector('.number-panel').querySelectorAll('.number-key').length;
    expect(numberButtonCount).toBe(11);
  }));

  it('should not render operation button panel', async(() => {
    const operationButtonPanel = compiled.querySelector('.operation-panel').querySelectorAll('.operation-key').length;
    expect(operationButtonPanel).toBe(0);
  }));

  it('should render Operation button panel', async(() => {
    const plusOperation = new OperationButton();
    plusOperation.displayName = '+';
    basicOpServiceSpy.fetchBasicOperations = jasmine.createSpy('fetchBasicOperations').and.returnValue([plusOperation]);

    fixture.detectChanges();
    const operationButtonPanel = compiled.querySelector('.operation-panel').querySelectorAll('.operation-key').length;
    expect(operationButtonPanel).toBe(1);
  }));

  it('should render Control button panel', async(() => {
    fixture.detectChanges();
    const operationButtonPanel = compiled.querySelector('.operation-panel').querySelectorAll('.control-key').length;
    expect(operationButtonPanel).toBe(2);
  }));

  it('should render empty display panel', async(() => {
    fixture.detectChanges();
    const displayText = compiled.querySelector('.display-view span').textContent;
    expect(displayText).toBe('');
  }));

  it('should have called `handleNumberKeyPress`', () => {
    fixture.detectChanges();
    clickButton('number-panel', '7');
    fixture.detectChanges();
    expect(displayServiceSpy.handleNumberKeyPress.calls.count()).toBe(1, 'handleNumberKeyPress called once');
  });

  it('should display 4 digit number', async(() => {
    fixture.detectChanges();
    clickButton('number-panel', '2');
    clickButton('number-panel', '0');
    clickButton('number-panel', '1');
    clickButton('number-panel', '2');
    fixture.detectChanges();
    const displayText = compiled.querySelector('.display-view span').textContent;
    expect(displayServiceSpy.handleNumberKeyPress.calls.count()).toBe(4, 'handleNumberKeyPress called 4 times');
  }));

  it('should display 4 digit number', async(() => {
    displayServiceSpy.getScreenDisplay = jasmine.createSpy('getScreenDisplay').and.returnValue('2012');

    fixture.detectChanges();
    clickButton('number-panel', '2');
    clickButton('number-panel', '0');
    clickButton('number-panel', '1');
    clickButton('number-panel', '2');
    fixture.detectChanges();
    const displayText = compiled.querySelector('.display-view span').textContent;
    expect(displayText).toBe('2012');
  }));

  it('should display decimal value', async(() => {
    displayServiceSpy.getScreenDisplay = jasmine.createSpy('getScreenDisplay').and.returnValue('10.06');

    fixture.detectChanges();
    clickButton('number-panel', '1');
    clickButton('number-panel', '0');
    clickButton('number-panel', '.');
    clickButton('number-panel', '0');
    clickButton('number-panel', '6');
    fixture.detectChanges();
    const displayText = compiled.querySelector('.display-view span').textContent;
    expect(displayText).toBe('10.06');
    expect(displayServiceSpy.handleNumberKeyPress.calls.count()).toBe(5, 'handleNumberKeyPress called 5 times');
  }));

  it('should display clear results when operation + button is clicked', async(() => {
    const plusOperation = new OperationButton();
    plusOperation.displayName = '+';
    basicOpServiceSpy.fetchBasicOperations = jasmine.createSpy('fetchBasicOperations').and.returnValue([plusOperation]);

    fixture.detectChanges();
    clickButton('number-panel', '7');
    clickButton('operation-panel', '+');
    fixture.detectChanges();
    const displayText = compiled.querySelector('.display-view span').textContent;
    expect(displayText).toBe('');
  }));

  it('should display clear results when operation + button is clicked', async(() => {

  }));

  function clickButton(classSelector, buttonValue) {
    const button = compiled.querySelector('.' + classSelector).querySelectorAll('[value="' + buttonValue + '"]');
    button[0].click();
  }

}
