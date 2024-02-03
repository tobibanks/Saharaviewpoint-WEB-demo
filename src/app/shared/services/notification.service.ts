import { LoaderService } from '../components/loader/loader.service';
import { LoaderRef } from '../components/loader/loader-ref';
import { AlertModel } from '../models/utils/AlertModel';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  loader!: LoaderRef;
  private Toast: any = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });
  //modalRef!: BsModalRef;

  constructor(
    private loaderService: LoaderService
  ) { }

  async showLoader() {
    if (this.loader) {
      this.loader.close();
    }
    this.loader = await this.loaderService.show('');
  }

  async hideLoader() {
    if (this.loader) {
      await this.loaderService.close(this.loader);
    }
  }

  showMessage(message?: string) {
    alert(message);
  }
  
  showSuccessMessage(message?: string): Promise<boolean> {
    return Swal.fire({
      icon: 'success',
      text: message,
    }).then(() => {
      return true;
    })
  }

  async showInfoMessage(title?: string, message?: string): Promise<boolean> {
    await Swal.fire({
      icon: 'info',
      title: title,
      text: message,
    });
    return true;
  }

  showErrorMessage(title?: string, message?: string): Promise<boolean> {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: message,
    }).then((result) => {
      return true;
    });
  }

  timedSuccessMessage(message?: string) {
    this.Toast.fire({
      icon: 'success',
      title: message
    })
  }

  timedErrorMessage(message?: string) {
    this.Toast.fire({
      icon: 'error',
      title: message
    })
  }

  timedInfoMessage(message?: string) {
    this.Toast.fire({
      icon: 'info',
      title: message
    })
  }

  async confirmDelete(): Promise<boolean> {
    return Swal.fire({
      // title: '',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4976ba',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      width: 500,
      padding: '0 0 1.25em',
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  async confirmAction(message: string): Promise<boolean> {
    return Swal.fire({
      // title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4976ba',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      return result.isConfirmed;
    })
  }

  async confirmRemarkedAction(title: string, message: string): Promise<any> {
    return Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4976ba',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continue',
      input: 'textarea',
      inputAttributes: {
        autocapitalize: 'off',
        required: 'true'
      }
    }).then((result) => {
      let alertResponse: AlertModel = {
        isConfirmed: result.isConfirmed,
        isDismissed: result.isDismissed,
        isDenied: result.isDenied,
        remark: result.value
      };
      return alertResponse;
    })
  }
}
