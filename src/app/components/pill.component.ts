import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pill',
  template: `
    <div
      class="flex flex-row space-x-2 items-center w-fit px-2 py-1 text-xs bg-gray-50 text-gray-500 rounded-full border border-gray-200 md:text-sm"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class PillComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
