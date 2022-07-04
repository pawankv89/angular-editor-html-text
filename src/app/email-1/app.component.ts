import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularEditorConfig, AngularEditorService } from '@kolkov/angular-editor';

@Component({
  selector: 'email1-root',
  templateUrl: './email1.component.html',
  styleUrls: ['./email1.component.scss']
})
export class Email1Component implements OnInit {
  title = 'angular-editor-html-text';

  cars = [
    { value: "BMW Hyundai 1", name: "BMW Hyundai" },
    { value: "Kia Tata 2", name: "Kia Tata" },
    { value: "Volkswagen Ford ", name: "Volkswagen Ford" },
    { value: "Renault Audi 4", name: "Renault Audi" },
    { value: "Mercedes Benz Skoda 5", name: "Mercedes Benz Skoda" },
  ];

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '100',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['undo',
        'redo',
        'subscript',
        'superscript',
        'indent',
        'outdent',
        'fontName'],
      [
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'removeFormat',
        'toggleEditorMode',
      ],
    ],
  };

  @ViewChild('editor') editor: any;
  editorFocused = false;

  
  formGroup = this.fGroup.group({
    insertField: [null],
    templateBody: [null]
  });

  constructor(private fGroup: FormBuilder, private editorService: AngularEditorService) { }

  getTemplateBody(){
    return 'In the meantime the cat slowly recovered. The socket of the lost eye presented, it is true, a frightful appearance, but he no longer appeared to suffer any pain.';
  }

  ngOnInit(): void {

    // Patch Value
    this.formGroup.patchValue({
      templateBody: this.getTemplateBody(),
      insertField: 'BMW Hyundai'
    });
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
    this.editorService.insertHtml(this.getTemplateBody()); // 'text to insert here'
    console.log(this.editorService.getSelectedNodes());
    console.log(this.editor.textArea);
  }

  buttonClick4() {
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

  buttonClick3() {
    this.insertDataFieldSelect('button3');
  }

  consoleLog(insertdatafield: any) {
    console.log(insertdatafield);
    this.insertDataFieldSelect(insertdatafield);
  }
  editorFocusEmail() {
    //this.editor.focus();
  }

  insertDataFieldSelect(insertdatafield: any) {
    console.log("insertdatafield, ", insertdatafield);

    const insertItem = '<[' + insertdatafield + ']>';
    if (insertdatafield?.length > 0) {

      if(!this.editorFocused){
        this.editor.focus();
        this.editor.editorService.insertHtml(insertItem);
        return;
      } 

      console.log("INT 1, ", this.editor?.editorService?.savedSelection);
      // If Insert Field Not Selected
    if(this.editor?.editorService?.savedSelection?.startContainer){
      console.log("INT 2, ", this.editor?.editorService?.savedSelection);
       // If Edit Area is empty
      const cursor = this.editor.editorService?.savedSelection?.startOffset;
      this.editor.editorService.savedSelection.startContainer.data =
        this.editor.editorService.savedSelection?.startContainer?.data?.slice(0, cursor)
        + [insertItem] + this.editor.editorService?.savedSelection?.startContainer?.data?.slice(cursor);
      setTimeout(() => {
        console.log("INT 3, ", this.editor?.editorService?.savedSelection);
        //this.editor.editorService.insertHtml(" ");
        //this.editor.focus();
        //this.editorService.restoreSelection();
        //this.editorService.insertHtml(insertItem);
        try {
         
          this.editor.editorService.insertHtml(" ");
        } catch (error) {
          // we'll proceed, but let's report it
          console.log("INT TRY, ", this.editor?.editorService?.savedSelection);
          console.log("INT TRY error, ", error);
          
          this.editor.focus();
          this.editor.editorService.insertHtml(insertItem);
          
        }

      }, 0);
    } else {
      console.log("INT 4, ", this.editor?.editorService?.savedSelection);
       // If Edit Area is empty so enter insert field here
      this.editor.focus();
      this.editor.editorService.restoreSelection();
      this.editor.editorService.insertHtml(insertItem);
    }
  }
    // if (insertdatafield?.length > 0) {
    //   this.editor.focus();
    //   const insertItem = '<[' + insertdatafield + ']>';
    //   const cursor = this.editor.editorService?.savedSelection?.startOffset;
    //   this.editor.editorService.savedSelection.startContainer.data =
    //     this.editor.editorService.savedSelection?.startContainer?.data?.slice(0, cursor)
    //     + ["<[name]>"] + this.editor.editorService?.savedSelection?.startContainer?.data?.slice(cursor);
    //   setTimeout(() => {
    //     this.editor.editorService.insertHtml(" ");
    //   }, 0);
    // }
  }

  clearInsertDataField() {

  }

  // onTextAreaMouseOut = (): void => {
  //   if (document.getSelection) {
  //     const sel: any = document.getSelection();
  //     if (sel.getRangeAt && sel.rangeCount) {
  //       this.savedSelection = sel.getRangeAt(0);
  //       this.selectedText = sel.toString();
  //     }
  //   } else if (document.getSelection() && document.createRange) {
  //     this.savedSelection = document.createRange();
  //   } else {
  //     this.savedSelection = null;
  //   }
  // }

  getEditorFocus(){
    this.editorFocused = true;
  }

}

//https://github.com/kolkov/angular-editor/issues/104