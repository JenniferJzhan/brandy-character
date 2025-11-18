#  Brandy - Interactive Character

An interactive digital character that responds to touch, camera gestures, and motion on your mobile phone. Meet Brandy, an 18-year-old ragdoll cat with a tsundere personality!

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://issakafadil.github.io/brandy-character/)

##  Project Overview

**Brandy** is an interactive character built for the "Building Character(s)" main project at OCAD University. The character responds dynamically to user interactions, changes mood based on treatment, and exhibits time-based behaviors.

### Key Features

-  **Touch Interactions** - Tap to poke, hold to pet
-  **Camera Gestures** - ML5 hand tracking with gesture recognition
-  **Motion Detection** - Shake to surprise
-  **Dynamic Moods** - Happiness, annoyance, trust, fear, energy
-  **Time-Based Behavior** - Sleepy in morning, energetic at night
-  **Speech Bubbles** - Context-aware dialogue
-  **Smooth Animations** - Bobbing, tail movement, reactive expressions
-  **Relationship System** - Progresses from stranger to friend

##  Live Demo

**[Try it now → https://issakafadil.github.io/brandy-character/](https://issakafadil.github.io/brandy-character/)**

**Best experienced on mobile phones!** 📱

##  How to Interact

### Touch Controls
- **Tap** - Poke Brandy (may annoy if repeated!)
- **Hold** - Gentle petting (makes happy)
- **Multiple Taps** - Gets increasingly annoyed → angry

### Camera Controls (Optional)
1. Tap the ** Camera** button
2. Allow camera permission
3. Show your hand:
   - **Open palm ** - Gentle interaction
   - **Pointing finger ** - Poke

### Motion Controls (Optional)
1. Tap the ** Motion** button  
2. Allow motion permission
3. **Shake your phone** - Surprise reaction

### Help
Tap the **❓ Help** button anytime for instructions

##  About Brandy

**Name:** Brandy  
**Age:** 18  
**Species:** Ragdoll Cat  
**Personality:** ENTP - Clever, sharp-tongued, tsundere

### Character Traits
- **Tsundere (80%)** - Acts tough but is soft inside
- **Clever (90%)** - Quick, witty responses
- **Dependent (70%)** - Needs interaction, gets lonely
- **Spoiled (60%)** - Expects gentle treatment
- **Courageous (80%)** - Brave when needed
- **Playful (70%)** - Enjoys adventures

### Backstory
From a noble family in a faraway kingdom, Brandy is the second son of a count. With no need to inherit a title, Brandy lives for happiness and adventure with friends. Afraid of black snakes after a childhood incident in the forest.

### Daily Rhythm
- 🌅 **Morning (6-12)** - Drowsy, low energy
- ☀️ **Afternoon (2-6)** - Awake, responsive
- 🌙 **Night (6-6)** - Most energetic!

## 🛠️ Technical Details

### Built With
- **p5.js** - Creative coding framework
- **ML5.js** - Machine learning (HandPose for gesture recognition)
- **JavaScript** - Core logic
- **HTML5/CSS3** - Mobile-optimized interface

### Architecture
```
brandy-character/
├── index.html              # Entry point with mobile UI
├── sketch.js               # p5.js main loop & coordination
├── character.js            # Character class (state, mood, animations)
├── inputHandler.js         # Input processing (touch, camera, motion)
├── behaviorSystem.js       # Personality & dialogue system
└── README.md              # This file
```

##  Mood System

Brandy's mood is tracked across multiple parameters:

| Parameter | Range | Effect |
|-----------|-------|--------|
| Happiness | 0-100 | Affects expression and dialogue |
| Annoyance | 0-100 | Increases with excessive poking |
| Trust | 0-100 | Builds with positive interactions |
| Energy | 0-100 | Changes with time of day |
| Fear | 0-100 | Triggered by perceived threats |

### Mood States
- 😊 **Happy** (>70 happiness) - Purring, content expressions
- 😠 **Angry** (>70 annoyance) - Red tint, angry expressions
- 😮 **Surprised** - Wide eyes, alert posture
- 😨 **Scared** (>50 fear) - Crouched, fearful eyes
- 😴 **Sleepy** (morning) - Half-closed eyes, slow movements

##  Local Development

### Prerequisites
- Modern web browser
- Local server (for camera features)

### Setup
```bash
# Clone the repository
git clone https://github.com/Issakafadil/brandy-character.git
cd brandy-character

# Start a local server
python -m http.server 8000

# Open in browser
# Navigate to http://localhost:8000
```

##  Project Requirements 

This project fulfills all requirements for the "Building Character(s)" assignment:

-  Based on physical object (ragdoll cat plush)
-  Interactive digital character
-  Designed for mobile phones
-  Multiple input methods (touch, camera, motion)
-  Personality and backstory
-  Responsive to specific inputs
-  Public URL for sharing
-  No phone damage risk

##  Educational Context

**Course:** DIGF-2014-301 (Fall 2025) - Atelier I: Discovery  
**Institution:** OCAD University  
**Project:** Building Character(s) - Main Project  
**Duration:** 6 weeks  
**Tools Used:** p5.js, ML5, VSCode, GitHub

##  Future Enhancements

- [ ] Sprite-based animations
- [ ] Sound effects (purring, meowing)
- [ ] More dialogue responses
- [ ] Save system (localStorage)
- [ ] Friend characters (Whiskey the Maine Coon)
- [ ] Mini-games
- [ ] Achievement system

## 👤 Author

**Issaka Fadil**
- GitHub: [@Issakafadil](https://github.com/Issakafadil)
- Project: [brandy-character](https://github.com/Issakafadil/brandy-character)

##  Acknowledgments

- **OCAD University** - Course instruction and support
- **p5.js Community** - Creative coding framework
- **ML5.js Team** - Accessible machine learning

---

**Made with p5.js**

*"I-it's not like I enjoy this!" - Brandy* 