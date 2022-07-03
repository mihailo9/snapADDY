import { Injectable, Injector, ProviderToken } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class FromInjector {
  constructor(private readonly injector: Injector) {}

  get<T>(token: ProviderToken<T>) {
    return this.injector.get(token);
  }
}
