import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
  ElementRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.css'],
})
export class SearchableSelectComponent implements OnInit {
  @Input() options: any[] = [];
  @Input() displayKey: string;
  @Input() placeholder: string = 'Selecione';
  @Input() selectedValue: any;
  @Input() enableSelectAll: boolean = false;
  @Output() selectedValueChange = new EventEmitter<any>();

  searchControl: FormControl = new FormControl();
  filteredOptions: any[] = [];
  dropdownVisible: boolean = false;
  areAllSelected: boolean = false;

  constructor(private elementRef: ElementRef) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((searchTerm) => this.filterOptions(searchTerm))
      )
      .subscribe((filtered) => {
        this.filteredOptions = filtered;
      });
  }

  ngOnInit() {
    this.filteredOptions = this.options;
  }

  filterOptions(searchTerm: string): Observable<any[]> {
    if (!searchTerm) {
      return new Observable((observer) => observer.next(this.options));
    }

    const filtered = this.options?.filter((option) =>
      option?.[this.displayKey]
        .toLowerCase()
        ?.includes(searchTerm.toLowerCase())
    );
    return new Observable((observer) => observer.next(filtered));
  }

  onSelect(value: any) {
    const areAllSelected = typeof value === 'string' && value === 'all';
    this.areAllSelected = areAllSelected;
    this.searchControl.setValue('');
    this.selectedValueChange.emit(value);    
    this.dropdownVisible = false;
  }

  onInputClick() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  onDropdownClick(event: MouseEvent) {
    event.stopPropagation();
    this.dropdownVisible = true;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownVisible = false;
    }
  }

  getSelectedValue(): string {
    return this.areAllSelected
      ? 'Todas as opções'
      : this.selectedValue?.[this.displayKey] || '';
  }
}
