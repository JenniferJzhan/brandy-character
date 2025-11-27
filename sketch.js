// /**
//  * Main Sketch - Brandy Interactive Character
//  * Coordinates all systems and manages the p5.js canvas
//  */

// // Global instances
// let brandy;
// let inputHandler;
// let behaviorSystem;
// let brandySprite;

// // UI elements
// let moodDisplay;
// let timeStateDisplay;
// let interactionCountDisplay;
// let debugInfo;

// // Settings
// let debugMode = false;
// let showUI = true;

// // Background
// let backgroundColor;
// let backgroundGradientStart;
// let backgroundGradientEnd;

// /**
//  * P5.js Preload - load assets before setup
//  */
// function preload() {
//     // Try to load Brandy sprite - if it exists
//     // If not, will use procedural graphics
//     brandySprite = loadImage('brandy.PNG', 
//         () => console.log('Sprite loaded'),
//         () => console.log('No sprite found, using procedural graphics')
//     );
// }

// /**
//  * P5.js Setup - runs once at start
//  */
// function setup() {
//     // Create canvas that fills the screen
//     createCanvas(windowWidth, windowHeight);
    
//     // Initialize background colors
//     updateBackgroundColors();
    
//     // Create character instance at center of screen
//     brandy = new Character(width / 2, height / 2);
    
//     // Load sprite if available
//     if (brandySprite) {
//         brandy.sprite = brandySprite;
//         brandy.spriteLoaded = true;
//     }
    
//     // Create input handler
//     inputHandler = new InputHandler(brandy);
//     inputHandler.init();
    
//     // Create behavior system
//     behaviorSystem = new BehaviorSystem(brandy);
    
//     // Set frame rate
//     frameRate(60);
    
//     console.log('Brandy character initialized!');
//     console.log('Canvas:', width, 'x', height);
//     console.log('Brandy at:', brandy.x, brandy.y);
//     console.log('Tap anywhere to interact');
    
//     // Show welcome message
//     behaviorSystem.showResponse('firstMeeting');
// }

// /**
//  * P5.js Draw - runs every frame
//  */
// function draw() {
//     // Draw background
//     drawBackground();
    
//     // Update systems
//     brandy.update();
//     behaviorSystem.update();
    
//     // Draw character
//     brandy.draw();
    
//     // Draw behavior system (speech bubbles, etc)
//     behaviorSystem.draw();
    
//     // Draw camera feed (always visible when camera is on)
//     if (inputHandler.cameraEnabled) {
//         inputHandler.drawDebug();
//     }
    
//     // Update UI
//     updateUI();
    
//     // Draw instructions for first-time users
//     if (brandy.interactionCount === 0) {
//         drawInstructions();
//     }
// }

// /**
//  * Draw gradient background based on time of day
//  */
// function drawBackground() {
//     // Create gradient from top to bottom
//     for (let y = 0; y < height; y++) {
//         let inter = map(y, 0, height, 0, 1);
//         let c = lerpColor(backgroundGradientStart, backgroundGradientEnd, inter);
//         stroke(c);
//         line(0, y, width, y);
//     }
// }

// /**
//  * Update background colors based on time of day
//  */
// function updateBackgroundColors() {
//     const hour = new Date().getHours();
    
//     if (hour >= 6 && hour < 8) {
//         // Dawn
//         backgroundGradientStart = color(255, 200, 150);
//         backgroundGradientEnd = color(135, 206, 235);
//     } else if (hour >= 8 && hour < 18) {
//         // Day
//         backgroundGradientStart = color(135, 206, 250);
//         backgroundGradientEnd = color(200, 220, 240);
//     } else if (hour >= 18 && hour < 20) {
//         // Dusk
//         backgroundGradientStart = color(255, 140, 100);
//         backgroundGradientEnd = color(100, 100, 150);
//     } else {
//         // Night
//         backgroundGradientStart = color(25, 25, 60);
//         backgroundGradientEnd = color(50, 50, 100);
//     }
// }

// /**
//  * Update UI elements
//  */
// function updateUI() {
//     const state = brandy.getStateInfo();
    
//     // Get UI elements each time (safer than storing references)
//     const moodDisplay = document.getElementById('mood-display');
//     const timeStateDisplay = document.getElementById('time-state');
//     const interactionCountDisplay = document.getElementById('interaction-count');
    
//     if (moodDisplay) {
//         moodDisplay.innerHTML = `Mood: ${state.mood}`;
//     }
    
//     if (timeStateDisplay) {
//         timeStateDisplay.innerHTML = `State: ${state.timeState}`;
//     }
    
//     if (interactionCountDisplay) {
//         interactionCountDisplay.innerHTML = `Interactions: ${state.interactions}`;
//     }
    
//     if (debugMode) {
//         const debugInfo = document.getElementById('debug-info');
//         if (debugInfo) {
//             debugInfo.innerHTML = `
//                 FPS: ${Math.round(frameRate())}<br>
//                 Happiness: ${state.happiness}%<br>
//                 Annoyance: ${state.annoyance}%<br>
//                 Energy: ${state.energy}%<br>
//                 Input: ${inputHandler.getInputMode()}<br>
//                 Personality: ${behaviorSystem.getPersonalityState()}
//             `;
//             debugInfo.style.display = 'block';
//         }
//     }
// }

// /**
//  * Draw instructions for first-time users
//  */
// function drawInstructions() {
//     push();
    
//     // Semi-transparent background
//     fill(0, 0, 0, 180);
//     noStroke();
//     rectMode(CENTER);
//     rect(width / 2, height - 80, 320, 100, 10);
    
//     // White text
//     fill(255);
//     textAlign(CENTER, CENTER);
//     textStyle(BOLD);
//     textSize(16);
//     text("Tap Brandy to interact!", width / 2, height - 110);
    
//     textStyle(NORMAL);
//     textSize(14);
//     text("Hold for gentle petting", width / 2, height - 85);
//     text("Tap quickly to poke", width / 2, height - 65);
//     text("Press 'H' for more controls", width / 2, height - 45);
    
//     pop();
// }

// /**
//  * Handle window resize
//  */
// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
    
//     // Reposition character to center
//     if (brandy) {
//         brandy.x = width / 2;
//         brandy.y = height / 2;
//     }
    
//     // Update background
//     updateBackgroundColors();
// }

// /**
//  * Handle mouse/touch pressed (for desktop testing)
//  */
// function mousePressed() {
//     // Simulate touch for desktop testing
//     if (!inputHandler) return;
    
//     inputHandler.handleTouchStart(mouseX, mouseY);
//     return false;
// }

// /**
//  * Handle mouse released
//  */
// function mouseReleased() {
//     if (!inputHandler) return;
    
//     inputHandler.handleTouchEnd(mouseX, mouseY);
//     return false;
// }

// /**
//  * Handle key presses for debugging
//  */
// function keyPressed() {
//     // 'D' key toggles debug mode
//     if (key === 'd' || key === 'D') {
//         debugMode = !debugMode;
//         console.log('Debug mode:', debugMode);
//     }
    
//     // 'U' key toggles UI
//     if (key === 'u' || key === 'U') {
//         showUI = !showUI;
//         const infoPanel = document.getElementById('info-panel');
//         if (infoPanel) {
//             if (showUI) {
//                 infoPanel.classList.remove('hidden');
//             } else {
//                 infoPanel.classList.add('hidden');
//             }
//         }
//     }
    
//     // 'C' key toggles camera
//     if (key === 'c' || key === 'C') {
//         if (inputHandler.cameraEnabled) {
//             inputHandler.disableCamera();
//             console.log('Camera disabled');
//         } else {
//             inputHandler.enableCamera();
//             console.log('Camera enabled');
//         }
//     }
    
//     // 'M' key enables motion
//     if (key === 'm' || key === 'M') {
//         if (!inputHandler.motionEnabled) {
//             inputHandler.enableMotion();
//             console.log('Motion detection enabled');
//         }
//     }
    
//     // 'R' key resets character state
//     if (key === 'r' || key === 'R') {
//         brandy.mood.happiness = 50;
//         brandy.mood.annoyance = 0;
//         brandy.mood.trust = 50;
//         brandy.interactionCount = 0;
//         brandy.consecutivePokeCount = 0;
//         console.log('Character state reset');
//     }
    
//     // 'H' key shows help
//     if (key === 'h' || key === 'H') {
//         showHelp();
//     }
// }

// /**
//  * Show help/controls
//  */
// function showHelp() {
//     console.log(`
// === BRANDY CONTROLS ===
// D - Toggle debug mode
// U - Toggle UI display
// C - Toggle camera (ML5 hand tracking)
// M - Enable motion detection
// R - Reset character state
// H - Show this help

// === INTERACTIONS ===
// Tap - Poke Brandy
// Hold - Gentle petting
// Shake - Surprise reaction (motion)
// Hand gestures - Camera tracking (if enabled)
//     `);
// }

// /**
//  * P5.js preload (if needed for assets)
//  */
// // function preload() {
// //     // Load any sprites, images, or sounds here
// //     // For now, we're using procedural graphics
// // }

// // Prevent default touch behavior on mobile
// document.addEventListener('touchmove', function(e) {
//     e.preventDefault();
// }, { passive: false });

// // Prevent pull-to-refresh on mobile
// document.addEventListener('gesturestart', function(e) {
//     e.preventDefault();
// });

// // Initial setup message
// console.log(`
// ╔═══════════════════════════════════╗
// ║   BRANDY - Interactive Character   ║
// ║   Ragdoll Cat • Age 18 • ENTP     ║
// ╚═══════════════════════════════════╝

// Press 'H' for controls
// Tap to interact!
// `);








/**
 * Main Sketch - Brandy Interactive Character
 * Coordinates all systems and manages the p5.js canvas
 */

// Global instances
let brandy;
let inputHandler;
let behaviorSystem;
let brandySprite;

// UI elements
let moodDisplay;
let timeStateDisplay;
let interactionCountDisplay;
let debugInfo;

// Settings
let debugMode = false;
let showUI = true;

// Background
let backgroundColor;
let backgroundGradientStart;
let backgroundGradientEnd;

/**
 * P5.js Preload - load assets before setup
 */
function preload() {
    // Sprite loading disabled - using procedural graphics
    // Uncomment below to use sprite image instead:
    /*
    brandySprite = loadImage('brandy.PNG', 
        () => console.log('Sprite loaded'),
        () => console.log('No sprite found, using procedural graphics')
    );
    */
}

/**
 * P5.js Setup - runs once at start
 */
function setup() {
    // Create canvas that fills the screen
    createCanvas(windowWidth, windowHeight);
    
    // Initialize background colors
    updateBackgroundColors();
    
    // Create character instance at center of screen
    brandy = new Character(width / 2, height / 2);
    
    // Load sprite if available
    if (brandySprite) {
        brandy.sprite = brandySprite;
        brandy.spriteLoaded = true;
    }
    
    // Create input handler
    inputHandler = new InputHandler(brandy);
    inputHandler.init();
    
    // Create behavior system
    behaviorSystem = new BehaviorSystem(brandy);
    
    // Set frame rate
    frameRate(60);
    
    console.log('Brandy character initialized!');
    console.log('Canvas:', width, 'x', height);
    console.log('Brandy at:', brandy.x, brandy.y);
    console.log('Tap anywhere to interact');
    
    // Show welcome message
    behaviorSystem.showResponse('firstMeeting');
}

/**
 * P5.js Draw - runs every frame
 */
function draw() {
    // Draw background
    drawBackground();
    
    // Update systems
    brandy.update();
    behaviorSystem.update();
    
    // Draw character
    brandy.draw();
    
    // Draw behavior system (speech bubbles, etc)
    behaviorSystem.draw();
    
    // Draw camera feed (always visible when camera is on)
    if (inputHandler.cameraEnabled) {
        inputHandler.drawDebug();
    }
    
    // Update UI
    updateUI();
    
    // Draw instructions for first-time users
    if (brandy.interactionCount === 0) {
        drawInstructions();
    }
}

/**
 * Draw gradient background based on time of day
 */
function drawBackground() {
    // Create gradient from top to bottom
    for (let y = 0; y < height; y++) {
        let inter = map(y, 0, height, 0, 1);
        let c = lerpColor(backgroundGradientStart, backgroundGradientEnd, inter);
        stroke(c);
        line(0, y, width, y);
    }
}

/**
 * Update background colors based on time of day
 */
function updateBackgroundColors() {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour < 8) {
        // Dawn
        backgroundGradientStart = color(255, 200, 150);
        backgroundGradientEnd = color(135, 206, 235);
    } else if (hour >= 8 && hour < 18) {
        // Day
        backgroundGradientStart = color(135, 206, 250);
        backgroundGradientEnd = color(200, 220, 240);
    } else if (hour >= 18 && hour < 20) {
        // Dusk
        backgroundGradientStart = color(255, 140, 100);
        backgroundGradientEnd = color(100, 100, 150);
    } else {
        // Night
        backgroundGradientStart = color(25, 25, 60);
        backgroundGradientEnd = color(50, 50, 100);
    }
}

/**
 * Update UI elements
 */
function updateUI() {
    const state = brandy.getStateInfo();
    
    // Get UI elements each time (safer than storing references)
    const moodDisplay = document.getElementById('mood-display');
    const timeStateDisplay = document.getElementById('time-state');
    const interactionCountDisplay = document.getElementById('interaction-count');
    
    if (moodDisplay) {
        moodDisplay.innerHTML = `Mood: ${state.mood}`;
    }
    
    if (timeStateDisplay) {
        timeStateDisplay.innerHTML = `State: ${state.timeState}`;
    }
    
    if (interactionCountDisplay) {
        interactionCountDisplay.innerHTML = `Interactions: ${state.interactions}`;
    }
    
    if (debugMode) {
        const debugInfo = document.getElementById('debug-info');
        if (debugInfo) {
            debugInfo.innerHTML = `
                FPS: ${Math.round(frameRate())}<br>
                Happiness: ${state.happiness}%<br>
                Annoyance: ${state.annoyance}%<br>
                Energy: ${state.energy}%<br>
                Input: ${inputHandler.getInputMode()}<br>
                Personality: ${behaviorSystem.getPersonalityState()}
            `;
            debugInfo.style.display = 'block';
        }
    }
}

/**
 * Draw instructions for first-time users
 */
function drawInstructions() {
    push();
    
    // Semi-transparent background
    fill(0, 0, 0, 180);
    noStroke();
    rectMode(CENTER);
    rect(width / 2, height - 80, 320, 100, 10);
    
    // White text
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(16);
    text("Tap Brandy to interact!", width / 2, height - 110);
    
    textStyle(NORMAL);
    textSize(14);
    text("Hold for gentle petting", width / 2, height - 85);
    text("Tap quickly to poke", width / 2, height - 65);
    text("Press 'H' for more controls", width / 2, height - 45);
    
    pop();
}

/**
 * Handle window resize
 */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    
    // Reposition character to center
    if (brandy) {
        brandy.x = width / 2;
        brandy.y = height / 2;
    }
    
    // Update background
    updateBackgroundColors();
}

/**
 * Handle mouse/touch pressed (for desktop testing)
 */
function mousePressed() {
    // Simulate touch for desktop testing
    if (!inputHandler) return;
    
    inputHandler.handleTouchStart(mouseX, mouseY);
    return false;
}

/**
 * Handle mouse released
 */
function mouseReleased() {
    if (!inputHandler) return;
    
    inputHandler.handleTouchEnd(mouseX, mouseY);
    return false;
}

/**
 * Handle key presses for debugging
 */
function keyPressed() {
    // 'D' key toggles debug mode
    if (key === 'd' || key === 'D') {
        debugMode = !debugMode;
        console.log('Debug mode:', debugMode);
    }
    
    // 'U' key toggles UI
    if (key === 'u' || key === 'U') {
        showUI = !showUI;
        const infoPanel = document.getElementById('info-panel');
        if (infoPanel) {
            if (showUI) {
                infoPanel.classList.remove('hidden');
            } else {
                infoPanel.classList.add('hidden');
            }
        }
    }
    
    // 'C' key toggles camera
    if (key === 'c' || key === 'C') {
        if (inputHandler.cameraEnabled) {
            inputHandler.disableCamera();
            console.log('Camera disabled');
        } else {
            inputHandler.enableCamera();
            console.log('Camera enabled');
        }
    }
    
    // 'M' key enables motion
    if (key === 'm' || key === 'M') {
        if (!inputHandler.motionEnabled) {
            inputHandler.enableMotion();
            console.log('Motion detection enabled');
        }
    }
    
    // 'R' key resets character state
    if (key === 'r' || key === 'R') {
        brandy.mood.happiness = 50;
        brandy.mood.annoyance = 0;
        brandy.mood.trust = 50;
        brandy.interactionCount = 0;
        brandy.consecutivePokeCount = 0;
        console.log('Character state reset');
    }
    
    // 'H' key shows help
    if (key === 'h' || key === 'H') {
        showHelp();
    }
}

/**
 * Show help/controls
 */
function showHelp() {
    console.log(`
=== BRANDY CONTROLS ===
D - Toggle debug mode
U - Toggle UI display
C - Toggle camera (ML5 hand tracking)
M - Enable motion detection
R - Reset character state
H - Show this help

=== INTERACTIONS ===
Tap - Poke Brandy
Hold - Gentle petting
Shake - Surprise reaction (motion)
Hand gestures - Camera tracking (if enabled)
    `);
}

// Prevent default touch behavior on mobile
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false });

// Prevent pull-to-refresh on mobile
document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
});

// Initial setup message
console.log(`
â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—
â•‘   BRANDY - Interactive Character   â•‘
â•‘   Ragdoll Cat â€¢ Age 18 â€¢ ENTP     â•‘
â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

Press 'H' for controls
Tap to interact!
`);