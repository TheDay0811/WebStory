/**
 * TÀI XỈU VIP - Chương Văn Đại
 * Stripped version: no story, no modals, just play
 */
(function () {
    'use strict';

    const STATE = {
        balance: 100000000,
        initialBalance: 100000000,
        selectedChip: 500000,
        selectedSide: null,
        currentBet: 0,
        isRolling: false,
        countdown: 15,
        sessionId: 1,
        wins: 0,
        losses: 0,
        totalGames: 0,
        history: [],
        dotHistory: [],
        streakWin: 0,
        streakLose: 0,
        countdownInterval: null
    };

    const DICE_HTML = [
        '<div class="dice-face f1"><span class="d-dot"></span></div>',
        '<div class="dice-face f2"><span class="d-dot"></span><span class="d-dot"></span></div>',
        '<div class="dice-face f3"><span class="d-dot"></span><span class="d-dot"></span><span class="d-dot"></span></div>',
        '<div class="dice-face f4"><span class="d-dot"></span><span class="d-dot"></span><span class="d-dot"></span><span class="d-dot"></span></div>',
        '<div class="dice-face f5"><span class="d-dot"></span><span class="d-dot"></span><span class="d-dot"></span><span class="d-dot"></span><span class="d-dot"></span></div>',
        '<div class="dice-face f6"><span class="d-dot"></span><span class="d-dot"></span><span class="d-dot"></span><span class="d-dot"></span><span class="d-dot"></span><span class="d-dot"></span></div>'
    ];

    const $ = s => document.querySelector(s);
    const $$ = s => document.querySelectorAll(s);

    const el = {
        balance: $('#balance'),
        sessionId: $('#sessionId'),
        countdown: $('#countdown'),
        taiSide: $('#taiSide'),
        xiuSide: $('#xiuSide'),
        taiPlayers: $('#taiPlayers'),
        xiuPlayers: $('#xiuPlayers'),
        dice1: $('#dice1'),
        dice2: $('#dice2'),
        dice3: $('#dice3'),
        totalDisplay: $('#totalDisplay'),
        totalValue: $('#totalValue'),
        resultDisplay: $('#resultDisplay'),
        resultText: $('#resultText'),
        taiBet: $('#taiBet'),
        xiuBet: $('#xiuBet'),
        historyDots: $('#historyDots'),
        betBtn: $('#betBtn'),
        allInBtn: $('#allInBtn'),
        cancelBtn: $('#cancelBtn'),
        winCount: $('#winCount'),
        loseCount: $('#loseCount'),
        gameCount: $('#gameCount'),
        profitLoss: $('#profitLoss'),
        trendChart: $('#trendChart'),
        warningModal: $('#warningModal'),
        warningOkBtn: $('#warningOkBtn'),
        profileBtn: $('#profileBtn'),
        pinModal: $('#pinModal'),
        pinInputs: $$('.pin-input'),
        pinCancelBtn: $('#pinCancelBtn'),
        pinConfirmBtn: $('#pinConfirmBtn'),
        pinError: $('#pinError')
    };

    function init() {
        bindEvents();
        initDots();
        fakePlayers();
        
        if (el.trendChart) {
            const ro = new ResizeObserver(() => drawChart());
            ro.observe(el.trendChart.parentElement);
        }
        
        startCountdown();
    }

    function bindEvents() {
        el.taiSide.addEventListener('click', () => pick('tai'));
        el.xiuSide.addEventListener('click', () => pick('xiu'));
        el.betBtn.addEventListener('click', placeBet);
        el.allInBtn.addEventListener('click', allIn);
        el.cancelBtn.addEventListener('click', cancel);
        $$('.chip').forEach(c => c.addEventListener('click', () => {
            $$('.chip').forEach(x => x.classList.remove('active'));
            c.classList.add('active');
            STATE.selectedChip = parseInt(c.dataset.value);
        }));

        if (el.warningOkBtn) {
            el.warningOkBtn.addEventListener('click', () => {
                el.warningModal.classList.remove('active');
            });
        }

        if (el.profileBtn) {
            el.profileBtn.addEventListener('click', () => {
                el.pinModal.classList.add('active');
                el.pinInputs[0].focus();
                el.pinError.textContent = '';
                el.pinInputs.forEach(input => input.value = '');
            });
        }

        if (el.pinCancelBtn) {
            el.pinCancelBtn.addEventListener('click', () => {
                el.pinModal.classList.remove('active');
            });
        }

        if (el.pinInputs) {
            el.pinInputs.forEach((input, index) => {
                input.addEventListener('input', (e) => {
                    if (e.target.value.length === 1) {
                        if (index < el.pinInputs.length - 1) {
                            el.pinInputs[index + 1].focus();
                        }
                    }
                });
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Backspace' && e.target.value === '') {
                        if (index > 0) {
                            el.pinInputs[index - 1].focus();
                        }
                    } else if (e.key === 'Enter') {
                        el.pinConfirmBtn.click();
                    }
                });
            });
        }

        if (el.pinConfirmBtn) {
            el.pinConfirmBtn.addEventListener('click', () => {
                let pin = '';
                el.pinInputs.forEach(input => pin += input.value);
                
                if (pin.length < 4) {
                    el.pinError.textContent = 'Vui lòng nhập đủ 4 số!';
                    return;
                }
                
                // Mật khẩu là dai04041988 -> Mã PIN là 0404
                if (pin === '0404') {
                    window.location.href = 'secret.html';
                } else {
                    el.pinError.textContent = 'Mã PIN không chính xác!';
                    el.pinInputs.forEach(input => input.value = '');
                    el.pinInputs[0].focus();
                }
            });
        }
    }

    // ===== COUNTDOWN =====
    function startCountdown() {
        STATE.countdown = 15;
        el.countdown.textContent = STATE.countdown;
        el.resultDisplay.style.visibility = 'hidden';
        el.totalDisplay.style.visibility = 'hidden';

        clearInterval(STATE.countdownInterval);
        STATE.countdownInterval = setInterval(() => {
            STATE.countdown--;
            el.countdown.textContent = STATE.countdown;
            if (STATE.countdown <= 0) {
                clearInterval(STATE.countdownInterval);
                if (STATE.currentBet > 0 && STATE.selectedSide) {
                    roll();
                } else {
                    nextRound();
                }
            }
        }, 1000);
    }

    // ===== SIDE PICK =====
    function pick(side) {
        if (STATE.isRolling) return;
        STATE.selectedSide = side;
        el.taiSide.classList.toggle('selected', side === 'tai');
        el.xiuSide.classList.toggle('selected', side === 'xiu');
        el.betBtn.disabled = false;
    }

    // ===== BETTING =====
    function placeBet() {
        if (!STATE.selectedSide || STATE.isRolling) return;
        STATE.currentBet += STATE.selectedChip;
        updateBetDisplay();
        el.betBtn.textContent = `ĐẶT THÊM (${shortNum(STATE.currentBet)})`;
    }

    function allIn() {
        if (STATE.isRolling) return;
        if (!STATE.selectedSide) {
            el.taiSide.classList.add('shake');
            el.xiuSide.classList.add('shake');
            setTimeout(() => { el.taiSide.classList.remove('shake'); el.xiuSide.classList.remove('shake'); }, 400);
            return;
        }
        STATE.currentBet = Math.abs(STATE.balance) || STATE.initialBalance;
        updateBetDisplay();
        el.betBtn.textContent = `ALL-IN! (${shortNum(STATE.currentBet)})`;
    }

    function cancel() {
        if (STATE.isRolling) return;
        STATE.currentBet = 0;
        STATE.selectedSide = null;
        el.taiSide.classList.remove('selected');
        el.xiuSide.classList.remove('selected');
        el.taiBet.textContent = '0';
        el.xiuBet.textContent = '0';
        el.betBtn.textContent = 'ĐẶT CƯỢC';
        el.betBtn.disabled = true;
    }

    function updateBetDisplay() {
        if (STATE.selectedSide === 'tai') {
            el.taiBet.textContent = fmtMoney(STATE.currentBet);
            el.xiuBet.textContent = '0';
        } else {
            el.xiuBet.textContent = fmtMoney(STATE.currentBet);
            el.taiBet.textContent = '0';
        }
    }

    // ===== ROLL DICE =====
    function roll() {
        STATE.isRolling = true;
        el.betBtn.disabled = true;
        el.allInBtn.disabled = true;
        el.dice1.classList.add('rolling');
        el.dice2.classList.add('rolling');
        el.dice3.classList.add('rolling');

        let n = 0;
        const iv = setInterval(() => {
            el.dice1.innerHTML = DICE_HTML[Math.floor(Math.random() * 6)];
            el.dice2.innerHTML = DICE_HTML[Math.floor(Math.random() * 6)];
            el.dice3.innerHTML = DICE_HTML[Math.floor(Math.random() * 6)];
            if (++n > 20) { clearInterval(iv); resolve(riggedResult()); }
        }, 100);
    }

    // ===== RIGGED RESULT =====
    function riggedResult() {
        const choice = STATE.selectedSide;
        let chance = 0.28;

        if (STATE.streakWin >= 2) chance = 0.15;
        if (STATE.streakWin >= 3) chance = 0.08;
        if (STATE.streakLose >= 4) chance = 0.65;
        if (STATE.streakLose >= 6) chance = 0.85;
        if (STATE.balance < -50000000 && STATE.streakLose >= 3) chance = 0.5;
        if (STATE.totalGames < 5) chance = 0.6;

        const wins = Math.random() < chance;
        let d1, d2, d3, total;
        const wantTai = (wins && choice === 'tai') || (!wins && choice === 'xiu');

        do {
            d1 = Math.floor(Math.random() * 6) + 1;
            d2 = Math.floor(Math.random() * 6) + 1;
            d3 = Math.floor(Math.random() * 6) + 1;
            total = d1 + d2 + d3;
        } while (wantTai ? (total < 11 || total > 18) : (total < 3 || total > 10));

        return { d1, d2, d3, total, wins };
    }

    // ===== RESOLVE =====
    function resolve({ d1, d2, d3, total, wins }) {
        el.dice1.classList.remove('rolling');
        el.dice2.classList.remove('rolling');
        el.dice3.classList.remove('rolling');
        el.dice1.innerHTML = DICE_HTML[d1 - 1];
        el.dice2.innerHTML = DICE_HTML[d2 - 1];
        el.dice3.innerHTML = DICE_HTML[d3 - 1];

        el.totalDisplay.style.visibility = 'visible';
        el.totalValue.textContent = total;

        const side = total >= 11 ? 'tai' : 'xiu';
        addDot(side);

        STATE.history.push({ total, side });
        if (STATE.history.length > 30) STATE.history.shift();
        drawChart();

        if (STATE.currentBet > 0) {
            STATE.totalGames++;
            if (wins) {
                STATE.balance += STATE.currentBet;
                STATE.wins++; STATE.streakWin++; STATE.streakLose = 0;
                el.resultDisplay.style.visibility = 'visible';
                el.resultText.className = 'win';
                el.resultText.textContent = `+${fmtMoney(STATE.currentBet)}`;
                el.balance.classList.add('pulse');
            } else {
                STATE.balance -= STATE.currentBet;
                STATE.losses++; STATE.streakLose++; STATE.streakWin = 0;
                el.resultDisplay.style.visibility = 'visible';
                el.resultText.className = 'lose';
                el.resultText.textContent = `-${fmtMoney(STATE.currentBet)}`;
                el.balance.classList.add('shake');
            }
            updateBalance();
            updateStats();
        }

        setTimeout(() => { resetBet(); nextRound(); }, 2500);
    }

    function nextRound() {
        STATE.sessionId++;
        el.sessionId.textContent = `#${String(STATE.sessionId).padStart(6, '0')}`;
        STATE.isRolling = false;
        el.allInBtn.disabled = false;
        el.balance.classList.remove('pulse', 'shake');
        fakePlayers();
        startCountdown();
    }

    function resetBet() {
        STATE.currentBet = 0;
        STATE.selectedSide = null;
        el.taiSide.classList.remove('selected');
        el.xiuSide.classList.remove('selected');
        el.taiBet.textContent = '0';
        el.xiuBet.textContent = '0';
        el.betBtn.textContent = 'ĐẶT CƯỢC';
        el.betBtn.disabled = true;
    }

    // ===== UI UPDATES =====
    function updateBalance() {
        const abs = fmtMoney(Math.abs(STATE.balance));
        el.balance.textContent = STATE.balance < 0 ? `-${abs}₫` : `${abs}₫`;
        el.balance.classList.toggle('negative', STATE.balance < 0);
    }

    function updateStats() {
        el.winCount.textContent = STATE.wins;
        el.loseCount.textContent = STATE.losses;
        el.gameCount.textContent = STATE.totalGames;
        const p = STATE.balance - STATE.initialBalance;
        el.profitLoss.textContent = (p >= 0 ? '+' : '-') + fmtMoney(Math.abs(p)) + '₫';
        el.profitLoss.className = 'stat-num ' + (p >= 0 ? 'win' : 'lose');
    }

    function fakePlayers() {
        el.taiPlayers.textContent = (1800 + Math.floor(Math.random() * 500)).toLocaleString();
        el.xiuPlayers.textContent = (1500 + Math.floor(Math.random() * 500)).toLocaleString();
    }

    // ===== DOTS =====
    function initDots() {
        el.historyDots.innerHTML = '';
        for (let i = 0; i < 14; i++) {
            const d = document.createElement('div');
            d.className = 'dot empty';
            el.historyDots.appendChild(d);
        }
    }

    function addDot(side) {
        STATE.dotHistory.push(side);
        if (STATE.dotHistory.length > 14) STATE.dotHistory.shift();
        el.historyDots.innerHTML = '';
        for (let i = 0; i < 14; i++) {
            const d = document.createElement('div');
            d.className = i < STATE.dotHistory.length ? `dot ${STATE.dotHistory[i]}` : 'dot empty';
            el.historyDots.appendChild(d);
        }
    }

    // ===== CHART =====
    function drawChart() {
        const canvas = el.trendChart;
        if (!canvas) return;
        
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        
        const ctx = canvas.getContext('2d');
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        
        ctx.clearRect(0, 0, w, h);
        if (STATE.history.length === 0) return;
        
        // Grid lines
        ctx.strokeStyle = 'rgba(201, 168, 76, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = (i / 5) * h;
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }
        
        const pts = STATE.history;
        const stepX = w / Math.max(30, pts.length + 1);
        const startX = w - (pts.length * stepX) + stepX / 2;
        
        // Line
        ctx.beginPath();
        ctx.strokeStyle = '#c9a84c';
        ctx.lineWidth = 2;
        
        pts.forEach((pt, i) => {
            const x = startX + i * stepX;
            const y = h - ((pt.total - 3) / 15) * (h * 0.8) - h * 0.1;
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.stroke();
        
        // Points
        pts.forEach((pt, i) => {
            const x = startX + i * stepX;
            const y = h - ((pt.total - 3) / 15) * (h * 0.8) - h * 0.1;
            
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = pt.side === 'tai' ? '#e74c3c' : '#3498db';
            ctx.fill();
            ctx.strokeStyle = '#110d06';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            ctx.fillStyle = '#fff';
            ctx.font = '8px Inter';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(pt.total, x, y);
        });
    }

    // ===== UTILS =====
    function fmtMoney(n) { return n.toLocaleString('vi-VN'); }
    function shortNum(n) {
        if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
        if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
        if (n >= 1e3) return (n / 1e3).toFixed(0) + 'K';
        return n.toString();
    }

    document.addEventListener('DOMContentLoaded', init);
})();
