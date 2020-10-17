import { Injectable } from "@angular/core";
import { IUserInfo } from "src/app/shared/models/user.model";
import { LocalStorageService } from "../storage/local-storage.service";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  private userInfo: IUserInfo;
  constructor(private storageService: LocalStorageService) {}

  /**
   * Get user info
   */
  public getUser(): IUserInfo {
    return this.userInfo;
  }

  /**
   * Get user info
   */
  public getUserFromStorage(): IUserInfo {
    return JSON.parse(this.storageService.get("user"));
  }

  /**
   * Set the user info
   * @param userInfo user info set during authentication
   */
  public setUser(userInfo: IUserInfo): void {
    this.userInfo = userInfo;
    this.storageService.set("user", this.userInfo);
  }

  /**
   * Clear user session data
   */
  public clearUserData(): void {
    this.userInfo = null;
    this.storageService.delete("user");
  }
}
