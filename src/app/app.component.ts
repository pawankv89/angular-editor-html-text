import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AngularEditorConfig, AngularEditorService } from '@kolkov/angular-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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

  buttonClick3() {
    this.insertDataFieldSelect('button3');
  }

  consoleLog(insertdatafield: any) {
    console.log(insertdatafield);
    this.insertDataFieldSelect(insertdatafield);
  }

  insertDataFieldSelect(insertdatafield: any) {
    console.log("insertdatafield, ", insertdatafield);

    const insertItem = '<[' + insertdatafield + ']>';
    if (insertdatafield?.length > 0) {
      this.insertHTML(insertItem);
        //this.editor.focus();
        //this.editor.editorService.insertHtml(insertItem); 
    }
  }

  insertHTML(insertItem: any): void {
    this.editor.focus();
    this.editor.editorService.insertHtml(insertItem);
  }

  clearInsertDataField() {

  }
}

//https://github.com/kolkov/angular-editor/issues/104