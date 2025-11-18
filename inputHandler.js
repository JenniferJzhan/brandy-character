/**
 * Input Handler Class
 * Manages all input types: touch, motion, camera/hand tracking
 */

class InputHandler {
    constructor(character) {
        this.character = character;
        
        // Touch tracking
        this.touches = [];
        this.lastTouchTime = 0;
        this.touchHoldDuration = 0;
        this.isTouchHold = false;
        
        // Motion tracking
        this.motionEnabled = false;
        this.lastMotionTime = 0;
        
        // ML5 Hand Tracking
        this.handPose = null;
        this.hands = [];
        this.cameraReady = false;
        this.cameraEnabled = false;
        this.video = null;
        this.lastHeartbeat = 0; // For debug logging
        
        // Gesture recognition
        this.lastGesture = null;
        this.gestureConfidence = 0;
        this.lastGestureTime = 0; // For throttling
        
        // Input mode
        this.primaryInput = 'touch'; // 'touch', 'camera', 'motion'
        this.secondaryInput = null;
    }
    
    /**
     * Initialize input systems
     */
    init() {
        // Touch events are automatically handled by p5.js
        // We'll use touchStarted, touchMoved, touchEnded
        
        // Request motion permission for iOS
        if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
            // Will request permission when motion is enabled
            this.motionRequiresPermission = true;
        }
        
        console.log('Input Handler initialized');
    }
    
    /**
     * Enable camera for ML5 hand tracking
     */
    async enableCamera() {
        if (this.cameraEnabled) {
            console.log('Camera already enabled');
            return;
        }
        
        console.log('Starting camera initialization...');
        
        try {
            // Create video capture
            this.video = createCapture(VIDEO, () => {
                console.log('✅ Camera ready - video stream active');
                this.cameraReady = true;
            });
            
            this.video.size(320, 240);
            this.video.hide(); // Hide the video element
            
            console.log('Video element created, loading HandPose model...');
            
            // Initialize ML5 HandPose with single options object
            const options = {
                maxHands: 2,
                runtime: "mediapipe",
                modelType: "full"
            };
            
            this.handPose = ml5.handPose(options, () => {
                console.log('✅ HandPose model loaded successfully');
                console.log('Starting hand detection loop...');
                // Start detecting hands
                this.detectHands();
            });
            
            this.cameraEnabled = true;
            this.primaryInput = 'camera';
            
            console.log('Camera enabled, waiting for model to load...');
            
        } catch (error) {
            console.error('❌ Error enabling camera:', error);
            this.cameraEnabled = false;
        }
    }
    
    /**
     * Detect hands continuously
     */
    async detectHands() {
        if (!this.handPose || !this.cameraReady || !this.video) {
            console.log('⚠️ Detection not ready:', {
                handPose: !!this.handPose,
                cameraReady: this.cameraReady,
                video: !!this.video
            });
            return;
        }
        
        // Heartbeat log every 3 seconds
        if (!this.lastHeartbeat || millis() - this.lastHeartbeat > 3000) {
            console.log('💓 Hand detection running...');
            this.lastHeartbeat = millis();
        }
        
        try {
            // Detect hands using the video element
            const predictions = await this.handPose.detect(this.video.elt);
            this.hands = predictions || [];
            
            if (this.hands.length > 0) {
                console.log('👋 Hand detected! Count:', this.hands.length);
                this.processHandGestures(this.hands);
            }
        } catch (error) {
            console.error('Detection error:', error);
        }
        
        // Continue detecting if camera is still enabled
        if (this.cameraEnabled) {
            requestAnimationFrame(() => this.detectHands());
        } else {
            console.log('Camera disabled, stopping detection loop');
        }
    }
    
    /**
     * Disable camera
     */
    disableCamera() {
        this.cameraEnabled = false;
        this.cameraReady = false;
        
        if (this.video) {
            this.video.remove();
            this.video = null;
        }
        
        this.handPose = null;
        this.hands = [];
        this.primaryInput = 'touch';
    }
    
    /**
     * Enable motion detection
     */
    async enableMotion() {
        if (this.motionRequiresPermission) {
            try {
                const permission = await DeviceMotionEvent.requestPermission();
                if (permission === 'granted') {
                    this.motionEnabled = true;
                    window.addEventListener('devicemotion', this.handleMotion.bind(this));
                }
            } catch (error) {
                console.error('Motion permission denied:', error);
            }
        } else {
            this.motionEnabled = true;
            window.addEventListener('devicemotion', this.handleMotion.bind(this));
        }
        
        if (this.motionEnabled) {
            this.secondaryInput = 'motion';
        }
    }
    
    /**
     * Handle device motion
     */
    handleMotion(event) {
        const acc = event.accelerationIncludingGravity;
        const totalAcceleration = Math.sqrt(acc.x**2 + acc.y**2 + acc.z**2);
        
        // Detect shake (high acceleration)
        if (totalAcceleration > 20 && millis() - this.lastMotionTime > 1000) {
            this.onShake();
            this.lastMotionTime = millis();
        }
        
        // Detect tilt
        const tiltX = acc.x;
        const tiltY = acc.y;
        this.onTilt(tiltX, tiltY);
    }
    
    /**
     * Process hand gestures from ML5
     */
    processHandGestures(hands) {
        if (!hands || hands.length === 0) return;
        
        console.log('Processing hands:', hands.length, 'detected');
        
        const hand = hands[0]; // Use first detected hand
        
        if (!hand.keypoints || hand.keypoints.length === 0) {
            console.log('No keypoints found in hand data');
            return;
        }
        
        console.log('Hand keypoints:', hand.keypoints.length);
        
        // Get palm position (wrist keypoint - index 0)
        const palm = hand.keypoints[0];
        const palmX = map(palm.x, 0, this.video.width, 0, width);
        const palmY = map(palm.y, 0, this.video.height, 0, height);
        
        console.log('Palm position:', palmX, palmY);
        
        // Detect gesture anywhere on screen (no distance check needed)
        console.log('Detecting gesture...');
        this.detectGesture(hand.keypoints);
    }
    
    /**
     * Detect specific gestures from hand keypoints
     */
    detectGesture(keypoints) {
        if (!keypoints || keypoints.length < 21) {
            console.log('Not enough keypoints for gesture detection:', keypoints.length);
            return;
        }
        
        // Throttle gesture detection to avoid spam
        const now = millis();
        if (now - this.lastGestureTime < 500) {
            console.log('Gesture throttled - too soon');
            return; // 500ms cooldown
        }
        
        console.log('Analyzing gesture...');
        
        // Simplified gesture detection
        // Keypoint indices: 0=wrist, 4=thumb tip, 8=index tip, 12=middle tip, 16=ring tip, 20=pinky tip
        
        const wrist = keypoints[0];
        const indexTip = keypoints[8];
        const middleTip = keypoints[12];
        const ringTip = keypoints[16];
        const pinkyTip = keypoints[20];
        
        // Calculate if fingers are extended (tip is above middle joint)
        const indexExtended = indexTip.y < keypoints[6].y;
        const middleExtended = middleTip.y < keypoints[10].y;
        const ringExtended = ringTip.y < keypoints[14].y;
        const pinkyExtended = pinkyTip.y < keypoints[18].y;
        
        console.log('Finger states:', {
            index: indexExtended,
            middle: middleExtended,
            ring: ringExtended,
            pinky: pinkyExtended
        });
        
        // Open palm gesture - gentle interaction
        if (indexExtended && middleExtended && ringExtended && pinkyExtended) {
            console.log('✋ OPEN PALM DETECTED - gentle interaction');
            this.onGentleGesture();
            this.lastGesture = 'palm';
            this.lastGestureTime = now;
        }
        // Pointing gesture - poke
        else if (indexExtended && !middleExtended && !ringExtended && !pinkyExtended) {
            const pokeX = map(indexTip.x, 0, this.video.width, 0, width);
            const pokeY = map(indexTip.y, 0, this.video.height, 0, height);
            console.log('👉 POINTING DETECTED - poke at', pokeX, pokeY);
            this.onPoke(pokeX, pokeY);
            this.lastGesture = 'point';
            this.lastGestureTime = now;
        } else {
            console.log('No recognized gesture');
        }
    }
    
    /**
     * Handle touch start
     */
    handleTouchStart(x, y) {
        this.touches.push({x, y, startTime: millis()});
        this.lastTouchTime = millis();
        this.isTouchHold = false;
        this.touchHoldDuration = 0;
    }
    
    /**
     * Handle touch move
     */
    handleTouchMove(x, y) {
        // Track if it's a hold or a swipe
        if (this.touches.length > 0) {
            const firstTouch = this.touches[0];
            const holdTime = millis() - firstTouch.startTime;
            
            if (holdTime > 500) {
                this.isTouchHold = true;
                this.touchHoldDuration = holdTime;
            }
        }
    }
    
    /**
     * Handle touch end
     */
    handleTouchEnd(x, y) {
        if (this.touches.length > 0) {
            const touch = this.touches[0];
            const duration = millis() - touch.startTime;
            const distance = dist(x, y, touch.x, touch.y);
            
            // Determine interaction type
            if (this.isTouchHold && duration > 1000) {
                // Long gentle hold
                this.onGentleTouch(x, y);
            } else if (distance < 20) {
                // Tap/Poke
                this.onPoke(x, y);
            } else {
                // Swipe
                this.onSwipe(touch.x, touch.y, x, y);
            }
        }
        
        this.touches = [];
        this.isTouchHold = false;
    }
    
    /**
     * Handle poke interaction
     */
    onPoke(x, y) {
        // Check if poke is on character
        const distance = dist(x, y, this.character.x, this.character.y);
        
        if (distance < this.character.size / 2) {
            this.character.onPoke(x, y);
            console.log('Poke detected at:', x, y);
        }
    }
    
    /**
     * Handle gentle touch
     */
    onGentleTouch(x, y) {
        const distance = dist(x, y, this.character.x, this.character.y);
        
        if (distance < this.character.size / 2) {
            this.character.onGentle();
            console.log('Gentle touch detected');
        }
    }
    
    /**
     * Handle gentle gesture (from camera)
     */
    onGentleGesture() {
        console.log('Gentle gesture - triggering character response');
        this.character.onGentle();
        
        // Also trigger behavior system response
        if (typeof behaviorSystem !== 'undefined') {
            behaviorSystem.getResponseToInteraction('gentle');
        }
    }
    
    /**
     * Handle swipe
     */
    onSwipe(startX, startY, endX, endY) {
        const swipeDistance = dist(startX, startY, endX, endY);
        const swipeAngle = atan2(endY - startY, endX - startX);
        
        console.log('Swipe detected:', swipeDistance, 'pixels');
        
        // Could trigger different behaviors based on swipe direction
        // For now, treat as gentle if slow, poke if fast
        if (swipeDistance > 100) {
            this.onPoke(endX, endY);
        }
    }
    
    /**
     * Handle shake
     */
    onShake() {
        console.log('Shake detected!');
        // Could trigger surprise or fear
        this.character.triggerSurprise();
    }
    
    /**
     * Handle tilt
     */
    onTilt(x, y) {
        // Could affect character orientation or mood
        // For now, just log significant tilts
        if (Math.abs(x) > 5 || Math.abs(y) > 5) {
            // Character could respond to phone tilt
        }
    }
    
    /**
     * Draw debug visualization
     */
    drawDebug() {
        if (!this.cameraEnabled) return;
        
        // Draw camera feed in top right corner (always visible when camera is on)
        if (this.video && this.cameraReady) {
            push();
            
            // Position in top right
            const feedWidth = 200;
            const feedHeight = 150;
            const feedX = width - feedWidth - 10;
            const feedY = 10;
            
            // Draw background
            fill(0, 0, 0, 150);
            noStroke();
            rect(feedX - 5, feedY - 5, feedWidth + 10, feedHeight + 10, 8);
            
            // Draw video feed (flipped horizontally for mirror effect)
            push();
            translate(feedX + feedWidth, feedY);
            scale(-1, 1); // Flip horizontally
            image(this.video, 0, 0, feedWidth, feedHeight);
            pop();
            
            // Border - green if hand detected, blue otherwise
            noFill();
            if (this.hands.length > 0) {
                stroke(0, 255, 0);
            } else {
                stroke(100, 200, 255);
            }
            strokeWeight(3);
            rect(feedX, feedY, feedWidth, feedHeight, 5);
            
            // Label with gesture info
            fill(255);
            noStroke();
            textAlign(LEFT, TOP);
            textSize(12);
            textStyle(BOLD);
            text("Camera", feedX + 5, feedY + 5);
            
            // Show detected gesture
            if (this.lastGesture && millis() - this.lastGestureTime < 1000) {
                textAlign(CENTER, TOP);
                textSize(14);
                fill(0, 255, 0);
                text(this.lastGesture.toUpperCase() + '!', feedX + feedWidth/2, feedY + feedHeight - 25);
            }
            
            // Hand count
            if (this.hands.length > 0) {
                textAlign(RIGHT, TOP);
                textSize(11);
                fill(0, 255, 0);
                text(this.hands.length + ' hand' + (this.hands.length > 1 ? 's' : ''), 
                     feedX + feedWidth - 5, feedY + 5);
            }
            
            pop();
        }
        
        // Draw detected hand keypoints (only in debug mode)
        if (this.hands.length > 0 && debugMode) {
            push();
            stroke(0, 255, 0);
            strokeWeight(3);
            fill(0, 255, 0);
            
            for (let hand of this.hands) {
                if (!hand.keypoints) continue;
                
                for (let keypoint of hand.keypoints) {
                    const x = map(keypoint.x, 0, this.video.width, 0, width);
                    const y = map(keypoint.y, 0, this.video.height, 0, height);
                    circle(x, y, 8);
                }
                
                // Draw hand label
                if (hand.keypoints[0]) {
                    const wrist = hand.keypoints[0];
                    const x = map(wrist.x, 0, this.video.width, 0, width);
                    const y = map(wrist.y, 0, this.video.height, 0, height);
                    fill(0, 255, 0);
                    noStroke();
                    textAlign(CENTER);
                    textSize(14);
                    text(this.lastGesture || "hand", x, y - 20);
                }
            }
            pop();
        }
    }
    
    /**
     * Get current input mode description
     */
    getInputMode() {
        let mode = `Primary: ${this.primaryInput}`;
        if (this.secondaryInput) {
            mode += ` | Secondary: ${this.secondaryInput}`;
        }
        return mode;
    }
}

// P5.js touch event callbacks (will be wired up in sketch.js)
function touchStarted() {
    if (inputHandler) {
        inputHandler.handleTouchStart(mouseX, mouseY);
    }
    return false; // Prevent default
}

function touchMoved() {
    if (inputHandler) {
        inputHandler.handleTouchMove(mouseX, mouseY);
    }
    return false;
}

function touchEnded() {
    if (inputHandler) {
        inputHandler.handleTouchEnd(mouseX, mouseY);
    }
    return false;
}