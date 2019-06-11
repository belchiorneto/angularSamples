import { Injectable } from '@angular/core';
import { TextBoxService } from './../text-box.service';

@Injectable()
export class Formularios {
    constructor(private textBoxService: TextBoxService) { }

    // move o conteudo de um controle para outro e retorna o novo valor

    move<FormControl>(control1: FormControl, contrle2: FormControl){
        this.textBoxService.moveControl(control1, contrle2)
      .subscribe(data => {
        contrle2.setValue(data.valor);
        return contrle2;
      })
    }
}