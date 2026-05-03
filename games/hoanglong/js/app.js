// Hoang Long HRM - Main App Logic

// Toast Notification System
window.showToast = function(title, message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let iconSvg = '';
    if (type === 'success') {
        iconSvg = `<svg class="toast-icon toast-success-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
    } else if (type === 'error') {
        iconSvg = `<svg class="toast-icon toast-error-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
    } else {
        iconSvg = `<svg class="toast-icon toast-info-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`;
    }

    toast.innerHTML = `
        ${iconSvg}
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Auto remove after 5 seconds
    const timeoutId = setTimeout(() => {
        removeToast(toast);
    }, 5000);

    // Close button click
    toast.querySelector('.toast-close').addEventListener('click', () => {
        clearTimeout(timeoutId);
        removeToast(toast);
    });

    function removeToast(t) {
        t.classList.remove('show');
        setTimeout(() => {
            if (t.parentNode) t.parentNode.removeChild(t);
        }, 500); // Wait for transition
    }
};
// 1. Khởi tạo Database Sync với LocalStorage
// Xóa localStorage cũ để nạp bản update có expiryDate
if (localStorage.getItem('hoanglong_db_version') !== 'v2') {
    localStorage.removeItem('hoanglong_db');
    localStorage.setItem('hoanglong_db_version', 'v2');
}

let localDB = JSON.parse(localStorage.getItem('hoanglong_db'));
if (!localDB || localDB.length < employeeDB.length) {
    localStorage.setItem('hoanglong_db', JSON.stringify(employeeDB));
    window.currentDB = employeeDB;
} else {
    // Merge new hardcoded data if any IDs don't exist
    employeeDB.forEach(emp => {
        if (!localDB.find(l => l.id === emp.id)) {
            localDB.push(emp);
        }
    });
    window.currentDB = localDB;
    localStorage.setItem('hoanglong_db', JSON.stringify(window.currentDB));
}

window.saveDatabase = function() {
    localStorage.setItem('hoanglong_db', JSON.stringify(window.currentDB));
    localStorage.setItem('hoanglong_status_logs', JSON.stringify(window.statusChangesDB));
};

let localLogs = JSON.parse(localStorage.getItem('hoanglong_status_logs'));
if (!localLogs) {
    localLogs = [];
    localStorage.setItem('hoanglong_status_logs', JSON.stringify(localLogs));
}
window.statusChangesDB = localLogs;

// Utils
function getUniqueDepts() { return [...new Set(window.currentDB.map(e => e.department))]; }
function getUniqueRoles() { return [...new Set(window.currentDB.map(e => e.role))]; }
function getUniqueStatuses() { return [...new Set(window.currentDB.map(e => e.status))]; }

// Global Actions for UI
window.toggleActionMenu = function(e, id) {
    e.stopPropagation();
    // Close all other dropdowns
    document.querySelectorAll('.action-dropdown.show').forEach(el => {
        if (el.id !== `dropdown-${id}`) el.classList.remove('show');
    });
    // Toggle target dropdown
    document.getElementById(`dropdown-${id}`).classList.toggle('show');
};

window.deleteEmployee = function(id) {
    if (confirm(`Bạn có chắc chắn muốn xóa nhân viên có ID: ${id}? Thao tác này không thể hoàn tác.`)) {
        window.currentDB = window.currentDB.filter(emp => emp.id !== id);
        window.saveDatabase();
        alert('Đã xóa nhân viên thành công.');
        window.location.reload();
    }
};

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
    document.querySelectorAll('.action-dropdown.show').forEach(el => el.classList.remove('show'));
});

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    // --- DASHBOARD LOGIC ---
    if (path.includes('dashboard.html')) {
        const totalEmp = window.currentDB.length;
        const activeEmp = window.currentDB.filter(emp => emp.status === 'Đang công tác' || emp.status === 'Đang Thực Tập').length;
        const leaveEmp = totalEmp - activeEmp;
        const activeRate = totalEmp > 0 ? ((activeEmp / totalEmp) * 100).toFixed(1) : 0;

        document.getElementById('totalEmployees').textContent = totalEmp;
        document.getElementById('activeRate').textContent = activeRate + ' %';
        document.getElementById('leaveEmployees').textContent = leaveEmp;
        
        // Cập nhật ngày tháng thực tế
        const dateDisplay = document.getElementById('currentDateDisplay');
        if (dateDisplay) {
            const now = new Date();
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            dateDisplay.textContent = now.toLocaleDateString('en-US', options);
        }
    }

    // --- DIRECTORY (INDEX) LOGIC ---
    if (path.includes('index.html')) {
        const tableBody = document.getElementById('employeeTableBody');
        const searchInput = document.querySelector('.search-input-box');
        const globalSearchInput = document.querySelector('.global-search-input');
        const filters = document.querySelectorAll('.controls-bar select');
        
        // Populate dropdowns
        if (filters.length >= 2) {
            const statusFilter = filters[0];
            const deptFilter = filters[1];
            
            statusFilter.innerHTML = '<option value="">Tất cả trạng thái</option>';
            getUniqueStatuses().forEach(s => {
                statusFilter.innerHTML += `<option value="${s}">${s}</option>`;
            });

            deptFilter.innerHTML = '<option value="">Tất cả phòng ban</option>';
            getUniqueDepts().forEach(d => {
                deptFilter.innerHTML += `<option value="${d}">${d}</option>`;
            });

            statusFilter.addEventListener('change', renderTable);
            deptFilter.addEventListener('change', renderTable);
        }
        
        if (searchInput) searchInput.addEventListener('input', renderTable);
        if (globalSearchInput) {
            globalSearchInput.addEventListener('input', (e) => {
                if (searchInput) searchInput.value = e.target.value; // Sync with main search box
                renderTable();
            });
        }

        function renderTable() {
            if(!tableBody) return;
            tableBody.innerHTML = '';
            
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            const statusVal = filters[0] ? filters[0].value : '';
            const deptVal = filters[1] ? filters[1].value : '';

            let filteredDB = window.currentDB.filter(emp => {
                const matchSearch = emp.name.toLowerCase().includes(searchTerm) || emp.id.toLowerCase().includes(searchTerm) || emp.phone.includes(searchTerm);
                const matchStatus = statusVal === '' || emp.status === statusVal;
                const matchDept = deptVal === '' || emp.department === deptVal;
                return matchSearch && matchStatus && matchDept;
            });

            filteredDB.forEach(emp => {
                let statusClass = '';
                if (emp.status === 'Đang công tác') statusClass = 'status-active';
                else if (emp.status === 'Đã nghỉ việc') statusClass = 'status-resigned';
                else if (emp.status === 'Đang Thực Tập') statusClass = 'status-intern';
                else statusClass = 'status-fired';

                const row = document.createElement('tr');
                row.style.cursor = 'pointer';
                row.onclick = () => { window.location.href = `profile.html?id=${emp.id}`; };
                
                row.innerHTML = `
                    <td style="color: var(--text-muted); font-weight: 500;">${emp.id}</td>
                    <td>
                        <div class="employee-info">
                            <img src="${emp.avatar}" alt="${emp.name}">
                            <span class="employee-name">${emp.name}</span>
                        </div>
                    </td>
                    <td>
                        <div style="font-weight: 500;">${emp.department}</div>
                        <div class="employee-role">${emp.role}</div>
                    </td>
                    <td style="color: var(--text-muted);">${emp.phone}</td>
                    <td><span class="status-badge ${statusClass}">${emp.status}</span></td>
                    <td>
                        <div class="action-dropdown-container" onclick="event.stopPropagation()">
                            <button class="action-btn" onclick="window.toggleActionMenu(event, '${emp.id}')">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                            </button>
                            <div class="action-dropdown" id="dropdown-${emp.id}">
                                <a href="profile.html?id=${emp.id}" class="dropdown-item">
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                                    Xem hồ sơ
                                </a>
                                <a href="status.html?id=${emp.id}" class="dropdown-item">
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                                    Đổi trạng thái
                                </a>
                                <div class="dropdown-divider"></div>
                                <div class="dropdown-item text-danger" onclick="window.deleteEmployee('${emp.id}')">
                                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                                    Xóa nhân viên
                                </div>
                            </div>
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }
        renderTable();
    }

    // --- CONTRACTS LOGIC ---
    if (path.includes('contracts.html')) {
        const contractTableBody = document.getElementById('contractTableBody');
        
        function updateContractStats() {
            const totalEl = document.getElementById('totalContractsValue');
            const expiringSoonEl = document.getElementById('expiringSoonValue');
            const expiredEl = document.getElementById('expiredValue');

            if (!totalEl) return;

            let total = window.currentDB.length;
            let expiring = 0;
            let expired = 0;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            window.currentDB.forEach(emp => {
                if (emp.expiryDate && emp.expiryDate !== "Không thời hạn") {
                    const expParts = emp.expiryDate.split('/');
                    if (expParts.length === 3) {
                        const expiryDate = new Date(expParts[2], expParts[1] - 1, expParts[0]);
                        
                        if (emp.status === 'Đã nghỉ việc' || emp.status === 'Bị sa thải' || expiryDate < today) {
                            expired++;
                        } else if ((expiryDate - today) / (1000 * 60 * 60 * 24) <= 30) {
                            expiring++;
                        }
                    }
                }
            });

            totalEl.textContent = total.toLocaleString();
            expiringSoonEl.textContent = expiring.toLocaleString();
            expiredEl.textContent = expired.toLocaleString();
        }
        const typeFilter = document.getElementById('contractTypeFilter');
        const statusFilter = document.getElementById('contractStatusFilter');

        function renderContracts() {
            if (!contractTableBody) return;
            contractTableBody.innerHTML = '';

            const selectedType = typeFilter ? typeFilter.value : '';
            const selectedStatus = statusFilter ? statusFilter.value : '';

            window.currentDB.forEach((emp, index) => {
                // Mockup contract data
                const contractId = `HD-2023-${(800 + index).toString().padStart(4, '0')}`;
                const type = index % 3 === 0 ? 'Chính thức' : (index % 3 === 1 ? 'Thử việc' : 'Thời vụ');
                
                // Read expiry from database
                const expParts = (emp.expiryDate || "01/01/2000").split('/');
                const expiryDate = new Date(expParts[2], expParts[1]-1, expParts[0]);
                
                const today = new Date();
                today.setHours(0,0,0,0); // normalize today to midnight
                let statusText = 'Còn hiệu lực';
                let statusClass = 'status-active';
                
                // Trạng thái nghỉ việc/sa thải ưu tiên
                if (emp.status === 'Đã nghỉ việc' || emp.status === 'Bị sa thải' || expiryDate < today) {
                    statusText = 'Đã hết hạn';
                    statusClass = 'status-fired';
                } else if ((expiryDate - today) / (1000 * 60 * 60 * 24) <= 30) {
                    statusText = 'Sắp hết hạn';
                    statusClass = 'status-intern';
                }

                // --- BỘ LỌC (FILTER) ---
                if (selectedType && type !== selectedType) return;
                if (selectedStatus && statusText !== selectedStatus) return;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td style="color: var(--text-muted); font-weight: 500;">${contractId}</td>
                    <td>
                        <div class="employee-info">
                            <img src="${emp.avatar}" alt="${emp.name}">
                            <span class="employee-name">${emp.name}</span>
                        </div>
                    </td>
                    <td>${type}</td>
                    <td>${emp.joinDate}</td>
                    <td>${emp.expiryDate}</td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                    <td>
                        <button class="action-btn" onclick="alert('Xem chi tiết hợp đồng ${contractId}')">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                        </button>
                    </td>
                `;
                contractTableBody.appendChild(row);
            });
        }

        if (typeFilter) typeFilter.addEventListener('change', renderContracts);
        if (statusFilter) statusFilter.addEventListener('change', renderContracts);

        renderContracts();
        updateContractStats();
    }

    // --- PROFILE LOGIC ---
    if (path.includes('profile.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const empId = urlParams.get('id');
        let emp = window.currentDB.find(e => e.id === empId);
        
        // Nếu không có ID hoặc ID sai, lấy người đầu tiên làm mặc định
        if (!emp && window.currentDB.length > 0) {
            emp = window.currentDB[0];
            window.history.replaceState({}, '', `profile.html?id=${emp.id}`);
        }

        if (emp) {
            // Render Profile Header
            document.querySelector('.top-header span').textContent = emp.name;
            document.querySelector('.profile-name-area h2').textContent = emp.name;
            document.querySelector('.profile-role-tag').textContent = emp.role;
            document.querySelector('.profile-avatar-large').src = emp.avatar;
            document.querySelector('.meta-item:nth-child(1) .meta-value').textContent = emp.id;
            document.querySelector('.meta-item:nth-child(2) .meta-value').textContent = emp.joinDate;
            
            // Render Status badges
            const badgeContainer = document.querySelector('.profile-name-area div[style*="margin-top:10px"]');
            let statusClass = 'status-fired';
            if (emp.status === 'Đang công tác') statusClass = 'status-active';
            else if (emp.status === 'Đã nghỉ việc') statusClass = 'status-resigned';
            else if (emp.status === 'Đang Thực Tập') statusClass = 'status-intern';
            
            badgeContainer.innerHTML = `
                <span class="status-badge ${statusClass}">${emp.status.toUpperCase()}</span>
                <span class="status-badge status-resigned">${emp.department.toUpperCase()}</span>
            `;

            // Contact Info
            const contactVals = document.querySelectorAll('.left-col .detail-value');
            if(contactVals.length >= 3) {
                contactVals[0].textContent = emp.email;
                contactVals[1].textContent = emp.phone;
                contactVals[2].textContent = emp.address;
            }

            // Personal, Emergency & Bank Info (All inside .right-col .form-section .detail-value)
            const rightVals = document.querySelectorAll('.right-col .form-section .detail-value');
            if(rightVals.length >= 9) {
                // Personal Details
                rightVals[0].textContent = emp.name;
                rightVals[1].textContent = emp.dob;
                rightVals[2].textContent = emp.gender;
                rightVals[3].textContent = "Việt Nam";
                rightVals[4].textContent = emp.nationalId;
                rightVals[5].textContent = "Độc thân"; // mockup
                
                // Emergency Contact -> Thay bằng SĐT cá nhân theo yêu cầu
                rightVals[6].textContent = emp.phone;

                // Bank Information
                rightVals[7].textContent = emp.bankName;
                rightVals[8].textContent = emp.bankAccount;
            }
        }

        // Tabs switching logic
        const tabs = document.querySelectorAll('.profile-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                // Mockup switch content
                const formSections = document.querySelectorAll('.right-col .form-section');
                if (tab.textContent === 'Personal Info') {
                    formSections.forEach(fs => fs.style.display = 'block');
                } else {
                    formSections.forEach(fs => fs.style.display = 'none');
                    // Add dummy content
                    if (!document.getElementById('dummy-content')) {
                        const dummy = document.createElement('div');
                        dummy.id = 'dummy-content';
                        dummy.className = 'form-section';
                        document.querySelector('.right-col').appendChild(dummy);
                    }
                    document.getElementById('dummy-content').style.display = 'block';
                    document.getElementById('dummy-content').innerHTML = `
                        <div class="section-header"><h3>${tab.textContent}</h3></div>
                        <p style="color:var(--text-muted); font-size:14px; text-align:center; padding: 40px 0;">Đang tải dữ liệu từ hệ thống ERP...</p>
                    `;
                }
            });
        });
    }

    // --- ADD EMPLOYEE LOGIC ---
    if (path.includes('add-employee.html')) {
        const deptSelect = document.querySelector('.form-group select:nth-of-type(1)');
        const roleSelect = document.querySelectorAll('.form-group select')[1];
        
        if (deptSelect && roleSelect) {
            deptSelect.innerHTML = '<option value="">Chọn phòng ban...</option>';
            getUniqueDepts().forEach(d => deptSelect.innerHTML += `<option value="${d}">${d}</option>`);
            
            roleSelect.innerHTML = '<option value="">Chọn chức vụ...</option>';
            getUniqueRoles().forEach(r => roleSelect.innerHTML += `<option value="${r}">${r}</option>`);
        }

        const saveBtn = document.querySelector('.btn-primary[style*="height:50px"]');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const inputs = document.querySelectorAll('.form-control');
                const name = inputs[0].value;
                const dobInput = inputs[1].value;
                const phone = inputs[2].value;
                const email = inputs[3].value;
                const nationalId = inputs[4].value;
                const address = inputs[5].value;
                const bankName = inputs[6].value;
                const bankAccount = inputs[7].value;
                const dept = inputs[8].value;
                const role = inputs[9].value;
                const joinDateInput = inputs[10].value;
                const expiryDateInput = inputs[11].value;
                
                if (!name || !phone || !dept || !nationalId || !joinDateInput) {
                    alert("Vui lòng điền các trường bắt buộc (*): Họ tên, SĐT, CCCD, Phòng ban, Ngày vào làm");
                    return;
                }

                // Helper to format YYYY-MM-DD to DD/MM/YYYY
                const fmtDate = (d) => {
                    if(!d) return "";
                    const pts = d.split('-');
                    return `${pts[2]}/${pts[1]}/${pts[0]}`;
                };

                // Generate ID
                const newIdNum = 1100 + window.currentDB.length + 1;
                const newId = "TL-" + newIdNum;

                const newEmp = {
                    id: newId,
                    name: name,
                    department: dept,
                    role: role || "Nhân viên mới",
                    phone: phone,
                    email: email || `${name.split(' ').pop().toLowerCase()}@tllogistics.vn`,
                    status: "Đang công tác",
                    avatar: "../assets/default_avatar.png",
                    joinDate: fmtDate(joinDateInput),
                    dob: fmtDate(dobInput) || "01/01/2000",
                    gender: document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').parentElement.textContent.trim() : "Khác",
                    nationalId: nationalId,
                    address: address || "Chưa cập nhật",
                    bankName: bankName || "Chưa cập nhật",
                    bankAccount: bankAccount || "Chưa cập nhật",
                    expiryDate: fmtDate(expiryDateInput) || "Không thời hạn"
                };

                window.currentDB.push(newEmp);
                window.saveDatabase();
                alert(`Đã lưu thành công nhân sự: ${name} (${newId})`);
                window.location.href = "index.html";
            });
        }
    }

    // --- STATUS & DISCIPLINE LOGIC ---
    if (path.includes('status.html')) {
        const actionCards = document.querySelectorAll('.action-card');
        const empInput = document.querySelector('.form-control');
        const commitBtn = document.querySelector('.status-change-card .btn-primary');
        const clearBtn = document.querySelectorAll('.status-change-card .btn-outline')[0]; 
        let selectedStatus = 'Đang công tác';

        // 1. Nhận diện ID từ URL (nếu bấm từ trang index)
        const urlParams = new URLSearchParams(window.location.search);
        const targetId = urlParams.get('id');
        let selectedEmp = null;

        if (targetId && empInput) {
            selectedEmp = window.currentDB.find(e => e.id === targetId);
            if (selectedEmp) {
                empInput.value = `${selectedEmp.id} - ${selectedEmp.name}`;
                empInput.disabled = true; // Khóa ô nhập liệu vì đã chọn đích danh
                selectedStatus = selectedEmp.status; // Lấy trạng thái hiện tại
                
                // Cập nhật giao diện Action Cards
                actionCards.forEach(c => c.classList.remove('active'));
                if (selectedStatus === 'Đang công tác' || selectedStatus === 'Đang Thực Tập') {
                    actionCards[0].classList.add('active'); // Return to Active
                    selectedStatus = 'Đang công tác';
                } else if (selectedStatus === 'Đã nghỉ việc') {
                    actionCards[1].classList.add('active'); // Resigned
                } else if (selectedStatus === 'Bị sa thải') {
                    actionCards[2].classList.add('active'); // Dismissed
                }
            }
        }

        // Chọn thẻ trạng thái
        actionCards.forEach(card => {
            card.addEventListener('click', () => {
                actionCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                const text = card.querySelector('span').textContent;
                if (text === 'Return to Active') selectedStatus = 'Đang công tác';
                else if (text === 'Resigned (Voluntary)') selectedStatus = 'Đã nghỉ việc';
                else selectedStatus = 'Bị sa thải';
            });
        });

        // Xử lý khi bấm nút "Commit Change"
        if (commitBtn) {
            commitBtn.addEventListener('click', () => {
                const reason = document.querySelector('textarea').value;
                
                let empToUpdate = selectedEmp;
                
                // Nếu không đi từ URL mà tự gõ tay vào ô
                if (!empToUpdate) {
                    const query = empInput.value.toLowerCase().trim();
                    if (!query) return alert("Vui lòng nhập tên hoặc mã nhân viên!");
                    empToUpdate = window.currentDB.find(e => 
                        e.id.toLowerCase() === query || 
                        e.id.toLowerCase().includes(query) || 
                        e.name.toLowerCase().includes(query)
                    );
                }

                if (empToUpdate) {
                    const oldStatus = empToUpdate.status;
                    empToUpdate.status = selectedStatus;
                    
                    // Logic tính ngày hợp đồng (Yêu cầu 3)
                    const today = new Date();
                    if (selectedStatus === 'Đã nghỉ việc' || selectedStatus === 'Bị sa thải') {
                        // Cập nhật hợp đồng hết hạn vào hôm nay
                        empToUpdate.expiryDate = today.toLocaleDateString('vi-VN', {day: '2-digit', month:'2-digit', year:'numeric'});
                    } else if (selectedStatus === 'Đang công tác' && (oldStatus === 'Đã nghỉ việc' || oldStatus === 'Bị sa thải')) {
                        // Gia hạn thêm 1 năm từ hôm nay
                        const nextYear = new Date(today);
                        nextYear.setFullYear(today.getFullYear() + 1);
                        empToUpdate.expiryDate = nextYear.toLocaleDateString('vi-VN', {day: '2-digit', month:'2-digit', year:'numeric'});
                    }
                    
                    // Thêm vào lịch sử
                    const now = new Date();
                    window.statusChangesDB.unshift({
                        empId: empToUpdate.id,
                        empName: empToUpdate.name,
                        oldStatus: oldStatus,
                        newStatus: selectedStatus,
                        reason: reason || 'Không có',
                        date: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                        timestamp: now.getTime()
                    });
                    
                    window.saveDatabase(); // Lưu vào bộ nhớ cục bộ
                    alert(`Đã cập nhật trạng thái của ${empToUpdate.name} thành "${selectedStatus}"!\nLý do: ${reason || 'Không có'}`);
                    window.location.href = "status.html"; // Chuyển về trang status để xem bảng
                } else {
                    alert("Không tìm thấy nhân viên nào khớp với thông tin!");
                }
            });
        }
        
        // Nút Cancel / Clear
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (selectedEmp) {
                    window.location.href = "status.html"; // Xóa URL params để gõ tay người khác
                } else {
                    empInput.value = "";
                    document.querySelector('textarea').value = "";
                }
            });
        }

        // --- Render Recent Changes Table ---
        const recentBody = document.getElementById('recentChangesBody');
        if (recentBody) {
            recentBody.innerHTML = '';
            // Render tối đa 10 dòng mới nhất
            const recentLogs = window.statusChangesDB.slice(0, 10);
            
            if (recentLogs.length === 0) {
                recentBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">Chưa có dữ liệu thay đổi trạng thái</td></tr>`;
            } else {
                recentLogs.forEach(log => {
                    let badgeClass = 'status-active';
                    let statusLabel = 'Active';
                    
                    if (log.newStatus === 'Đã nghỉ việc') {
                        badgeClass = 'status-resigned';
                        statusLabel = 'Resigned';
                    } else if (log.newStatus === 'Bị sa thải') {
                        badgeClass = 'status-fired';
                        statusLabel = 'Dismissed';
                    }

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><div class="employee-name">${log.empName}</div></td>
                        <td>${log.empId}</td>
                        <td>${log.date}</td>
                        <td><span class="status-badge ${badgeClass}">${statusLabel}</span></td>
                        <td><button class="action-btn" onclick="alert('Lý do: ${log.reason}')"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg></button></td>
                    `;
                    recentBody.appendChild(row);
                });
            }
        }
    }
});
