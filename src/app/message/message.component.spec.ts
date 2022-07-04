import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageComponent } from './message.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        MessageComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MessageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-editor-html-text'`, () => {
    const fixture = TestBed.createComponent(MessageComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-editor-html-text');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(MessageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('angular-editor-html-text app is running!');
  });
});
