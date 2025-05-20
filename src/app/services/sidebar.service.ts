import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isExpanded: boolean = true;

  constructor() { }

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
  }
}