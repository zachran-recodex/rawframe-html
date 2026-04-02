// === VOUCHER PAGE LOGIC ===

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
