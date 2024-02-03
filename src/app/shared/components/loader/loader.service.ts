import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { LoaderConfig } from './loader-config';
import { LoaderContentComponent } from './loader-content/loader-content.component';
import { LoaderInjector } from './loader-injector';
import { LoaderRef } from './loader-ref';
import { LoaderComponent } from './loader.component';
import { LoaderModule } from './loader.module';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loaderComponentRef!: ComponentRef<LoaderComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  appendDialogComponentToBody(config: LoaderConfig) {
    // create a map with the config
    const map = new WeakMap();
    map.set(LoaderConfig, config);

    const loaderRef = new LoaderRef();
    map.set(LoaderRef, loaderRef);

    const sub = loaderRef.afterClosed.subscribe(() => {
      // close the dialog
      this.removeDialogComponentFromBody();
      sub.unsubscribe();
    });

    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(LoaderComponent);
    const componentRef = componentFactory.create(
      new LoaderInjector(this.injector, map)
    );
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    //document.body.appendChild(domElem);
    if (config?.parentContainer == null || config?.parentContainer == '') {
      this.getAppRoot().appendChild(domElem);
    } else {
      this.getParentContainer(config.parentContainer)?.appendChild(domElem);
    }

    this.loaderComponentRef = componentRef;

    this.setConfig(this.loaderComponentRef, config);

    const sub2 = this.loaderComponentRef.instance.onClose.subscribe(() => {
      this.removeDialogComponentFromBody();
      sub2.unsubscribe();
    });

    // return the dialogRef
    return loaderRef;
  }

  getAppRoot = () => {
    return document.querySelector('ion-app') || document.body;
  };

  getParentContainer = (parent: string | undefined): Element | null => {
    if (parent === undefined) {
      return document.body;
    }

    if (parent.startsWith('#')) {
      return document.getElementById(parent.replace('#', ''));
    } else if (parent.startsWith('.')) {
      let dddd = document.getElementsByClassName(parent.replace('.', ''))[0];
      return dddd;
    } else {
      return document.querySelector(parent);
    }
  };

  private setConfig(
    loaderComponentRef: ComponentRef<LoaderComponent>,
    config: LoaderConfig
  ) {
    loaderComponentRef.instance.backdropDismiss = config.backdropDismiss;
  }

  private removeDialogComponentFromBody() {
    this.appRef.detachView(this.loaderComponentRef.hostView);
    this.loaderComponentRef.destroy();
  }

  public open(componentType: Type<any>, config: LoaderConfig) {
    const loaderRef = this.appendDialogComponentToBody(config);

    this.loaderComponentRef.instance.childComponentType = componentType;

    return loaderRef;
  }

  public show(message: string, parent: string = ''): Promise<any> {
    return new Promise((resolve, reject) => {
      const loader = this.open(LoaderContentComponent, {
        data: {
          message: message,
        },
        backdropDismiss: false,
        parentContainer: parent,
      });

      if (loader) {
        resolve(loader);
      } else {
        reject(false);
      }
    });
  }

  public close(loader: LoaderRef): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (loader) {
        loader.close();
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
}
