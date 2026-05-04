// Data Plans Configuration
const PLANS = {
    mtn: [{s:'500MB', p:500}, {s:'1GB', p:700}, {s:'2GB', p:1400}, {s:'3GB', p:2100}, {s:'5GB', p:3500}, {s:'10GB', p:7000}],
    glo: [{s:'250MB', p:250}, {s:'1GB', p:470}, {s:'2GB', p:940}, {s:'3GB', p:1410}, {s:'5GB', p:2350}, {s:'10GB', p:4700}],
    airtel: [{s:'500MB', p:500}, {s:'1GB', p:850}, {s:'2GB', p:1700}, {s:'3GB', p:2550}, {s:'5GB', p:4250}, {s:'10GB', p:8500}],
    '9mobile': [{s:'500MB', p:170}, {s:'1GB', p:350}, {s:'2GB', p:650}, {s:'3GB', p:1000}, {s:'5GB', p:1800}, {s:'10GB', p:3500}]
};

let current = { mode: 'data', net: '', cost: 0 };

// Initialize: Check for saved data
window.onload = () => {
    const savedPhone = localStorage.getItem('userPhone');
    if (savedPhone) {
        document.getElementById('phone').value = savedPhone;
        document.getElementById('remember-me').checked = true;
    }
};

function setMode(m) {
    current.mode = m;
    document.getElementById('tab-data').classList.toggle('active', m === 'data');
    document.getElementById('tab-airtime').classList.toggle('active', m === 'airtime');
    document.getElementById('data-group').style.display = m === 'data' ? 'block' : 'none';
    document.getElementById('airtime-group').style.display = m === 'airtime' ? 'block' : 'none';
    calculate();
}

function selectNet(n, el) {
    current.net = n;
    document.querySelectorAll('.net-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    
    const select = document.getElementById('plan-select');
    select.innerHTML = PLANS[n].map(p => `<option value="${p.p}">${p.s} - ₦${p.p}</option>`).join('');
    calculate();
}

function calculate() {
    if (current.mode === 'data') {
        current.cost = document.getElementById('plan-select').value || 0;
    } else {
        current.cost = document.getElementById('air-amt').value || 0;
    }
    document.getElementById('total-view').innerText = `₦${current.cost}`;
}

function handleCheckout() {
    const num = document.getElementById('phone').value.trim();
    const shouldRemember = document.getElementById('remember-me').checked;
    
    if(!current.net || !current.cost || num.length < 11 || isNaN(num)) {
        return alert("Please select a network, plan/amount, and a valid 11-digit phone number!");
    }

    // Save or Remove phone number from storage
    if (shouldRemember) {
        localStorage.setItem('userPhone', num);
    } else {
        localStorage.removeItem('userPhone');
    }
    
    const type = current.mode.toUpperCase();
    const pkg = current.mode === 'data' 
        ? document.getElementById('plan-select').options[document.getElementById('plan-select').selectedIndex].text 
        : `₦${current.cost} Airtime`;
    
    const message = `*EMRALD ORDER*\n------------------\n*Type:* ${type}\n*Net:* ${current.net.toUpperCase()}\n*Plan:* ${pkg}\n*Num:* ${num}\n*Total:* ₦${current.cost}\n------------------\n_Hello, I want to pay for this._`;
    
    window.open(`https://wa.me/23409035717189?text=${encodeURIComponent(message)}`, '_blank');
}

// Theme Switcher Logic
const themeBtn = document.getElementById('theme-toggle');
let isDark = false;
themeBtn.onclick = () => {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeBtn.innerHTML = isDark 
        ? '<i data-lucide="sun" style="width: 16px;"></i>' 
        : '<i data-lucide="moon" style="width: 16px;"></i>';
    lucide.createIcons();
};

lucide.createIcons();
