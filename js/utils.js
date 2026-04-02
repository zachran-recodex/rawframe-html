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

// === SIDEBAR STATS ===
function updateSidebarStats() {
    // Update Device Badge
    const deviceBadge = document.querySelector('.nav-item i.fa-desktop + span.badge');
    if (deviceBadge && typeof devices !== 'undefined') {
        const totalDevices = devices.length;
        deviceBadge.textContent = totalDevices;
    }

    // Update Transaction Dot (Active Indicator)
    const transactionDot = document.querySelector('.nav-item i.fa-receipt + span + span.rounded-full');
    if (transactionDot && typeof transactions !== 'undefined') {
        // Just ensure it's there or logic for highlighting
    }
}

// === INIT GLOBAL ELEMENTS ===
document.addEventListener('DOMContentLoaded', () => {
    setCurrentDate();
    updateSidebarStats();

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
