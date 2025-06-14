<template>
  <header class="sticky top-0 z-50 flex items-center px-6 h-18 bg-white shadow-sm dark:bg-gray-700 font-sans">
  <!-- LEFT: Logo + Dropdown -->
  <div class="flex-1 flex items-center gap-1">
    <div class="relative flex flex-col">
      <div class="flex items-center gap-1 cursor-pointer select-none" @click="toggleDropdown">
        <router-link to="/" class="block">
          <img src="../assets/VIA/VN2.png" alt="VN Logo" class="h-14 w-auto" />
        </router-link>
        <font-awesome-icon :icon="isDropdownOpen ? 'chevron-up' : 'chevron-down'"
          class="text-gray-600 dark:text-gray-300 text-sm" />
      </div>

      <!-- Dropdown Menu -->
      <div v-if="isDropdownOpen"
        class="absolute left-0 top-full mt-1 min-w-full bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
        <div @click.stop="openShortcutsModal"
          class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-300">
          ⌨️ Keyboard Shortcuts
        </div>
        <div @click.stop="toggleDarkMode"
          class="px-4 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-300">
          <font-awesome-icon :icon="isDarkMode ? 'sun' : 'moon'" class="text-gray-600 dark:text-gray-300" />
          Switch to {{ isDarkMode ? 'Light' : 'Dark' }} Mode
        </div>
      </div>
    </div>
  </div>

  <!-- CENTER: Navigation -->
  <div class="hidden md:flex flex-1 justify-center">
    <nav class="flex gap-6 font-semibold text-gray-800 dark:text-gray-100 text-base">
      <router-link to="/" class="hover:text-red-600 transition-colors duration-200">Event</router-link>
      <router-link to="/about" class="hover:text-red-600 transition-colors duration-200">About</router-link>
      <router-link to="/challenges" class="hover:text-red-600 transition-colors duration-200">Challenges</router-link>
    </nav>
  </div>

  <!-- RIGHT: Hamburger / Buttons -->
  <div class="flex-1 flex justify-end items-center gap-3">
    <!-- Hamburger (Mobile) -->
    <button @click="toggleMobileMenu" class="md:hidden text-gray-800 dark:text-gray-200" aria-label="Toggle menu">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16" />
        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <!-- Mobile Menu -->
 <!-- Mobile Menu -->
<div v-if="showMobileMenu"
  class="md:hidden flex flex-col items-center gap-3 mt-2 text-base font-semibold text-gray-800 dark:text-gray-100">
  <router-link to="/" class="px-4 py-2 hover:text-red-600 transition">
    Event
  </router-link>
  <router-link to="/about" class="px-4 py-2 hover:text-red-600 transition">
    About
  </router-link>
  <router-link to="/challenges" class="px-4 py-2 hover:text-red-600 transition">
    Challenges
  </router-link>
</div>


  <!-- Modal Shortcuts -->
  <div v-if="showShortcutsModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="closeShortcutsModal">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg">
      <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        ⌨️ Keyboard Shortcuts
      </h2>
      <ul class="max-h-80 overflow-y-auto list-none p-0 mb-4 text-gray-700 dark:text-gray-300">
        <li v-for="item in shortcuts" :key="item.id" class="mb-2 text-base">
          <strong>{{ item.shortcut }}</strong>: {{ item.action }}
        </li>
      </ul>
      <button @click="closeShortcutsModal"
        class="ml-auto block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition">
        Close
      </button>
    </div>
  </div>
</header>


  

  <!-- Modal Shortcuts -->
  <div v-if="showShortcutsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="closeShortcutsModal">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-lg">
      <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        ⌨️ Keyboard Shortcuts
      </h2>
      <ul class="max-h-80 overflow-y-auto list-none p-0 mb-4 text-gray-700 dark:text-gray-300">
        <li v-for="item in shortcuts" :key="item.id" class="mb-2 text-base">
          <strong>{{ item.shortcut }}</strong>: {{ item.action }}
        </li>
      </ul>
      <button @click="closeShortcutsModal"
        class="ml-auto block bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition">
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faMoon,
  faSun,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons'

library.add(faMoon, faSun, faChevronDown, faChevronUp)

const isDropdownOpen = ref(false)
const showMobileMenu = ref(false)
const showShortcutsModal = ref(false)
const isDarkMode = ref(false)
const shortcuts = ref([])

const toggleDropdown = () => (isDropdownOpen.value = !isDropdownOpen.value)
const toggleMobileMenu = () => (showMobileMenu.value = !showMobileMenu.value)
const openShortcutsModal = () => (showShortcutsModal.value = true)
const closeShortcutsModal = () => (showShortcutsModal.value = false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

onMounted(async () => {
  try {
    const res = await fetch('https://67345ca9a042ab85d119d8eb.mockapi.io/shortcuts')
    if (!res.ok) throw new Error('Fetch failed with status ' + res.status)
    const data = await res.json()
    shortcuts.value = data
  } catch (err) {
    console.error('Failed to fetch shortcuts:', err)
  }

  const savedMode = localStorage.getItem('darkMode') === 'true'
  if (savedMode) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})

watchEffect(() => {
  localStorage.setItem('darkMode', isDarkMode.value)
})
</script>

<script>
export default {
  components: {
    FontAwesomeIcon,
  },
}
</script>

<style scoped>
.slide-enter-from {
  transform: translateX(100%);
}

.slide-enter-active {
  transition: transform 0.3s ease-out;
}

.slide-enter-to {
  transform: translateX(0%);
}

.slide-leave-from {
  transform: translateX(0%);
}

.slide-leave-active {
  transition: transform 0.3s ease-in;
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>