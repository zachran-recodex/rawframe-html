// === PERANGKAT PAGE LOGIC ===

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
        showToast(`Perangkat "${name}" dihapus`, 'success');
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

// Automatically init page if we're on the perangkat page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('deviceGrid')) {
        filterDevices();
    }
});
