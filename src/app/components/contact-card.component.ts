import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-card',
  template: `
    <div
      class="flex flex-col space-y-4  p-2 rounded-lg border border-gray-200 shadow cursor-pointer hover:shadow-md"
    >
      <div class="flex flex-row space-x-2 items-start justify-between">
        <div class="flex flex-row space-x-2">
          <div class="w-14 h-14 rounded-full bg-gray-100 overflow-hidden">
            <img
              src="https://ui-avatars.com/api/?background=random&name=Saniel+Ruwel"
              alt="Contact Avatar"
              class="object-cover object-center"
            />
          </div>
          <div class="flex flex-col space-y-1 py-2">
            <span class="font-medium text-gray-600">Ben Ruwel</span>
            <span class="text-xs md:text-sm text-gray-500">Created On</span>
          </div>
        </div>

        <input
          class="rounded border-gray-400 text-purple-600 focus:ring-purple-600"
          type="checkbox"
          name="check"
          id="check"
        />
      </div>
      <div class="flex flex-row flex-wrap space-x-2">
        <div
          class="flex flex-row space-x-2 items-center px-2 py-1 bg-gray-50 text-gray-500 rounded-full border border-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-3 h-3"
          >
            <path
              fill-rule="evenodd"
              d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
              clip-rule="evenodd"
            />
          </svg>

          <span class="text-xs md:text-sm ">07232134343</span>
        </div>
        <div
          class="flex flex-row space-x-2 items-center px-2 py-1 bg-gray-50 text-gray-500 rounded-full border border-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-3 h-3"
          >
            <path
              d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"
            />
            <path
              d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"
            />
          </svg>

          <span class="text-xs md:text-sm ">ben@gmail.com</span>
        </div>
      </div>
    </div>
  `,
})
export class ContactCardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
