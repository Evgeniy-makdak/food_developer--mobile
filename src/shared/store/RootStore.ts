// src/app/store/RootStore.ts

import { NavBarStore } from "./NavBarStore";



export class RootStore {
  navBarStore: NavBarStore;


  constructor() {
    this.navBarStore = new NavBarStore();

  }
}

