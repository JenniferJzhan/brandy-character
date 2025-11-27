// /**
//  * Character Class - Brandy the Ragdoll Cat
//  * Manages character state, personality, and visual representation
//  */

// class Character {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.size = 200; // Base size for the character
        
//         // Character Identity
//         this.name = "Brandy";
//         this.age = 18;
//         this.personality = "ENTP"; // Clever, sharp-tongued, tsundere
        
//         // Sprite/Image
//         this.sprite = null;
//         this.spriteLoaded = false;
        
//         // Animation properties
//         this.bobOffset = 0;
//         this.bobSpeed = 0.05;
//         this.bobAmount = 8;
//         this.rotation = 0;
//         this.targetRotation = 0;
//         this.scale = 1.0;
//         this.targetScale = 1.0;
        
//         // State Management
//         this.mood = {
//             happiness: 50,    // 0-100
//             annoyance: 0,     // 0-100
//             energy: 50,       // 0-100 (changes with time of day)
//             trust: 50         // 0-100 (affects response intensity)
//         };
        
//         // Interaction Tracking
//         this.interactionCount = 0;
//         this.lastInteractionTime = 0;
//         this.consecutivePokeCount = 0;
//         this.pokeResetTimer = 0;
        
//         // Time-based State
//         this.timeState = this.calculateTimeState();
        
//         // Animation State
//         this.currentAnimation = 'idle';
//         this.animationFrame = 0;
//         this.animationSpeed = 0.1;
        
//         // Visual Properties
//         this.sprite = null;
//         this.color = {
//             primary: '#e8d5c4',   // Ragdoll cat cream color
//             secondary: '#8b7d6b',  // Darker accents
//             eyes: '#4a90e2',       // Blue eyes
//             angry: '#ff4444'       // Red when angry
//         };
        
//         // Behavior flags
//         this.isBeingPoked = false;
//         this.isSurprised = false;
//         this.isAngry = false;
//         this.isPurring = false;
        
//         // Fear system (afraid of black snakes)
//         this.fearLevel = 0;
//         this.scaredOfBlackShapes = true;
        
//         // Response timers
//         this.surpriseTimer = 0;
//         this.angerDuration = 0;
//         this.purrDuration = 0;
//     }
    
//     /**
//      * Load character sprite image
//      */
//     loadSprite(imagePath) {
//         this.sprite = loadImage(imagePath, 
//             () => {
//                 this.spriteLoaded = true;
//                 console.log('Brandy sprite loaded!');
//             },
//             () => {
//                 console.log('Could not load sprite, using procedural graphics');
//                 this.spriteLoaded = false;
//             }
//         );
//     }
    
//     /**
//      * Calculate time-based state based on hour of day
//      */
//     calculateTimeState() {
//         const hour = new Date().getHours();
        
//         // Morning (6-11): Drowsy
//         if (hour >= 6 && hour < 12) {
//             this.mood.energy = 30;
//             return 'drowsy';
//         }
//         // Noon-Early Afternoon (12-14): Still drowsy
//         else if (hour >= 12 && hour < 14) {
//             this.mood.energy = 40;
//             return 'sleepy';
//         }
//         // Afternoon (14-18): More awake
//         else if (hour >= 14 && hour < 18) {
//             this.mood.energy = 70;
//             return 'awake';
//         }
//         // Evening-Night (18-24): Most energetic
//         else if (hour >= 18 || hour < 6) {
//             this.mood.energy = 90;
//             return 'energetic';
//         }
        
//         return 'awake';
//     }
    
//     /**
//      * Update character state every frame
//      */
//     update() {
//         // Update time state periodically
//         if (frameCount % 1800 === 0) { // Every 30 seconds at 60fps
//             this.timeState = this.calculateTimeState();
//         }
        
//         // Animate bobbing (floating effect)
//         this.bobOffset += this.bobSpeed;
        
//         // Smooth rotation
//         this.rotation += (this.targetRotation - this.rotation) * 0.1;
        
//         // Smooth scale
//         this.scale += (this.targetScale - this.scale) * 0.1;
        
//         // Decay annoyance over time
//         if (this.mood.annoyance > 0 && millis() - this.lastInteractionTime > 3000) {
//             this.mood.annoyance = max(0, this.mood.annoyance - 0.5);
//         }
        
//         // Reset consecutive poke count after timeout
//         if (millis() - this.pokeResetTimer > 2000) {
//             this.consecutivePokeCount = 0;
//         }
        
//         // Update behavior timers
//         if (this.surpriseTimer > 0) {
//             this.surpriseTimer--;
//             if (this.surpriseTimer === 0) {
//                 this.isSurprised = false;
//             }
//         }
        
//         if (this.angerDuration > 0) {
//             this.angerDuration--;
//             if (this.angerDuration === 0) {
//                 this.isAngry = false;
//             }
//         }
        
//         if (this.purrDuration > 0) {
//             this.purrDuration--;
//             if (this.purrDuration === 0) {
//                 this.isPurring = false;
//             }
//         }
        
//         // Update happiness based on interactions
//         if (this.mood.annoyance < 30 && this.interactionCount > 0) {
//             this.mood.happiness = min(100, this.mood.happiness + 0.1);
//         }
        
//         // Update animation
//         this.updateAnimation();
//     }
    
//     /**
//      * Handle being poked/touched
//      */
//     onPoke(x, y) {
//         this.lastInteractionTime = millis();
//         this.interactionCount++;
//         this.consecutivePokeCount++;
//         this.pokeResetTimer = millis();
        
//         // Add bounce/recoil animation
//         this.targetScale = 0.9;
//         setTimeout(() => { this.targetScale = 1.0; }, 100);
        
//         // Add slight rotation
//         this.targetRotation = (random() > 0.5 ? 1 : -1) * 0.1;
//         setTimeout(() => { this.targetRotation = 0; }, 200);
        
//         // Immediate response: Surprise reaction
//         if (this.consecutivePokeCount === 1) {
//             this.triggerSurprise();
//         }
        
//         // Cumulative response: Getting annoyed
//         if (this.consecutivePokeCount > 3) {
//             this.mood.annoyance = min(100, this.mood.annoyance + 15);
//         }
        
//         if (this.consecutivePokeCount > 5) {
//             this.triggerAnger();
//         }
        
//         // Decrease trust slightly with excessive poking
//         if (this.consecutivePokeCount > 4) {
//             this.mood.trust = max(0, this.mood.trust - 2);
//         }
//     }
    
//     /**
//      * Handle gentle interaction (soft touches)
//      */
//     onGentle() {
//         this.mood.happiness = min(100, this.mood.happiness + 5);
//         this.mood.annoyance = max(0, this.mood.annoyance - 5);
//         this.mood.trust = min(100, this.mood.trust + 1);
        
//         // Trigger purring
//         if (this.mood.happiness > 60 && !this.isAngry) {
//             this.triggerPurring();
//         }
//     }
    
//     /**
//      * Trigger surprise behavior
//      */
//     triggerSurprise() {
//         this.isSurprised = true;
//         this.surpriseTimer = 60; // 1 second at 60fps
//         this.currentAnimation = 'surprised';
//     }
    
//     /**
//      * Trigger anger behavior
//      */
//     triggerAnger() {
//         this.isAngry = true;
//         this.angerDuration = 180; // 3 seconds
//         this.currentAnimation = 'angry';
//         this.mood.happiness = max(0, this.mood.happiness - 20);
//     }
    
//     /**
//      * Trigger purring (happy behavior)
//      */
//     triggerPurring() {
//         this.isPurring = true;
//         this.purrDuration = 120; // 2 seconds
//         this.currentAnimation = 'purring';
//     }
    
//     /**
//      * React to detected shapes (fear of black snakes)
//      */
//     detectThreat(shapeData) {
//         if (this.scaredOfBlackShapes && shapeData.isElongated && shapeData.isDark) {
//             this.fearLevel = min(100, this.fearLevel + 10);
//             this.currentAnimation = 'scared';
//             this.mood.happiness = max(0, this.mood.happiness - 15);
//         } else {
//             this.fearLevel = max(0, this.fearLevel - 1);
//         }
//     }
    
//     /**
//      * Update animation state
//      */
//     updateAnimation() {
//         // Priority-based animation selection
//         if (this.isAngry) {
//             this.currentAnimation = 'angry';
//         } else if (this.isSurprised) {
//             this.currentAnimation = 'surprised';
//         } else if (this.isPurring) {
//             this.currentAnimation = 'purring';
//         } else if (this.fearLevel > 50) {
//             this.currentAnimation = 'scared';
//         } else {
//             // Default to time-based idle
//             this.currentAnimation = this.getIdleAnimation();
//         }
        
//         // Increment animation frame
//         this.animationFrame += this.animationSpeed;
//     }
    
//     /**
//      * Get appropriate idle animation based on time state
//      */
//     getIdleAnimation() {
//         switch(this.timeState) {
//             case 'drowsy':
//             case 'sleepy':
//                 return 'idle_sleepy';
//             case 'energetic':
//                 return 'idle_energetic';
//             default:
//                 return 'idle_neutral';
//         }
//     }
    
//     /**
//      * Draw the character
//      */
//     draw() {
//         push();
//         translate(this.x, this.y);
        
//         // Apply bobbing animation
//         const bob = sin(this.bobOffset) * this.bobAmount;
//         translate(0, bob);
        
//         // Apply rotation
//         rotate(this.rotation);
        
//         // Apply scale
//         scale(this.scale);
        
//         // Draw sprite if loaded, otherwise use procedural graphics
//         if (this.spriteLoaded && this.sprite) {
//             this.drawSprite();
//         } else {
//             // Draw based on current animation
//             switch(this.currentAnimation) {
//                 case 'angry':
//                     this.drawAngry();
//                     break;
//                 case 'surprised':
//                     this.drawSurprised();
//                     break;
//                 case 'purring':
//                     this.drawPurring();
//                     break;
//                 case 'scared':
//                     this.drawScared();
//                     break;
//                 default:
//                     this.drawIdle();
//             }
//         }
        
//         pop();
//     }
    
//     /**
//      * Draw the sprite image
//      */
//     drawSprite() {
//         imageMode(CENTER);
        
//         // Tint based on mood
//         if (this.isAngry) {
//             tint(255, 200, 200); // Reddish when angry
//         } else if (this.isPurring) {
//             tint(255, 255, 200); // Yellowish when happy
//         } else if (this.isSurprised) {
//             tint(200, 200, 255); // Bluish when surprised
//         } else {
//             noTint();
//         }
        
//         image(this.sprite, 0, 0, this.size, this.size);
//         noTint();
//     }
    
//     /**
//      * Draw idle state (simplified for now - replace with actual sprites)
//      */
//     drawIdle() {
//         // Body
//         fill(this.color.primary);
//         noStroke();
        
//         // Main body (rounder, more cat-like)
//         ellipse(0, 30, 150, 170);
        
//         // Head (larger, more prominent)
//         ellipse(0, -50, 120, 110);
        
//         // Ears (cat-like triangles)
//         triangle(-40, -85, -25, -105, -10, -85);
//         triangle(10, -85, 25, -105, 40, -85);
        
//         // Inner ears
//         fill(255, 200, 200);
//         triangle(-35, -85, -25, -98, -15, -85);
//         triangle(15, -85, 25, -98, 35, -85);
        
//         // Eyes (bigger, more expressive)
//         fill(this.color.eyes);
//         if (this.timeState === 'drowsy' || this.timeState === 'sleepy') {
//             // Sleepy eyes (half-closed)
//             ellipse(-25, -55, 20, 10);
//             ellipse(25, -55, 20, 10);
//         } else {
//             // Normal eyes (big and cute)
//             ellipse(-25, -55, 28, 32);
//             ellipse(25, -55, 28, 32);
            
//             // Pupils (animated to follow time)
//             fill(0);
//             let pupilX = sin(this.animationFrame * 0.5) * 3;
//             ellipse(-25 + pupilX, -52, 10, 14);
//             ellipse(25 + pupilX, -52, 10, 14);
            
//             // Eye highlights
//             fill(255, 255, 255, 200);
//             ellipse(-28 + pupilX, -55, 6, 8);
//             ellipse(22 + pupilX, -55, 6, 8);
//         }
        
//         // Nose (pink triangle)
//         fill(255, 182, 193);
//         triangle(-6, -35, 0, -28, 6, -35);
        
//         // Mouth (cute cat smile)
//         stroke(100, 100, 100);
//         strokeWeight(1.5);
//         noFill();
//         arc(-8, -30, 10, 8, 0, PI);
//         arc(8, -30, 10, 8, 0, PI);
        
//         // Whiskers
//         stroke(150, 150, 150);
//         strokeWeight(1);
//         // Left whiskers
//         line(-50, -45, -80, -50);
//         line(-50, -40, -80, -40);
//         line(-50, -35, -80, -30);
//         // Right whiskers
//         line(50, -45, 80, -50);
//         line(50, -40, 80, -40);
//         line(50, -35, 80, -30);
        
//         // Tail (animated, curved)
//         stroke(this.color.secondary);
//         strokeWeight(12);
//         noFill();
//         let tailWave = sin(this.animationFrame * 0.8) * 20;
//         bezier(-60, 60, -90, 40 + tailWave, -110, 20 + tailWave, -120, tailWave);
        
//         // Paws (small ovals at bottom)
//         noStroke();
//         fill(this.color.secondary);
//         ellipse(-40, 95, 35, 25);
//         ellipse(40, 95, 35, 25);
//     }
    
//     /**
//      * Draw angry state
//      */
//     drawAngry() {
//         // Similar to idle but with angry features
//         fill(this.color.primary);
//         noStroke();
        
//         ellipse(0, 20, 140, 160);
//         ellipse(0, -40, 100, 90);
        
//         // Angry ears (flattened)
//         triangle(-35, -65, -25, -70, -15, -65);
//         triangle(15, -65, 25, -70, 35, -65);
        
//         // Angry eyes
//         fill(this.color.angry);
//         ellipse(-20, -45, 25, 15);
//         ellipse(20, -45, 25, 15);
        
//         // Pupils (narrow)
//         fill(0);
//         ellipse(-20, -45, 5, 10);
//         ellipse(20, -45, 5, 10);
        
//         // Bared teeth
//         stroke(255);
//         strokeWeight(2);
//         line(-15, -15, -5, -18);
//         line(5, -18, 15, -15);
        
//         // Puffed up tail
//         stroke(this.color.angry);
//         strokeWeight(15);
//         noFill();
//         bezier(-50, 50, -70, 20, -80, 0, -85, -20);
//     }
    
//     /**
//      * Draw surprised state
//      */
//     drawSurprised() {
//         fill(this.color.primary);
//         noStroke();
        
//         ellipse(0, 20, 140, 160);
//         ellipse(0, -40, 100, 90);
        
//         // Perked ears
//         triangle(-30, -75, -20, -90, -10, -75);
//         triangle(10, -75, 20, -90, 30, -75);
        
//         // Wide eyes
//         fill(this.color.eyes);
//         ellipse(-20, -45, 30, 35);
//         ellipse(20, -45, 30, 35);
        
//         fill(0);
//         ellipse(-20, -45, 12, 15);
//         ellipse(20, -45, 12, 15);
        
//         // Open mouth (O shape)
//         fill(50);
//         ellipse(0, -20, 15, 20);
//     }
    
//     /**
//      * Draw purring/happy state
//      */
//     drawPurring() {
//         fill(this.color.primary);
//         noStroke();
        
//         // Slight bob animation
//         let bob = sin(this.animationFrame * 2) * 5;
        
//         ellipse(0, 20 + bob, 140, 160);
//         ellipse(0, -40 + bob, 100, 90);
        
//         // Relaxed ears
//         triangle(-28, -70, -20, -78, -12, -70);
//         triangle(12, -70, 20, -78, 28, -70);
        
//         // Happy eyes (closed)
//         stroke(this.color.secondary);
//         strokeWeight(2);
//         noFill();
//         arc(-20, -45, 20, 12, 0, PI);
//         arc(20, -45, 20, 12, 0, PI);
        
//         // Happy mouth
//         arc(0, -22, 25, 15, 0, PI);
        
//         // Gently swaying tail
//         noStroke();
//         stroke(this.color.secondary);
//         strokeWeight(8);
//         noFill();
//         let tailSway = sin(this.animationFrame * 1.5) * 20;
//         bezier(-50, 50, -70, 40 + tailSway, -85, 30, -95, 20 + tailSway);
//     }
    
//     /**
//      * Draw scared state
//      */
//     drawScared() {
//         fill(this.color.primary);
//         noStroke();
        
//         // Crouched position
//         ellipse(0, 30, 140, 140);
//         ellipse(0, -30, 90, 85);
        
//         // Flattened ears
//         triangle(-32, -60, -25, -65, -18, -60);
//         triangle(18, -60, 25, -65, 32, -60);
        
//         // Fearful eyes
//         fill(this.color.eyes);
//         ellipse(-22, -35, 28, 32);
//         ellipse(22, -35, 28, 32);
        
//         fill(0);
//         ellipse(-22, -35, 10, 14);
//         ellipse(22, -35, 10, 14);
        
//         // Tucked tail
//         stroke(this.color.secondary);
//         strokeWeight(8);
//         noFill();
//         bezier(-40, 40, -30, 50, -20, 55, 0, 50);
//     }
    
//     /**
//      * Get current mood description
//      */
//     getMoodDescription() {
//         if (this.isAngry) return "Angry!";
//         if (this.isPurring) return "Happy 😊";
//         if (this.isSurprised) return "Surprised!";
//         if (this.fearLevel > 50) return "Scared 😨";
//         if (this.mood.annoyance > 60) return "Annoyed 😠";
//         if (this.mood.happiness > 70) return "Content 😌";
//         if (this.timeState === 'drowsy' || this.timeState === 'sleepy') return "Sleepy 😴";
//         return "Neutral";
//     }
    
//     /**
//      * Get state information for UI display
//      */
//     getStateInfo() {
//         return {
//             mood: this.getMoodDescription(),
//             timeState: this.timeState.charAt(0).toUpperCase() + this.timeState.slice(1),
//             interactions: this.interactionCount,
//             happiness: Math.round(this.mood.happiness),
//             annoyance: Math.round(this.mood.annoyance),
//             energy: Math.round(this.mood.energy)
//         };
//     }
// }





/**
 * Character Class - Brandy the Ragdoll Cat
 * Manages character state, personality, and visual representation
 */

class Character {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 200; // Base size for the character
        
        // Character Identity
        this.name = "Brandy";
        this.age = 18;
        this.personality = "ENTP"; // Clever, sharp-tongued, tsundere
        
        // Sprite/Image
        this.sprite = null;
        this.spriteLoaded = false;
        
        // Animation properties
        this.bobOffset = 0;
        this.bobSpeed = 0.05;
        this.bobAmount = 8;
        this.rotation = 0;
        this.targetRotation = 0;
        this.scale = 1.0;
        this.targetScale = 1.0;
        
        // State Management
        this.mood = {
            happiness: 50,    // 0-100
            annoyance: 0,     // 0-100
            energy: 50,       // 0-100 (changes with time of day)
            trust: 50         // 0-100 (affects response intensity)
        };
        
        // Interaction Tracking
        this.interactionCount = 0;
        this.lastInteractionTime = 0;
        this.consecutivePokeCount = 0;
        this.pokeResetTimer = 0;
        
        // Time-based State
        this.timeState = this.calculateTimeState();
        
        // Animation State
        this.currentAnimation = 'idle';
        this.animationFrame = 0;
        this.animationSpeed = 0.1;
        
        // Visual Properties
        this.sprite = null;
        this.color = {
            // Black and red theme matching the artwork
            hair: '#2a2a2a',        // Dark gray/black hair
            hairHighlight: '#c41e3a', // Red highlights
            skin: '#f5e6d3',        // Light skin tone
            outfit: '#1a1a1a',      // Black outfit
            outlineRed: '#8b0000',  // Dark red accents
            eyes: '#2a2a2a',        // Dark eyes
            eyeHighlight: '#ffffff', // White highlights
            angry: '#ff0000'        // Bright red when angry
        };
        
        // Behavior flags
        this.isBeingPoked = false;
        this.isSurprised = false;
        this.isAngry = false;
        this.isPurring = false;
        
        // Fear system (afraid of black snakes)
        this.fearLevel = 0;
        this.scaredOfBlackShapes = true;
        
        // Response timers
        this.surpriseTimer = 0;
        this.angerDuration = 0;
        this.purrDuration = 0;
    }
    
    /**
     * Load character sprite image
     */
    loadSprite(imagePath) {
        this.sprite = loadImage(imagePath, 
            () => {
                this.spriteLoaded = true;
                console.log('Brandy sprite loaded!');
            },
            () => {
                console.log('Could not load sprite, using procedural graphics');
                this.spriteLoaded = false;
            }
        );
    }
    
    /**
     * Calculate time-based state based on hour of day
     */
    calculateTimeState() {
        const hour = new Date().getHours();
        
        // Morning (6-11): Drowsy
        if (hour >= 6 && hour < 12) {
            this.mood.energy = 30;
            return 'drowsy';
        }
        // Noon-Early Afternoon (12-14): Still drowsy
        else if (hour >= 12 && hour < 14) {
            this.mood.energy = 40;
            return 'sleepy';
        }
        // Afternoon (14-18): More awake
        else if (hour >= 14 && hour < 18) {
            this.mood.energy = 70;
            return 'awake';
        }
        // Evening-Night (18-24): Most energetic
        else if (hour >= 18 || hour < 6) {
            this.mood.energy = 90;
            return 'energetic';
        }
        
        return 'awake';
    }
    
    /**
     * Update character state every frame
     */
    update() {
        // Update time state periodically
        if (frameCount % 1800 === 0) { // Every 30 seconds at 60fps
            this.timeState = this.calculateTimeState();
        }
        
        // Animate bobbing (floating effect)
        this.bobOffset += this.bobSpeed;
        
        // Smooth rotation
        this.rotation += (this.targetRotation - this.rotation) * 0.1;
        
        // Smooth scale
        this.scale += (this.targetScale - this.scale) * 0.1;
        
        // Decay annoyance over time
        if (this.mood.annoyance > 0 && millis() - this.lastInteractionTime > 3000) {
            this.mood.annoyance = max(0, this.mood.annoyance - 0.5);
        }
        
        // Reset consecutive poke count after timeout
        if (millis() - this.pokeResetTimer > 2000) {
            this.consecutivePokeCount = 0;
        }
        
        // Update behavior timers
        if (this.surpriseTimer > 0) {
            this.surpriseTimer--;
            if (this.surpriseTimer === 0) {
                this.isSurprised = false;
            }
        }
        
        if (this.angerDuration > 0) {
            this.angerDuration--;
            if (this.angerDuration === 0) {
                this.isAngry = false;
            }
        }
        
        if (this.purrDuration > 0) {
            this.purrDuration--;
            if (this.purrDuration === 0) {
                this.isPurring = false;
            }
        }
        
        // Update happiness based on interactions
        if (this.mood.annoyance < 30 && this.interactionCount > 0) {
            this.mood.happiness = min(100, this.mood.happiness + 0.1);
        }
        
        // Update animation
        this.updateAnimation();
    }
    
    /**
     * Handle being poked/touched
     */
    onPoke(x, y) {
        this.lastInteractionTime = millis();
        this.interactionCount++;
        this.consecutivePokeCount++;
        this.pokeResetTimer = millis();
        
        // Add bounce/recoil animation
        this.targetScale = 0.9;
        setTimeout(() => { this.targetScale = 1.0; }, 100);
        
        // Add slight rotation
        this.targetRotation = (random() > 0.5 ? 1 : -1) * 0.1;
        setTimeout(() => { this.targetRotation = 0; }, 200);
        
        // Immediate response: Surprise reaction
        if (this.consecutivePokeCount === 1) {
            this.triggerSurprise();
        }
        
        // Cumulative response: Getting annoyed
        if (this.consecutivePokeCount > 3) {
            this.mood.annoyance = min(100, this.mood.annoyance + 15);
        }
        
        if (this.consecutivePokeCount > 5) {
            this.triggerAnger();
        }
        
        // Decrease trust slightly with excessive poking
        if (this.consecutivePokeCount > 4) {
            this.mood.trust = max(0, this.mood.trust - 2);
        }
    }
    
    /**
     * Handle gentle interaction (soft touches)
     */
    onGentle() {
        this.mood.happiness = min(100, this.mood.happiness + 5);
        this.mood.annoyance = max(0, this.mood.annoyance - 5);
        this.mood.trust = min(100, this.mood.trust + 1);
        
        // Trigger purring
        if (this.mood.happiness > 60 && !this.isAngry) {
            this.triggerPurring();
        }
    }
    
    /**
     * Trigger surprise behavior
     */
    triggerSurprise() {
        this.isSurprised = true;
        this.surpriseTimer = 60; // 1 second at 60fps
        this.currentAnimation = 'surprised';
    }
    
    /**
     * Trigger anger behavior
     */
    triggerAnger() {
        this.isAngry = true;
        this.angerDuration = 180; // 3 seconds
        this.currentAnimation = 'angry';
        this.mood.happiness = max(0, this.mood.happiness - 20);
    }
    
    /**
     * Trigger purring (happy behavior)
     */
    triggerPurring() {
        this.isPurring = true;
        this.purrDuration = 120; // 2 seconds
        this.currentAnimation = 'purring';
    }
    
    /**
     * React to detected shapes (fear of black snakes)
     */
    detectThreat(shapeData) {
        if (this.scaredOfBlackShapes && shapeData.isElongated && shapeData.isDark) {
            this.fearLevel = min(100, this.fearLevel + 10);
            this.currentAnimation = 'scared';
            this.mood.happiness = max(0, this.mood.happiness - 15);
        } else {
            this.fearLevel = max(0, this.fearLevel - 1);
        }
    }
    
    /**
     * Update animation state
     */
    updateAnimation() {
        // Priority-based animation selection
        if (this.isAngry) {
            this.currentAnimation = 'angry';
        } else if (this.isSurprised) {
            this.currentAnimation = 'surprised';
        } else if (this.isPurring) {
            this.currentAnimation = 'purring';
        } else if (this.fearLevel > 50) {
            this.currentAnimation = 'scared';
        } else {
            // Default to time-based idle
            this.currentAnimation = this.getIdleAnimation();
        }
        
        // Increment animation frame
        this.animationFrame += this.animationSpeed;
    }
    
    /**
     * Get appropriate idle animation based on time state
     */
    getIdleAnimation() {
        switch(this.timeState) {
            case 'drowsy':
            case 'sleepy':
                return 'idle_sleepy';
            case 'energetic':
                return 'idle_energetic';
            default:
                return 'idle_neutral';
        }
    }
    
    /**
     * Draw the character
     */
    draw() {
        push();
        translate(this.x, this.y);
        
        // Apply bobbing animation
        const bob = sin(this.bobOffset) * this.bobAmount;
        translate(0, bob);
        
        // Apply rotation
        rotate(this.rotation);
        
        // Apply scale
        scale(this.scale);
        
        // Draw sprite if loaded, otherwise use procedural graphics
        if (this.spriteLoaded && this.sprite) {
            this.drawSprite();
        } else {
            // Draw based on current animation
            switch(this.currentAnimation) {
                case 'angry':
                    this.drawAngry();
                    break;
                case 'surprised':
                    this.drawSurprised();
                    break;
                case 'purring':
                    this.drawPurring();
                    break;
                case 'scared':
                    this.drawScared();
                    break;
                default:
                    this.drawIdle();
            }
        }
        
        pop();
    }
    
    /**
     * Draw the sprite image
     */
    drawSprite() {
        imageMode(CENTER);
        
        // Tint based on mood
        if (this.isAngry) {
            tint(255, 200, 200); // Reddish when angry
        } else if (this.isPurring) {
            tint(255, 255, 200); // Yellowish when happy
        } else if (this.isSurprised) {
            tint(200, 200, 255); // Bluish when surprised
        } else {
            noTint();
        }
        
        image(this.sprite, 0, 0, this.size, this.size);
        noTint();
    }
    
    /**
     * Draw idle state - Brandy with black outfit and red hair highlights
     */
    drawIdle() {
        // === BODY ===
        fill(this.color.outfit);
        noStroke();
        
        // Torso (black outfit)
        ellipse(0, 20, 100, 140);
        
        // === HEAD ===
        fill(this.color.skin);
        ellipse(0, -60, 90, 100);
        
        // === HAIR (Black with red streaks) ===
        // Main hair (dark)
        fill(this.color.hair);
        
        // Left side hair
        beginShape();
        vertex(-45, -80);
        bezierVertex(-55, -70, -60, -50, -55, -30);
        bezierVertex(-50, -20, -45, -10, -40, -5);
        vertex(-35, -20);
        bezierVertex(-40, -40, -42, -60, -40, -75);
        endShape(CLOSE);
        
        // Right side hair
        beginShape();
        vertex(45, -80);
        bezierVertex(55, -70, 60, -50, 55, -30);
        bezierVertex(50, -20, 45, -10, 40, -5);
        vertex(35, -20);
        bezierVertex(40, -40, 42, -60, 40, -75);
        endShape(CLOSE);
        
        // Top hair (fluffy)
        ellipse(-20, -95, 35, 40);
        ellipse(0, -100, 40, 45);
        ellipse(20, -95, 35, 40);
        
        // Red hair streaks
        fill(this.color.hairHighlight);
        
        // Left red streak
        beginShape();
        vertex(-48, -75);
        bezierVertex(-52, -65, -54, -50, -50, -35);
        vertex(-46, -35);
        bezierVertex(-48, -50, -46, -65, -44, -75);
        endShape(CLOSE);
        
        // Right red streak
        beginShape();
        vertex(48, -75);
        bezierVertex(52, -65, 54, -50, 50, -35);
        vertex(46, -35);
        bezierVertex(48, -50, 46, -65, 44, -75);
        endShape(CLOSE);
        
        // === EYES (anime style) ===
        fill(255);
        stroke(this.color.eyes);
        strokeWeight(2);
        
        if (this.timeState === 'drowsy' || this.timeState === 'sleepy') {
            // Sleepy eyes (half-closed)
            noFill();
            arc(-20, -55, 20, 15, 0, PI);
            arc(20, -55, 20, 15, 0, PI);
        } else {
            // Normal eyes (large anime style)
            ellipse(-20, -55, 22, 26);
            ellipse(20, -55, 22, 26);
            
            // Pupils
            fill(this.color.eyes);
            noStroke();
            let pupilX = sin(this.animationFrame * 0.5) * 2;
            ellipse(-20 + pupilX, -53, 8, 12);
            ellipse(20 + pupilX, -53, 8, 12);
            
            // Eye highlights
            fill(this.color.eyeHighlight);
            ellipse(-22 + pupilX, -56, 4, 6);
            ellipse(18 + pupilX, -56, 4, 6);
        }
        
        // === EYEBROWS (thin, anime style) ===
        stroke(this.color.hair);
        strokeWeight(1.5);
        noFill();
        line(-30, -68, -10, -70);
        line(10, -70, 30, -68);
        
        // === MOUTH (small) ===
        stroke(50);
        strokeWeight(1);
        noFill();
        arc(0, -42, 8, 6, 0, PI);
        
        // === OUTFIT DETAILS ===
        noStroke();
        
        // Collar
        fill(this.color.outfit);
        rect(-25, -10, 50, 8);
        
        // Cross straps (X pattern on chest)
        fill(this.color.outlineRed);
        push();
        translate(0, 35);
        rotate(radians(45));
        rect(-3, -40, 6, 80);
        rotate(radians(-90));
        rect(-3, -40, 6, 80);
        pop();
        
        // Belt/accessories
        fill(this.color.outlineRed);
        rect(-35, 55, 70, 8);
        
        // Belt buckle
        fill(150);
        rect(-8, 55, 16, 8);
        
        // === ARMS (simple, at sides) ===
        fill(this.color.outfit);
        
        // Left arm
        let armSwing = sin(this.animationFrame * 0.3) * 3;
        ellipse(-45, 20 + armSwing, 20, 80);
        
        // Right arm  
        ellipse(45, 20 - armSwing, 20, 80);
        
        // Hands (skin tone)
        fill(this.color.skin);
        ellipse(-45, 55 + armSwing, 16, 16);
        ellipse(45, 55 - armSwing, 16, 16);
        
        // === LEGS (bottom of outfit) ===
        fill(this.color.outfit);
        rect(-20, 85, 18, 30);
        rect(2, 85, 18, 30);
        
        // Shoes
        fill(40);
        ellipse(-11, 115, 22, 12);
        ellipse(11, 115, 22, 12);
    }
    
    /**
     * Draw angry state
     */
    drawAngry() {
        // Draw the full idle pose first
        this.drawIdle();
        
        // Add red glow effect when angry
        push();
        fill(255, 0, 0, 30);
        noStroke();
        ellipse(0, -60, 100, 110);
        ellipse(0, 20, 110, 150);
        pop();
        
        // Anger marks (anime style)
        stroke(this.color.angry);
        strokeWeight(3);
        line(-50, -70, -45, -75);
        line(-55, -65, -50, -70);
        line(45, -75, 50, -70);
        line(50, -70, 55, -65);
    }
    
    /**
     * Draw surprised state
     */
    drawSurprised() {
        // Draw base idle
        this.drawIdle();
        
        // Add surprise effects
        // Wide eyes overlay
        fill(255);
        stroke(0);
        strokeWeight(2);
        ellipse(-20, -55, 26, 30);
        ellipse(20, -55, 26, 30);
        
        // Large pupils
        fill(0);
        noStroke();
        ellipse(-20, -53, 10, 14);
        ellipse(20, -53, 10, 14);
        
        // Open mouth (O shape)
        fill(50);
        stroke(0);
        strokeWeight(1);
        ellipse(0, -38, 12, 16);
        
        // Surprise lines (anime style)
        noFill();
        stroke(100);
        strokeWeight(1.5);
        line(-35, -60, -40, -65);
        line(-35, -55, -42, -55);
        line(35, -60, 40, -65);
        line(35, -55, 42, -55);
    }
    
    /**
     * Draw purring/happy state
     */
    drawPurring() {
        // Draw base idle with slight bob
        let bob = sin(this.animationFrame * 2) * 3;
        push();
        translate(0, bob);
        this.drawIdle();
        pop();
        
        // Happy closed eyes
        push();
        translate(0, bob);
        fill(this.color.skin);
        noStroke();
        ellipse(-20, -55, 24, 20);
        ellipse(20, -55, 24, 20);
        
        stroke(this.color.eyes);
        strokeWeight(2);
        noFill();
        arc(-20, -55, 22, 12, 0, PI);
        arc(20, -55, 22, 12, 0, PI);
        
        // Happy mouth
        arc(0, -40, 16, 12, 0, PI);
        
        // Pink blush
        noStroke();
        fill(255, 150, 150, 80);
        ellipse(-30, -48, 12, 8);
        ellipse(30, -48, 12, 8);
        pop();
        
        // Sparkles (happy effect)
        fill(255, 255, 100, 150);
        noStroke();
        let sparkle = sin(this.animationFrame * 3);
        if (sparkle > 0) {
            ellipse(-40, -70, 4, 4);
            ellipse(40, -70, 4, 4);
            ellipse(0, -100, 4, 4);
        }
    }
    
    /**
     * Draw scared state
     */
    drawScared() {
        // Draw base with crouched position
        push();
        scale(0.95, 0.9); // Slightly crouched
        translate(0, 10);
        this.drawIdle();
        pop();
        
        // Fearful eyes (wide and shaking)
        let shake = sin(this.animationFrame * 8) * 2;
        fill(255);
        stroke(0);
        strokeWeight(2);
        ellipse(-20 + shake, -55, 24, 28);
        ellipse(20 + shake, -55, 24, 28);
        
        // Small pupils
        fill(0);
        noStroke();
        ellipse(-20 + shake, -53, 6, 8);
        ellipse(20 + shake, -53, 6, 8);
        
        // Worried mouth
        stroke(50);
        strokeWeight(1.5);
        noFill();
        arc(0, -38, 10, 8, 0, PI);
        
        // Sweat drops
        fill(100, 150, 255, 150);
        noStroke();
        ellipse(-35, -50, 6, 8);
        ellipse(38, -52, 5, 7);
    }
    
    /**
     * Get current mood description
     */
    getMoodDescription() {
        if (this.isAngry) return "Angry!";
        if (this.isPurring) return "Happy ðŸ˜Š";
        if (this.isSurprised) return "Surprised!";
        if (this.fearLevel > 50) return "Scared ðŸ˜¨";
        if (this.mood.annoyance > 60) return "Annoyed ðŸ˜ ";
        if (this.mood.happiness > 70) return "Content ðŸ˜Œ";
        if (this.timeState === 'drowsy' || this.timeState === 'sleepy') return "Sleepy ðŸ˜´";
        return "Neutral";
    }
    
    /**
     * Get state information for UI display
     */
    getStateInfo() {
        return {
            mood: this.getMoodDescription(),
            timeState: this.timeState.charAt(0).toUpperCase() + this.timeState.slice(1),
            interactions: this.interactionCount,
            happiness: Math.round(this.mood.happiness),
            annoyance: Math.round(this.mood.annoyance),
            energy: Math.round(this.mood.energy)
        };
    }
}