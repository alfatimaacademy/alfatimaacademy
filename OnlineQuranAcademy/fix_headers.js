const fs = require('fs');

const NEW_HEADER = `    <!-- ================= HEADER / NAVBAR (FULLY RESPONSIVE) ================= -->
    <header class="bg-neutral-950/90 backdrop-blur-md border-b border-gold-500/10 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                
                <!-- Logo Section -->
                <div class="flex items-center">
                    <a href="index.html" class="flex items-center space-x-3">
                        <div class="w-12 h-12 rounded-full border border-gold-500/30 flex items-center justify-center bg-neutral-900">
                            <span class="text-gold-500 font-bold text-xs">OQA</span>
                        </div>
                        <div>
                            <span class="block font-serif text-gold-400 font-bold text-sm tracking-widest uppercase">Online Quran Academy</span>
                            <span class="block text-gray-500 text-[10px] uppercase tracking-wider">A Project of Al Quran International</span>
                        </div>
                    </a>
                </div>

                <!-- Desktop Navigation Links -->
                <nav class="hidden lg:flex items-center space-x-8">
                    <a href="index.html" class="text-gray-300 hover:text-gold-400 text-sm font-semibold tracking-wide transition-colors">Home</a>
                    <a href="about.html" class="text-gray-300 hover:text-gold-400 text-sm font-semibold tracking-wide transition-colors">About Us</a>
                    <a href="services.html" class="text-gray-300 hover:text-gold-400 text-sm font-semibold tracking-wide transition-colors">Services</a>
                    <a href="quran.html" class="text-gray-300 hover:text-gold-400 text-sm font-semibold tracking-wide transition-colors">Read Quran</a>
                    <a href="contact.html" class="text-gray-300 hover:text-gold-400 text-sm font-semibold tracking-wide transition-colors">Contact</a>
                </nav>

                <!-- WhatsApp & Mobile Burger Button -->
                <div class="flex items-center space-x-4">
                    <a href="https://wa.me/923074277240" target="_blank" class="hidden sm:flex items-center space-x-2 bg-transparent hover:bg-gold-500/10 border border-gold-500/30 hover:border-gold-500 text-gold-400 px-4 py-2 rounded-full text-xs font-bold transition-all">
                        <i class="fa-solid fa-phone"></i>
                        <span>+92 307 4277240</span>
                    </a>

                    <!-- BURGER MENU BUTTON (Visible only on Mobile) -->
                    <button id="mobileMenuBtn" type="button" class="lg:hidden text-gold-400 hover:text-gold-500 p-2 focus:outline-none" aria-label="Toggle Menu">
                        <svg id="hamburgerIcon" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                        <svg id="closeIcon" class="w-8 h-8 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- MOBILE DROPDOWN MENU PANEL -->
        <div id="mobileDropdownMenu" class="hidden lg:hidden bg-neutral-950 border-t border-gold-500/10 w-full absolute left-0 top-20 z-50 shadow-2xl">
            <div class="px-6 py-6 space-y-4 flex flex-col">
                <a href="index.html" class="text-gray-300 hover:text-gold-400 text-lg font-semibold py-1 transition-colors">Home</a>
                <a href="about.html" class="text-gray-300 hover:text-gold-400 text-lg font-semibold py-1 transition-colors">About Us</a>
                <a href="services.html" class="text-gray-300 hover:text-gold-400 text-lg font-semibold py-1 transition-colors">Services</a>
                <a href="quran.html" class="text-gray-300 hover:text-gold-400 text-lg font-semibold py-1 transition-colors">Read Quran</a>
                <a href="contact.html" class="text-gray-300 hover:text-gold-400 text-lg font-semibold py-1 transition-colors">Contact</a>
                <div class="pt-4 border-t border-neutral-900 sm:hidden">
                    <a href="https://wa.me/923074277240" target="_blank" class="flex items-center justify-center space-x-2 bg-gold-500 text-neutral-950 font-bold py-3 rounded-xl text-sm">
                        <i class="fa-solid fa-phone"></i>
                        <span>Contact WhatsApp</span>
                    </a>
                </div>
            </div>
        </div>
    </header>`;

const JS_SCRIPT = `
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const menuBtn = document.getElementById('mobileMenuBtn');
            const dropdownMenu = document.getElementById('mobileDropdownMenu');
            const hamburgerIcon = document.getElementById('hamburgerIcon');
            const closeIcon = document.getElementById('closeIcon');

            if (menuBtn && dropdownMenu) {
                menuBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdownMenu.classList.toggle('hidden');
                    hamburgerIcon.classList.toggle('hidden');
                    closeIcon.classList.toggle('hidden');
                });
                
                document.addEventListener('click', () => {
                    if (!dropdownMenu.classList.contains('hidden')) {
                        dropdownMenu.classList.add('hidden');
                        hamburgerIcon.classList.remove('hidden');
                        closeIcon.classList.add('hidden');
                    }
                });
            }
        });
    </script>
</body>`;

fs.readdirSync('.').forEach(file => {
    if (file.endsWith('.html')) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/<header[\s\S]*?<\/header>/g, NEW_HEADER);
        if (!content.includes('mobileMenuBtn')) {
            content = content.replace('</body>', JS_SCRIPT);
        }
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated mobile responsiveness for: ${file}`);
    }
});
