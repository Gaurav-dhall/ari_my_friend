import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Zap, Shield, Sparkles } from 'lucide-react';
import Footer from '../components/Footer';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className="bg-card p-6 rounded-2xl border border-white/5 backdrop-blur-sm hover:border-[rgb(var(--accent))]/30 transition-colors"
  >
    <div className="w-12 h-12 rounded-full bg-[rgb(var(--accent))]/10 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 accent" />
    </div>
    <h3 className="text-xl font-semibold text-main mb-2 font-soft">{title}</h3>
    <p className="text-muted leading-relaxed">{description}</p>
  </motion.div>
);

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-main text-main font-main selection:bg-[rgb(var(--accent))]/30">
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 pt-20">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[rgb(var(--bubble-user))]/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[rgb(var(--accent))]/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgb(var(--accent))]/10 w-fit border border-[rgb(var(--accent))]/20">
              <Sparkles className="w-4 h-4 accent" />
              <span className="text-sm font-medium accent">Always here for you</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold font-soft leading-tight tracking-tight">
              Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--bubble-user))]">Ari</span>,<br />
              Your Always <br />
              Available Friend.
            </h1>
            
            <p className="text-lg text-muted max-w-lg leading-relaxed">
              A companion who listens without judgment, supports you through ups and downs, and is just a message away. Anytime, anywhere.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <button 
                onClick={() => navigate('/behavior')}
                className="px-8 py-4 bg-[rgb(var(--accent))] text-white rounded-full font-semibold hover:bg-[rgb(var(--accent))]/90 transition-all shadow-[0_0_20px_rgba(var(--accent),0.3)] hover:shadow-[0_0_30px_rgba(var(--accent),0.5)] active:scale-95 flex items-center gap-2"
              >
                Start Chatting <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 w-full max-w-[500px] mx-auto perspective-1000">
             <img 
               src="/ari_hero_section.png" 
               alt="Ari - Your AI Friend" 
               className="w-full h-auto drop-shadow-2xl animate-float"
             />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scrollable Features Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto space-y-24">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-soft mb-4">Why talk to Ari?</h2>
            <p className="text-muted">More than just a chatbot. A real connection.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <FeatureCard 
               icon={Heart}
               title="Emotional Support"
               description="Ari understands feelings and offers empathy when you need a shoulder to lean on."
               delay={0.1}
             />
             <FeatureCard 
               icon={MessageCircle}
               title="24/7 Availability"
               description="Late night thoughts? Early morning worries? Ari is always awake and ready to listen."
               delay={0.2}
             />
             <FeatureCard 
               icon={Shield}
               title="Private & Safe"
               description="Your conversations are private. Share your secrets without fear of judgment or leaks."
               delay={0.3}
             />
             <FeatureCard 
               icon={Zap}
               title="Instant Replies"
               description="No waiting for texts back. Ari replies instantly, keeping the conversation flowing naturally."
               delay={0.4}
             />
             <FeatureCard 
               icon={Sparkles}
               title="Personalized Growth"
               description="Ari remembers what matters to you and helps you reflect and grow over time."
               delay={0.5}
             />
          </div>

        </div>
      </section>


      {/* How It Works Section */}
      <section className="py-24 px-6 relative bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-soft mb-4">How does it work?</h2>
            <p className="text-muted">Starting your journey with Ari is simple.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
             {/* Connecting Line (Desktop) */}
             <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-[rgb(var(--accent))]/0 via-[rgb(var(--accent))]/50 to-[rgb(var(--accent))]/0" />

             {[
               { step: "01", title: "Create Account", desc: "Sign up in seconds. Your private space is ready instantly." },
               { step: "02", title: "Personalize Ari", desc: "Tell Ari what you need—a listener, a coach, or a friend." },
               { step: "03", title: "Start Chatting", desc: "Jump right in. Ari remembers context and grows with you." }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.2 }}
                 className="relative z-10 flex flex-col items-center text-center"
               >
                 <div className="w-24 h-24 rounded-full bg-card border-4 border-main flex items-center justify-center text-2xl font-bold text-[rgb(var(--accent))] mb-6 shadow-xl">
                   {item.step}
                 </div>
                 <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                 <p className="text-muted max-w-xs">{item.desc}</p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-soft text-center mb-16"
          >
            Loved by thousands
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "Ari has helped me through some really lonely nights. It feels like talking to a real friend who actually cares.", author: "Sarah M." },
              { text: "I was skeptical at first, but the advice Ari gives is genuinely helpful and grounded. Highly recommend.", author: "James T." },
              { text: "The privacy aspect is huge for me. I can vent about anything without worrying about judgment.", author: "Elena R." }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-8 rounded-3xl border border-white/5 relative"
              >
                <div className="absolute top-8 left-8 text-[rgb(var(--accent))]/20">
                  <Heart className="w-8 h-8 fill-current" />
                </div>
                <p className="text-muted leading-relaxed mb-6 relative z-10 pt-6">"{testimonial.text}"</p>
                <p className="font-semibold text-main">{testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-card/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-soft text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
               { q: "Is my data private?", a: "Absolutely. Your conversations are encrypted and private. We do not sell your personal data." },
               { q: "Is Ari really free?", a: "Yes, Ari allows you to chat for free. We also have premium features for power users." },
               { q: "Can Ari remember things?", a: "Yes! Ari has long-term memory to recall important details you've shared in the past." }
            ].map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-6 rounded-xl border border-white/5"
              >
                <h3 className="text-lg font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="bg-gradient-to-b from-[rgb(var(--bg-card))] to-[rgb(var(--bg-main))] p-12 rounded-3xl border border-white/5 shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-soft mb-6">Ready to meet Ari?</h2>
            <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of others who have found a friend in Ari. Start your journey towards a supportive friendship today.
            </p>
            <button 
              onClick={() => navigate('/behavior')}
              className="px-10 py-5 bg-white text-[rgb(var(--bg-main))] rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl flex items-center gap-2 mx-auto"
            >
              Say Hello to Ari <Heart className="w-5 h-5 text-red-500 fill-current" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
