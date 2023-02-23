import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main class="relative h-full">
      <section
        class="sticky top-0 left-0 p-4 border-b border-gray-200 backdrop-filter backdrop-blur-lg  md:px-8"
      >
        <h1>PhoneBook</h1>

        <div class="flex flex-row space-x-2 items-center justify-between">
          <div class="flex flex-row space-x-2 items-center">
            <h3>Contacts</h3>
            <div class="inline-flex">
              <span
                class="px-4 bg-purple-100 rounded-full text-sm text-purple-600 font-medium"
                >10</span
              >
            </div>
          </div>

          <div class="flex flex-row space-x-4">
            <button
              class="btn-scaling p-2 rounded-lg hover:bg-gray-200 focus:bg-gray-300 focus:ring focus:ring-purple-200 focus:ring-offset-4"
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
                  d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                />
              </svg>
            </button>
            <button
              class="btn-scaling p-2 rounded-lg hover:bg-gray-200 focus:bg-gray-300 focus:ring focus:ring-purple-200 focus:ring-offset-4"
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <button
              class="hidden px-6 py-2 rounded-lg bg-black text-white text-sm btn-scaling focus:ring focus:ring-purple-200 focus:ring-offset-4 sm:block"
            >
              New
            </button>
          </div>
        </div>
      </section>

      <div class="fixed bottom-0 left-0 w-full p-4 sm:hidden">
        <button
          class="w-full px-6 py-4 rounded-lg bg-black text-white text-sm btn-scaling focus:ring focus:ring-purple-200 focus:ring-offset-4"
        >
          New
        </button>
      </div>

      <section class="p-4 pb-24 md:p-8">
        <div
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4"
        >
          <contact-card></contact-card>
          <contact-card></contact-card>
          <contact-card></contact-card>
          <contact-card></contact-card>
          <contact-card></contact-card>
          <contact-card></contact-card>
          <contact-card></contact-card>
          <contact-card></contact-card>
          <contact-card></contact-card>
        </div>
      </section>
    </main>
  `,
})
export class AppComponent {
  title = 'PhoneBook';
}
