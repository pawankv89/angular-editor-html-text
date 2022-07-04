import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularEditorConfig, AngularEditorService, AngularEditorToolbarComponent } from '@kolkov/angular-editor';

@Component({
  selector: 'email-root',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  title = 'angular-editor-html-text';
  htmlContent: any;
  angularEditorLogo: any

  @ViewChild('editor') editor: any;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '250px',
    minHeight: '0',
    maxHeight: 'auto',
    width: '500px',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };

  formGroup = this.fGroup.group({
    insertField: [null],
    textArea: ['']
  });

  constructor(private fGroup: FormBuilder, private editorService: AngularEditorService) { }

  ngOnInit(): void {

    this.htmlContent = 'In the meantime the cat slowly recovered. The socket of the lost eye presented, it is true, a frightful appearance, but he no longer appeared to suffer any pain.'
  }

  buttonClick() {
    console.log("buttonClick") //class="angular-editor-textarea"
    const htmlCollection: any = document.getElementsByClassName('angular-editor-textarea');
    const textarea: any = htmlCollection[0];
    console.log("textarea, ", htmlCollection);
    console.log("textarea, ", textarea);
    const selectionArea = textarea.value;
    //const selectionArea = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    console.log("textarea, ", selectionArea);

  }

  //   buttonClick1() {
  //   const node: any = document.querySelector("div");
  //   node.focus();
  //   const textNode = node.firstChild;
  //   const caret = 10;
  //   const range = document.createRange();
  //   range.setStart(textNode, caret);
  //   range.setEnd(textNode, caret);
  //   const sel: any = window.getSelection();
  //   sel.removeAllRanges();
  //   sel.addRange(range);
  // }

  txtEditorPosition(position?: any) {
    console.log(position?.editorService?.savedSelection?.startOffset);
  }

  insertNode() {
    const selection: any = document.getElementsByClassName('angular-editor-textarea');
    //let selection = window.getSelection().getRangeAt(0);
    let parentNode = document.createElement("a"); //create a custom node to insert
    selection.insertNode(parentNode);
    parentNode.insertAdjacentHTML("beforebegin", " ");
    parentNode.insertAdjacentHTML("afterend", " "); //add space after and before node to bring cursor outof the node
  }

  insertHTML(data: string): void {
    this.editor.focus();
    this.editor.editorService.restoreSelection();
    this.editor.editorService.insertHtml(data);
  }

  addTextDynamically() {
    let cursor = this.editor.editorService.savedSelection.startOffset;
    this.editor.editorService.savedSelection.startContainer.data =
      this.editor.editorService.savedSelection.startContainer.data.slice(0, cursor)
      + ["implemented string"] + this.editor.editorService.savedSelection.startContainer.data.slice(cursor);
    setTimeout(() => {
      this.editor.editorService.insertHtml(" ");
    }, 0);
  }

  buttonClick2() {
    //let cursor = this.editor.editorService.savedSelection.startOffset;
    this.editor.focus();
    this.editorService.restoreSelection();
    this.editorService.insertHtml(this.htmlContent); // 'text to insert here'
    console.log(this.editorService.getSelectedNodes());
    console.log(this.editor.textArea);
  }

  buttonClick3() {
   // let cursor = this.editor.editorService.savedSelection;
   //this.editor.focus();
   //this.editorService.restoreSelection();
   console.log('this.editor.editorService ', this.editor.editorService?.savedSelection?.startOffset);
   const cursor = this.editor.editorService?.savedSelection?.startOffset;
   this.editor.editorService.savedSelection.startContainer.data =
     this.editor.editorService.savedSelection?.startContainer?.data?.slice(0, cursor)
     + ["<[name]>"] + this.editor.editorService?.savedSelection?.startContainer?.data?.slice(cursor);
   setTimeout(() => {
     this.editor.editorService.insertHtml(" ");
   }, 0);
  }

  isEmptyEditor(){
    
  }

}

//https://github.com/kolkov/angular-editor/issues/104