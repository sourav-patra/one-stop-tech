import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  /**
   * Set a local storage item
   * @param localStorageEntryName name of the local storage entry
   * @param localStorageValue value of the local storage entry
   */
  set(localStorageEntryName: string, localStorageValue: unknown): void {
    localStorage.setItem(localStorageEntryName, JSON.stringify(localStorageValue));
  }

  /**
   * Gets the value of a localstorage entry
   * @param localStorageEntryName Name of localstorage entry
   */
  get(localStorageEntryName: string): string {
    return localStorage.getItem(localStorageEntryName) || null;
  }

  /**
   * Delete a localstorage entry
   * @param localStorageEntryName Name of localstorage entry
   */
  delete(localStorageEntryName: string): void {
    localStorage.removeItem(localStorageEntryName);
  }

  /**
   * Delete all localstorage entries
   */
  deleteAll(): void {
    localStorage.clear();
  }
}
