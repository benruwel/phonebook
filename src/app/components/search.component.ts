import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'search',
  template: `
    <div
      class="flex flex-row space-x-2 items-center h-12 w-full px-4 rounded-full border border-gray-200 shadow overflow-hidden focus-within:ring-4 focus-within:border-black focus-within:ring-gray-200"
    >
      <button
        title="Search"
        class="text-gray-500 hover:text-black focus:text-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
      <input
        [formControl]="searchCtrl"
        (keyup)="(onKeyUp)"
        type="text"
        placeholder="Search contacts ..."
        class="w-full text-sm bg-none border-none outline-none focus:ring-0 focus:border-none focus:outline-none"
      />
      <ng-container *ngIf="searchCtrl.valid">
        <button
          (click)="onReset()"
          title="Reset search"
          class="text-gray-500 hover:text-black focus:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </ng-container>
    </div>
  `,
})
export class SearchComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  @Output() reset = new EventEmitter<void>();

  searchCtrl = new FormControl<string>('', [
    Validators.required,
    Validators.minLength(1),
  ]);

  ngOnInit() {
    this.searchCtrl.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        if (this.searchCtrl.valid) {
          this.search.emit(value as string);
        } else {
          this.reset.emit();
        }
      });
  }

  onKeyUp(event: KeyboardEvent) {
    if (this.searchCtrl.valid && event.key === 'Enter') {
      this.search.emit(this.searchCtrl.value as string);
    }
  }

  onReset() {
    this.reset.emit();
    this.searchCtrl.setValue('');
  }
}
