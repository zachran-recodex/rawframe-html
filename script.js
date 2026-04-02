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

    // Inisialisasi berdasarkan elemen yang ada di halaman
    if (document.getElementById('revenueChart')) {
        initDashboard();
    }
    if (document.getElementById('deviceGrid')) {
        initPerangkatPage();
    }
    if (document.getElementById('transaksiChart')) {
        initTransaksiPage();
    }
    if (document.getElementById('langgananChart')) {
        initLanggananPage();
    }

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
