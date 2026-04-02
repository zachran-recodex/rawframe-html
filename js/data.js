const transactions = [
    { 
        id: 'cmnhr9bg7281', 
        time: '3 Apr 2026, 00.35', 
        device: 'Trial Device', 
        amount: 0, 
        status: 'success', 
        photoSession: 'completed', 
        result: 'https://picsum.photos/seed/rf1/200/300' 
    },
    { 
        id: 'cmnhkd72wlkj', 
        time: '2 Apr 2026, 21.22', 
        device: 'Trial Device', 
        amount: 0, 
        status: 'success', 
        photoSession: 'capturing', 
        result: null 
    },
    { 
        id: 'cmnhkbv9po12', 
        time: '2 Apr 2026, 21.21', 
        device: 'Trial Device', 
        amount: 0, 
        status: 'success', 
        photoSession: 'completed', 
        result: 'https://picsum.photos/seed/rf3/200/300' 
    },
    { 
        id: 'cmnhk3psxs89', 
        time: '2 Apr 2026, 21.14', 
        device: 'Trial Device', 
        amount: 0, 
        status: 'success', 
        photoSession: 'completed', 
        result: 'https://picsum.photos/seed/rf4/200/300' 
    },
];

const devices = [
    { 
        name: 'Trial Device', 
        location: 'Online', 
        status: 'online', 
        sessions: 4, 
        subscriptionsUntil: '5/4/2026', 
        code: 'TRIAL-NWRLHU', 
        transactions: 4, 
        lastActive: '3 Apr 2026, 00.35', 
        boothUrl: 'https://booth.rawframe.id/booth/TRIAL-NWRLHU' 
    },
    { 
        name: 'Booth Alpha', 
        location: 'Mall Central Park', 
        status: 'online', 
        sessions: 42,
        subscriptionsUntil: '12/12/2026',
        code: 'ALPH-123456',
        transactions: 42,
        lastActive: '3 Apr 2026, 14.32',
        boothUrl: 'https://booth.rawframe.id/booth/ALPH-123456'
    },
    { 
        name: 'Booth Beta', 
        location: 'Grand Indonesia', 
        status: 'online', 
        sessions: 38,
        subscriptionsUntil: '15/10/2026',
        code: 'BETA-987654',
        transactions: 38,
        lastActive: '3 Apr 2026, 14.28',
        boothUrl: 'https://booth.rawframe.id/booth/BETA-987654'
    },
    { 
        name: 'Booth Gamma', 
        location: 'Plaza Senayan', 
        status: 'offline', 
        sessions: 15,
        subscriptionsUntil: '20/08/2026',
        code: 'GAMM-456123',
        transactions: 15,
        lastActive: '3 Apr 2026, 14.15',
        boothUrl: 'https://booth.rawframe.id/booth/GAMM-456123'
    },
    { 
        name: 'Booth Delta', 
        location: 'Kota Kasablanka', 
        status: 'online', 
        sessions: 31,
        subscriptionsUntil: '05/11/2026',
        code: 'DELT-789012',
        transactions: 31,
        lastActive: '3 Apr 2026, 14.02',
        boothUrl: 'https://booth.rawframe.id/booth/DELT-789012'
    },
    { 
        name: 'Booth Epsilon', 
        location: 'Pondok Indah Mall', 
        status: 'offline', 
        sessions: 0,
        subscriptionsUntil: '01/05/2026',
        code: 'EPSI-345678',
        transactions: 0,
        lastActive: '2 Apr 2026, 23.50',
        boothUrl: 'https://booth.rawframe.id/booth/EPSI-345678'
    },
];

const activities = [
    { icon: 'fa-plug-circle-check', color: '#22C55E', bg: 'rgba(34,197,94,0.1)', text: 'Booth Alpha terhubung kembali', time: '5 menit lalu' },
    { icon: 'fa-crown', color: '#A855F7', bg: 'rgba(168,85,247,0.1)', text: 'Langganan baru dari Rina Sari', time: '12 menit lalu' },
    { icon: 'fa-ticket', color: '#FF6B2B', bg: 'rgba(255,107,43,0.1)', text: 'Voucher DISKON20 digunakan 3x', time: '25 menit lalu' },
    { icon: 'fa-triangle-exclamation', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', text: 'Kertas Booth Epsilon hampir habis', time: '34 menit lalu' },
    { icon: 'fa-receipt', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', text: 'Pembayaran Rp 450.000 berhasil', time: '1 jam lalu' },
];

const subscriptionHistory = [
    { device: 'Trial Device', code: 'TRIAL-NWRLHU', duration: '1 Bulan', amount: 0, status: 'Aktif', expiry: '5/4/2026', date: '2 Apr 2026, 21.12' },
    { device: 'Booth Alpha', code: 'ALPH-123456', duration: '12 Bulan', amount: 420000, status: 'Selesai', expiry: '12/12/2026', date: '12 Dec 2025, 09.45' },
    { device: 'Booth Beta', code: 'BETA-987654', duration: '6 Bulan', amount: 240000, status: 'Selesai', expiry: '15/10/2026', date: '15 Apr 2026, 11.20' },
];
