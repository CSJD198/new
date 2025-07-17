import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, BarChart3, Zap, Shield, Globe, Star, ArrowRight, Database } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Landing: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const features = [
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Powerful visualization tools and statistical analysis for comprehensive data insights.'
    },
    {
      icon: Zap,
      title: 'AI-Powered Insights',
      description: 'Get intelligent recommendations and automated insights from your data.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with encrypted data processing and secure cloud infrastructure.'
    },
    {
      icon: Globe,
      title: 'Multi-Role Support',
      description: 'Specialized workflows for different roles including business, marketing, and finance.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Data Analyst',
      company: 'TechCorp',
      rating: 5,
      feedback: 'DataWhiz transformed how our team approaches data analysis. The AI insights are incredibly accurate.'
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Manager',
      company: 'Growth Inc',
      rating: 5,
      feedback: 'The marketing analytics module helped us increase our ROI by 40%. Highly recommended!'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Business Analyst',
      company: 'Global Solutions',
      rating: 5,
      feedback: 'Clean interface, powerful features, and excellent customer support. Perfect for our needs.'
    }
  ];

  return (
    <div className="min-h-screen main-bg">
      <Header onNavigate={scrollToSection} isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      
      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-blue-400 to-green-400 bg-clip-text text-transparent"
            >
              Transform Data into
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Actionable Insights
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Powerful AI-driven analytics platform with specialized workflows for every role. 
              Upload, analyze, and visualize your data with enterprise-grade security.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                onClick={() => window.location.href = '/dashboard'}
                className="px-8 py-4 text-lg"
              >
                Start Analyzing Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('features')}
                className="px-8 py-4 text-lg"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Why Choose DataWhiz?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built for professionals who need powerful analytics without the complexity
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="p-6 h-full">
                  <feature.icon className="w-12 h-12 text-indigo-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">About DataWhiz</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Empowering data professionals with intelligent analytics solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-white">
                Our Mission
              </h2>
              <p className="text-lg text-gray-300 mb-4">
                Founded in 2024, DataWhiz was created to bridge the gap between complex data science and practical business insights. Our team of data scientists, engineers, and UX designers work together to make advanced analytics accessible to everyone.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                DataWhiz democratizes data analytics by providing specialized workflows for different roles. 
                Whether you're a business analyst, marketer, or researcher, our platform adapts to your needs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <ChevronRight className="w-5 h-5 accent" />
                  <span className="text-gray-300">Role-specific analytics workflows</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="w-5 h-5 accent" />
                  <span className="text-gray-300">AI-powered insights and recommendations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="w-5 h-5 accent" />
                  <span className="text-gray-300">Enterprise-grade security and privacy</span>
                </li>
                <li className="flex items-center space-x-2">
                  <ChevronRight className="w-5 h-5 accent" />
                  <span className="text-gray-300">Seamless data import and export</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-video card-bg rounded-lg flex items-center justify-center glow-blue">
                <Database className="w-24 h-24 text-indigo-400" />
              </div>
            </motion.div>
          </div>

          {/* Team Section */}
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-20"
          >
            <h3 className="text-3xl font-bold mb-12 text-center text-white">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Innovation',
                  description: 'Constantly pushing the boundaries of what\'s possible with data analytics and AI.',
                  icon: '🚀'
                },
                {
                  title: 'Accessibility',
                  description: 'Making advanced analytics tools available to professionals at every skill level.',
                  icon: '🌟'
                },
                {
                  title: 'Security',
                  description: 'Protecting your data with enterprise-grade security and privacy measures.',
                  icon: '🔒'
                }
              ].map((value, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h4 className="text-xl font-semibold mb-3 text-white">{value.title}</h4>
                  <p className="text-gray-400">{value.description}</p>
                </Card>
              ))}
            </div> {/* ✅ Added this missing closing div */}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">What Our Users Say</h2>
            <p className="text-xl text-gray-300">Join thousands of professionals who trust DataWhiz</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.feedback}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-300">Choose the plan that fits your needs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Starter', 'Professional', 'Enterprise'].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`p-8 h-full text-center ${index === 1 ? 'border-2 border-indigo-400 glow-blue' : ''}`}>
                  <h3 className="text-2xl font-bold mb-2 text-white">{plan}</h3>
                  <p className="text-4xl font-bold mb-6 text-white">
                    ${index === 0 ? '29' : index === 1 ? '79' : '199'}
                    <span className="text-lg text-gray-400">/month</span>
                  </p>
                  <Button 
                    variant={index === 1 ? 'primary' : 'outline'}
                    className="w-full mb-6"
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    Get Started
                  </Button>
                  <ul className="space-y-2 text-left">
                    <li className="flex items-center space-x-2">
                      <ChevronRight className="w-4 h-4 accent" />
                      <span className="text-gray-300">Up to {index === 0 ? '10' : index === 1 ? '100' : 'Unlimited'} datasets</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <ChevronRight className="w-4 h-4 accent" />
                      <span className="text-gray-300">Basic analytics</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <ChevronRight className="w-4 h-4 accent" />
                      <span className="text-gray-300">{index === 0 ? 'Email' : index === 1 ? 'Priority' : '24/7'} support</span>
                    </li>
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Get in Touch</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="p-8">
                <h3 className="text-2xl font-semibold mb-6 text-white">Send us a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      placeholder="Tell us more about your needs..."
                    />
                  </div>
                  <Button size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <Card className="p-6">
                <h4 className="text-xl font-semibold mb-4 text-white">Contact Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-400">📧</span>
                    </div>
                    <div>
                      <p className="text-gray-300">Email</p>
                      <p className="text-white font-medium">support@datawhiz.ai</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-400">📞</span>
                    </div>
                    <div>
                      <p className="text-gray-300">Phone</p>
                      <p className="text-white font-medium">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-indigo-400">📍</span>
                    </div>
                    <div>
                      <p className="text-gray-300">Address</p>
                      <p className="text-white font-medium">123 Data Street<br />San Francisco, CA 94105</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="text-xl font-semibold mb-4 text-white">Business Hours</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Monday - Friday</span>
                    <span className="text-white">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Saturday</span>
                    <span className="text-white">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Sunday</span>
                    <span className="text-white">Closed</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="text-xl font-semibold mb-4 text-white">Follow Us</h4>
                <div className="flex space-x-4">
                  {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                    <button
                      key={social}
                      className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center hover:bg-indigo-500/30 transition-colors"
                    >
                      <span className="text-indigo-400 text-sm">{social[0]}</span>
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mt-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of professionals already using DataWhiz to transform their data into insights
            </p>
            <Button 
              size="lg"
              onClick={() => window.location.href = '/dashboard'}
              className="px-8 py-4 text-lg"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2025 DataWhiz. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};