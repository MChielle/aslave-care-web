import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/stocks', title: 'Estoque',  icon: 'shelves', class: '' },
  { path: '/suppliers', title: 'Fornecedores',  icon: 'storefront', class: '' },
  { path: '/registers-in', title: 'Aquisição',  icon: 'move_down', class: '' },
  { path: '/registers-out', title: 'Consumo',  icon: 'move_up', class: '' },
  { path: '/reports', title: 'Relatórios',  icon: 'description', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
