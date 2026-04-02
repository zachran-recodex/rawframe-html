// === LANGGANAN PAGE LOGIC ===

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

// Automatically init page if we're on the langganan page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('langgananChart')) {
        initLanggananPage();
    }
});
