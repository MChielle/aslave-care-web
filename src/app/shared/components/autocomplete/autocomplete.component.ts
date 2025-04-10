import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  @Output() itemChanged = new EventEmitter();
  @Input() placeholder: string = 'Selecione';
  @Input() previewSelectedItemId!: any;
  @Input() multiSelect: boolean = false;
  @Input() disabled: boolean = false;
  @Input() reversed: boolean = false;
  @Input() isReadonly: boolean = false;
  @Input() extraClass: string = '';
  @Input() matchType: 'start' | 'full' = 'full';
  public selectedItem!: any;
  public isVisible: boolean = false;
  public filteredItems: any[];
  public searchTerm: string;

  private _itemList: any[];
  public get itemList(): any[] {
    return this._itemList;
  }
  @Input()
  public set itemList(v: any[]) {
    this._itemList = v;
    this.filteredItems = v;
    if (this.selectedValue) {
      this.selectedValue = `${this.selectedValue}`;
    }
  }

  private _shownValue: string;
  public get shownValue(): string {
    return this._shownValue;
  }
  @Input()
  public set shownValue(v: string) {
    this._shownValue = v;
    this.selectedItem = {};
    this.selectedItem[v] = null;
  }

  private _reset: boolean;
  public get reset(): boolean {
    return this._reset;
  }
  @Input()
  public set reset(v: boolean) {
    this._reset = v;
    this.selectedItem = {};
    this.selectedItem[this.shownValue] = null;
    this.resetSelect();
  }

  private _selectedValue: string;
  public get selectedValue(): string {
    return this._selectedValue;
  }
  @Input()
  public set selectedValue(v: string) {
    this._selectedValue = v;

    if (
      v &&
      this._itemList &&
      this.itemList[0] &&
      this.itemList.find((item) => item.id == v)
    ) {
      this.selectedItem = this.itemList.find((item) => item.id == v);
      this.searchTerm = `${this.selectedItem[this.shownValue]}`;
      this.itemChanged.emit(this.selectedItem);
    }
  }

  constructor() {}

  toggleDropdown() {
    this.isVisible = !this.isVisible;
  }

  ngOnInit(): void {}

  blurDropdown() {
    setTimeout(() => {
      this.toggleDropdown();
    }, 200);
  }

  onItemSelect(item): void {
    this.selectedItem = item;
    this.searchTerm = `${this.selectedItem[this.shownValue]}`;
    this.itemChanged.emit(item);
    if (this.multiSelect) {
      this.searchTerm = '';
    }
  }

  resetSelect(): void {
    this.itemChanged.emit(null);
  }

  search(e): void {
    e.preventDefault();
    e.stopPropagation();

    if (!this.searchTerm) {
      this.filteredItems = this.itemList;
      this.reset = !this.reset;
      return;
    }
    let term = this.simplifyString(this.searchTerm);
    this.filteredItems = this.itemList.filter((item) => {
      if (this.matchType == 'start') {
        return this.simplifyString(item[this.shownValue]).startsWith(term);
      }
      return this.simplifyString(item[this.shownValue]).includes(term);
    });

    this.getItemFromSearch();
  }

  getItemFromSearch() {
    let item = this.itemList.find((x) => x[this.shownValue] == this.searchTerm);
    if (item) {
      this.onItemSelect(item);
    } else {
      this.reset = !this.reset;
    }
  }

  simplifyString(str: string) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  manualReset() {
    this.selectedItem = {};
    this.selectedItem[this.shownValue] = null;
    this.searchTerm = '';
  }
}
