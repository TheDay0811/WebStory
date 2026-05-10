import os
import re

header_html = """        <header class="top-header">
            <div class="search-bar">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#9CA3AF"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                <input type="text" class="global-search-input" placeholder="Quick search...">
            </div>
            <div class="user-profile">
                <button class="icon-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>
                </button>
                <button class="icon-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </button>
                <div style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                    <img src="../assets/default_avatar.png" alt="Admin">
                    <span style="font-size: 14px; font-weight: 500;">Admin</span>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
                </div>
            </div>
        </header>"""

directory = r"d:\web\games\hoanglong\html"
for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Regex to find the header block and replace it
        new_content = re.sub(r'<header class="top-header">.*?</header>', header_html, content, flags=re.DOTALL)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
print("Done")
