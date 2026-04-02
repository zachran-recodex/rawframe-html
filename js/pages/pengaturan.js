// === PENGATURAN PAGE LOGIC ===

function saveProfile() {
    const name = document.getElementById('profileName').value;
    const email = document.getElementById('profileEmail').value;

    if (!name || !email) {
        showToast('Nama dan Email tidak boleh kosong', 'warning');
        return;
    }

    showToast('Profil berhasil diperbarui!', 'success');
}

function togglePayment(method) {
    // In a real app, this would toggle a state or checkbox
    // For this demo, we'll just show a toast and simulate the toggle visually
    showToast(`Metode pembayaran ${method.toUpperCase()} diperbarui`, 'success');
    
    // Logic to visually toggle could be added here if needed for deeper interactivity
}

// Any other settings-specific logic can go here
