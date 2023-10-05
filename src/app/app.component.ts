import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formulario: FormGroup;
  submitted = false; // Variable para rastrear si se ha enviado el formulario

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      curp: ['', [Validators.required, this.validarCURP]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      paterno: ['', [Validators.required, Validators.minLength(3)]],
      materno: ['', [Validators.required, Validators.minLength(3)]],
      nivel: ['0', [Validators.required, this.validarNoSeleccionar('0')]],
      municipio: ['0', [Validators.required, this.validarNoSeleccionar('0')]],
      tema: ['0', [Validators.required, this.validarNoSeleccionar('0')]],
      // Agrega más campos aquí según tu necesidad
    });
  }

  validarCURP(input: string | null): boolean {
    if (!input || typeof input !== 'string') return false;
    return /^[A-Z]{4}[0-9]{6}[HM][A-Z]{2}[A-Z0-9]{4}[0-9A]$/.test(input.trim());
  }

  validarNoSeleccionar(valueToExclude: string) {
    return (control: AbstractControl) => {
      if (control.value === valueToExclude) {
        return { required: true };
      }
      return null;
    };
  }
  

  onSubmit() {
    this.submitted = true;
    if (this.formulario.valid) {
      // El formulario es válido, puedes enviar los datos al servidor aquí
      console.log(this.formulario.value);
    } else {
      // El formulario tiene errores, muestra mensajes de error junto a los campos
      alert("Por favor, corrige los errores en el formulario antes de enviar.");
    }
  }
}
