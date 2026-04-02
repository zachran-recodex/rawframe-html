// === DATA ===
const transactions = [
    { id: 'TRX-0891', device: 'Booth Alpha', package: 'Premium 4R', amount: 45000, status: 'success', time: '14:32' },
    { id: 'TRX-0890', device: 'Booth Beta', package: 'Standard 2R', amount: 25000, status: 'success', time: '14:28' },
    { id: 'TRX-0889', device: 'Booth Gamma', package: 'Digital Only', amount: 15000, status: 'pending', time: '14:15' },
    { id: 'TRX-0888', device: 'Booth Delta', package: 'Premium 4R', amount: 45000, status: 'success', time: '14:02' },
    { id: 'TRX-0887', device: 'Booth Alpha', package: 'Paket Couple', amount: 65000, status: 'success', time: '13:48' },
    { id: 'TRX-0886', device: 'Booth Epsilon', package: 'Standard 2R', amount: 25000, status: 'failed', time: '13:35' },
    { id: 'TRX-0885', device: 'Booth Zeta', package: 'Digital Only', amount: 15000, status: 'success', time: '13:21' },
    { id: 'TRX-0884', device: 'Booth Beta', package: 'Premium 4R', amount: 45000, status: 'success', time: '13:10' },
];

const devices = [
    { name: 'Booth Alpha', location: 'Mall Central Park', status: 'online', sessions: 42 },
    { name: 'Booth Beta', location: 'Grand Indonesia', status: 'online', sessions: 38 },
    { name: 'Booth Gamma', location: 'Plaza Senayan', status: 'idle', sessions: 15 },
    { name: 'Booth Delta', location: 'Kota Kasablanka', status: 'online', sessions: 31 },
    { name: 'Booth Epsilon', location: 'Pondok Indah Mall', status: 'offline', sessions: 0 },
    { name: 'Booth Zeta', location: 'Lotte Shopping Ave', status: 'online', sessions: 29 },
];

const activities = [
    { icon: 'fa-plug-circle-check', color: '#22C55E', bg: 'rgba(34,197,94,0.1)', text: 'Booth Alpha terhubung kembali', time: '5 menit lalu' },
    { icon: 'fa-crown', color: '#A855F7', bg: 'rgba(168,85,247,0.1)', text: 'Langganan baru dari Rina Sari', time: '12 menit lalu' },
    { icon: 'fa-ticket', color: '#FF6B2B', bg: 'rgba(255,107,43,0.1)', text: 'Voucher DISKON20 digunakan 3x', time: '25 menit lalu' },
    { icon: 'fa-triangle-exclamation', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', text: 'Kertas Booth Epsilon hampir habis', time: '34 menit lalu' },
    { icon: 'fa-receipt', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', text: 'Pembayaran Rp 450.000 berhasil', time: '1 jam lalu' },
];

// === RENDER FUNCTIONS ===
function renderTransactions() {
    const tbody = document.getElementById('transactionBody');
    tbody.innerHTML = transactions.map(t => `
        <tr>
            <td><span class="font-mono text-xs font-semibold" style="color: var(--text-primary);">${t.id}</span></td>
            <td style="color: var(--text-primary);">${t.device}</td>
            <td>${t.package}</td>
            <td class="font-semibold" style="color: var(--text-primary);">Rp ${t.amount.toLocaleString('id-ID')}</td>
            <td>
                <span class="badge badge-${t.status === 'success' ? 'success' : t.status === 'pending' ? 'warning' : 'danger'}">
                    <span class="status-dot ${t.status === 'success' ? 'online' : t.status === 'pending' ? 'idle' : 'offline'}"></span>
                    ${t.status === 'success' ? 'Berhasil' : t.status === 'pending' ? 'Pending' : 'Gagal'}
                </span>
            </td>
            <td>${t.time}</td>
        </tr>
    `).join('');
}

function renderDevices() {
    const list = document.getElementById('deviceList');
    list.innerHTML = devices.slice(0, 5).map(d => `
        <div class="device-card" onclick="showToast('Detail ${d.name} â€” ${d.sessions} sesi hari ini', 'info')">
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                    <span class="status-dot ${d.status}"></span>
                    <span class="text-sm font-semibold">${d.name}</span>
                </div>
                <span class="text-[11px] font-medium" style="color: var(--text-muted);">${d.sessions} sesi</span>
            </div>
            <p class="text-[11px]" style="color: var(--text-muted);">${d.location}</p>
        </div>
    `).join('');
}

function renderActivities() {
    const list = document.getElementById('activityList');
    list.innerHTML = activities.map(a => `
        <div class="activity-item">
            <div class="activity-icon" style="background: ${a.bg}; color: ${a.color};">
                <i class="fas ${a.icon}"></i>
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-xs leading-relaxed" style="color: var(--text-secondary);">${a.text}</p>
                <p class="text-[10px] mt-0.5" style="color: var(--text-muted);">${a.time}</p>
            </div>
        </div>
    `).join('');
}

// === CHARTS ===
let revenueChart;

const weekData = {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    current: [3200, 4100, 3800, 4280, 0, 0, 0],
    previous: [2800, 3500, 3200, 3900, 4500, 5200, 4800],
};

const monthData = {
    labels: ['Mgg 1', 'Mgg 2', 'Mgg 3', 'Mgg 4'],
    current: [24500, 28300, 26800, 30000],
    previous: [22000, 25100, 24600, 27500],
};

function createRevenueChart(data) {
    const ctx = document.getElementById('revenueChart').getContext('2d');

    if (revenueChart) revenueChart.destroy();

    const gradient = ctx.createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, 'rgba(255, 107, 43, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 107, 43, 0)');

    const gradient2 = ctx.createLinearGradient(0, 0, 0, 260);
    gradient2.addColorStop(0, 'rgba(153, 153, 153, 0.08)');
    gradient2.addColorStop(1, 'rgba(153, 153, 153, 0)');

    revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Minggu Ini',
                    data: data.current,
                    borderColor: '#FF6B2B',
                    backgroundColor: gradient,
                    borderWidth: 2.5,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 4,
                    pointBackgroundColor: '#FF6B2B',
                    pointBorderColor: '#0D0D0D',
                    pointBorderWidth: 2,
                    pointHoverRadius: 6,
                },
                {
                    label: 'Minggu Lalu',
                    data: data.previous,
                    borderColor: '#666666',
                    backgroundColor: gradient2,
                    borderWidth: 1.5,
                    borderDash: [5, 5],
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    pointBackgroundColor: '#666666',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1A1A1A',
                    titleColor: '#F5F5F5',
                    bodyColor: '#999',
                    borderColor: '#2A2A2A',
                    borderWidth: 1,
                    cornerRadius: 10,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function (ctx) {
                            return ctx.dataset.label + ': Rp ' + (ctx.parsed.y * 1000).toLocaleString('id-ID');
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#666', font: { size: 11, family: 'DM Sans' } },
                    border: { display: false }
                },
                y: {
                    grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
                    ticks: {
                        color: '#666',
                        font: { size: 11, family: 'DM Sans' },
                        callback: function (value) { return value >= 1000 ? (value / 1000) + 'jt' : value + 'rb'; }
                    },
                    border: { display: false }
                }
            }
        }
    });
}

function createSourceChart() {
    const ctx = document.getElementById('sourceChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Foto Cetak', 'Digital File', 'Paket Premium', 'Lainnya'],
            datasets: [{
                data: [48, 28, 16, 8],
                backgroundColor: ['#FF6B2B', '#3B82F6', '#A855F7', '#444444'],
                borderColor: '#1A1A1A',
                borderWidth: 3,
                hoverBorderColor: '#1A1A1A',
                hoverOffset: 6,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '72%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1A1A1A',
                    titleColor: '#F5F5F5',
                    bodyColor: '#999',
                    borderColor: '#2A2A2A',
                    borderWidth: 1,
                    cornerRadius: 10,
                    padding: 12,
                    callbacks: {
                        label: function (ctx) { return ctx.label + ': ' + ctx.parsed + '%'; }
                    }
                }
            }
        }
    });
}

function switchChart(period) {
    const weekBtn = document.getElementById('chartWeek');
    const monthBtn = document.getElementById('chartMonth');

    if (period === 'week') {
        weekBtn.style.background = 'rgba(255, 107, 43, 0.15)';
        weekBtn.style.color = '#FF6B2B';
        monthBtn.style.background = 'transparent';
        monthBtn.style.color = '#666';
        createRevenueChart(weekData);
    } else {
        monthBtn.style.background = 'rgba(255, 107, 43, 0.15)';
        monthBtn.style.color = '#FF6B2B';
        weekBtn.style.background = 'transparent';
        weekBtn.style.color = '#666';
        createRevenueChart(monthData);
    }
}

// === NAVIGATION ===
function navigateTo(el, page) {
    // Hapus active dari semua nav item
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');

    // Tutup sidebar di mobile
    if (window.innerWidth < 1024) {
        closeSidebar();
    }

    // Tampilkan halaman yang sesuai
    if (page === 'dashboard') {
        renderDashboardPage();
    } else {
        renderPlaceholderPage(page);
    }
}

function renderDashboardPage() {
    document.getElementById('pageContent').innerHTML = getDashboardHTML();
    initDashboard();
}

function renderPlaceholderPage(page) {
    const pageTitles = {
        perangkat: 'Manajemen Perangkat',
        langganan: 'Langganan Pelanggan',
        transaksi: 'Riwayat Transaksi',
        voucher: 'Manajemen Voucher',
        frame: 'Koleksi Frame',
        pengaturan: 'Pengaturan Sistem',
    };

    const pageDescriptions = {
        perangkat: 'Kelola semua perangkat photobooth yang terhubung ke sistem Rawframe',
        langganan: 'Pantau status langganan pelanggan dan paket yang aktif',
        transaksi: 'Lihat seluruh riwayat transaksi dan laporan keuangan',
        voucher: 'Buat dan kelola kode voucher promosi untuk pelanggan',
        frame: 'Upload, edit, dan atur frame yang tersedia di setiap booth',
        pengaturan: 'Konfigurasi sistem, notifikasi, dan preferensi akun',
    };

    const pageIcons = {
        perangkat: 'fa-desktop',
        langganan: 'fa-crown',
        transaksi: 'fa-receipt',
        voucher: 'fa-ticket',
        frame: 'fa-crop-simple',
        pengaturan: 'fa-gear',
    };

    const content = document.getElementById('pageContent');
    content.innerHTML = `
        <div class="mb-8">
            <div class="flex items-center gap-3 mb-2">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background: var(--accent-glow);">
                    <i class="fas ${pageIcons[page]}" style="color: var(--accent);"></i>
                </div>
                <div>
                    <h2 class="text-2xl font-bold" style="font-family: 'Space Grotesk', sans-serif;">${pageTitles[page]}</h2>
                    <p style="color: var(--text-secondary); font-size: 14px;">${pageDescriptions[page]}</p>
                </div>
            </div>
        </div>

        ${page === 'perangkat' ? getPerangkatContent() : ''}
        ${page === 'voucher' ? getVoucherContent() : ''}
        ${page === 'transaksi' ? getTransaksiContent() : ''}
        ${page === 'frame' ? getFrameContent() : ''}
        ${page === 'langganan' ? getLanggananContent() : ''}
        ${page === 'pengaturan' ? getPengaturanContent() : ''}
    `;

    // Re-init halaman khusus jika ada chart atau interaksi
    if (page === 'perangkat') initPerangkatPage();
    if (page === 'transaksi') initTransaksiPage();
    if (page === 'langganan') initLanggananPage();
}

// === PAGE CONTENT GENERATORS ===
function getDashboardHTML() {
    return `
        <div class="mb-8">
            <h2 class="text-2xl font-bold mb-1" style="font-family: 'Space Grotesk', sans-serif;">Selamat Datang Kembali</h2>
            <p style="color: var(--text-secondary); font-size: 14px;">Berikut ringkasan operasional photobooth kamu hari ini</p>
        </div>
        <div class="stat-grid grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div class="stat-card">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background: rgba(255, 107, 43, 0.1);">
                        <i class="fas fa-wallet" style="color: var(--accent);"></i>
                    </div>
                    <span class="badge badge-success"><i class="fas fa-arrow-up text-[9px]"></i> 12.5%</span>
                </div>
                <p class="text-[12px] font-medium mb-1" style="color: var(--text-muted);">Pendapatan Hari Ini</p>
                <p class="text-2xl font-bold" style="font-family: 'Space Grotesk';">Rp 4.280.000</p>
                <div class="progress-bar mt-3"><div class="progress-fill" style="width: 71%; background: var(--accent);"></div></div>
                <p class="text-[11px] mt-1" style="color: var(--text-muted);">71% dari target harian</p>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background: rgba(34, 197, 94, 0.1);">
                        <i class="fas fa-receipt" style="color: var(--success);"></i>
                    </div>
                    <span class="badge badge-success"><i class="fas fa-arrow-up text-[9px]"></i> 8.3%</span>
                </div>
                <p class="text-[12px] font-medium mb-1" style="color: var(--text-muted);">Total Transaksi</p>
                <p class="text-2xl font-bold" style="font-family: 'Space Grotesk';">156</p>
                <div class="progress-bar mt-3"><div class="progress-fill" style="width: 85%; background: var(--success);"></div></div>
                <p class="text-[11px] mt-1" style="color: var(--text-muted);">Rata-rata Rp 27.436/transaksi</p>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background: rgba(59, 130, 246, 0.1);">
                        <i class="fas fa-desktop" style="color: #3B82F6;"></i>
                    </div>
                    <span class="badge badge-warning"><i class="fas fa-minus text-[9px]"></i> 0%</span>
                </div>
                <p class="text-[12px] font-medium mb-1" style="color: var(--text-muted);">Perangkat Aktif</p>
                <p class="text-2xl font-bold" style="font-family: 'Space Grotesk';">12 <span class="text-sm font-normal" style="color: var(--text-muted);">/ 15</span></p>
                <div class="progress-bar mt-3"><div class="progress-fill" style="width: 80%; background: #3B82F6;"></div></div>
                <p class="text-[11px] mt-1" style="color: var(--text-muted);">3 perangkat offline</p>
            </div>
            <div class="stat-card">
                <div class="flex items-center justify-between mb-4">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background: rgba(168, 85, 247, 0.1);">
                        <i class="fas fa-crown" style="color: #A855F7;"></i>
                    </div>
                    <span class="badge badge-success"><i class="fas fa-arrow-up text-[9px]"></i> 4.1%</span>
                </div>
                <p class="text-[12px] font-medium mb-1" style="color: var(--text-muted);">Langganan Aktif</p>
                <p class="text-2xl font-bold" style="font-family: 'Space Grotesk';">89</p>
                <div class="progress-bar mt-3"><div class="progress-fill" style="width: 62%; background: #A855F7;"></div></div>
                <p class="text-[11px] mt-1" style="color: var(--text-muted);">14 berakhir minggu ini</p>
            </div>
        </div>
        <div class="chart-grid grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8" style="grid-template-columns: 2fr 1fr;">
            <div class="chart-card">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h3 class="text-base font-bold">Pendapatan Mingguan</h3>
                        <p class="text-xs mt-1" style="color: var(--text-muted);">Perbandingan minggu ini vs minggu lalu</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="px-3 py-1.5 rounded-lg text-xs font-medium" style="background: var(--accent-glow); color: var(--accent);" id="chartWeek" onclick="switchChart('week')">Minggu</button>
                        <button class="px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white/5" style="color: var(--text-muted);" id="chartMonth" onclick="switchChart('month')">Bulan</button>
                    </div>
                </div>
                <div style="height: 260px;"><canvas id="revenueChart"></canvas></div>
            </div>
            <div class="chart-card">
                <div class="mb-6">
                    <h3 class="text-base font-bold">Sumber Pendapatan</h3>
                    <p class="text-xs mt-1" style="color: var(--text-muted);">Distribusi bulan ini</p>
                </div>
                <div style="height: 180px;" class="flex items-center justify-center"><canvas id="sourceChart"></canvas></div>
                <div class="mt-4 space-y-2">
                    <div class="flex items-center justify-between text-xs"><div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-sm" style="background: var(--accent);"></span><span style="color: var(--text-secondary);">Foto Cetak</span></div><span class="font-semibold">48%</span></div>
                    <div class="flex items-center justify-between text-xs"><div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-sm" style="background: #3B82F6;"></span><span style="color: var(--text-secondary);">Digital File</span></div><span class="font-semibold">28%</span></div>
                    <div class="flex items-center justify-between text-xs"><div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-sm" style="background: #A855F7;"></span><span style="color: var(--text-secondary);">Paket Premium</span></div><span class="font-semibold">16%</span></div>
                    <div class="flex items-center justify-between text-xs"><div class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-sm" style="background: var(--text-muted);"></span><span style="color: var(--text-secondary);">Lainnya</span></div><span class="font-semibold">8%</span></div>
                </div>
            </div>
        </div>
        <div class="mb-8">
            <h3 class="text-base font-bold mb-4">Aksi Cepat</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                <div class="quick-action" onclick="openAddDeviceModal()"><div class="icon-wrap" style="background: rgba(255,107,43,0.1); color: var(--accent);"><i class="fas fa-plus"></i></div><span class="text-xs font-medium" style="color: var(--text-secondary);">Perangkat Baru</span></div>
                <div class="quick-action" onclick="openVoucherModal()"><div class="icon-wrap" style="background: rgba(34,197,94,0.1); color: var(--success);"><i class="fas fa-ticket"></i></div><span class="text-xs font-medium" style="color: var(--text-secondary);">Buat Voucher</span></div>
                <div class="quick-action" onclick="showToast('Laporan sedang digenerate...', 'info')"><div class="icon-wrap" style="background: rgba(59,130,246,0.1); color: #3B82F6;"><i class="fas fa-file-export"></i></div><span class="text-xs font-medium" style="color: var(--text-secondary);">Export Laporan</span></div>
                <div class="quick-action" onclick="showToast('Frame berhasil diupload', 'success')"><div class="icon-wrap" style="background: rgba(168,85,247,0.1); color: #A855F7;"><i class="fas fa-crop-simple"></i></div><span class="text-xs font-medium" style="color: var(--text-secondary);">Upload Frame</span></div>
                <div class="quick-action" onclick="showToast('Notifikasi terkirim ke semua pelanggan', 'success')"><div class="icon-wrap" style="background: rgba(245,158,11,0.1); color: var(--warning);"><i class="fas fa-paper-plane"></i></div><span class="text-xs font-medium" style="color: var(--text-secondary);">Kirim Promo</span></div>
                <div class="quick-action" onclick="navigateTo(document.querySelector('[data-page=pengaturan]'), 'pengaturan')"><div class="icon-wrap" style="background: rgba(153,153,153,0.1); color: var(--text-muted);"><i class="fas fa-gear"></i></div><span class="text-xs font-medium" style="color: var(--text-secondary);">Pengaturan</span></div>
            </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="chart-card lg:col-span-2">
                <div class="flex items-center justify-between mb-5">
                    <div><h3 class="text-base font-bold">Transaksi Terbaru</h3><p class="text-xs mt-1" style="color: var(--text-muted);">10 transaksi terakhir hari ini</p></div>
                    <button class="btn-ghost text-xs !py-2 !px-3" onclick="navigateTo(document.querySelector('[data-page=transaksi]'), 'transaksi')">Lihat Semua <i class="fas fa-arrow-right ml-1 text-[10px]"></i></button>
                </div>
                <div class="overflow-x-auto"><table class="data-table"><thead><tr><th>ID</th><th>Perangkat</th><th>Paket</th><th>Nominal</th><th>Status</th><th>Waktu</th></tr></thead><tbody id="transactionBody"></tbody></table></div>
            </div>
            <div class="space-y-4">
                <div class="chart-card">
                    <div class="flex items-center justify-between mb-4"><h3 class="text-base font-bold">Status Perangkat</h3><button class="text-xs font-medium hover:opacity-80" style="color: var(--accent);" onclick="navigateTo(document.querySelector('[data-page=perangkat]'), 'perangkat')">Detail</button></div>
                    <div class="space-y-3" id="deviceList"></div>
                </div>
                <div class="chart-card">
                    <h3 class="text-base font-bold mb-4">Aktivitas Terbaru</h3>
                    <div id="activityList"></div>
                </div>
            </div>
        </div>
    `;
}

function getPerangkatContent() {
    return `
        <div class="flex flex-wrap items-center gap-3 mb-6">
            <button class="btn-primary" onclick="openAddDeviceModal()"><i class="fas fa-plus mr-2 text-xs"></i>Tambah Perangkat</button>
            <div class="ml-auto flex items-center gap-2">
                <select class="input-field !w-auto !py-2" id="deviceFilter" onchange="filterDevices()">
                    <option value="all">Semua Status</option>
                    <option value="online">Online</option>
                    <option value="idle">Idle</option>
                    <option value="offline">Offline</option>
                </select>
            </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="deviceGrid"></div>
    `;
}

function getVoucherContent() {
    return `
        <div class="flex flex-wrap items-center gap-3 mb-6">
            <button class="btn-primary" onclick="openVoucherModal()"><i class="fas fa-plus mr-2 text-xs"></i>Buat Voucher</button>
        </div>
        <div class="chart-card">
            <table class="data-table">
                <thead><tr><th>Kode</th><th>Diskon</th><th>Min. Transaksi</th><th>Penggunaan</th><th>Berlaku</th><th>Status</th><th>Aksi</th></tr></thead>
                <tbody>
                    <tr><td class="font-mono font-semibold" style="color: var(--accent);">DISKON20</td><td>20%</td><td>Rp 50.000</td><td>23 / 50</td><td>s/d 31 Des 2025</td><td><span class="badge badge-success">Aktif</span></td><td><button class="text-xs hover:underline" style="color: var(--accent);">Edit</button></td></tr>
                    <tr><td class="font-mono font-semibold" style="color: var(--accent);">NEWYEAR15</td><td>15%</td><td>Rp 30.000</td><td>0 / 100</td><td>s/d 5 Jan 2026</td><td><span class="badge badge-success">Aktif</span></td><td><button class="text-xs hover:underline" style="color: var(--accent);">Edit</button></td></tr>
                    <tr><td class="font-mono font-semibold" style="color: var(--text-muted);">HEMAT10</td><td>10%</td><td>Rp 25.000</td><td>50 / 50</td><td>1 - 30 Nov 2025</td><td><span class="badge badge-neutral">Expired</span></td><td><button class="text-xs hover:underline" style="color: var(--text-muted);">Duplikat</button></td></tr>
                    <tr><td class="font-mono font-semibold" style="color: var(--accent);">FREEFRAME</td><td>Gratis Frame</td><td>Rp 40.000</td><td>8 / 30</td><td>s/d 15 Des 2025</td><td><span class="badge badge-success">Aktif</span></td><td><button class="text-xs hover:underline" style="color: var(--accent);">Edit</button></td></tr>
                </tbody>
            </table>
        </div>
    `;
}

function getTransaksiContent() {
    return `
        <div class="flex flex-wrap items-center gap-3 mb-6">
            <div class="search-box flex-1 max-w-xs"><i class="fas fa-search"></i><input type="text" placeholder="Cari ID transaksi..." class="input-field" style="background: var(--bg-card);"></div>
            <select class="input-field !w-auto !py-2"><option>Semua Status</option><option>Berhasil</option><option>Pending</option><option>Gagal</option></select>
            <select class="input-field !w-auto !py-2"><option>Hari Ini</option><option>7 Hari</option><option>30 Hari</option><option>Custom</option></select>
            <button class="btn-ghost text-xs !py-2" onclick="showToast('Laporan transaksi diexport ke CSV', 'success')"><i class="fas fa-download mr-1"></i>Export</button>
        </div>
        <div class="chart-card mb-4">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div><p class="text-xs" style="color: var(--text-muted);">Total Pendapatan</p><p class="text-lg font-bold mt-1" style="font-family: 'Space Grotesk';">Rp 28.450.000</p></div>
                <div><p class="text-xs" style="color: var(--text-muted);">Jumlah Transaksi</p><p class="text-lg font-bold mt-1" style="font-family: 'Space Grotesk';">1.024</p></div>
                <div><p class="text-xs" style="color: var(--text-muted);">Rata-rata/Transaksi</p><p class="text-lg font-bold mt-1" style="font-family: 'Space Grotesk';">Rp 27.783</p></div>
                <div><p class="text-xs" style="color: var(--text-muted);">Tingkat Keberhasilan</p><p class="text-lg font-bold mt-1" style="font-family: 'Space Grotesk';">96.8%</p></div>
            </div>
        </div>
        <div class="chart-card">
            <div style="height: 250px;"><canvas id="transaksiChart"></canvas></div>
        </div>
    `;
}

function getFrameContent() {
    const frames = [
        { name: 'Wedding Classic', uses: 342, status: 'active' },
        { name: 'Birthday Party', uses: 287, status: 'active' },
        { name: 'Graduation 2025', uses: 198, status: 'active' },
        { name: 'Holiday Season', uses: 156, status: 'active' },
        { name: 'Minimalist White', uses: 134, status: 'active' },
        { name: 'Retro Vibes', uses: 98, status: 'draft' },
        { name: 'Neon Glow', uses: 76, status: 'active' },
        { name: 'Floral Dream', uses: 45, status: 'draft' },
    ];
    return `
        <div class="flex flex-wrap items-center gap-3 mb-6">
            <button class="btn-primary" onclick="showToast('Upload frame baru dibuka', 'info')"><i class="fas fa-upload mr-2 text-xs"></i>Upload Frame</button>
            <div class="ml-auto flex items-center gap-2">
                <select class="input-field !w-auto !py-2"><option>Semua</option><option>Aktif</option><option>Draft</option></select>
            </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            ${frames.map((f, i) => `
                <div class="chart-card !p-0 overflow-hidden cursor-pointer group" onclick="showToast('Mengedit frame: ${f.name}', 'info')">
                    <div class="aspect-[4/3] overflow-hidden" style="background: var(--bg-dark);">
                        <img src="https://picsum.photos/seed/frame-${i}/400/300.jpg" alt="${f.name}" class="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
                    </div>
                    <div class="p-3">
                        <div class="flex items-center justify-between mb-1">
                            <p class="text-sm font-semibold truncate">${f.name}</p>
                            <span class="badge ${f.status === 'active' ? 'badge-success' : 'badge-neutral'} text-[10px]">${f.status === 'active' ? 'Aktif' : 'Draft'}</span>
                        </div>
                        <p class="text-[11px]" style="color: var(--text-muted);">${f.uses} kali digunakan</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function getLanggananContent() {
    return `
        <div class="flex flex-wrap items-center gap-3 mb-6">
            <div class="search-box flex-1 max-w-xs"><i class="fas fa-search"></i><input type="text" placeholder="Cari pelanggan..." class="input-field" style="background: var(--bg-card);"></div>
            <select class="input-field !w-auto !py-2"><option>Semua Paket</option><option>Basic</option><option>Pro</option><option>Enterprise</option></select>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div class="stat-card"><p class="text-xs" style="color: var(--text-muted);">Paket Basic</p><p class="text-xl font-bold mt-1" style="font-family: 'Space Grotesk';">42</p><p class="text-[11px] mt-1" style="color: var(--text-muted);">Rp 29.000/bulan</p></div>
            <div class="stat-card"><p class="text-xs" style="color: var(--text-muted);">Paket Pro</p><p class="text-xl font-bold mt-1" style="font-family: 'Space Grotesk';">35</p><p class="text-[11px] mt-1" style="color: var(--text-muted);">Rp 59.000/bulan</p></div>
            <div class="stat-card"><p class="text-xs" style="color: var(--text-muted);">Paket Enterprise</p><p class="text-xl font-bold mt-1" style="font-family: 'Space Grotesk';">12</p><p class="text-[11px] mt-1" style="color: var(--text-muted);">Rp 149.000/bulan</p></div>
        </div>
        <div class="chart-card">
            <div style="height: 250px;"><canvas id="langgananChart"></canvas></div>
        </div>
    `;
}

function getPengaturanContent() {
    return `
        <div class="max-w-2xl space-y-6">
            <div class="chart-card">
                <h3 class="text-base font-bold mb-5">Informasi Studio</h3>
                <div class="space-y-4">
                    <div><label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Nama Studio</label><input type="text" value="Rawframe Studio" class="input-field"></div>
                    <div><label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Email</label><input type="email" value="admin@rawframe.id" class="input-field"></div>
                    <div><label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Nomor Telepon</label><input type="tel" value="+62 812 3456 7890" class="input-field"></div>
                    <div><label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Alamat</label><textarea class="input-field" rows="2">Jl. Sudirman No. 45, Jakarta Pusat</textarea></div>
                </div>
            </div>
            <div class="chart-card">
                <h3 class="text-base font-bold mb-5">Notifikasi</h3>
                <div class="space-y-4">
                    ${[
            ['Notifikasi perangkat offline', true],
            ['Notifikasi transaksi gagal', true],
            ['Laporan harian via email', false],
            ['Peringatan langganan expiry', true],
            ['Update sistem baru', false],
        ].map(([label, checked]) => `
                        <label class="flex items-center justify-between cursor-pointer group">
                            <span class="text-sm" style="color: var(--text-secondary);">${label}</span>
                            <div class="relative">
                                <input type="checkbox" class="sr-only peer" ${checked ? 'checked' : ''} onchange="showToast('Pengaturan notifikasi diperbarui', 'success')">
                                <div class="w-10 h-5 rounded-full transition-colors peer-checked:bg-orange-500" style="background: var(--border);"></div>
                                <div class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                            </div>
                        </label>
                    `).join('')}
                </div>
            </div>
            <div class="chart-card">
                <h3 class="text-base font-bold mb-5">Keamanan</h3>
                <div class="space-y-4">
                    <div><label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Password Lama</label><input type="password" placeholder="Masukkan password lama" class="input-field"></div>
                    <div><label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Password Baru</label><input type="password" placeholder="Masukkan password baru" class="input-field"></div>
                    <div><label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Konfirmasi Password</label><input type="password" placeholder="Ulangi password baru" class="input-field"></div>
                    <button class="btn-primary" onclick="showToast('Password berhasil diubah', 'success')">Ubah Password</button>
                </div>
            </div>
            <button class="btn-primary" onclick="showToast('Semua pengaturan berhasil disimpan', 'success')">
                <i class="fas fa-check mr-2 text-xs"></i>Simpan Semua Perubahan
            </button>
        </div>
    `;
}

// === PAGE INIT FUNCTIONS ===
function initDashboard() {
    renderTransactions();
    renderDevices();
    renderActivities();
    createRevenueChart(weekData);
    createSourceChart();
}

function initPerangkatPage() {
    filterDevices();
}

function filterDevices() {
    const filter = document.getElementById('deviceFilter')?.value || 'all';
    const grid = document.getElementById('deviceGrid');
    if (!grid) return;

    const filtered = filter === 'all' ? devices : devices.filter(d => d.status === filter);
    grid.innerHTML = filtered.map((d, i) => `
        <div class="chart-card">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                    <span class="status-dot ${d.status}"></span>
                    <span class="text-sm font-bold">${d.name}</span>
                </div>
                <span class="badge badge-${d.status === 'online' ? 'success' : d.status === 'idle' ? 'warning' : 'danger'} text-[10px]">${d.status}</span>
            </div>
            <p class="text-xs mb-4" style="color: var(--text-muted);"><i class="fas fa-location-dot mr-1"></i>${d.location}</p>
            <div class="grid grid-cols-2 gap-3 mb-4">
                <div class="p-2 rounded-lg text-center" style="background: var(--bg-dark);"><p class="text-lg font-bold" style="font-family: 'Space Grotesk';">${d.sessions}</p><p class="text-[10px]" style="color: var(--text-muted);">Sesi Hari Ini</p></div>
                <div class="p-2 rounded-lg text-center" style="background: var(--bg-dark);"><p class="text-lg font-bold" style="font-family: 'Space Grotesk';">Rp ${(d.sessions * 27436).toLocaleString('id-ID')}</p><p class="text-[10px]" style="color: var(--text-muted);">Est. Pendapatan</p></div>
            </div>
            <div class="flex gap-2">
                <button class="btn-ghost text-xs !py-1.5 flex-1" onclick="showToast('Restarting ${d.name}...', 'info')"><i class="fas fa-rotate-right mr-1"></i>Restart</button>
                <button class="btn-ghost text-xs !py-1.5 flex-1" onclick="showToast('Detail ${d.name}', 'info')"><i class="fas fa-ellipsis mr-1"></i>Detail</button>
            </div>
        </div>
    `).join('');
}

function initTransaksiPage() {
    const ctx = document.getElementById('transaksiChart');
    if (!ctx) return;
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, 'rgba(255, 107, 43, 0.2)');
    gradient.addColorStop(1, 'rgba(255, 107, 43, 0)');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
            datasets: [{
                label: 'Transaksi',
                data: [142, 168, 155, 156, 180, 220, 195],
                backgroundColor: 'rgba(255, 107, 43, 0.6)',
                borderRadius: 8,
                borderSkipped: false,
                hoverBackgroundColor: '#FF6B2B',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1A1A1A', titleColor: '#F5F5F5', bodyColor: '#999', borderColor: '#2A2A2A', borderWidth: 1, cornerRadius: 10, padding: 12 } },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#666', font: { size: 11 } }, border: { display: false } },
                y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#666', font: { size: 11 } }, border: { display: false } }
            }
        }
    });
}

function initLanggananPage() {
    const ctx = document.getElementById('langgananChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov'],
            datasets: [
                { label: 'Basic', data: [28, 30, 32, 35, 36, 38, 39, 40, 41, 42, 42], borderColor: '#3B82F6', backgroundColor: 'transparent', borderWidth: 2, tension: 0.4, pointRadius: 3, pointBackgroundColor: '#3B82F6' },
                { label: 'Pro', data: [18, 20, 22, 25, 27, 28, 30, 31, 33, 34, 35], borderColor: '#FF6B2B', backgroundColor: 'transparent', borderWidth: 2, tension: 0.4, pointRadius: 3, pointBackgroundColor: '#FF6B2B' },
                { label: 'Enterprise', data: [5, 5, 6, 7, 8, 8, 9, 10, 10, 11, 12], borderColor: '#A855F7', backgroundColor: 'transparent', borderWidth: 2, tension: 0.4, pointRadius: 3, pointBackgroundColor: '#A855F7' },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { labels: { color: '#999', font: { size: 11 }, usePointStyle: true, pointStyle: 'circle', boxWidth: 6 } },
                tooltip: { backgroundColor: '#1A1A1A', titleColor: '#F5F5F5', bodyColor: '#999', borderColor: '#2A2A2A', borderWidth: 1, cornerRadius: 10, padding: 12 }
            },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#666', font: { size: 11 } }, border: { display: false } },
                y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#666', font: { size: 11 } }, border: { display: false } }
            }
        }
    });
}

// === SIDEBAR TOGGLE ===
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobileOverlay');

    if (window.innerWidth < 1024) {
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('show');
    } else {
        sidebar.classList.toggle('sidebar-collapsed');
        document.getElementById('mainContent').classList.toggle('main-expanded');
    }
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('mobile-open');
    document.getElementById('mobileOverlay').classList.remove('show');
}

// === TOAST ===
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';

    const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info', warning: 'fa-triangle-exclamation' };
    const colors = { success: '#22C55E', error: '#EF4444', info: '#3B82F6', warning: '#F59E0B' };

    toast.innerHTML = `
        <i class="fas ${icons[type]}" style="color: ${colors[type]}; font-size: 16px;"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add('show'));
    });

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// === MODAL ===
function openModal(title, contentHTML) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').innerHTML = contentHTML;
    document.getElementById('modalOverlay').classList.add('show');
}

function closeModal(e) {
    if (e && e.target !== e.currentTarget) return;
    document.getElementById('modalOverlay').classList.remove('show');
}

function openAddDeviceModal() {
    openModal('Tambah Perangkat Baru', `
        <div class="space-y-4">
            <div><label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Nama Perangkat</label><input type="text" placeholder="contoh: Booth Eta" class="input-field" id="newDeviceName"></div>
            <div><label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Lokasi</label><input type="text" placeholder="contoh: Mall Taman Anggrek" class="input-field" id="newDeviceLocation"></div>
            <div><label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Tipe Booth</label>
                <select class="input-field" id="newDeviceType">
                    <option>Photo Booth Standar</option>
                    <option>Photo Booth Premium</option>
                    <option>Video Booth</option>
                    <option>360 Booth</option>
                </select>
            </div>
            <div class="flex gap-3 mt-6">
                <button class="btn-primary flex-1" onclick="addDevice()">Tambah Perangkat</button>
                <button class="btn-ghost flex-1" onclick="closeModal()">Batal</button>
            </div>
        </div>
    `);
}

function addDevice() {
    const name = document.getElementById('newDeviceName').value.trim();
    const location = document.getElementById('newDeviceLocation').value.trim();

    if (!name || !location) {
        showToast('Nama dan lokasi perangkat wajib diisi', 'warning');
        return;
    }

    devices.push({ name, location, status: 'offline', sessions: 0 });
    closeModal();
    showToast(`Perangkat "${name}" berhasil ditambahkan`, 'success');
}

function openVoucherModal() {
    openModal('Buat Voucher Baru', `
        <div class="space-y-4">
            <div><label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Kode Voucher</label><input type="text" placeholder="contoh: PROMO25" class="input-field uppercase" id="voucherCode" style="text-transform: uppercase;"></div>
            <div class="grid grid-cols-2 gap-3">
                <div><label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Tipe Diskon</label>
                    <select class="input-field" id="voucherType"><option>Persentase</option><option>Nominal Fixed</option><option>Gratis Frame</option></select>
                </div>
                <div><label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Nilai Diskon</label><input type="number" placeholder="contoh: 20" class="input-field" id="voucherValue"></div>
            </div>
            <div class="grid grid-cols-2 gap-3">
                <div><label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Min. Transaksi</label><input type="number" placeholder="contoh: 50000" class="input-field" id="voucherMin"></div>
                <div><label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Maks. Penggunaan</label><input type="number" placeholder="contoh: 50" class="input-field" id="voucherMax"></div>
            </div>
            <div><label class="block text-xs font-medium mb-1.5" style="color: var(--text-secondary);">Berlaku Sampai</label><input type="date" class="input-field" id="voucherExpiry"></div>
            <div class="flex gap-3 mt-6">
                <button class="btn-primary flex-1" onclick="createVoucher()">Buat Voucher</button>
                <button class="btn-ghost flex-1" onclick="closeModal()">Batal</button>
            </div>
        </div>
    `);
}

function createVoucher() {
    const code = document.getElementById('voucherCode').value.trim();
    const value = document.getElementById('voucherValue').value;

    if (!code || !value) {
        showToast('Kode dan nilai diskon wajib diisi', 'warning');
        return;
    }

    closeModal();
    showToast(`Voucher "${code.toUpperCase()}" berhasil dibuat`, 'success');
}

// === DATE ===
function setCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const dateStr = now.toLocaleDateString('id-ID', options);
    const el = document.getElementById('currentDate');
    if (el) el.textContent = dateStr;
}

// === KEYBOARD SUPPORT ===
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeSidebar();
    }
});

// === INIT ===
document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate();
    initDashboard();

    // Animasi progress bar saat load
    setTimeout(() => {
        document.querySelectorAll('.progress-fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    bar.style.width = width;
                });
            });
        });
    }, 100);
});
