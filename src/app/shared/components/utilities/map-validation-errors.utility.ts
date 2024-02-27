import { FormGroup } from "@angular/forms";
import { ValidationErrorModel } from "../../models/utils/ValidationErrorModel";

export function mapValidationErrors(form: FormGroup, errors: { [key: string]: string[]} | undefined) {
  if (!errors) {
    return;
  }

  Object.entries(errors).forEach(([key, errorMessages]) => {
    let modelError: ValidationErrorModel = {
      valid: false,
      messages: errorMessages
    };

    console.log('--> Model Key Mapped: ', key);
    console.log('--> Model Errors Mapped: ', modelError);
    
    form.get(key.toLowerCase())?.setErrors({key: modelError});
  })
}