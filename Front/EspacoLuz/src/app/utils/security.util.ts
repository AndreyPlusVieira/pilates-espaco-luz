import { User } from '../models/User';

export class Security {
  public static set(user: User, token: any) {
    const data = JSON.stringify(user);

    localStorage.setItem('pilatesuser', data);
    localStorage.setItem('pilatestoken', token);
  }

  public static setUser(user: User) {
    const data = JSON.stringify(user);
    localStorage.setItem('pilatesuser', data);
  }
  public static setToken(token: string) {
    localStorage.setItem('pilatestoken', token);
  }

  public static getUser(): any {
    const data = localStorage.getItem('pilatesuser');
    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  }

  public static getToken(): any {
    const data = localStorage.getItem('pilatestoken');
    if (data) {
      return data;
    } else {
      return null;
    }
  }

  public static hasToken(): boolean {
    if (this.getToken()) return true;
    else return false;
  }

  public static clear() {
    localStorage.removeItem('pilatesuser');
    localStorage.removeItem('pilatestoken');
  }
}
