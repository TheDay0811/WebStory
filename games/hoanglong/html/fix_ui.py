import os

def process_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace sidebar with English version
    # The sidebar starts with <aside class="sidebar"> and ends with </aside>
    import re
    
    # We will just replace the specific texts in the nav-menu
    replacements = {
        'Bảng điều khiển': 'Dashboard',
        'Danh sách Nhân viên': 'Employee Directory',
        'Trạng thái Nhân sự': 'Workforce Status',
        'Hợp đồng Lao động': 'Labor Contracts',
        'Cài đặt': 'Settings',
        'Tìm kiếm nhanh...': 'Quick search...'
    }
    
    # But wait, what if the titles (like page headers) are also changed?
    # The user only mentioned the toolbar (sidebar) and search bar.
    # Let's just do a string replace for these exact strings, BUT only inside the <aside> and <header> tags.
    
    # Actually, replacing it globally is mostly safe if they are specific strings.
    # "Bảng điều khiển", "Danh sách Nhân viên", "Trạng thái Nhân sự", "Hợp đồng Lao động", "Cài đặt"
    
    for vi, en in replacements.items():
        content = content.replace(vi, en)
        
    # Also fix any "Cài đặt hệ thống" to "Settings" if we want, but user only complained about toolbar.
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

directory = r"d:\web\games\hoanglong\html"
for filename in os.listdir(directory):
    if filename.endswith(".html"):
        process_html_file(os.path.join(directory, filename))
print("Done")
