import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'modal',
  template: `
    <div
      class="absolute top-0 left-0 z-20 flex justify-center items-center h-full w-full backdrop-filter backdrop-blur-sm bg-black bg-opacity-40"
    >
      <div class="w-full m-1 max-w-xl bg-white rounded-xl shadow-lg">
        <div
          class="flex flex-row space-x-4 items-center justify-between p-4 md:p-6"
        >
          <h1>{{ modalTitle }}</h1>
          <div>
            <button
              (click)="onExit()"
              title="Reset search"
              class="text-gray-500 p-2 rounded-full hover:bg-gray-200 hover:text-black focus:bg-gray-200 focus:ring focus:ring-gray-300 focus:ring-offset-2 focus:text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3"
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
          </div>
        </div>
        <div class="p-4 md:p-6">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class ModalComponent implements OnInit {
  @Input() modalTitle = 'Default Title';
  @Output() exit = new EventEmitter<void>();

  ngOnInit() {
    const element = document.body;
    element.classList.add('overflow-hidden');
  }

  onExit() {
    const element = document.body;
    element.classList.remove('overflow-hidden');
    this.exit.emit();
  }
}
