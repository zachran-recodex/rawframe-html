// === TRANSAKSI PAGE LOGIC ===

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

    // Populate transaction list in table
    const tbody = document.getElementById('transactionBody');
    if (tbody) {
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
}

// Automatically init page if we're on the transaksi page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('transaksiChart')) {
        initTransaksiPage();
    }
});
