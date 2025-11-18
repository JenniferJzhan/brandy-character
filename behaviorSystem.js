// /**
//  * Behavior System Class
//  * Manages complex behaviors, personality traits, and contextual responses
//  */

// class BehaviorSystem {
//     constructor(character) {
//         this.character = character;
        
//         // Behavior tracking
//         this.activeBehaviors = [];
//         this.behaviorHistory = [];
        
//         // Personality traits (Brandy-specific)
//         this.traits = {
//             tsundere: 0.8,        // Acts tough but is soft inside
//             cleverness: 0.9,      // Sharp-tongued, witty
//             dependence: 0.7,      // Needs friends/interaction
//             spoiled: 0.6,         // Pampered, delicate
//             courage: 0.8,         // Brave when needed
//             playfulness: 0.7      // Enjoys adventures
//         };
        
//         // Relationship tracking
//         this.relationship = {
//             familiarity: 0,       // How well the user knows Brandy
//             trustLevel: 50,       // Mirrors character.mood.trust
//             interactionStyle: 'stranger' // 'stranger', 'acquaintance', 'friend'
//         };
        
//         // Context awareness
//         this.context = {
//             timeOfDay: 'day',
//             recentInteractions: [],
//             environmentalFactors: []
//         };
        
//         // Dialogue/response system
//         this.responses = {
//             firstMeeting: [
//                 "Who are you?",
//                 "Hmph... what do you want?",
//                 "*narrows eyes suspiciously*"
//             ],
//             afterPoke: [
//                 "Hey! Watch it!",
//                 "Do you mind?",
//                 "That's annoying...",
//                 "*hisses*"
//             ],
//             afterManyPokes: [
//                 "STOP THAT!",
//                 "I said quit it!!",
//                 "You're really pushing it...",
//                 "*swats paw angrily*"
//             ],
//             whenHappy: [
//                 "*purrs softly*",
//                 "Well... I suppose you're not terrible.",
//                 "This is... acceptable.",
//                 "*kneads contentedly*"
//             ],
//             whenSleepy: [
//                 "*yawns*",
//                 "Too... tired...",
//                 "Can't you see I'm sleeping?",
//                 "Mmm... five more minutes..."
//             ],
//             whenScared: [
//                 "What was that?!",
//                 "*fur stands on end*",
//                 "N-not that I'm scared or anything!",
//                 "*hides behind something*"
//             ],
//             tsundereRemarks: [
//                 "I-it's not like I enjoy this!",
//                 "Don't get the wrong idea...",
//                 "I'm only here because I have to be!",
//                 "You're so troublesome..."
//             ]
//         };
        
//         // Current response
//         this.currentResponse = null;
//         this.responseTimer = 0;
//         this.responseDisplayDuration = 180; // 3 seconds at 60fps
//     }
    
//     /**
//      * Update behavior system
//      */
//     update() {
//         // Update relationship based on interactions
//         this.updateRelationship();
        
//         // Update context
//         this.updateContext();
        
//         // Process active behaviors
//         this.processActiveBehaviors();
        
//         // Check for behavior triggers
//         this.checkBehaviorTriggers();
        
//         // Update response timer
//         if (this.responseTimer > 0) {
//             this.responseTimer--;
//             if (this.responseTimer === 0) {
//                 this.currentResponse = null;
//             }
//         }
//     }
    
//     /**
//      * Update relationship metrics
//      */
//     updateRelationship() {
//         // Increase familiarity with each interaction
//         if (this.character.interactionCount > this.relationship.familiarity) {
//             this.relationship.familiarity = this.character.interactionCount;
//         }
        
//         // Sync trust level
//         this.relationship.trustLevel = this.character.mood.trust;
        
//         // Update interaction style
//         if (this.relationship.familiarity < 5) {
//             this.relationship.interactionStyle = 'stranger';
//         } else if (this.relationship.familiarity < 20) {
//             this.relationship.interactionStyle = 'acquaintance';
//         } else {
//             this.relationship.interactionStyle = 'friend';
//         }
//     }
    
//     /**
//      * Update contextual awareness
//      */
//     updateContext() {
//         const hour = new Date().getHours();
        
//         if (hour >= 6 && hour < 18) {
//             this.context.timeOfDay = 'day';
//         } else {
//             this.context.timeOfDay = 'night';
//         }
        
//         // Track recent interactions (last 10)
//         if (this.context.recentInteractions.length > 10) {
//             this.context.recentInteractions.shift();
//         }
//     }
    
//     /**
//      * Process currently active behaviors
//      */
//     processActiveBehaviors() {
//         // Update each active behavior
//         for (let i = this.activeBehaviors.length - 1; i >= 0; i--) {
//             const behavior = this.activeBehaviors[i];
//             behavior.duration--;
            
//             if (behavior.duration <= 0) {
//                 this.endBehavior(behavior);
//                 this.activeBehaviors.splice(i, 1);
//             }
//         }
//     }
    
//     /**
//      * Check for behavior triggers
//      */
//     checkBehaviorTriggers() {
//         // Loneliness behavior (if no interaction for a while)
//         if (millis() - this.character.lastInteractionTime > 30000 && this.relationship.interactionStyle === 'friend') {
//             this.triggerBehavior('loneliness');
//         }
        
//         // Tsundere remarks (when happy but trying to hide it)
//         if (this.character.mood.happiness > 70 && !this.character.isPurring) {
//             if (random() < 0.01) { // 1% chance per frame
//                 this.showTsundereRemark();
//             }
//         }
        
//         // Sleep reminder (when very tired)
//         if (this.character.mood.energy < 20 && random() < 0.005) {
//             this.showResponse('whenSleepy');
//         }
//     }
    
//     /**
//      * Trigger a specific behavior
//      */
//     triggerBehavior(behaviorType, duration = 180) {
//         const behavior = {
//             type: behaviorType,
//             startTime: millis(),
//             duration: duration
//         };
        
//         this.activeBehaviors.push(behavior);
//         this.behaviorHistory.push(behavior);
        
//         // Execute behavior-specific logic
//         switch(behaviorType) {
//             case 'loneliness':
//                 this.onLoneliness();
//                 break;
//             case 'excitement':
//                 this.onExcitement();
//                 break;
//             case 'contemplation':
//                 this.onContemplation();
//                 break;
//         }
//     }
    
//     /**
//      * End a behavior
//      */
//     endBehavior(behavior) {
//         behavior.endTime = millis();
//     }
    
//     /**
//      * Handle loneliness behavior
//      */
//     onLoneliness() {
//         // Character shows signs of missing interaction
//         this.character.mood.happiness = max(0, this.character.mood.happiness - 10);
        
//         if (this.relationship.interactionStyle === 'friend') {
//             this.showResponse('tsundereRemarks');
//         }
//     }
    
//     /**
//      * Handle excitement behavior
//      */
//     onExcitement() {
//         this.character.mood.energy = min(100, this.character.mood.energy + 20);
//         this.character.mood.happiness = min(100, this.character.mood.happiness + 10);
//     }
    
//     /**
//      * Handle contemplation behavior
//      */
//     onContemplation() {
//         // Character is thinking (idle, quiet)
//         this.character.animationSpeed = 0.05; // Slow animation
//     }
    
//     /**
//      * Show a tsundere remark
//      */
//     showTsundereRemark() {
//         this.showResponse('tsundereRemarks');
//     }
    
//     /**
//      * Show a response based on category
//      */
//     showResponse(category) {
//         if (this.responses[category]) {
//             const responses = this.responses[category];
//             this.currentResponse = random(responses);
//             this.responseTimer = this.responseDisplayDuration;
//         }
//     }
    
//     /**
//      * Get contextual response to interaction
//      */
//     getResponseToInteraction(interactionType) {
//         // Based on relationship and interaction type
//         if (interactionType === 'poke') {
//             if (this.character.consecutivePokeCount > 5) {
//                 this.showResponse('afterManyPokes');
//             } else if (this.relationship.interactionStyle === 'stranger') {
//                 this.showResponse('firstMeeting');
//             } else {
//                 this.showResponse('afterPoke');
//             }
//         } else if (interactionType === 'gentle') {
//             this.showResponse('whenHappy');
//         }
        
//         // Track interaction in context
//         this.context.recentInteractions.push({
//             type: interactionType,
//             time: millis()
//         });
//     }
    
//     /**
//      * Get personality-influenced response modifier
//      */
//     getPersonalityModifier() {
//         let modifier = {
//             intensity: 1.0,
//             responseDelay: 0,
//             additionalEffects: []
//         };
        
//         // Tsundere trait: Initially resistant, then softens
//         if (this.traits.tsundere > 0.5) {
//             if (this.relationship.interactionStyle === 'stranger') {
//                 modifier.intensity = 1.3; // More dramatic initial reactions
//             } else {
//                 modifier.intensity = 0.8; // Softer with friends
//             }
//         }
        
//         // Cleverness: Quick, witty responses
//         if (this.traits.cleverness > 0.7) {
//             modifier.responseDelay = -10; // Faster response
//         }
        
//         // Spoiled trait: Expects gentle treatment
//         if (this.traits.spoiled > 0.5) {
//             if (this.character.consecutivePokeCount > 3) {
//                 modifier.intensity = 1.5; // Gets more annoyed
//             }
//         }
        
//         return modifier;
//     }
    
//     /**
//      * Draw behavior system visualization
//      */
//     draw() {
//         // Draw current response as speech bubble
//         if (this.currentResponse) {
//             this.drawSpeechBubble(this.currentResponse);
//         }
        
//         // Draw active behavior indicators
//         if (this.activeBehaviors.length > 0) {
//             this.drawBehaviorIndicators();
//         }
//     }
    
//     /**
//      * Draw speech bubble with response
//      */
//     drawSpeechBubble(message) {
//         push();
        
//         // Position above character
//         const bubbleX = this.character.x;
//         const bubbleY = this.character.y - 150;
//         const bubbleW = 240;
//         const bubbleH = 80;
        
//         // Fade in/out animation
//         let alpha = 255;
//         if (this.responseTimer < 30) {
//             alpha = map(this.responseTimer, 0, 30, 0, 255);
//         }
        
//         // Draw bubble background
//         fill(255, 255, 255, alpha);
//         stroke(100, 100, 100, alpha);
//         strokeWeight(2);
//         rectMode(CENTER);
//         rect(bubbleX, bubbleY, bubbleW, bubbleH, 10);
        
//         // Draw pointer triangle
//         noStroke();
//         fill(255, 255, 255, alpha);
//         triangle(
//             bubbleX - 10, bubbleY + bubbleH/2,
//             bubbleX + 10, bubbleY + bubbleH/2,
//             bubbleX, bubbleY + bubbleH/2 + 15
//         );
        
//         // Draw text with proper wrapping
//         fill(50, 50, 50, alpha);
//         noStroke();
//         textAlign(CENTER, CENTER);
//         textSize(13);
//         textStyle(NORMAL);
        
//         // Split text into words and wrap manually
//         const words = message.split(' ');
//         let lines = [];
//         let currentLine = '';
//         const maxWidth = bubbleW - 30;
        
//         for (let word of words) {
//             let testLine = currentLine + word + ' ';
//             textSize(13);
//             if (textWidth(testLine) > maxWidth && currentLine.length > 0) {
//                 lines.push(currentLine.trim());
//                 currentLine = word + ' ';
//             } else {
//                 currentLine = testLine;
//             }
//         }
//         if (currentLine.length > 0) {
//             lines.push(currentLine.trim());
//         }
        
//         // Draw each line
//         const lineHeight = 16;
//         const startY = bubbleY - (lines.length - 1) * lineHeight / 2;
//         for (let i = 0; i < lines.length; i++) {
//             text(lines[i], bubbleX, startY + i * lineHeight);
//         }
        
//         pop();
//     }
    
//     /**
//      * Draw active behavior indicators
//      */
//     drawBehaviorIndicators() {
//         push();
        
//         let yOffset = 150;
//         for (let behavior of this.activeBehaviors) {
//             fill(100, 200, 255, 150);
//             noStroke();
//             textAlign(LEFT);
//             textSize(12);
//             text(`Behavior: ${behavior.type}`, 10, yOffset);
//             yOffset += 20;
//         }
        
//         pop();
//     }
    
//     /**
//      * Get current personality state description
//      */
//     getPersonalityState() {
//         let state = [];
        
//         if (this.character.mood.happiness > 70) {
//             state.push("Content (but won't admit it)");
//         }
        
//         if (this.relationship.interactionStyle === 'friend') {
//             state.push("Attached to you");
//         }
        
//         if (this.character.consecutivePokeCount > 5) {
//             state.push("Irritated");
//         }
        
//         return state.length > 0 ? state.join(", ") : "Neutral";
//     }
// }



/**
 * Behavior System Class
 * Manages complex behaviors, personality traits, and contextual responses
 */

class BehaviorSystem {
    constructor(character) {
        this.character = character;
        
        // Behavior tracking
        this.activeBehaviors = [];
        this.behaviorHistory = [];
        
        // Personality traits (Brandy-specific)
        this.traits = {
            tsundere: 0.8,        // Acts tough but is soft inside
            cleverness: 0.9,      // Sharp-tongued, witty
            dependence: 0.7,      // Needs friends/interaction
            spoiled: 0.6,         // Pampered, delicate
            courage: 0.8,         // Brave when needed
            playfulness: 0.7      // Enjoys adventures
        };
        
        // Relationship tracking
        this.relationship = {
            familiarity: 0,       // How well the user knows Brandy
            trustLevel: 50,       // Mirrors character.mood.trust
            interactionStyle: 'stranger' // 'stranger', 'acquaintance', 'friend'
        };
        
        // Context awareness
        this.context = {
            timeOfDay: 'day',
            recentInteractions: [],
            environmentalFactors: []
        };
        
        // Dialogue/response system
        this.responses = {
            firstMeeting: [
                "Who are you?",
                "Hmph... what do you want?",
                "*narrows eyes suspiciously*"
            ],
            afterPoke: [
                "Hey! Watch it!",
                "Do you mind?",
                "That's annoying...",
                "*hisses*"
            ],
            afterManyPokes: [
                "STOP THAT!",
                "I said quit it!!",
                "You're really pushing it...",
                "*swats paw angrily*"
            ],
            whenHappy: [
                "*purrs softly*",
                "Well... I suppose you're not terrible.",
                "This is... acceptable.",
                "*kneads contentedly*"
            ],
            whenSleepy: [
                "*yawns*",
                "Too... tired...",
                "Can't you see I'm sleeping?",
                "Mmm... five more minutes..."
            ],
            whenScared: [
                "What was that?!",
                "*fur stands on end*",
                "N-not that I'm scared or anything!",
                "*hides behind something*"
            ],
            tsundereRemarks: [
                "I-it's not like I enjoy this!",
                "Don't get the wrong idea...",
                "I'm only here because I have to be!",
                "You're so troublesome..."
            ]
        };
        
        // Current response
        this.currentResponse = null;
        this.responseTimer = 0;
        this.responseDisplayDuration = 180; // 3 seconds at 60fps
    }
    
    /**
     * Update behavior system
     */
    update() {
        // Update relationship based on interactions
        this.updateRelationship();
        
        // Update context
        this.updateContext();
        
        // Process active behaviors
        this.processActiveBehaviors();
        
        // Check for behavior triggers
        this.checkBehaviorTriggers();
        
        // Update response timer
        if (this.responseTimer > 0) {
            this.responseTimer--;
            if (this.responseTimer === 0) {
                this.currentResponse = null;
            }
        }
    }
    
    /**
     * Update relationship metrics
     */
    updateRelationship() {
        // Increase familiarity with each interaction
        if (this.character.interactionCount > this.relationship.familiarity) {
            this.relationship.familiarity = this.character.interactionCount;
        }
        
        // Sync trust level
        this.relationship.trustLevel = this.character.mood.trust;
        
        // Update interaction style
        if (this.relationship.familiarity < 5) {
            this.relationship.interactionStyle = 'stranger';
        } else if (this.relationship.familiarity < 20) {
            this.relationship.interactionStyle = 'acquaintance';
        } else {
            this.relationship.interactionStyle = 'friend';
        }
    }
    
    /**
     * Update contextual awareness
     */
    updateContext() {
        const hour = new Date().getHours();
        
        if (hour >= 6 && hour < 18) {
            this.context.timeOfDay = 'day';
        } else {
            this.context.timeOfDay = 'night';
        }
        
        // Track recent interactions (last 10)
        if (this.context.recentInteractions.length > 10) {
            this.context.recentInteractions.shift();
        }
    }
    
    /**
     * Process currently active behaviors
     */
    processActiveBehaviors() {
        // Update each active behavior
        for (let i = this.activeBehaviors.length - 1; i >= 0; i--) {
            const behavior = this.activeBehaviors[i];
            behavior.duration--;
            
            if (behavior.duration <= 0) {
                this.endBehavior(behavior);
                this.activeBehaviors.splice(i, 1);
            }
        }
    }
    
    /**
     * Check for behavior triggers
     */
    checkBehaviorTriggers() {
        // Loneliness behavior (if no interaction for a while AND already friends)
        const timeSinceLastInteraction = millis() - this.character.lastInteractionTime;
        const isLonely = timeSinceLastInteraction > 30000 && this.relationship.interactionStyle === 'friend';
        
        // Only trigger loneliness once, not repeatedly
        const alreadyLonely = this.activeBehaviors.some(b => b.type === 'loneliness');
        
        if (isLonely && !alreadyLonely) {
            this.triggerBehavior('loneliness', 300); // 5 second duration
        }
        
        // Tsundere remarks (when happy but trying to hide it) - rare
        if (this.character.mood.happiness > 70 && !this.character.isPurring && random() < 0.001) {
            this.showTsundereRemark();
        }
        
        // Sleep reminder (when very tired) - rare
        if (this.character.mood.energy < 20 && random() < 0.001) {
            this.showResponse('whenSleepy');
        }
    }
    
    /**
     * Trigger a specific behavior
     */
    triggerBehavior(behaviorType, duration = 180) {
        const behavior = {
            type: behaviorType,
            startTime: millis(),
            duration: duration
        };
        
        this.activeBehaviors.push(behavior);
        this.behaviorHistory.push(behavior);
        
        // Execute behavior-specific logic
        switch(behaviorType) {
            case 'loneliness':
                this.onLoneliness();
                break;
            case 'excitement':
                this.onExcitement();
                break;
            case 'contemplation':
                this.onContemplation();
                break;
        }
    }
    
    /**
     * End a behavior
     */
    endBehavior(behavior) {
        behavior.endTime = millis();
    }
    
    /**
     * Handle loneliness behavior
     */
    onLoneliness() {
        // Character shows signs of missing interaction
        this.character.mood.happiness = max(0, this.character.mood.happiness - 10);
        
        if (this.relationship.interactionStyle === 'friend') {
            this.showResponse('tsundereRemarks');
        }
        
        // Reset interaction time so it doesn't trigger repeatedly
        this.character.lastInteractionTime = millis();
    }
    
    /**
     * Handle excitement behavior
     */
    onExcitement() {
        this.character.mood.energy = min(100, this.character.mood.energy + 20);
        this.character.mood.happiness = min(100, this.character.mood.happiness + 10);
    }
    
    /**
     * Handle contemplation behavior
     */
    onContemplation() {
        // Character is thinking (idle, quiet)
        this.character.animationSpeed = 0.05; // Slow animation
    }
    
    /**
     * Show a tsundere remark
     */
    showTsundereRemark() {
        this.showResponse('tsundereRemarks');
    }
    
    /**
     * Show a response based on category
     */
    showResponse(category) {
        if (this.responses[category]) {
            const responses = this.responses[category];
            this.currentResponse = random(responses);
            this.responseTimer = this.responseDisplayDuration;
        }
    }
    
    /**
     * Get contextual response to interaction
     */
    getResponseToInteraction(interactionType) {
        // Based on relationship and interaction type
        if (interactionType === 'poke') {
            if (this.character.consecutivePokeCount > 5) {
                this.showResponse('afterManyPokes');
            } else if (this.relationship.interactionStyle === 'stranger') {
                this.showResponse('firstMeeting');
            } else {
                this.showResponse('afterPoke');
            }
        } else if (interactionType === 'gentle') {
            this.showResponse('whenHappy');
        }
        
        // Track interaction in context
        this.context.recentInteractions.push({
            type: interactionType,
            time: millis()
        });
    }
    
    /**
     * Get personality-influenced response modifier
     */
    getPersonalityModifier() {
        let modifier = {
            intensity: 1.0,
            responseDelay: 0,
            additionalEffects: []
        };
        
        // Tsundere trait: Initially resistant, then softens
        if (this.traits.tsundere > 0.5) {
            if (this.relationship.interactionStyle === 'stranger') {
                modifier.intensity = 1.3; // More dramatic initial reactions
            } else {
                modifier.intensity = 0.8; // Softer with friends
            }
        }
        
        // Cleverness: Quick, witty responses
        if (this.traits.cleverness > 0.7) {
            modifier.responseDelay = -10; // Faster response
        }
        
        // Spoiled trait: Expects gentle treatment
        if (this.traits.spoiled > 0.5) {
            if (this.character.consecutivePokeCount > 3) {
                modifier.intensity = 1.5; // Gets more annoyed
            }
        }
        
        return modifier;
    }
    
    /**
     * Draw behavior system visualization
     */
    draw() {
        // Draw current response as speech bubble
        if (this.currentResponse) {
            this.drawSpeechBubble(this.currentResponse);
        }
        
        // Draw active behavior indicators
        if (this.activeBehaviors.length > 0) {
            this.drawBehaviorIndicators();
        }
    }
    
    /**
     * Draw speech bubble with response
     */
    drawSpeechBubble(message) {
        push();
        
        // Position above character
        const bubbleX = this.character.x;
        const bubbleY = this.character.y - 150;
        const bubbleW = 240;
        const bubbleH = 80;
        
        // Fade in/out animation
        let alpha = 255;
        if (this.responseTimer < 30) {
            alpha = map(this.responseTimer, 0, 30, 0, 255);
        }
        
        // Draw bubble background
        fill(255, 255, 255, alpha);
        stroke(100, 100, 100, alpha);
        strokeWeight(2);
        rectMode(CENTER);
        rect(bubbleX, bubbleY, bubbleW, bubbleH, 10);
        
        // Draw pointer triangle
        noStroke();
        fill(255, 255, 255, alpha);
        triangle(
            bubbleX - 10, bubbleY + bubbleH/2,
            bubbleX + 10, bubbleY + bubbleH/2,
            bubbleX, bubbleY + bubbleH/2 + 15
        );
        
        // Draw text with proper wrapping
        fill(50, 50, 50, alpha);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(13);
        textStyle(NORMAL);
        
        // Split text into words and wrap manually
        const words = message.split(' ');
        let lines = [];
        let currentLine = '';
        const maxWidth = bubbleW - 30;
        
        for (let word of words) {
            let testLine = currentLine + word + ' ';
            textSize(13);
            if (textWidth(testLine) > maxWidth && currentLine.length > 0) {
                lines.push(currentLine.trim());
                currentLine = word + ' ';
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine.length > 0) {
            lines.push(currentLine.trim());
        }
        
        // Draw each line
        const lineHeight = 16;
        const startY = bubbleY - (lines.length - 1) * lineHeight / 2;
        for (let i = 0; i < lines.length; i++) {
            text(lines[i], bubbleX, startY + i * lineHeight);
        }
        
        pop();
    }
    
    /**
     * Draw active behavior indicators
     */
    drawBehaviorIndicators() {
        // Only show in debug mode
        if (!debugMode) return;
        
        push();
        
        let yOffset = 150;
        for (let behavior of this.activeBehaviors) {
            fill(100, 200, 255, 150);
            noStroke();
            textAlign(LEFT);
            textSize(12);
            text(`Behavior: ${behavior.type}`, 10, yOffset);
            yOffset += 20;
        }
        
        pop();
    }
    
    /**
     * Get current personality state description
     */
    getPersonalityState() {
        let state = [];
        
        if (this.character.mood.happiness > 70) {
            state.push("Content (but won't admit it)");
        }
        
        if (this.relationship.interactionStyle === 'friend') {
            state.push("Attached to you");
        }
        
        if (this.character.consecutivePokeCount > 5) {
            state.push("Irritated");
        }
        
        return state.length > 0 ? state.join(", ") : "Neutral";
    }
}