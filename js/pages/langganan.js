// === LANGGANAN PAGE LOGIC ===

let selectedDevice = null;
let selectedDuration = 1; // months
const basePrice = 50000;

const durations = [
    { months: 1, label: '1 Bulan', discount: 0 },
    { months: 3, label: '3 Bulan', discount: 0.1 },
    { months: 6, label: '6 Bulan', discount: 0.2 },
    { months: 12, label: '12 Bulan', discount: 0.3 },
];

function initSubscriptionPage() {
    if (devices.length > 0) {
        selectedDevice = devices[0].code;
    }
    renderSubscriptionDevices();
    renderDurations();
    renderSubscriptionHistory();
    updateTotal();
}

function renderSubscriptionDevices() {
    const grid = document.getElementById('subscriptionDeviceGrid');
    if (!grid) return;

    document.getElementById('deviceCountLabel').textContent = `${devices.length} Perangkat`;

    grid.innerHTML = devices.map(d => {
        const isSelected = d.code === selectedDevice;
        return `
            <div class="chart-card !p-4 cursor-pointer transition-all border-2 ${isSelected ? 'border-orange-500 bg-orange-500/5' : 'border-transparent hover:border-white/10'}" 
                 onclick="selectDevice('${d.code}')">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <p class="font-bold text-sm text-white">${d.name}</p>
                        <p class="text-[10px] font-mono mt-0.5" style="color: var(--text-muted);">${d.code}</p>
                    </div>
                    <span class="badge badge-${d.status === 'online' ? 'success' : 'danger'} text-[9px] uppercase tracking-tighter">
                        ${d.status === 'online' ? 'Aktif' : 'Nonaktif'}
                    </span>
                </div>
                <div class="flex items-center gap-2 text-[10px]" style="color: var(--text-secondary);">
                    <i class="fas fa-clock opacity-50"></i>
                    <span>s/d ${d.subscriptionsUntil || '-'}</span>
                </div>
                ${isSelected ? '<div class="absolute top-2 right-2 text-orange-500"><i class="fas fa-circle-check"></i></div>' : ''}
            </div>
        `;
    }).join('');
}

function renderDurations() {
    const grid = document.getElementById('durationGrid');
    if (!grid) return;

    grid.innerHTML = durations.map(d => {
        const isSelected = d.months === selectedDuration;
        return `
            <div class="chart-card !p-4 cursor-pointer transition-all border-2 text-center flex flex-col justify-center gap-1 ${isSelected ? 'border-orange-500 bg-orange-500/5' : 'border-transparent hover:border-white/10'}" 
                 onclick="selectDuration(${d.months})">
                <p class="font-bold text-sm ${isSelected ? 'text-orange-500' : 'text-white'}">${d.label}</p>
                ${d.discount > 0 ? `<p class="text-[10px] font-bold text-green-500">-${d.discount * 100}%</p>` : `<p class="text-[10px]" style="color: var(--text-muted);">Harga Normal</p>`}
            </div>
        `;
    }).join('');
}

function renderSubscriptionHistory() {
    const tbody = document.getElementById('subscriptionHistoryBody');
    if (!tbody) return;

    tbody.innerHTML = subscriptionHistory.map(h => `
        <tr>
            <td>
                <p class="font-bold text-xs text-white">${h.device}</p>
                <p class="text-[10px] font-mono mt-0.5 text-gray-500">${h.code}</p>
            </td>
            <td><span class="text-xs">${h.duration}</span></td>
            <td><span class="font-bold text-xs text-white">Rp ${h.amount.toLocaleString('id-ID')}</span></td>
            <td>
                <span class="badge ${h.status === 'Aktif' ? 'badge-success' : 'badge-info'} text-[10px]">
                    <span class="status-dot ${h.status === 'Aktif' ? 'online' : 'idle'}"></span>
                    ${h.status}
                </span>
            </td>
            <td><span class="text-xs">${h.expiry}</span></td>
            <td class="text-right text-xs text-gray-500">${h.date}</td>
        </tr>
    `).join('');
}

function selectDevice(code) {
    selectedDevice = code;
    renderSubscriptionDevices();
    updateTotal();
}

function selectDuration(months) {
    selectedDuration = months;
    renderDurations();
    updateTotal();
}

function updateTotal() {
    const durationObj = durations.find(d => d.months === selectedDuration);
    const deviceObj = devices.find(d => d.code === selectedDevice);
    
    if (!deviceObj) return;

    const discountAmount = basePrice * selectedDuration * durationObj.discount;
    const finalPrice = (basePrice * selectedDuration) - discountAmount;

    document.getElementById('totalPriceDisplay').textContent = `Rp ${finalPrice.toLocaleString('id-ID')}`;
    
    let detailText = `Rp ${basePrice.toLocaleString('id-ID')}/bulan × ${selectedDuration} bulan × 1 perangkat`;
    if (durationObj.discount > 0) {
        detailText += `<br><span class="text-green-500">Diskon Durasi (${durationObj.discount * 100}%): -Rp ${discountAmount.toLocaleString('id-ID')}</span>`;
    }
    detailText += `<br><span class="text-white mt-1 block">Perangkat: <b>${deviceObj.name}</b></span>`;
    
    document.getElementById('calculationDetail').innerHTML = detailText;
}

function processPayment() {
    const deviceObj = devices.find(d => d.code === selectedDevice);
    const durationObj = durations.find(d => d.months === selectedDuration);
    
    if (!deviceObj) return;

    const discountAmount = basePrice * selectedDuration * durationObj.discount;
    const finalPrice = (basePrice * selectedDuration) - discountAmount;

    showToast(`Memproses pembayaran untuk ${deviceObj.name}...`, 'info');
    
    setTimeout(() => {
        // Update the device subscription date
        const currentDate = new Date();
        // If there's an existing valid date, add to it, otherwise add to today
        let startDate = new Date();
        const parts = deviceObj.subscriptionsUntil.split('/');
        if (parts.length === 3) {
            const existingDate = new Date(parts[2], parts[1] - 1, parts[0]);
            if (existingDate > currentDate) startDate = existingDate;
        }
        
        startDate.setMonth(startDate.getMonth() + selectedDuration);
        const newExpiry = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`;
        
        deviceObj.subscriptionsUntil = newExpiry;
        
        // Add to history
        subscriptionHistory.unshift({
            device: deviceObj.name,
            code: deviceObj.code,
            duration: durationObj.label,
            amount: finalPrice,
            status: 'Aktif',
            expiry: newExpiry,
            date: new Date().toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
        });

        showToast(`Langganan ${deviceObj.name} berhasil diperpanjang hingga ${newExpiry}!`, 'success');
        
        // Re-render everything
        renderSubscriptionDevices();
        renderSubscriptionHistory();
        updateTotal();
    }, 2000);
}

// Automatically init page if we're on the langganan page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('subscriptionDeviceGrid')) {
        initSubscriptionPage();
    }
});
