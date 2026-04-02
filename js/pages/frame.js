// === FRAME PAGE LOGIC ===

function initFramePage() {
    // Add logic for frame management here
    console.log('Frame management page initialized');
}

// Automatically init page if we're on the frame page
document.addEventListener('DOMContentLoaded', () => {
    // Check for a specific element that exists only in frame.html
    if (document.querySelector('h2').textContent.includes('Koleksi Frame')) {
        initFramePage();
    }
});
