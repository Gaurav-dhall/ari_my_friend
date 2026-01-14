import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ToggleSwitch from '../components/ToggleSwitch';
import Select from '../components/Select';
import Slider from '../components/Slider';
import FloatingNav from '../components/FloatingNav';

const Behavior = () => {
  const [tone, setTone] = useState('Friendly');
  const [friendliness, setFriendliness] = useState(80);
  const [empathy, setEmpathy] = useState(70);
  const [humor, setHumor] = useState(60);
  const [accent, setAccent] = useState('US English');
  const [verbose, setVerbose] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggeredChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-main pb-24 text-main font-soft selection:bg-accent/20">
      <div className="max-w-md mx-auto p-6 pt-12 space-y-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold tracking-tight">Behavior</h1>
          <p className="text-muted">Customize Ari's personality and voice.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Personality Section */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-lg font-semibold border-l-4 border-[rgb(var(--accent))] pl-3">
              Personality
            </h2>
            
            <div className="space-y-6 bg-white/5 p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <Select 
                label="Tone" 
                value={tone} 
                options={['Friendly', 'Professional', 'Calm', 'Enthusiastic', 'Sarcastic']} 
                onChange={setTone} 
              />
              
              <div className="h-px bg-white/10" />

              <Slider 
                label="Friendliness" 
                value={friendliness} 
                onChange={setFriendliness} 
              />

              <Slider 
                label="Empathy" 
                value={empathy} 
                onChange={setEmpathy} 
              />

              <Slider 
                label="Humor" 
                value={humor} 
                onChange={setHumor} 
              />
            </div>
          </motion.section>

          {/* Voice Section */}
          <motion.section variants={itemVariants} className="space-y-6">
            <h2 className="text-lg font-semibold border-l-4 border-[rgb(var(--accent))] pl-3">
              Voice & Interaction
            </h2>
            
            <div className="space-y-6 bg-white/5 p-5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <Select 
                label="Accent" 
                value={accent} 
                options={['US English', 'UK English', 'Australian', 'Indian', 'Irish']} 
                onChange={setAccent} 
              />

              <div className="h-px bg-white/10" />

              <ToggleSwitch 
                label="Verbose Mode" 
                checked={verbose} 
                onChange={setVerbose} 
              />
            </div>
          </motion.section>

          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="pt-4 flex gap-4">
            <button 
              className="flex-1 py-3.5 rounded-xl bg-white/5 text-main font-medium hover:bg-white/10 transition-colors active:scale-95"
            >
              Reset
            </button>
            <button 
              className="flex-1 py-3.5 rounded-xl bg-[rgb(var(--accent))] text-white font-bold shadow-lg shadow-accent/20 hover:opacity-90 transition-opacity active:scale-95"
            >
              Save Changes
            </button>
          </motion.div>
        </motion.div>
      </div>

      <FloatingNav />
    </div>
  );
};

export default Behavior;