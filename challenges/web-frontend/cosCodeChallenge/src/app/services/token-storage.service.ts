import { Injectable } from '@angular/core';


const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {

  constructor() { }
  signOut(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem("auth-token");
    localStorage.setItem("auth-token", token);
  }
  public saveUserId(userId: string): void {
    localStorage.removeItem("user-id");
    localStorage.setItem("user-id", userId);
  }

  public getToken(): string | null {
    return localStorage.getItem("auth-token");
  }
  public getUserId(): string | null {
    return localStorage.getItem("user-id");
  }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('auth-token');
    if (token) {
      return true
    }
    else {
      return false
    }
  }
}
