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

let revenueChart;

// === RENDER FUNCTIONS ===
function renderTransactions() {
    const tbody = document.getElementById('transactionBody');
    if (!tbody) return;
    tbody.innerHTML = transactions.map(t => `
        <tr>
            <td><span class="font-mono text-xs font-semibold" style="color: var(--text-primary);">${t.id}</span></td>
            <td style="color: var(--text-primary);">${t.device}</td>
            <td>
                <span class="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase font-medium" style="color: var(--text-secondary);">
                    ${t.photoSession}
                </span>
            </td>
            <td class="font-semibold" style="color: var(--text-primary);">Rp ${t.amount.toLocaleString('id-ID')}</td>
            <td>
                <span class="badge badge-${t.status === 'success' ? 'success' : t.status === 'pending' ? 'warning' : 'danger'} text-[10px]">
                    <span class="status-dot ${t.status === 'success' ? 'online' : t.status === 'pending' ? 'idle' : 'offline'}"></span>
                    ${t.status === 'success' ? 'Berhasil' : t.status === 'pending' ? 'Pending' : 'Gagal'}
                </span>
            </td>
            <td><span class="text-xs">${t.time}</span></td>
        </tr>
    `).join('');
}

function renderDevices() {
    const list = document.getElementById('deviceList');
    if (!list) return;
    list.innerHTML = devices.slice(0, 5).map(d => `
        <div class="device-card" onclick="showToast('Detail ${d.name} — ${d.sessions} sesi hari ini', 'info')">
            <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                    <span class="status-dot ${d.status === 'online' ? 'online' : 'offline'}"></span>
                    <span class="text-sm font-semibold">${d.name}</span>
                </div>
                <span class="text-[11px] font-medium" style="color: var(--text-muted);">${d.sessions} sesi</span>
            </div>
            <p class="text-[11px]" style="color: var(--text-muted);">${d.location}</p>
        </div>
    `).join('');
}

function updateSummaryStats() {
    const totalTransactions = transactions.length;
    const totalRevenue = transactions.reduce((sum, t) => sum + (t.status === 'success' ? t.amount : 0), 0);
    const activeDevices = devices.filter(d => d.status === 'online').length;
    const totalDevices = devices.length;

    const revEl = document.getElementById('statRevenue');
    const transEl = document.getElementById('statTransactions');
    const devEl = document.getElementById('statDevices');

    if (revEl) revEl.textContent = `Rp ${totalRevenue.toLocaleString('id-ID')}`;
    if (transEl) transEl.textContent = totalTransactions.toLocaleString('id-ID');
    if (devEl) devEl.innerHTML = `${activeDevices} <span class="text-sm font-normal" style="color: var(--text-muted);">/ ${totalDevices}</span>`;
}

function renderActivities() {
    const list = document.getElementById('activityList');
    if (!list) return;
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
function createRevenueChart(data) {
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

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
    const canvas = document.getElementById('sourceChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
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
    if (!weekBtn || !monthBtn) return;

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

function initDashboard() {
    updateSummaryStats();
    renderTransactions();
    renderDevices();
    renderActivities();
    createRevenueChart(weekData);
    createSourceChart();
}

// Automatically init dashboard if we're on the dashboard page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('revenueChart')) {
        initDashboard();
    }
});
