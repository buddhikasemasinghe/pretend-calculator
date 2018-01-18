import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Angular Calculator'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Angular Calculator');
  }));
  it('should render title in a h2 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Welcome to Buddhika\'s Angular Calculator!');
  }));

  it('should not render number button panel', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    const numberButtonCount = compiled.querySelector('.number-panel').querySelectorAll('.number-key').length;
    expect(numberButtonCount).toBe(0);
  }));

  it('should render button panel', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const numberButtonCount = compiled.querySelector('.number-panel').querySelectorAll('.number-key').length;
    expect(numberButtonCount).toBe(11);
  }));

  it('should not render operation button panel', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    const operationButtonPanel = compiled.querySelector('.operation-panel').querySelectorAll('.operation-key').length;
    expect(operationButtonPanel).toBe(0);
  }));

  it('should render Operation button panel', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const operationButtonPanel = compiled.querySelector('.operation-panel').querySelectorAll('.operation-key').length;
    expect(operationButtonPanel).toBe(6);
  }));

  it('should render empty display panel', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const displayText = compiled.querySelector('.display-view span').textContent;
    expect(displayText).toBe('');
  }));

  it('should display 7 when button 7 is clicked', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('.number-panel').querySelectorAll('[value="7"]');
    button[0].click();
    fixture.detectChanges();
    const displayText = compiled.querySelector('.display-view span').textContent;
    expect(displayText).toBe('7');
  }));

  it('should display clear results when operation + button is clicked', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const numberButton = compiled.querySelector('.number-panel').querySelectorAll('[value="7"]');
    numberButton[0].click();
    const button = compiled.querySelector('.operation-panel').querySelectorAll('[value="+"]');
    button[0].click();
    fixture.detectChanges();
    const displayText = compiled.querySelector('.display-view span').textContent;
    expect(displayText).toBe('');
  }));


});
