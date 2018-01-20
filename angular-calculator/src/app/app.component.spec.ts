import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BasicOperationService } from './basic-operation.service';
import { OperationButton } from './calculator-button';

describe('AppComponent', () => {

  beforeEach(() => {

  });
  describe('when override its provided AppComponent', overrideSetup);
});

function overrideSetup() {

  let fixture: ComponentFixture<AppComponent>;
  let basicOpServiceSpy: BasicOperationServiceSpy;
  let compiled: any;

  class BasicOperationServiceSpy {

    fetchBasicOperations = jasmine.createSpy('fetchBasicOperations').and.callFake(
      () => []
    );
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [{provide: BasicOperationService, useValue: {}}]
    })
      .overrideComponent(AppComponent, {
        set: {
          providers: [
            {provide: BasicOperationService, useClass: BasicOperationServiceSpy}
          ]
        }
      })

      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.debugElement.nativeElement;
  }));

  beforeEach(async(() => {
    // get the component's injected HeroDetailServiceSpy
    basicOpServiceSpy = fixture.debugElement.injector.get(BasicOperationService) as any;
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
    expect(operationButtonPanel).toBe(3);
  }));

  it('should render empty display panel', async(() => {
    fixture.detectChanges();
    const displayText = compiled.querySelector('.display-view span').textContent;
    expect(displayText).toBe('');
  }));

  it('should display single digit', async(() => {
    fixture.detectChanges();
    const button = compiled.querySelector('.number-panel').querySelectorAll('[value="7"]');
    button[0].click();
    fixture.detectChanges();
    const displayText = compiled.querySelector('.display-view span').textContent;
    expect(displayText).toBe('7');
  }));

  it('should display 4 digit number', async(() => {
    fixture.detectChanges();
    const button2 = compiled.querySelector('.number-panel').querySelectorAll('[value="2"]');
    button2[0].click();
    const button0 = compiled.querySelector('.number-panel').querySelectorAll('[value="0"]');
    button0[0].click();
    const button1 = compiled.querySelector('.number-panel').querySelectorAll('[value="1"]');
    button1[0].click();
    button2[0].click();
    fixture.detectChanges();
    const displayText = compiled.querySelector('.display-view span').textContent;
    expect(displayText).toBe('2012');
  }));

  it('should display decimal value', async(() => {
    fixture.detectChanges();
    const button1 = compiled.querySelector('.number-panel').querySelectorAll('[value="1"]');
    button1[0].click();
    const button0 = compiled.querySelector('.number-panel').querySelectorAll('[value="0"]');
    button0[0].click();
    const buttonPeriod = compiled.querySelector('.number-panel').querySelectorAll('[value="."]');
    buttonPeriod[0].click();
    button0[0].click();
    const button6 = compiled.querySelector('.number-panel').querySelectorAll('[value="6"]');
    button6[0].click();
    fixture.detectChanges();
    const displayText = compiled.querySelector('.display-view span').textContent;
    expect(displayText).toBe('10.06');
  }));

  it('should display clear results when operation + button is clicked', async(() => {
    const plusOperation = new OperationButton();
    plusOperation.displayName = '+';
    basicOpServiceSpy.fetchBasicOperations = jasmine.createSpy('fetchBasicOperations').and.returnValue([plusOperation]);

    fixture.detectChanges();
    const numberButton = compiled.querySelector('.number-panel').querySelectorAll('[value="7"]');
    numberButton[0].click();
    const button = compiled.querySelector('.operation-panel').querySelectorAll('[value="+"]');
    button[0].click();
    fixture.detectChanges();
    const displayText = compiled.querySelector('.display-view span').textContent;
    expect(displayText).toBe('');
  }));

}
