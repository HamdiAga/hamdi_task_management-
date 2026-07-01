const headerCSS = `
header {
    background-color: #2c3e50;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    position: sticky;
    top: 0;
    z-index: 1000;
}
.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 1.5rem;
}
.logo {
    font-size: 1.3rem;
    font-weight: 700;
    color: white;
    text-decoration: none;
    white-space: nowrap;
}
.logo:hover {
    color: #f1c40f;
}
.nav-links {
    display: flex;
    list-style: none;
    gap: 6px;
    margin: 0;
    padding: 0;
}
.dropdown {
    position: relative;
}
.dropbtn {
    background: none;
    border: none;
    font-family: 'Cairo', sans-serif;
    font-size: 0.8rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
    padding: 0.4rem 0.6rem;
    transition: all 0.3s ease;
    white-space: nowrap;
}
.dropbtn:hover {
    color: #f1c40f;
}
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #fff;
    min-width: 280px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    z-index: 1;
    top: 100%;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    border-radius: 4px;
    overflow: hidden;
}
.dropdown-content a {
    color: #333;
    padding: 10px 14px;
    text-decoration: none;
    display: block;
    transition: all 0.3s ease;
    border-bottom: 1px solid #eee;
    font-size: 0.9rem;
    text-align: center;
}
.dropdown-content a:last-child {
    border-bottom: none;
}
.dropdown-content a:hover {
    background-color: #f1f1f1;
    color: #3498db;
}
.show {
    display: block;
}

@media (max-width: 768px) {
    .nav-container {
        flex-direction: column;
        gap: 8px;
        padding: 0.5rem 1rem;
    }
    .logo {
        font-size: 1.1rem;
    }
    .nav-links {
        flex-direction: row;
        justify-content: center;
        width: 100%;
        gap: 4px;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 4px;
    }
    .dropbtn {
        font-size: 0.7rem;
        padding: 0.3rem 0.5rem;
    }
    .dropdown-content {
        position: static;
        width: 100%;
        box-shadow: none;
        border: 1px solid #eee;
        min-width: unset;
        left: auto;
        transform: none;
    }
}`;

const footerCSS = `
footer {
    background-color: #2c3e50;
    color: white;
    text-align: center;
    padding: 30px 20px;
    margin-top: 60px;
    font-family: 'Cairo', sans-serif;
}
.footer-content p {
    margin: 0;
    font-size: 0.95rem;
}`;

(function injectCSS() {
    const style = document.createElement('style');
    style.textContent = headerCSS + '\n' + footerCSS;
    document.head.appendChild(style);
})();

function loadComponent(url, placeholderId, callback) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(placeholderId).innerHTML = html;
            if (callback) callback();
        })
        .catch(err => console.error('خطأ في تحميل ' + url, err));
}

function toggleDropdown(id) {
    const dropdowns = document.querySelectorAll(".dropdown-content");
    dropdowns.forEach(drop => {
        if (drop.id !== id) {
            drop.classList.remove('show');
        }
    });
    document.getElementById(id).classList.toggle("show");
}

document.addEventListener('click', function(event) {
    if (!event.target.closest('.dropbtn')) {
        document.querySelectorAll('.dropdown-content').forEach(drop => {
            drop.classList.remove('show');
        });
    }
});

document.addEventListener('click', function(event) {
    const btn = event.target.closest('.dropbtn');
    if (btn) {
        const dropdownId = btn.nextElementSibling?.id;
        if (dropdownId) {
            toggleDropdown(dropdownId);
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    loadComponent('header.html', 'header-placeholder');
    loadComponent('footer.html', 'footer-placeholder');
});
