const burger = document.getElementById('floating-burger');
const chalkboard = document.querySelector('.chalkboard-content');

const quotes = [
    "Oh my god, so good.",
    "BEEF! It's what's for dinner.",
    "Don't tell Bob I'm here.",
    "Smash it like you mean it.",
    "Best poutine in Oka!",
    "Juicy, cheesy, smashy.",
    "Ask about Al's Secret Sauce!"
];

burger.addEventListener('click', () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const speechBubble = document.createElement('div');
    speechBubble.style.position = 'fixed';
    speechBubble.style.bottom = '140px';
    speechBubble.style.right = '40px';
    speechBubble.style.background = 'white';
    speechBubble.style.padding = '10px 20px';
    speechBubble.style.border = '3px solid black';
    speechBubble.style.borderRadius = '20px';
    speechBubble.style.fontFamily = "'Kalam', cursive";
    speechBubble.style.zIndex = '1002';
    speechBubble.innerHTML = randomQuote;

    document.body.appendChild(speechBubble);

    setTimeout(() => {
        speechBubble.remove();
    }, 3000);
});

// Smooth scroll for nav links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Chalkboard hover effect
const chalkboardElement = document.querySelector('.chalkboard');
chalkboardElement.addEventListener('mouseenter', () => {
    chalkboardElement.style.transition = 'transform 0.3s ease';
    chalkboardElement.style.transform = 'rotate(0deg) scale(1.05)';
});

chalkboardElement.addEventListener('mouseleave', () => {
    chalkboardElement.style.transform = 'rotate(2deg) scale(1)';
});

// Menu Loading logic
async function loadMenu() {
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;

    try {
        const response = await fetch('menu.json');
        const menuData = await response.json();

        menuContainer.innerHTML = ''; // Clear loading message

        for (const sectionKey in menuData) {
            const section = menuData[sectionKey];

            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'menu-section';

            let sectionHTML = `<h2>${section.title}</h2>`;
            if (section.description) {
                sectionHTML += `<p style="margin-bottom: 20px; font-style: italic;">${section.description}</p>`;
            }

            sectionHTML += `<div class="menu-grid">`;

            section.items.forEach(item => {
                sectionHTML += `
                    <div class="menu-item">
                        <div class="item-header">
                            <h4>${item.name}</h4>
                            <span class="price">${item.price}</span>
                        </div>
                        ${item.description ? `<p class="description">${item.description}</p>` : ''}
                    </div>
                `;
            });

            sectionHTML += `</div>`;
            sectionDiv.innerHTML = sectionHTML;
            menuContainer.appendChild(sectionDiv);
        }
    } catch (error) {
        console.error('Error loading menu:', error);
        menuContainer.innerHTML = '<p style="text-align: center; color: red;">Sorry, we couldn\'t load the menu right now. Please try again later!</p>';
    }
}

// Call loadMenu on window load
window.addEventListener('load', loadMenu);
