// --- 1. IMAGE DATA (Using Relative Paths and your asset names) ---
// NOTE: This array is configured to use the file names you uploaded.
const ALPACAS_DATA = {
    accessories: [
        { name: "Flower", url: "./assets/accessories/flower.png" },
        { name: "Glasses", url: "./assets/accessories/glasses.png" },
        { name: "Headphone", url: "./assets/accessories/headphone.png" },
        { name: "Earings", url: "./assets/accessories/earings.png" }
    ],
    hair: [
        { name: "Default", url: "./assets/hair/default.png" }, 
        { name: "Bang", url: "./assets/hair/bang.png" }, 
        { name: "Curls", url: "./assets/hair/curls.png" }, 
        { name: "Elegant", url: "./assets/hair/elegant.png" },
        { name: "Fancy", url: "./assets/hair/fancy.png" },
        { name: "Quiff", url: "./assets/hair/quiff.png" },
        { name: "Short", url: "./assets/hair/short.png" },
    ],
    ears: [
        { name: "Default", url: "./assets/ears/default.png" },
        { name: "Tilt Backward", url: "./assets/ears/tilt-backward.png" },
        { name: "Tilt Forward", url: "./assets/ears/tilt-forward.png" } 
    ],
    eyes: [
        { name: "Default", url: "./assets/eyes/default.png" },
        { name: "Angry", url: "./assets/eyes/angry.png" },
        { name: "Naughty", url: "./assets/eyes/naughty.png" },
        { name: "Panda", url: "./assets/eyes/panda.png" },
        { name: "Smart", url: "./assets/eyes/smart.png" },
        { name: "Star", url: "./assets/eyes/star.png" },
    ],
    backgrounds: [
        { name: "Blue50", url: "./assets/backgrounds/blue50.png" },
        { name: "Blue60", url: "./assets/backgrounds/blue60.png" },
        { name: "Blue70", url: "./assets/backgrounds/blue70.png" },
        { name: "Dark Blue30", url: "./assets/backgrounds/darkblue30.png" },
        { name: "Dark Blue50", url: "./assets/backgrounds/darkblue50.png" },
        { name: "Dark Blue70", url: "./assets/backgrounds/darkblue70.png" },
        { name: "Green50", url: "./assets/backgrounds/green50.png" },
        { name: "Green60", url: "./assets/backgrounds/green60.png" },
        { name: "Green70", url: "./assets/backgrounds/green70.png" },
        { name: "Grey40", url: "./assets/backgrounds/grey40.png" },
        { name: "Grey70", url: "./assets/backgrounds/grey70.png" },
        { name: "Grey80", url: "./assets/backgrounds/grey80.png" },
        { name: "Red50", url: "./assets/backgrounds/red50.png" },
        { name: "Red60", url: "./assets/backgrounds/red60.png" },
        { name: "Red70", url: "./assets/backgrounds/red70.png" },
        { name: "Yellow50", url: "./assets/backgrounds/yellow50.png" },
        { name: "Yellow60", url: "./assets/backgrounds/yellow60.png" },
        { name: "Yellow70", url: "./assets/backgrounds/yellow70.png" },
    ],
    mouth: [
        { name: "Default", url: "./assets/mouth/default.png" }, 
        { name: "Astonished", url: "./assets/mouth/astonished.png" }, 
        { name: "Eating", url: "./assets/mouth/eating.png" }, 
        { name: "Laugh", url: "./assets/mouth/laugh.png" }, 
        { name: "Tongue", url: "./assets/mouth/tongue.png" }, 
    ],
    neck: [
        { name: "Default", url: "./assets/neck/default.png" }, 
        { name: "Bend Backward", url: "./assets/neck/bend-backward.png" }, 
        { name: "Bend Forward", url: "./assets/neck/bend-forward.png" }, 
        { name: "Thick", url: "./assets/neck/thick.png" }, 
    ],
    nose: [
        { name: "Nose", url: "./assets/nose/nose.png" }, // Assuming the one nose file is named 'nose.png'
    ],
    leg: [
        { name: "Default", url: "./assets/leg/default.png" }, 
        { name: "Bubble Tea", url: "./assets/leg/bubble-tea.png" }, 
        { name: "Cookie", url: "./assets/leg/cookie.png" }, 
        { name: "Game Console", url: "./assets/leg/game-console.png" },
      { name: "Tilt Backward", url: "./assets/leg/tilt-backward.png" }, 
        { name: "Tilt Forward", url: "./assets/leg/tilt-forward.png" }, 
    ],
    base: [ // Temporary base layer using the nose image
        { name: "Base", url: "./assets/nose/nose.png" }
    ]
};

// --- 2. GLOBAL STATE ---
let currentSelections = {
    accessories: ALPACAS_DATA.accessories[0],
    hair: ALPACAS_DATA.hair[0],
    ears: ALPACAS_DATA.ears[0],
    eyes: ALPACAS_DATA.eyes[0],
    backgrounds: ALPACAS_DATA.backgrounds[0],
    mouth: ALPACAS_DATA.mouth[0],
    neck: ALPACAS_DATA.neck[0],
    nose: ALPACAS_DATA.nose[0],
    leg: ALPACAS_DATA.leg[0],
    base: ALPACAS_DATA.base[0] // Set the temporary base layer
};

// --- 3. DOM ELEMENTS ---
const categoryButtonsContainer = document.querySelector('#category-buttons');
const assetOptionsContainer = document.querySelector('#asset-options');
const layerElements = {
    'backgrounds': document.getElementById('backgrounds-img'), 
    'ears': document.getElementById('ears-img'),
    'neck': document.getElementById('neck-img'),
    'eyes': document.getElementById('eyes-img'),
    'hair': document.getElementById('hair-img'),
    'accessories': document.getElementById('accessories-img'),
    'mouth': document.getElementById('mouth-img'),
    'nose': document.getElementById('nose-img'),
    'leg': document.getElementById('leg-img'),
    'base': document.getElementById('base-img')
};
let activeCategory = 'hair'; 

// --- 4. CORE FUNCTIONS ---

function renderOptions() {
    assetOptionsContainer.innerHTML = ''; 
    const assets = ALPACAS_DATA[activeCategory];
    
    assets.forEach(asset => {
        const button = document.createElement('button');
        button.textContent = asset.name;
        button.classList.add('asset-option-btn');
        if (currentSelections[activeCategory].name === asset.name) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            selectAsset(activeCategory, asset);
        });
        assetOptionsContainer.appendChild(button);
    });
}

function updateImage() {
    for (const layer in currentSelections) {
        if (layerElements[layer]) {
            layerElements[layer].src = currentSelections[layer].url;
        }
    }
}

function selectAsset(category, asset) {
    currentSelections[category] = asset;
    updateImage();
    renderOptions(); 
}

function selectCategory(category) {
    activeCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        }
    });
    renderOptions(); 
}

function randomizeAlpaca() {
    for (const category in ALPACAS_DATA) {
        if (category !== 'base') { // Don't randomize the temporary base layer
            const assets = ALPACAS_DATA[category];
            const randomIndex = Math.floor(Math.random() * assets.length);
            currentSelections[category] = assets[randomIndex];
        }
    }
    updateImage();
    renderOptions(); 
}


// --- DOWNLOAD FUNCTIONALITY ---

function downloadAlpaca() {
    const canvas = document.querySelector('.alpaca-canvas');
    html2canvas(canvas, {
        allowTaint: true, 
        useCORS: true     
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'custom_alpaca.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

// --- 5. INITIALIZATION ---

document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const category = e.target.getAttribute('data-category');
        selectCategory(category);
    });
});

document.getElementById('random-btn').addEventListener('click', randomizeAlpaca);
document.getElementById('download-btn').addEventListener('click', downloadAlpaca);

selectCategory(activeCategory); 
updateImage();
