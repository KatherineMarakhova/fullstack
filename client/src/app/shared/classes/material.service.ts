import {ElementRef} from "@angular/core";

declare const M: any;

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message})
  }

  static initializeFroatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static updateTextInputs() {
    M.updateTextFields()
  }
}
