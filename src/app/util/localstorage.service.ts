import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  setData(data: any, key: string) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  }

  getData(key: string) {
    return localStorage.getItem(key);
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }

  clearLocalstorage() {
    localStorage.clear();
  }
}
