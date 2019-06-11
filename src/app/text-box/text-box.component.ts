import { Component, OnInit } from '@angular/core';
import {FormControl } from '@angular/forms';
import {Formularios} from '../innovationLib/Formularios';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent implements OnInit {
  textbox1 = new FormControl('');
  textbox2 = new FormControl('');
  constructor(private formularios: Formularios) { 
    
  }

  ngOnInit() {
  }
  move(){
    this.formularios.move(this.textbox1, this.textbox2);
  }

}
