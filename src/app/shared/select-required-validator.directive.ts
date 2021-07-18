import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms'
import { Directive ,Input} from '@angular/core';

@Directive({
    selector: '[appSelectValidator]',
    providers:[{
        provide: NG_VALIDATORS,
        useExisting:SelectRquiredValidatorDirective,
        multi:true
    }]
})

export class SelectRquiredValidatorDirective implements Validator {
    @Input() appSelectValidator :string;
    validate(control: AbstractControl): { [key: string]: any } | null {
        return control.value === this.appSelectValidator ? { 'defaultSelected': true } : null;
    }
}