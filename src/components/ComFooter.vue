<template>
  <footer class="bg-gray-900 text-gray-400 py-16 font-sans">
    <div class="container mx-auto px-5 max-w-7xl">
      <div class="flex flex-wrap justify-between gap-y-12">
        <!-- Logo và thông tin -->
        <div class="w-full md:w-1/4 text-left">
          <img src="../assets/VIA/VN2.png" alt="Logo" class="w-44 mb-4 invert" />
          <p class="text-sm mb-2">© 2025 Vietnam Is Awesome. All rights reserved.</p>
          <p class="text-sm mb-4">
            2nd Floor, 56 To Hien, Thanh My Loi Ward, Thu Duc, Ho Chi Minh City, Vietnam
          </p>
          <p class="text-sm">
            Call Us:
            <a href="tel:+84969384906" class="text-pink-600 hover:text-pink-500">+84 96 938 4906</a>
          </p>
        </div>

        <!-- Community -->
        <div class="w-full md:w-1/4 text-left">
          <h4
            class="text-white text-lg font-semibold mb-5 relative pb-2 before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-12 before:bg-pink-600"
          >
            Community
          </h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-white">Our Podcast</a></li>
            <li><a href="#" class="hover:text-white">Join Our Newsletter</a></li>
            <li><a href="#" class="hover:text-white">Become A Leader</a></li>
            <li><a href="#" class="hover:text-white">Join Our Community</a></li>
            <li><a href="#" class="hover:text-white">Our Leaders</a></li>
          </ul>
        </div>

        <!-- About Us -->
        <div class="w-full md:w-1/4 text-left">
          <h4
            class="text-white text-lg font-semibold mb-5 relative pb-2 before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-12 before:bg-pink-600"
          >
            About Us
          </h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-white">Press & Media</a></li>
            <li><a href="#" class="hover:text-white">Partner With Us</a></li>
            <li><a href="#" class="hover:text-white">Contact Us</a></li>
            <li><a href="#" class="hover:text-white">Careers</a></li>
            <li><a href="#" class="hover:text-white">Reviews</a></li>
            <li><a href="#" class="hover:text-white">Terms of Use</a></li>
            <li><a href="#" class="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        <!-- Follow Us -->
        <div class="w-full md:w-1/4 text-left">
          <h4
            class="text-white text-lg font-semibold mb-5 relative pb-2 before:absolute before:left-0 before:bottom-0 before:h-0.5 before:w-12 before:bg-pink-600"
          >
            Follow Us
          </h4>
          <div class="flex space-x-4 text-xl">
            <a href="#" class="hover:text-white">
              <font-awesome-icon :icon="['fab', 'facebook-f']" />
            </a>
            <a href="#" class="hover:text-white">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <a href="#" class="hover:text-white">
              <font-awesome-icon :icon="['fab', 'linkedin-in']" />
            </a>
            <a href="#" class="hover:text-white">
              <font-awesome-icon :icon="['fab', 'youtube']" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
};
</script>

<style scoped>
.invert {
  filter: invert(1);
}
</style>
