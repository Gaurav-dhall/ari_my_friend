import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from '../components/Slider';
import FloatingNav from '../components/FloatingNav';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import { loadBehavior, saveBehavior } from '../utils/behaviourStorage';
import { DEFAULT_BEHAVIOR } from '../config/ariBehavior';

const Behavior = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Initialize state from local storage and normalize to 0-100 scale
  const [behaviors, setBehaviors] = useState(() => {
    const loaded = loadBehavior();
    // Convert 0.0-1.0 scale to 0-100 scale for UI
    const scaled = {};
    for (const key in loaded) {
      scaled[key] = Math.round(loaded[key] * 100);
    }
    return scaled;
  });

  // Auto-save whenever behaviors change (debouncing could be added, but this is fine for sliders)
  useEffect(() => {
    // Convert back to 0.0-1.0 scale for storage
    const toSave = {};
    for (const key in behaviors) {
      toSave[key] = Number((behaviors[key] / 100).toFixed(2));
    }
    saveBehavior(toSave);
  }, [behaviors]);

  const updateBehavior = (key, value) => {
    setBehaviors(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    const scaledDefault = {};
    for (const key in DEFAULT_BEHAVIOR) {
      scaledDefault[key] = Math.round(DEFAULT_BEHAVIOR[key] * 100);
    }
    setBehaviors(scaledDefault);
    setCurrentStep(0); // Optional: go back to start
  };

  // Keys must match DEFAULT_BEHAVIOR in src/config/ariBehavior.js
  const behaviorConfig = [
    {
      key: 'warmth',
      label: '1️⃣ Warmth',
      description: 'How emotionally close Ari feels',
      leftLabel: 'Distant',
      rightLabel: 'Caring'
    },
    {
      key: 'talkativeness',
      label: '2️⃣ Talkativeness',
      description: "How long Ari’s replies are",
      leftLabel: 'Brief',
      rightLabel: 'Expressive'
    },
    {
      key: 'playfulness',
      label: '3️⃣ Playfulness',
      description: 'Humor, teasing, light jokes',
      leftLabel: 'Serious',
      rightLabel: 'Playful'
    },
    {
      key: 'emotionalDepth',
      label: '4️⃣ Emotional Depth',
      description: 'How deeply Ari explores feelings',
      leftLabel: 'Light',
      rightLabel: 'Deep'
    },
    {
      key: 'honesty',
      label: '5️⃣ Honesty / Directness',
      description: 'Sugarcoating vs truth',
      leftLabel: 'Gentle',
      rightLabel: 'Honest'
    },
    {
      key: 'initiative',
      label: '6️⃣ Initiative',
      description: 'Does Ari lead the conversation?',
      leftLabel: 'Listener',
      rightLabel: 'Conversational'
    },
    {
      key: 'energy', // Changed from energyLevel
      label: '7️⃣ Energy Level',
      description: 'Overall vibe intensity',
      leftLabel: 'Chill',
      rightLabel: 'Energetic'
    },
    {
      key: 'casualness', // Changed from languageStyle
      label: '8️⃣ Language Style',
      description: 'How casual/formal the tone is',
      leftLabel: 'Formal',
      rightLabel: 'Casual'
    }
  ];

  const handleNext = () => {
    if (currentStep < behaviorConfig.length) {
      setCurrentStep(curr => curr + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    }
  };

  const isLastStep = currentStep === behaviorConfig.length;

  return (
    <div className="min-h-screen bg-main text-main font-soft selection:bg-accent/20 overflow-hidden flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-md mx-auto w-full relative">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-8 space-y-2 relative w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Reset Button Positioned Absolute Top Right or just part of flow? 
              Let's put it top right of the header area. */}
          <button 
            onClick={handleReset}
            className="absolute right-0 top-0 p-2 text-muted hover:text-accent transition-colors rounded-full hover:bg-white/5"
            title="Reset to Default"
          >
            <RotateCcw size={18} />
          </button>

          <h1 className="text-3xl font-bold tracking-tight">Customize Ari</h1>
          <p className="text-muted">
            {isLastStep ? "All set!" : `Step ${currentStep + 1} of ${behaviorConfig.length}`}
          </p>
        </motion.div>

        {/* Content Area */}
        <div className="w-full relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isLastStep ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full bg-white/5 p-8 rounded-3xl border border-white/5 backdrop-blur-sm shadow-2xl"
              >
                <Slider
                  label={behaviorConfig[currentStep].label}
                  description={behaviorConfig[currentStep].description}
                  leftLabel={behaviorConfig[currentStep].leftLabel}
                  rightLabel={behaviorConfig[currentStep].rightLabel}
                  value={behaviors[behaviorConfig[currentStep].key] ?? 50} // Fallback to 50 if key missing
                  onChange={(val) => updateBehavior(behaviorConfig[currentStep].key, val)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="completion"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 w-full"
              >
                <div className="text-6xl mb-4">✨</div>
                <p className="text-xl font-medium text-main/90 italic leading-relaxed">
                  "Perfect! Ari is eager to talk to you in a fun, attractive, and humorous way."
                </p>
                
                <button 
                  onClick={() => navigate('/chat')}
                  className="
                    w-full py-4 rounded-2xl bg-[rgb(var(--accent))] text-white font-bold text-lg
                    shadow-lg shadow-accent/25 hover:opacity-90 transition-all active:scale-95
                    animate-pulse hover:animate-none
                  "
                >
                  Let's Chat
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons for Wizard */}
        {!isLastStep && (
          <motion.div 
            className="flex gap-4 w-full mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`
                flex-1 py-4 rounded-2xl font-semibold transition-all
                items-center justify-center gap-2 flex
                ${currentStep === 0 
                  ? 'opacity-0 pointer-events-none' 
                  : 'bg-white/5 text-muted hover:bg-white/10 text-main'}
              `}
            >
              <ChevronLeft size={20} />
              Back
            </button>

            <button
              onClick={handleNext}
              className="
                flex-1 py-4 rounded-2xl bg-white/10 text-main font-bold
                hover:bg-[rgb(var(--accent))] hover:text-white transition-all
                flex items-center justify-center gap-2 shadow-lg
              "
            >
              Next
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </div>

      <div className="pb-6">
        <FloatingNav />
      </div>
    </div>
  );
};

export default Behavior;