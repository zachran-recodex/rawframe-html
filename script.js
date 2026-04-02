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
    { 
        name: 'Trial Device', 
        location: 'Online', 
        status: 'online', 
        sessions: 4, 
        subscriptionsUntil: '5/4/2026', 
        code: 'TRIAL-NWRLHU', 
        transactions: 4, 
        lastActive: '3 Apr 2026, 00.35', 
        boothUrl: 'https://booth.rawframe.id/booth/TRIAL-NWRLHU' 
    },
    { 
        name: 'Booth Alpha', 
        location: 'Mall Central Park', 
        status: 'online', 
        sessions: 42,
        subscriptionsUntil: '12/12/2026',
        code: 'ALPH-123456',
        transactions: 42,
        lastActive: '3 Apr 2026, 14.32',
        boothUrl: 'https://booth.rawframe.id/booth/ALPH-123456'
    },
    { 
        name: 'Booth Beta', 
        location: 'Grand Indonesia', 
        status: 'online', 
        sessions: 38,
        subscriptionsUntil: '15/10/2026',
        code: 'BETA-987654',
        transactions: 38,
        lastActive: '3 Apr 2026, 14.28',
        boothUrl: 'https://booth.rawframe.id/booth/BETA-987654'
    },
    { 
        name: 'Booth Gamma', 
        location: 'Plaza Senayan', 
        status: 'offline', 
        sessions: 15,
        subscriptionsUntil: '20/08/2026',
        code: 'GAMM-456123',
        transactions: 15,
        lastActive: '3 Apr 2026, 14.15',
        boothUrl: 'https://booth.rawframe.id/booth/GAMM-456123'
    },
    { 
        name: 'Booth Delta', 
        location: 'Kota Kasablanka', 
        status: 'online', 
        sessions: 31,
        subscriptionsUntil: '05/11/2026',
        code: 'DELT-789012',
        transactions: 31,
        lastActive: '3 Apr 2026, 14.02',
        boothUrl: 'https://booth.rawframe.id/booth/DELT-789012'
    },
    { 
        name: 'Booth Epsilon', 
        location: 'Pondok Indah Mall', 
        status: 'offline', 
        sessions: 0,
        subscriptionsUntil: '01/05/2026',
        code: 'EPSI-345678',
        transactions: 0,
        lastActive: '2 Apr 2026, 23.50',
        boothUrl: 'https://booth.rawframe.id/booth/EPSI-345678'
    },
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
        <div class="chart-card flex flex-col h-full">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                    <span class="status-dot ${d.status}"></span>
                    <span class="text-base font-bold">${d.name}</span>
                </div>
                <span class="badge badge-${d.status === 'online' ? 'success' : 'danger'} text-[10px]">${d.status === 'online' ? 'Aktif' : 'Nonaktif'}</span>
            </div>
            
            <p class="text-xs mb-4" style="color: var(--text-muted);">Langganan s/d ${d.subscriptionsUntil}</p>
            
            <div class="space-y-3 mb-4 flex-1">
                <div>
                    <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color: var(--text-muted);">Kode:</p>
                    <p class="font-mono text-xs font-semibold px-2 py-1 inline-block rounded bg-black/20" style="color: var(--accent); border: 1px solid var(--border);">${d.code}</p>
                </div>
                
                <div class="grid grid-cols-2 gap-2 pb-2 border-b" style="border-color: var(--border);">
                    <div>
                        <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color: var(--text-muted);">Sesi:</p>
                        <p class="text-sm font-medium">${d.sessions}</p>
                    </div>
                    <div>
                        <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color: var(--text-muted);">Transaksi:</p>
                        <p class="text-sm font-medium">${d.transactions}</p>
                    </div>
                </div>

                <div>
                    <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color: var(--text-muted);">Terakhir Aktif:</p>
                    <p class="text-xs" style="color: var(--text-secondary);">${d.lastActive}</p>
                </div>

                <div>
                    <p class="text-[10px] font-semibold uppercase tracking-wider mb-1" style="color: var(--text-muted);">URL Booth:</p>
                    <a href="${d.boothUrl}" target="_blank" class="text-xs hover:underline flex items-center gap-1" style="color: var(--accent); word-break: break-all;">
                        ${d.boothUrl}
                        <i class="fas fa-external-link-alt text-[10px] ml-1"></i>
                    </a>
                </div>
            </div>
            
            <div class="mt-auto pt-4 border-t flex gap-2" style="border-color: var(--border);">
                <button class="btn-ghost text-xs font-medium !py-2.5 flex-1 rounded-lg transition-colors border ${d.status === 'online' ? 'text-red-500 hover:text-red-400 hover:bg-red-500/10 border-red-500/20' : 'text-green-500 hover:text-green-400 hover:bg-green-500/10 border-green-500/20'}" onclick="showToast('${d.status === 'online' ? 'Menonaktifkan' : 'Mengaktifkan'} ${d.name}...', '${d.status === 'online' ? 'warning' : 'success'}')">
                    <i class="fas fa-power-off mr-1.5"></i>${d.status === 'online' ? 'Nonaktifkan' : 'Aktifkan'}
                </button>
                <button class="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors border" style="border-color: var(--border); color: var(--text-secondary);" onclick="openDeviceSettingModal('${d.code}', '${d.name}')" title="Pengaturan">
                    <i class="fas fa-gear text-sm"></i>
                </button>
                <button class="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 transition-colors border" style="border-color: var(--border); color: var(--text-secondary);" onclick="confirmDeleteDevice('${d.code}', '${d.name}')" title="Hapus">
                    <i class="fas fa-trash text-sm"></i>
                </button>
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
    document.getElementById('modalTitle').innerHTML = title;
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
            <div class="flex gap-3 mt-6">
                <button class="btn-primary flex-1" onclick="addDevice()">Tambah Perangkat</button>
                <button class="btn-ghost flex-1" onclick="closeModal()">Batal</button>
            </div>
        </div>
    `);
}

function addDevice() {
    const name = document.getElementById('newDeviceName').value.trim();

    if (!name) {
        showToast('Nama perangkat wajib diisi', 'warning');
        return;
    }

    const code = name.substring(0, 4).toUpperCase() + '-' + Math.floor(100000 + Math.random() * 900000);
    const boothUrl = `https://booth.rawframe.id/booth/${code}`;

    devices.push({ 
        name, 
        location: 'Belum diatur', 
        status: 'offline', 
        sessions: 0,
        subscriptionsUntil: '-',
        code,
        transactions: 0,
        lastActive: '-',
        boothUrl
    });
    
    closeModal();
    showToast(`Perangkat "${name}" berhasil ditambahkan`, 'success');
    
    if (document.getElementById('deviceGrid')) {
        filterDevices();
    }
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

function confirmDeleteDevice(code, name) {
    openModal('Hapus Perangkat', `
        <div class="text-center pb-2 pt-4">
            <div class="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                <i class="fas fa-trash-can text-2xl"></i>
            </div>
            <h3 class="text-lg font-bold mb-2">Hapus ${name}?</h3>
            <p class="text-xs px-2 mb-6 leading-relaxed" style="color: var(--text-secondary);">
                Tindakan ini tidak dapat dibatalkan. Konfigurasi perangkat dengan kode <span class="font-mono text-orange-500 font-semibold">${code}</span> akan dihapus selamanya.
            </p>
        </div>
        <div class="flex gap-3">
            <button class="btn-ghost flex-1" onclick="closeModal()">Batal</button>
            <button class="btn-primary flex-1 !bg-red-500 hover:!bg-red-600 !text-white !border-red-500" onclick="deleteDevice('${code}', '${name}')">Ya, Hapus</button>
        </div>
    `);
}

function deleteDevice(code, name) {
    const index = devices.findIndex(d => d.code === code);
    if (index > -1) {
        devices.splice(index, 1);
        if (document.getElementById('deviceGrid')) {
            filterDevices();
        }
        showToast(\`Perangkat "\${name}" dihapus\`, 'success');
    }
    closeModal();
}

function openDeviceSettingModal(code, name) {
    const isTrial = name.toLowerCase().includes('trial');

    openModal(`Pengaturan Perangkat <span class="text-xs text-orange-500 font-mono mt-1 block">${code}</span>`, `
        <div class="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar -mr-4 pr-4 pb-2">
            
            <div class="space-y-4">
                <div>
                    <label class="block text-[10px] font-semibold uppercase tracking-wider mb-1.5" style="color: var(--text-muted);">Nama Perangkat</label>
                    <input type="text" value="${name}" class="input-field" ${isTrial ? 'disabled' : ''}>
                </div>
            </div>

            <!-- Paket Cetak -->
            <div class="border-t pt-5" style="border-color: var(--border);">
                <h4 class="text-sm font-bold mb-3 flex justify-between items-center">
                    Paket Cetak
                    ${isTrial ? '<span class="badge badge-warning text-[10px]"><i class="fas fa-lock mr-1"></i> Trial Terkunci</span>' : ''}
                </h4>
                
                ${isTrial ? `
                <div class="p-3 mb-4 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs">
                    Perangkat trial hanya mendukung paket Hitam Putih gratis dan tidak dapat diubah.
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div class="p-3 rounded-lg border-2" style="border-color: var(--accent); background: rgba(255,107,43,0.05);">
                        <p class="font-medium text-sm">Hitam Putih (B&W)</p>
                        <p class="text-xs mt-1" style="color: var(--text-muted);">Rp 0 <span class="badge badge-success text-[9px] ml-1 px-1.5 py-0.5">GRATIS</span></p>
                    </div>
                    <div class="p-3 rounded-lg opacity-50 bg-black/20 text-center flex flex-col justify-center" style="border: 1px solid var(--border);">
                        <p class="font-medium text-sm">Full Color</p>
                        <p class="text-[10px] mt-1" style="color: var(--text-muted);">(tidak tersedia di trial)</p>
                    </div>
                </div>
                ` : `
                <div class="grid grid-cols-2 gap-3">
                    <div class="p-3 rounded-lg cursor-pointer hover:border-orange-500 border-2 transition-colors bg-black/20" style="border-color: var(--border);">
                        <p class="font-medium text-sm">Hitam Putih (B&W)</p>
                        <p class="text-xs mt-1" style="color: var(--text-muted);">Aktif</p>
                    </div>
                    <div class="p-3 rounded-lg cursor-pointer border-2 transition-colors relative" style="border-color: var(--accent); background: rgba(255,107,43,0.05);">
                        <p class="font-medium text-sm">Full Color</p>
                        <p class="text-xs mt-1 text-orange-500 font-medium">Aktif Utama</p>
                        <div class="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500"></div>
                    </div>
                </div>
                `}
            </div>

            <!-- Mode Printer -->
            <div class="border-t pt-5" style="border-color: var(--border);">
                <h4 class="text-sm font-bold mb-3 flex justify-between items-center">
                    Mode Printer
                    ${isTrial ? '<span class="badge badge-danger text-[9px]"><i class="fas fa-power-off mr-1"></i>Dinonaktifkan</span>' : ''}
                </h4>
                
                ${isTrial ? `
                <div class="p-3 mb-4 rounded-lg bg-black/20 border text-xs" style="border-color: var(--border); color: var(--text-secondary);">
                    <strong>QR Unduh Saja</strong><br>
                    Foto tidak dicetak, user hanya bisa unduh via QR. Perangkat trial tidak dapat mengaktifkan printer.
                </div>
                ` : `
                <select class="input-field mb-4">
                    <option>Cetak Langsung</option>
                    <option>Konfirmasi Sebelum Cetak</option>
                    <option>QR Unduh Saja (Tanpa Cetak)</option>
                </select>
                `}
                
                <div class="space-y-3">
                    <div class="p-3 rounded-lg border bg-black/20 ${isTrial ? 'opacity-60' : ''}" style="border-color: var(--border);">
                        <div class="flex items-center justify-between mb-2">
                            <p class="font-medium text-sm">Printer Hitam Putih</p>
                            <span class="badge badge-danger text-[9px]">Habis</span>
                        </div>
                        <p class="text-xs mb-2" style="color: var(--text-muted);">Menggunakan printer default OS</p>
                        <div class="flex justify-between items-center text-xs">
                            <span style="color: var(--text-secondary);">Stok Kertas:</span>
                            <span class="font-mono text-red-500 font-semibold">0 lembar</span>
                        </div>
                    </div>
                    
                    <div class="p-3 rounded-lg border bg-black/20 ${isTrial ? 'opacity-60' : ''}" style="border-color: var(--border);">
                        <div class="flex items-center justify-between mb-2">
                            <p class="font-medium text-sm">Printer Full Color</p>
                            <span class="badge badge-danger text-[9px]">Habis</span>
                        </div>
                        <p class="text-xs mb-2" style="color: var(--text-muted);">Menggunakan printer default OS</p>
                        <div class="flex justify-between items-center text-xs">
                            <span style="color: var(--text-secondary);">Stok Kertas:</span>
                            <span class="font-mono text-red-500 font-semibold">0 lembar</span>
                        </div>
                    </div>
                </div>

                <div class="mt-4 bg-orange-500/5 p-3 rounded border border-orange-500/20 text-center">
                    <p class="text-[10px] mb-2" style="color: var(--text-muted);">Buka link di bawah ini pada perangkat booth untuk mendeteksi printer yang tersedia dan melakukan test print.</p>
                    <a href="https://booth.rawframe.id/booth/${code}" target="_blank" class="inline-flex items-center text-orange-500 text-xs font-medium hover:underline">
                        <i class="fas fa-external-link-alt mr-1.5"></i> Buka Setup Perangkat
                    </a>
                </div>
            </div>

            <!-- Kamera -->
            <div class="border-t pt-5" style="border-color: var(--border);">
                <h4 class="text-sm font-bold mb-3">Kamera</h4>
                
                <div class="p-4 mb-4 rounded-lg bg-black/20 border text-xs text-center" style="border-color: var(--border); color: var(--text-secondary);">
                    <i class="fas fa-camera text-xl mb-2 opacity-30 block"></i>
                    Belum ada kamera terpilih. Gunakan halaman Setup dari perangkat booth.
                </div>

                <div class="mb-5 bg-orange-500/5 p-3 rounded border border-orange-500/20 text-center">
                    <p class="text-[10px] mb-2" style="color: var(--text-muted);">Buka link di bawah ini pada perangkat booth untuk mendeteksi kamera yang tersedia.</p>
                    <a href="https://booth.rawframe.id/booth/${code}" target="_blank" class="inline-flex items-center text-orange-500 text-xs font-medium hover:underline">
                        <i class="fas fa-external-link-alt mr-1.5"></i> Buka Setup Perangkat
                    </a>
                </div>

                <div class="grid grid-cols-2 gap-3 mb-2 mt-4">
                    <div>
                        <label class="block text-[10px] font-semibold uppercase tracking-wider mb-1.5" style="color: var(--text-muted);">Lebar (px)</label>
                        <input type="number" value="1280" class="input-field">
                    </div>
                    <div>
                        <label class="block text-[10px] font-semibold uppercase tracking-wider mb-1.5" style="color: var(--text-muted);">Tinggi (px)</label>
                        <input type="number" value="720" class="input-field">
                    </div>
                </div>
                <p class="text-[10px] mb-5" style="color: var(--text-muted);">Resolusi ideal kamera. Resolusi aktual tergantung kemampuan perangkat.</p>

                <div class="space-y-5">
                    <label class="flex items-center justify-between cursor-pointer group">
                        <div>
                            <span class="text-sm font-medium d-block">Mirror (Cermin)</span>
                            <p class="text-[10px] mt-0.5" style="color: var(--text-muted);">Balik tampilan kamera secara horizontal</p>
                        </div>
                        <div class="relative">
                            <input type="checkbox" class="sr-only peer" checked>
                            <div class="w-10 h-5 rounded-full transition-colors peer-checked:bg-orange-500" style="background: var(--border);"></div>
                            <div class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                        </div>
                    </label>

                    <div>
                        <div class="flex justify-between items-end mb-2">
                            <div>
                                <span class="text-sm font-medium d-block">Kecerahan (Brightness)</span>
                                <p class="text-[10px] mt-0.5" style="color: var(--text-muted);">Sesuaikan kecerahan gambar kamera</p>
                            </div>
                            <span class="text-xs font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded">100%</span>
                        </div>
                        <input type="range" min="50" max="200" value="100" class="w-full accent-orange-500">
                        <div class="flex justify-between mt-1 text-[9px] font-mono" style="color: var(--text-muted);">
                            <span>Gelap (50%)</span><span>Normal (100%)</span><span>Terang (200%)</span>
                        </div>
                    </div>

                    <div>
                        <label class="block text-[10px] font-semibold uppercase tracking-wider mb-1.5" style="color: var(--text-muted);">Mode Kamera</label>
                        <input type="text" value="WebRTC (webcam langsung)" readonly disabled class="input-field opacity-60">
                        <p class="text-[10px] mt-1.5" style="color: var(--text-muted);">Ubah mode di halaman Setup Perangkat.</p>
                    </div>
                </div>
            </div>

            <!-- Tampilan Standby -->
            <div class="border-t pt-5" style="border-color: var(--border);">
                <h4 class="text-sm font-bold mb-3">Tampilan Standby</h4>
                <div>
                    <label class="block text-[10px] font-semibold uppercase tracking-wider mb-1.5" style="color: var(--text-muted);">Upload Gambar</label>
                    <div class="border-2 border-dashed rounded-lg p-5 text-center cursor-pointer hover:border-orange-500 transition-colors" style="border-color: var(--border); background: var(--bg-dark);">
                        <i class="fas fa-image text-2xl mb-2 opacity-40"></i>
                        <p class="text-xs" style="color: var(--text-secondary);">Pilih File (PNG / JPG / WebP, maks 10 MB)</p>
                    </div>
                </div>
                <div class="relative flex items-center py-4">
                    <div class="flex-grow border-t" style="border-color: var(--border);"></div>
                    <span class="flex-shrink-0 mx-4 text-[10px] uppercase font-bold" style="color: var(--text-muted);">Atau masukkan URL</span>
                    <div class="flex-grow border-t" style="border-color: var(--border);"></div>
                </div>
                <div>
                    <input type="url" placeholder="https://example.com/background.jpg" class="input-field">
                    <p class="text-[10px] mt-2" style="color: var(--text-muted);">Kosongkan untuk menggunakan background default</p>
                </div>
            </div>
            
            <div class="sticky bottom-0 pt-4 bg-[var(--bg-modal)] pb-0 border-t mt-6 gap-3 flex" style="background: #111; margin-left:-1rem; margin-right:-1rem; padding-left:1rem; padding-right:1rem; border-color: var(--border);">
                <button class="btn-ghost flex-1" onclick="closeModal()">Batal</button>
                <button class="btn-primary flex-1" onclick="showToast('Pengaturan disimpan', 'success'); closeModal();">Simpan</button>
            </div>
        </div>
    `);
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
