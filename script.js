document.addEventListener('DOMContentLoaded', function() {
    // === DOM Element References ===
    const header = document.querySelector('header');
    const publicView = document.getElementById('public-view');
    const stakeholderView = document.getElementById('stakeholder-view');
    const footer = document.querySelector('footer');
    const aiModalBackdrop = document.getElementById('ai-modal-backdrop');

    // === State Management ===
    let isStakeholderView = false;
    let taskStates = JSON.parse(localStorage.getItem('akomodaTaskStatesV2')) || {};
    
    // === Data Store ===
    const projectData = {
        latestContent: [
            { source: 'Jimtok.com', title: 'Studi Kasus: Bagaimana AI Menganalisis Tren Pasar Otomotif di Tangsel', category: 'Inovasi & Labs', date: '2 Agustus 2025', link: '#' },
            { source: 'PortalTangerangRaya.com', title: 'Direktori: 10 Agensi Properti Terbaik di BSD City', category: 'Prospek Lokal', date: '1 Agustus 2025', link: '#' },
            { source: 'Jimtok.com', title: 'Review: 5 Gadget Wajib untuk Digital Nomad di 2025', category: 'Digital Lifestyle', date: '30 Juli 2025', link: '#' },
            { source: 'KotoBatuah.com', title: 'Pentingnya Legalitas Usaha untuk Kredibilitas Agensi Anda', category: 'Kepercayaan', date: '28 Juli 2025', link: '#' }
        ],
        assets: [
            { type: 'hub', name: 'AkomodaNetwork.com', role: '"Kolam Ikan" - Pusat Konversi B2B & Komunitas', analysis: 'Sebagai "Kolam Ikan", situs ini harus menjadi tujuan akhir yang meyakinkan bagi semua jenis "ikan" (prospek B2B, afiliasi, anggota komunitas). Perlu diubah dari brosur menjadi portal yang menunjukkan nilai ekosistem dan mengarahkan ke aksi spesifik.', kpis: ['Jumlah Prospek B2B Terjadwal/Bulan', 'Jumlah Pendaftaran Afiliasi/Komunitas', 'Tingkat Konversi Pengunjung (%)'], action: 'Buat "Stakeholder Vision Portal" & Rombak Homepage dengan narasi "Kolam Ikan" dan fokus MASP.' },
            { type: 'spoke', name: 'Jimtok.com', role: 'Mesin Monetisasi Ganda', analysis: 'Aset paling vital. Menarik audiens melalui konten edukasi, memberikan nilai lewat tool AI, dan menghasilkan pendapatan langsung via Afiliasi/Adsense. Ini adalah bukti konsep kemampuan pemasaran Anda.', kpis: ['Prospek B2B dari CTA', 'Pendapatan Afiliasi/Bulan (Rp)', 'Pengguna Aktif Tool AI'], action: 'Tulis 2-3 artikel "review produk" dengan tautan afiliasi untuk membuktikan model bisnis. Integrasikan tool AI Command secara strategis.' },
            { type: 'spoke', name: 'PortalTangerangRaya.com', role: 'Mesin Prospek & Afiliasi Lokal', analysis: 'Menangkap pasar hyper-local (UKM & Perorangan Tangsel). Menjadi jembatan dari berita lokal ke solusi bisnis MASP dan monetisasi melalui afiliasi produk/layanan lokal.', kpis: ['Jumlah Prospek Lokal untuk MASP', 'Pendapatan Afiliasi Lokal'], action: 'Buat 1 artikel "Direktori Bisnis" yang menargetkan salah satu pilar MASP (misal: Properti) untuk menunjukkan jangkauan lokal.' },
            { type: 'spoke', name: 'KotoBatuah.com', role: 'Pilar Kepercayaan & Legalitas', analysis: 'Sebagai badan usaha resmi (Usaha Perorangan via OSS), situs ini adalah fondasi hukum ekosistem. Aset penting untuk ditunjukkan pada tahap akhir negosiasi dengan investor/mitra serius.', kpis: ['Kunjungan ke Halaman "Legalitas"'], action: 'Buat halaman "Tentang Kami & Legalitas" yang jelas, mencantumkan status badan usaha. Setelah itu, biarkan dalam mode perawatan.' },
            { type: 'spoke', name: 'AI-Holistic.xyz & JimKoto.my.id', role: 'Visi Jangka Panjang & Persona Founder', analysis: 'Untuk efisiensi dalam 75 hari, kedua aset ini diparkir. `AI-Holistic` adalah visi jangka panjang, dan `JimKoto.my.id` sudah cukup dengan profil yang ada. Fokuskan semua energi pada aset yang menghasilkan prospek dan pendapatan.', kpis: ['-'], action: 'Tidak ada aksi pembuatan konten baru. Cukup pastikan kedua situs online, terlihat profesional, dan `JimKoto.my.id` memiliki tautan ke Akomoda Network.' }
        ],
        plan: {
            phase1: { title: "FASE 1: FONDASI & PROTEKSI", target: "Target: Minggu ke-1", goal: "Mengamankan semua aset digital kritis sebelum membangun lebih jauh.", steps: [ { id: "1.1", title: "Amankan Pusat Identitas", status: "Sangat Mendesak", responsible: "Founder", tasks: [ { id: "1.1.1", text: "Buat kata sandi baru yang kuat via password manager." }, { id: "1.1.2", text: "WAJIB Aktifkan Autentikasi Dua Faktor (2FA)." }, { id: "1.1.3", text: "Tunjuk & amankan email pemulihan." } ] }, { id: "1.2", title: "Buat 'Master Document' Aset Digital", status: "Penting", responsible: "Founder / Tim Teknis", tasks: [ { id: "1.2.1", text: "Buat Google Sheet [RAHASIA] Master Aset Digital." }, { id: "1.2.2", text: "Isi semua data aset (Domain, Sosmed, dll)." }, { id: "1.2.3", text: "Batasi akses hanya untuk tim inti." } ] }, { id: "1.3", title: "Konfigurasi Awal GitHub & Cloudflare", status: "Penting", responsible: "Tim Teknis", tasks: [ { id: "1.3.1", text: "Buat Private Repository 'akomoda-internal-strategy'." }, { id: "1.3.2", text: "Pastikan semua domain utama dikelola di satu akun Cloudflare." } ] } ] },
            phase2: { title: "FASE 2: BANGUN RUANG PAMER", target: "Target: Minggu ke-1 s/d Minggu ke-4", goal: "Menciptakan portal presentasi yang profesional dan aman untuk stakeholder.", steps: [ { id: "2.1", title: "Buat Konten untuk 'Vision Portal'", status: "Kritis", responsible: "Founder & Tim Konten", tasks: [ { id: "2.1.1", text: "Tulis semua teks untuk halaman Vision Portal." }, { id: "2.1.2", text: "Buat diagram visual HUB & SPOKE." }, { id: "2.1.3", text: "Siapkan 'Vision Deck' dalam format PDF." } ] }, { id: "2.2", title: "Bangun Halaman 'Vision Portal'", status: "Penting", responsible: "Tim Teknis", tasks: [ { id: "2.2.1", text: "Buat halaman baru di akomodanetwork.com/vision." }, { id: "2.2.2", text: "Desain halaman sesuai dengan konten yang disiapkan." }, { id: "2.2.3", text: "Atur halaman sebagai 'noindex' dan sembunyikan dari navigasi." } ] }, { id: "2.3", title: "Implementasi Sistem Login", status: "Kritis", responsible: "Tim Teknis", tasks: [ { id: "2.3.1", text: "Gunakan Cloudflare Access untuk melindungi /vision." }, { id: "2.3.2", text: "Buat policy (aturan) akses berbasis email stakeholder." } ] } ] },
            phase3: { title: "FASE 3: OPTIMASI ASET KUNCI", target: "Target: Minggu ke-3 s/d Minggu ke-10", goal: "Memoles aset-aset yang akan menjadi 'bukti nyata' kemampuan Anda.", steps: [ { id: "3.1", title: "Optimasi Jimtok.com (Mesin Monetisasi)", status: "Berkelanjutan", responsible: "Tim Konten & Teknis", tasks: [ { id: "3.1.1", text: "Publikasikan 2-3 artikel review produk dengan link afiliasi." }, { id: "3.1.2", text: "Publikasikan 1 artikel studi kasus yang menargetkan industri MASP." }, { id: "3.1.3", text: "Perbaiki UI/UX ai.jimtok.com & tambahkan CTA ke Akomoda." } ] }, { id: "3.2", title: "Optimasi PortalTangerangRaya.com", status: "Penting", responsible: "Tim Konten Lokal", tasks: [ { id: "3.2.1", text: "Buat kategori 'Bisnis Lokal' atau 'UKM Tangsel'." }, { id: "3.2.2", text: "Publikasikan 1-2 artikel direktori/analisis pasar yang relevan." } ] }, { id: "3.3", title: "Optimasi Aset Kepercayaan", status: "Penting", responsible: "Tim Teknis", tasks: [ { id: "3.3.1", text: "Rombak homepage AkomodaNetwork.com menjadi landing page." }, { id: "3.3.2", text: "Buat halaman statis 'Legalitas' yang profesional di KotoBatuah.com." } ] } ] },
            phase4: { title: "FASE 4: EKSEKUSI & PENDEKATAN", target: "Target: Minggu ke-11", goal: "Memulai pendekatan kepada stakeholder dengan semua amunisi yang telah disiapkan.", steps: [ { id: "4.1", title: "Finalisasi & Uji Coba", status: "Kritis", responsible: "Semua Tim", tasks: [ { id: "4.1.1", text: "Lakukan pengecekan menyeluruh pada Vision Portal (/vision)." }, { id: "4.1.2", text: "Uji coba sistem login Cloudflare Access dengan email tes." } ] }, { id: "4.2", title: "Mulai Pendekatan (Outreach)", status: "Kritis", responsible: "Founder", tasks: [ { id: "4.2.1", text: "Buat daftar target stakeholder (investor, mitra)." }, { id: "4.2.2", text: "Mulai kirim email perkenalan profesional dengan link aman." } ] } ] }
        }
    };

    // === Render Functions ===
    function renderHeader() {
        header.innerHTML = `
            <div class="flex flex-col sm:flex-row justify-between items-center">
                <a href="#" onclick="location.reload()" class="flex items-center gap-4">
                    <div class="inline-block bg-blue-600 text-white text-xl font-bold px-4 py-2 rounded-lg shadow-lg shadow-blue-500/50">AN</div>
                    <div>
                        <h1 class="text-2xl lg:text-3xl font-extrabold text-white tracking-tight text-left">Akomoda Network</h1>
                        <p class="text-md text-gray-400 text-left">Ekosistem Bisnis Digital</p>
                    </div>
                </a>
                <nav class="hidden lg:flex items-center gap-6 text-gray-400 font-semibold">
                    <a href="#ecosystem-updates" class="hover:text-white">Kabar Terbaru</a>
                    <a href="#masp-focus" class="hover:text-white">Fokus MASP</a>
                    <a href="#contact" class="hover:text-white">Kontak</a>
                </nav>
                <button id="toggle-view-btn" class="mt-4 sm:mt-0 bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-500 shadow-md shadow-blue-500/50 transition-all">
                    Masuk Portal Visi
                </button>
            </div>
        `;
        document.getElementById('toggle-view-btn').addEventListener('click', toggleMainView);
    }

    function renderFooter() {
        footer.innerHTML = `
             <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
                <div class="col-span-1 md:col-span-2">
                    <h4 class="text-xl font-bold text-white mb-4">Akomoda Network</h4>
                    <p class="text-gray-400 max-w-md">Sebuah ekosistem bisnis digital yang dirancang untuk mengoptimalkan potensi UKM dan perorangan melalui sinergi teknologi, strategi, dan komunitas.</p>
                </div>
                <div>
                    <h4 class="text-xl font-bold text-white mb-4">Ekosistem Kami</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="https://jimtok.com" target="_blank" class="hover:text-blue-400">Jimtok.com (Inovasi)</a></li>
                        <li><a href="https://kotobatuah.com" target="_blank" class="hover:text-blue-400">KotoBatuah.com (Legalitas)</a></li>
                        <li><a href="https://ai-holistic.xyz" target="_blank" class="hover:text-blue-400">AI-Holistic.xyz (Riset)</a></li>
                        <li><a href="https://portaltangerangraya.com" target="_blank" class="hover:text-blue-400">PortalTangerangRaya.com (Prospek)</a></li>
                        <li><a href="https://jimkoto.my.id" target="_blank" class="hover:text-blue-400">JimKoto.my.id (Founder)</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-xl font-bold text-white mb-4">Terhubung</h4>
                     <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-blue-400">Kontak Kami</a></li>
                        <li><a href="#" class="hover:text-blue-400">Tentang Kami</a></li>
                    </ul>
                    <div class="flex gap-4 mt-4">
                        <a href="#" class="text-gray-400 hover:text-white text-2xl">𝕏</a>
                        <a href="#" class="text-gray-400 hover:text-white text-2xl">Ⓛ</a>
                    </div>
                </div>
             </div>
             <div class="mt-8 pt-8 border-t border-gray-800">
                 <p class="text-white font-bold">Jim Koto a.k.a James Isa</p>
                 <p class="text-sm text-gray-400">Founder & CEO, Akomoda Network</p>
                 <div class="marquee mt-4 text-gray-500 text-sm">
                    <span>OUR BUSINESS WORLD WIDE | BEYOND EXPECTATIONS | DIGITAL LIFESTYLE ENTHUSIASM | MULTI AGENCY STRATEGIC PLAN |</span>
                 </div>
             </div>
        `;
    }

    function renderAiModal() {
        aiModalBackdrop.innerHTML = `
            <div id="ai-modal" class="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div class="flex justify-between items-center p-6 border-b border-gray-700">
                    <h3 class="text-2xl font-bold flex items-center gap-2 text-white">
                        <span class="text-2xl">✨</span> Asisten Strategis AI
                    </h3>
                    <button id="close-ai-modal" class="text-gray-400 hover:text-white text-3xl">&times;</button>
                </div>
                <div class="p-6 overflow-y-auto flex-grow">
                    <div id="ai-response-area" class="prose prose-invert max-w-none bg-gray-800 p-4 rounded-lg min-h-[150px] text-gray-300">
                        <p>Pilih salah satu contoh di bawah atau ajukan pertanyaan Anda sendiri untuk memulai brainstorming strategis.</p>
                    </div>
                     <div id="ai-loading-indicator" class="hidden justify-center items-center py-10">
                        <div class="spinner"></div>
                    </div>
                    <div class="mt-4">
                        <h4 class="font-semibold mb-2 text-gray-300">Contoh Perintah:</h4>
                        <div class="flex flex-wrap gap-2">
                            <button class="ai-prompt-btn bg-blue-900/50 text-blue-300 text-sm font-semibold px-3 py-1 rounded-full hover:bg-blue-900">Buat 5 slogan untuk konsep "Kolam Ikan"</button>
                            <button class="ai-prompt-btn bg-blue-900/50 text-blue-300 text-sm font-semibold px-3 py-1 rounded-full hover:bg-blue-900">Identifikasi 3 risiko untuk strategi Jimtok.com</button>
                            <button class="ai-prompt-btn bg-blue-900/50 text-blue-300 text-sm font-semibold px-3 py-1 rounded-full hover:bg-blue-900">Buat outline artikel untuk PortalTangerangRaya.com tentang MASP</button>
                        </div>
                    </div>
                </div>
                <div class="p-6 border-t border-gray-700 bg-black rounded-b-2xl">
                    <div class="flex gap-4">
                        <input type="text" id="ai-custom-prompt" class="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Ketik pertanyaan strategis Anda di sini...">
                        <button id="ai-generate-btn" class="bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-500 disabled:bg-gray-500">Kirim</button>
                    </div>
                </div>
            </div>
        `;
        attachAiModalListeners();
    }

    function renderInitialPublicView() {
        publicView.innerHTML = `
            <section class="mb-16 relative overflow-hidden rounded-2xl glass-card">
                <div id="slider-container" class="flex">
                    <div class="slider-slide flex-shrink-0 w-full flex items-center justify-center p-8 lg:p-16 h-80 lg:h-96 text-center">
                        <div>
                            <h2 class="text-4xl lg:text-5xl font-extrabold text-white leading-tight">Selamat Datang di Akomoda Network</h2>
                            <p class="mt-4 max-w-3xl mx-auto text-xl text-gray-300">Kami memahami Setiap Potensi dan Mampu mengoptimasikannya. Segera Ambil Tindakan, dan kita Segera Sukses Bersama.</p>
                        </div>
                    </div>
                    <div class="slider-slide flex-shrink-0 w-full flex items-center justify-center p-8 lg:p-16 h-80 lg:h-96 text-center">
                         <div>
                            <h2 class="text-4xl lg:text-5xl font-extrabold text-white leading-tight">Ekosistem "Kolam Ikan"</h2>
                            <p class="mt-4 max-w-3xl mx-auto text-xl text-gray-300">Sebuah lingkungan di mana berbagai jenis bisnis dapat tumbuh dan bersinergi, didukung oleh teknologi dan strategi yang tepat.</p>
                        </div>
                    </div>
                    <div class="slider-slide flex-shrink-0 w-full flex items-center justify-center p-8 lg:p-16 h-80 lg:h-96 text-center">
                         <div>
                            <h2 class="text-4xl lg:text-5xl font-extrabold text-white leading-tight">Beyond Expectations</h2>
                            <p class="mt-4 max-w-3xl mx-auto text-xl text-gray-300">Kami tidak hanya memenuhi, tetapi melampaui ekspektasi melalui inovasi berkelanjutan dan eksekusi yang presisi.</p>
                        </div>
                    </div>
                </div>
                <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" id="slider-dots"></div>
            </section>
            
            <div id="public-content" class="space-y-16">
                 <section id="ecosystem-updates">
                    <h3 class="text-3xl font-bold text-white mb-6 text-center">Kabar Terbaru dari Ekosistem</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${projectData.latestContent.map(item => `
                            <a href="${item.link}" target="_blank" class="block glass-card rounded-xl p-6 content-card">
                                <p class="text-sm font-semibold text-blue-400">${item.category}</p>
                                <h4 class="mt-2 text-xl font-bold text-white">${item.title}</h4>
                                <div class="mt-4 flex justify-between items-center text-xs text-gray-500">
                                    <span>Dari: <strong>${item.source}</strong></span>
                                    <span>${item.date}</span>
                                </div>
                            </a>
                        `).join('')}
                    </div>
                </section>

                <section id="masp-focus" class="glass-card p-8 rounded-2xl">
                    <h3 class="text-3xl font-bold text-white mb-2 text-center">Multi Agency Strategic Plan</h3>
                    <p class="text-center text-gray-400 mb-8">Memberdayakan pilar ekonomi lokal di Tangerang Selatan dan sekitarnya.</p>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div class="bg-gray-900/50 p-4 rounded-lg"><p class="text-4xl mb-2">📢</p><p class="font-semibold text-white">Periklanan</p></div>
                        <div class="bg-gray-900/50 p-4 rounded-lg"><p class="text-4xl mb-2">✈️</p><p class="font-semibold text-white">Tour & Travel</p></div>
                        <div class="bg-gray-900/50 p-4 rounded-lg"><p class="text-4xl mb-2">🚗</p><p class="font-semibold text-white">Otomotif</p></div>
                        <div class="bg-gray-900/50 p-4 rounded-lg"><p class="text-4xl mb-2">🏠</p><p class="font-semibold text-white">Properti</p></div>
                    </div>
                </section>
            </div>
        `;
        initializeSlider();
    }

    function initializeSlider() {
        const sliderContainer = document.getElementById('slider-container');
        if (!sliderContainer) return;
        const slides = sliderContainer.querySelectorAll('.slider-slide');
        const dotsContainer = document.getElementById('slider-dots');
        let currentSlide = 0;
        let slideInterval;

        if (!slides.length || !dotsContainer) return;
        dotsContainer.innerHTML = '';

        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('w-3', 'h-3', 'rounded-full', 'transition-all');
            dot.classList.add(i === 0 ? 'bg-white' : 'bg-gray-500');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('button');

        function goToSlide(slideIndex) {
            if (!sliderContainer) return;
            sliderContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('bg-white', i === slideIndex);
                dot.classList.toggle('bg-gray-500', i !== slideIndex);
            });
            currentSlide = slideIndex;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        }
        
        function startInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        startInterval();
    }

    function renderStakeholderDashboard() {
        stakeholderView.innerHTML = `
            <nav class="glass-card p-2 rounded-xl shadow-lg mb-8 flex flex-col sm:flex-row justify-center items-center gap-2">
                <button data-view="summary" class="view-btn main-nav-btn w-full sm:w-auto px-6 py-3 font-semibold rounded-lg main-nav-active">Ringkasan Eksekutif</button>
                <button data-view="assets" class="view-btn main-nav-btn w-full sm:w-auto px-6 py-3 font-semibold rounded-lg">Analisis Aset</button>
                <button data-view="plan" class="view-btn main-nav-btn w-full sm:w-auto px-6 py-3 font-semibold rounded-lg">Rencana Aksi 75 Hari</button>
            </nav>
            <main id="stakeholder-main-content"></main>
        `;
        
        const stakeholderNavButtons = stakeholderView.querySelectorAll('.view-btn');
        stakeholderNavButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                stakeholderNavButtons.forEach(b => b.classList.remove('main-nav-active'));
                e.currentTarget.classList.add('main-nav-active');
                renderStakeholderSubView(e.currentTarget.dataset.view);
            });
        });
        renderStakeholderSubView('summary');
    }

    function renderStakeholderSubView(view) {
        const contentArea = document.getElementById('stakeholder-main-content');
        if (!contentArea) return;
        if (view === 'summary') {
            renderSummaryView(contentArea);
        } else if (view === 'assets') {
            renderAssetsView(contentArea);
        } else if (view === 'plan') {
            renderPlanView(contentArea);
        }
    }

    function toggleMainView() {
        isStakeholderView = !isStakeholderView;
        const toggleBtn = document.getElementById('toggle-view-btn');
        if (isStakeholderView) {
            publicView.classList.add('hidden');
            stakeholderView.classList.remove('hidden');
            toggleBtn.textContent = 'Kembali ke Homepage';
            renderStakeholderDashboard();
        } else {
            publicView.classList.remove('hidden');
            stakeholderView.classList.add('hidden');
            toggleBtn.textContent = 'Masuk Portal Visi';
        }
    }

    function saveTaskStates() {
        localStorage.setItem('akomodaTaskStatesV2', JSON.stringify(taskStates));
    }

    function renderSummaryView(container) {
        const totalTasks = Object.values(projectData.plan).flatMap(p => p.steps).flatMap(s => s.tasks).length;
        const completedTasks = Object.values(taskStates).filter(Boolean).length;
        const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        container.innerHTML = `
            <div class="glass-card p-6 rounded-2xl shadow-lg">
                <h2 class="view-title">Ringkasan Eksekutif</h2>
                <p class="text-gray-400 mb-8 -mt-4 max-w-3xl">Tampilan ini menyajikan visi tingkat tinggi dari Ekosistem Akomoda Network, arsitektur strategisnya, dan ringkasan kemajuan dari Rencana Aksi 75 Hari.</p>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h3 class="text-2xl font-bold text-white">Visi Ekosistem "Kolam Ikan"</h3>
                        <p class="mt-4 text-gray-300 italic text-lg border-l-4 border-blue-500 pl-4">"Ga perlu ajarkan ikan Berenang, .. Kami memahami potensi setiap jenis dan mengoptimasikannya. Silakan berkumpul di Kolam Kami 'Akomoda Network' kita Bisa Sukses Bersama."</p>
                        <p class="mt-4 text-gray-300">Akomoda Network dirancang sebagai ekosistem digital terintegrasi untuk memberdayakan UKM dan Perorangan di Tangerang Selatan, dengan fokus awal pada **MASP (Multi-Agency Strategic Plan)**: Periklanan, Tour & Travel, Otomotif, dan Properti.</p>
                        <div class="mt-6">
                            <h4 class="font-bold text-lg mb-2 text-white">Kemajuan Rencana 75 Hari</h4>
                            <div class="w-full progress-bar-bg rounded-full h-4">
                                <div class="progress-bar-fill h-4 rounded-full" style="width: ${progress.toFixed(0)}%;"></div>
                            </div>
                            <p class="text-center mt-2 font-semibold text-blue-400">${progress.toFixed(0)}% Selesai</p>
                        </div>
                    </div>
                    <div id="hub-spoke-diagram" class="relative w-full h-96 lg:h-full min-h-[400px]"></div>
                </div>
            </div>
        `;
        drawHubSpokeDiagram();
    }

    function drawHubSpokeDiagram() {
        const container = document.getElementById('hub-spoke-diagram');
        if (!container) return;
        const assets = projectData.assets;
        const hub = assets.find(a => a.type === 'hub');
        const spokes = assets.filter(a => a.type === 'spoke');

        let html = `<div id="hub-center" class="hub absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full flex items-center justify-center text-center p-2 z-10 bg-gray-800 shadow-lg"><div class="font-bold text-blue-400">${hub.name}</div></div>`;

        spokes.forEach((spoke, index) => {
            const angle = (index / spokes.length) * 2 * Math.PI;
            const x = 50 + 40 * Math.cos(angle);
            const y = 50 + 40 * Math.sin(angle);
            html += `<div id="spoke-${index}" class="spoke absolute w-32 h-32 rounded-full flex items-center justify-center text-center p-2 z-10 bg-gray-800 shadow-md" style="left: ${x}%; top: ${y}%; transform: translate(-50%, -50%);"><div class="text-sm font-semibold text-gray-300">${spoke.name}</div></div>`;
        });
        
        container.innerHTML = html;
        
        setTimeout(() => {
             spokes.forEach((_, index) => {
                const spokeEl = document.getElementById(`spoke-${index}`);
                const hubEl = document.getElementById(`hub-center`);
                if (!spokeEl || !hubEl) return;
                
                const hubRect = hubEl.getBoundingClientRect();
                const spokeRect = spokeEl.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                const hubX = hubRect.left + hubRect.width / 2 - containerRect.left;
                const hubY = hubRect.top + hubRect.height / 2 - containerRect.top;
                const spokeX = spokeRect.left + spokeRect.width / 2 - containerRect.left;
                const spokeY = spokeRect.top + spokeRect.height / 2 - containerRect.top;

                const angle = Math.atan2(spokeY - hubY, spokeX - hubX) * 180 / Math.PI;
                const distance = Math.sqrt(Math.pow(spokeX - hubX, 2) + Math.pow(spokeY - hubY, 2));

                const line = document.createElement('div');
                line.className = 'spoke-line';
                line.style.width = `${distance}px`;
                line.style.top = `${hubY}px`;
                line.style.left = `${hubX}px`;
                line.style.transform = `rotate(${angle}deg)`;
                container.prepend(line);
            });
        }, 100);
    }

    function renderAssetsView(container) {
        container.innerHTML = `
            <div class="glass-card p-6 rounded-2xl shadow-lg">
                <h2 class="view-title">Analisis Aset Digital</h2>
                <p class="text-gray-400 mb-8 -mt-4 max-w-3xl">Setiap aset dalam ekosistem memiliki peran, metrik, dan rencana aksi yang spesifik.</p>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${projectData.assets.map(asset => `
                        <div class="bg-gray-800/50 border border-gray-700 rounded-xl p-6 asset-card">
                            <div class="mb-4">
                                <p class="text-xs font-bold uppercase tracking-wider ${asset.type === 'hub' ? 'text-blue-400' : 'text-gray-400'}">${asset.type}</p>
                                <h3 class="text-2xl font-bold text-white mt-1">${asset.name}</h3>
                                <p class="font-semibold ${asset.type === 'hub' ? 'text-blue-400' : 'text-gray-300'}">${asset.role}</p>
                            </div>
                            <div class="asset-card-content">
                                <p class="text-gray-400 mb-4 text-sm">${asset.analysis}</p>
                                <div>
                                    <h4 class="font-semibold text-gray-200 mb-2 text-sm">Metrik Kunci (KPIs):</h4>
                                    <div class="flex flex-wrap gap-2">
                                        ${asset.kpis.map(kpi => `<span class="bg-indigo-900/50 text-indigo-300 text-xs font-semibold px-2.5 py-0.5 rounded-full">${kpi}</span>`).join('')}
                                    </div>
                                </div>
                            </div>
                            <div class="mt-6 pt-4 border-t border-gray-700">
                                 <h4 class="font-semibold text-gray-200 mb-2 text-sm">Aksi Prioritas (75 Hari):</h4>
                                 <p class="text-sm bg-yellow-900/30 border-l-4 border-yellow-500 p-3 rounded-r-lg text-yellow-200">${asset.action}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function renderPlanView(container) {
        const totalTasks = Object.values(projectData.plan).flatMap(p => p.steps).flatMap(s => s.tasks).length;
        const completedTasks = Object.values(taskStates).filter(Boolean).length;
        const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        container.innerHTML = `
            <div class="glass-card p-6 rounded-2xl shadow-lg">
                <h2 class="view-title">Rencana Aksi 75 Hari</h2>
                <p class="text-gray-400 mb-8 -mt-4 max-w-3xl">Ini adalah panduan eksekusi langkah demi langkah. Centang tugas yang telah selesai untuk melacak kemajuan.</p>
                <div class="mb-6">
                    <h3 class="text-xl font-bold mb-2 text-white">Ringkasan Kemajuan Rencana Aksi</h3>
                    <div class="w-full progress-bar-bg rounded-full h-4">
                        <div id="plan-progress-bar" class="progress-bar-fill h-4 rounded-full" style="width: ${progress.toFixed(0)}%;"></div>
                    </div>
                    <p id="plan-progress-text" class="text-center mt-2 font-semibold text-blue-400">${progress.toFixed(0)}% Selesai</p>
                </div>
                <div class="space-y-12">
                    ${Object.values(projectData.plan).map(phase => renderPhase(phase)).join('')}
                </div>
            </div>
        `;
        attachPlanEventListeners();
    }

    function renderPhase(phaseData) {
        let totalTasks = 0;
        let completedTasks = 0;
        phaseData.steps.forEach(step => {
            totalTasks += step.tasks.length;
            step.tasks.forEach(task => {
                if (taskStates[task.id]) completedTasks++;
            });
        });
        const phaseProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        return `
            <div data-phase-title="${phaseData.title}">
                <div class="mb-4 p-4 bg-gray-800/50 border-l-4 border-gray-600 rounded-r-lg">
                    <h3 class="text-2xl font-bold text-white">${phaseData.title}</h3>
                    <p class="text-sm font-semibold text-gray-400">${phaseData.target}</p>
                    <p class="mt-2 text-gray-300">${phaseData.goal}</p>
                </div>
                <div class="w-full progress-bar-bg rounded-full h-2.5 mb-6">
                    <div class="progress-bar-fill h-2.5 rounded-full" style="width: ${phaseProgress.toFixed(0)}%;"></div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    ${phaseData.steps.map(step => renderStep(step)).join('')}
                </div>
            </div>
        `;
    }

    function renderStep(step) {
        return `
            <div class="task-card bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                <div class="mb-3">
                    <p class="text-xs font-bold uppercase tracking-wider text-blue-400">${step.id} - ${step.status}</p>
                    <h4 class="text-lg font-bold text-white mt-1">${step.title}</h4>
                    <p class="text-xs text-gray-400 mt-1">Penanggung Jawab: ${step.responsible}</p>
                </div>
                <div class="space-y-2">
                    ${step.tasks.map(task => renderTask(task)).join('')}
                </div>
            </div>
        `;
    }

    function renderTask(task) {
        const isChecked = taskStates[task.id] ? 'checked' : '';
        return `
            <div class="flex items-start">
                <input id="task-${task.id}" data-task-id="${task.id}" type="checkbox" class="task-checkbox mt-1 h-4 w-4 bg-gray-700 border-gray-600 text-blue-600 rounded focus:ring-blue-500" ${isChecked}>
                <label for="task-${task.id}" class="ml-3 text-sm text-gray-300 cursor-pointer">
                    <span>${task.text}</span>
                </label>
            </div>
        `;
    }
    
    function handleTaskToggle(e) {
        const taskId = e.target.dataset.taskId;
        if (taskId) {
            taskStates[taskId] = e.target.checked;
            saveTaskStates();
            const activeStakeholderView = document.querySelector('#stakeholder-view .main-nav-active')?.dataset.view;
            if (activeStakeholderView === 'plan') {
               renderPlanView(document.getElementById('stakeholder-main-content'));
            } else if (activeStakeholderView === 'summary') {
               renderSummaryView(document.getElementById('stakeholder-main-content'));
            }
        }
    }

    function attachPlanEventListeners() {
        const checkboxes = document.querySelectorAll('.task-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', handleTaskToggle);
        });
    }
    
    // AI Assistant Logic
    function attachAiModalListeners() {
        const openAiModalBtn = document.getElementById('open-ai-modal');
        const closeAiModalBtn = document.getElementById('close-ai-modal');
        const aiModalBackdrop = document.getElementById('ai-modal-backdrop');
        const aiPromptBtns = aiModalBackdrop.querySelectorAll('.ai-prompt-btn');
        const aiCustomPromptInput = document.getElementById('ai-custom-prompt');
        const aiGenerateBtn = document.getElementById('ai-generate-btn');
        
        openAiModalBtn.addEventListener('click', () => aiModalBackdrop.classList.remove('hidden'));
        closeAiModalBtn.addEventListener('click', () => aiModalBackdrop.classList.add('hidden'));
        aiModalBackdrop.addEventListener('click', (e) => {
            if (e.target === aiModalBackdrop) {
                aiModalBackdrop.classList.add('hidden');
            }
        });

        aiPromptBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                aiCustomPromptInput.value = btn.textContent;
            });
        });

        aiGenerateBtn.addEventListener('click', handleAiGeneration);
        aiCustomPromptInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                handleAiGeneration();
            }
        });
    }

    async function handleAiGeneration() {
        const aiCustomPromptInput = document.getElementById('ai-custom-prompt');
        const aiGenerateBtn = document.getElementById('ai-generate-btn');
        const aiResponseArea = document.getElementById('ai-response-area');
        const aiLoadingIndicator = document.querySelector('#ai-modal .ai-loading-indicator');

        const userPrompt = aiCustomPromptInput.value.trim();
        if (!userPrompt) return;

        aiGenerateBtn.disabled = true;
        aiResponseArea.classList.add('hidden');
        aiLoadingIndicator.classList.remove('hidden');
        aiLoadingIndicator.classList.add('flex');

        const context = `Konteks: Akomoda Network adalah ekosistem digital yang bertujuan memberdayakan UKM di Tangerang Selatan, Indonesia. Visinya adalah "Kolam Ikan", di mana berbagai bisnis (ikan) dapat berkembang bersama. Fokus awalnya adalah MASP (Multi-Agency Strategic Plan) untuk industri Periklanan, Tour & Travel, Otomotif, dan Properti. Aset digital utamanya adalah Jimtok.com (edukasi teknologi dan tool AI), PortalTangerangRaya.com (portal berita lokal), dan KotoBatuah.com (legalitas).`;
        const fullPrompt = `${context}\n\nBerdasarkan konteks tersebut, jawablah pertanyaan berikut: "${userPrompt}"`;

        try {
            const generatedText = await callGeminiApi(fullPrompt);
            aiResponseArea.innerHTML = generatedText.replace(/\n/g, '<br>');
        } catch (error) {
            aiResponseArea.innerHTML = `<p class="text-red-500">Maaf, terjadi kesalahan saat menghubungi Asisten AI. Silakan coba lagi nanti.</p>`;
        } finally {
            aiGenerateBtn.disabled = false;
            aiResponseArea.classList.remove('hidden');
            aiLoadingIndicator.classList.add('hidden');
            aiLoadingIndicator.classList.remove('flex');
            aiCustomPromptInput.value = '';
        }
    }

    async function callGeminiApi(prompt, retries = 3, delay = 1000) {
        const apiKey = ""; // API key is handled by the environment
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        
        const payload = { contents: [{ parts: [{ text: prompt }] }] };

        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                
                const result = await response.json();
                if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
                    return result.candidates[0].content.parts[0].text;
                } else {
                    throw new Error("Invalid API response structure");
                }
            } catch (error) {
                if (i === retries - 1) throw error;
                await new Promise(res => setTimeout(res, delay * Math.pow(2, i)));
            }
        }
    }
    
    // Particle background effect
    function initParticles() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let particlesArray;

        class Particle {
            constructor(x, y, directionX, directionY, size) {
                this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY;
                this.size = size;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) { this.directionX = -this.directionX; }
                if (this.y > canvas.height || this.y < 0) { this.directionY = -this.directionY; }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function createParticles() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * .4) - .2;
                let directionY = (Math.random() * .4) - .2;
                particlesArray.push(new Particle(x, y, directionX, directionY, size));
            }
        }

        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
        }

        window.addEventListener('resize', function() {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            createParticles();
        });

        createParticles();
        animateParticles();
    }

    // Initial Load
    renderInitialPublicView();
    renderAiModal();
    initParticles();
});
</script>
</body>
</html>
