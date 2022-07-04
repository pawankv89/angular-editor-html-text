import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  title = 'angular-editor-plan-text';
  cars = [
    { value: "BMW Hyundai", name: "BMW Hyundai" },
    { value: "Kia Tata", name: "Kia Tata" },
    { value: "Volkswagen Ford", name: "Volkswagen Ford" },
    { value: "Renault Audi", name: "Renault Audi" },
    { value: "Mercedes Benz Skoda", name: "Mercedes Benz Skoda" },
  ];

  selected = [];
  //selected = [{ value: 3, name: "Volkswagen Ford" }];

  formGroup = this.fGroup.group({
    insertField: [null],
    textArea: ['']
  });

  constructor(private fGroup: FormBuilder) { }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  insertDataFieldSelect(insertdatafield: any) {
    console.log("insertdatafield, ", insertdatafield);

    if (insertdatafield?.length > 0) {
      const textarea: any = document.getElementById('textArea');
      this.insertAtCaret(textarea, '<[' + insertdatafield + ']>');
    }
  }

  clearInsertDataField() {

  }

  buttonClick() {
    console.log("buttonClick")
    const textarea: any = document.getElementById('textArea');
    const selectionArea = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
    console.log("textarea, ", selectionArea);

    this.insertAtCaret(textarea, ' << inserted text! >> ');
  }

  insertAtCaret(document: any, myValue: any) {

    if (document.selection) {
      //For browsers like Internet Explorer
      document.focus();
      const sel = document.selection.createRange();
      sel.text = myValue;
      document.focus();
    } else if (document.selectionStart || document.selectionStart == '0') {
      //For browsers like Firefox and Webkit based
      var startPos = document.selectionStart;
      var endPos = document.selectionEnd;
      var scrollTop = document.scrollTop;
      document.value = document.value.substring(0, startPos) + myValue + document.value.substring(endPos, document.value.length);
      document.focus();
      document.selectionStart = startPos + myValue.length;
      document.selectionEnd = startPos + myValue.length;
      document.scrollTop = scrollTop;
    } else {
      document.value += myValue;
      document.focus();
    }
  }

  getCaretPosition(event: any) {
    console.log(event)
    const textarea: any = document.getElementById('textArea');
    const position = textarea.section;
    return position;
  }


  // buttonClick1() {
  //   console.log("buttonClick")
  //   const myDiv: any = document.getElementById('myDiv');
  //   console.log("myDiv, ", myDiv);

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

  // buttonClick2() {
  //   console.log("buttonClick")
  //   const myDiv: any = document.getElementById('myDiv');
  //   console.log("myDiv, ", myDiv);

  //   const el: any = document.getElementById('myDiv');
  //   const selection: any = window.getSelection();
  //   const range = document.createRange();
  //   selection.removeAllRanges();
  //   range.selectNodeContents(el);
  //   range.collapse(false);
  //   selection.addRange(range);
  //   el.focus();
  // }

}
