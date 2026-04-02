// === TRANSAKSI PAGE LOGIC ===

function initTransaksiPage() {
    filterTransactions();
}

function renderTransactions(data) {
    const tbody = document.getElementById('transactionBody');
    if (!tbody) return;

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-gray-500">Tidak ada transaksi ditemukan</td></tr>`;
        return;
    }

    tbody.innerHTML = data.map(t => `
        <tr>
            <td><span class="font-mono text-xs font-semibold" style="color: var(--text-primary);">${t.id}</span></td>
            <td class="text-xs">${t.time}</td>
            <td class="text-xs" style="color: var(--text-primary);">${t.device}</td>
            <td class="font-semibold text-xs" style="color: var(--text-primary);">Rp ${t.amount.toLocaleString('id-ID')}</td>
            <td>
                <span class="badge badge-${t.status === 'success' ? 'success' : t.status === 'pending' ? 'warning' : 'danger'} text-[10px]">
                    <span class="status-dot ${t.status === 'success' ? 'online' : t.status === 'pending' ? 'idle' : 'offline'}"></span>
                    ${t.status === 'success' ? 'Berhasil' : t.status === 'pending' ? 'Pending' : 'Gagal'}
                </span>
            </td>
            <td>
                <span class="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase font-medium" style="color: var(--text-secondary);">
                    ${t.photoSession}
                </span>
            </td>
            <td>
                ${t.result ? `
                    <div class="h-10 w-8 rounded overflow-hidden bg-white/5 border border-white/10 cursor-pointer hover:border-orange-500 transition-colors" onclick="window.open('${t.result}', '_blank')">
                        <img src="${t.result}" class="h-full w-full object-cover" alt="Hasil">
                    </div>
                ` : '<span class="text-gray-600 text-xs ml-3">-</span>'}
            </td>
        </tr>
    `).join('');

    // Update stats
    const totalAmount = data.reduce((sum, t) => sum + t.amount, 0);
    document.getElementById('totalAmountDisplay').textContent = `Rp ${totalAmount.toLocaleString('id-ID')}`;
    document.getElementById('totalCountDisplay').textContent = data.length;
}

function filterTransactions() {
    const searchTerm = document.getElementById('transactionSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;

    const filteredData = transactions.filter(t => {
        const matchesSearch = t.id.toLowerCase().includes(searchTerm) || 
                             t.device.toLowerCase().includes(searchTerm);
        
        const matchesStatus = statusFilter === 'all' || t.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    renderTransactions(filteredData);
}

// Automatically init page if we're on the transaksi page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('transactionSearch')) {
        initTransaksiPage();
    }
});
