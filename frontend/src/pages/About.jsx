import React, { useEffect, useRef, useState } from 'react';
import {
  Target,
  Eye,
  Shield,
  Brain,
  Cloud,
  Lock,
  Microchip,
  Globe,
  Rocket,
  Leaf,
  BarChart3,
  CheckCircle,
  TrendingUp,
  Users,
  Award,
  Zap,
  Database,
  MapPin,
  Camera,
  FileText,
  ChevronRight
} from 'lucide-react';

const BimaSetuAbout = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.keys(sectionRefs.current).forEach((key) => {
      if (sectionRefs.current[key]) {
        observer.observe(sectionRefs.current[key]);
      }
    });

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: '2.5M+', label: 'Farmers Empowered', icon: Users, color: 'from-emerald-500 to-emerald-600' },
    { number: '96%', label: 'Detection Accuracy', icon: Brain, color: 'from-blue-500 to-blue-600' },
    { number: '28', label: 'States Covered', icon: MapPin, color: 'from-amber-500 to-amber-600' },
    { number: '340Cr+', label: 'Claims Processed', icon: TrendingUp, color: 'from-green-500 to-green-600' },
  ];

  const whyBimaSetuPoints = [
    {
      title: 'AI-Powered Accuracy',
      description: 'State-of-the-art deep learning models detect crop damage with 96% accuracy, reducing human error and bias.',
      icon: Brain,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Blockchain Security',
      description: 'Every assessment report is secured with blockchain technology, ensuring tamper-proof evidence for claims.',
      icon: Lock,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Fast Turnaround',
      description: 'Get assessment results in under 2 minutes, enabling faster insurance claim settlements.',
      icon: Zap,
      color: 'from-amber-500 to-amber-600'
    },
    {
      title: 'Farmer-First Approach',
      description: 'Built with direct farmer feedback, our platform prioritizes ease of use and accessibility.',
      icon: Users,
      color: 'from-emerald-500 to-emerald-600'
    }
  ];

  const technologies = [
    { name: 'Computer Vision', icon: Camera, description: 'Advanced image recognition for crop health analysis' },
    { name: 'Deep Learning', icon: Brain, description: 'Neural networks trained on millions of crop images' },
    { name: 'Blockchain', icon: Lock, description: 'Immutable record keeping for assessment transparency' },
    { name: 'Cloud Infrastructure', icon: Cloud, description: 'Scalable platform serving millions of farmers' },
    { name: 'Geospatial AI', icon: MapPin, description: 'Satellite integration for large-scale monitoring' },
    { name: 'Edge Computing', icon: Microchip, description: 'On-device processing for offline capabilities' }
  ];

  const futureScope = [
    {
      title: 'Real-time Weather Integration',
      description: 'Combine satellite weather data with AI predictions for proactive crop management.',
      icon: Cloud,
      year: '2025'
    },
    {
      title: 'Multi-Language Support',
      description: 'Extend platform accessibility across 15+ regional Indian languages.',
      icon: Globe,
      year: '2024'
    },
    {
      title: 'Drone Integration',
      description: 'Automated drone surveillance for large farmlands with instant AI analysis.',
      icon: Camera,
      year: '2025'
    },
    {
      title: 'Predictive Analytics',
      description: 'Forecast crop yield and damage risks before they occur using historical data.',
      icon: BarChart3,
      year: '2026'
    }
  ];

  const milestones = [
    { year: '2023', event: 'Platform Launched', status: 'completed' },
    { year: '2024', event: '1M+ Farmers Onboarded', status: 'completed' },
    { year: '2025', event: 'Pan-India Coverage', status: 'in-progress' },
    { year: '2026', event: 'Global Expansion', status: 'upcoming' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A120E] via-[#0D1811] to-[#0A120E]">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-700/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-800/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{
                background: 'rgba(245, 166, 35, 0.15)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(245, 166, 35, 0.4)',
              }}
            >
              <Leaf className="w-4 h-4 text-amber-500" />
              <span className="text-amber-500 text-sm font-semibold">Our Story</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Transforming Agriculture
              <span className="text-amber-500 block mt-2">Through AI & Innovation</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              BimaSetu is on a mission to revolutionize crop damage assessment, making it transparent, 
              fast, and fair for millions of farmers across India.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 text-center transition-all duration-300 hover:translate-y-[-4px] animate-fade-up"
                style={{
                  background: 'rgba(16, 35, 21, 0.6)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(70, 130, 70, 0.4)',
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.number}</p>
                <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div
              ref={(el) => (sectionRefs.current['mission'] = el)}
              id="mission"
              className={`rounded-2xl p-8 transition-all duration-700 transform ${
                isVisible['mission'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{
                background: 'rgba(16, 35, 21, 0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(70, 130, 70, 0.4)',
              }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Improve crop damage assessment transparency using AI, ensuring every farmer receives 
                fair and timely compensation for their losses. We're building trust between farmers, 
                insurers, and government through verifiable, data-driven assessments.
              </p>
              <div className="mt-6 flex items-center gap-2 text-emerald-400">
                <span className="text-sm">Learn more</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Vision Card */}
            <div
              ref={(el) => (sectionRefs.current['vision'] = el)}
              id="vision"
              className={`rounded-2xl p-8 transition-all duration-700 delay-200 transform ${
                isVisible['vision'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{
                background: 'rgba(16, 35, 21, 0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(70, 130, 70, 0.4)',
              }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Empower farmers through technology, creating an ecosystem where every farmer has 
                access to transparent, real-time crop assessment tools. We envision a future where 
                technology bridges the gap between farmers and fair agricultural insurance.
              </p>
              <div className="mt-6 flex items-center gap-2 text-amber-400">
                <span className="text-sm">Read our manifesto</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why BimaSetu Section */}
      <section className="py-16 md:py-24 bg-[#0D1811]/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why BimaSetu</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover what makes BimaSetu the trusted choice for farmers and insurers across India
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyBimaSetuPoints.map((point, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl group"
                style={{
                  background: 'rgba(16, 35, 21, 0.6)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(70, 130, 70, 0.4)',
                }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${point.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <point.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{point.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Used Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4"
              style={{
                background: 'rgba(245, 166, 35, 0.15)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(245, 166, 35, 0.4)',
              }}
            >
              <Database className="w-4 h-4 text-amber-500" />
              <span className="text-amber-500 text-sm font-semibold">Cutting-Edge Tech Stack</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technology Used</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We leverage the most advanced technologies to deliver accurate, fast, and reliable crop assessments
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 transition-all duration-300 hover:border-amber-500/30 group"
                style={{
                  background: 'rgba(16, 35, 21, 0.6)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(70, 130, 70, 0.4)',
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                    <tech.icon className="w-6 h-6 text-emerald-400 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{tech.name}</h3>
                    <p className="text-gray-400 text-sm">{tech.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Scope Section */}
      <section className="py-16 md:py-24 bg-[#0D1811]/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Future Scope</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              What's next for BimaSetu? Here's our roadmap for the coming years
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {futureScope.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px]"
                style={{
                  background: 'rgba(16, 35, 21, 0.6)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(70, 130, 70, 0.4)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full">
                    {item.year}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Milestones */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From inception to becoming India's leading agri-tech platform
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-emerald-500 via-amber-500 to-emerald-500 hidden md:block" />
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1">
                    <div className={`rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px] ${
                      milestone.status === 'completed' ? 'border-emerald-500/30' : 
                      milestone.status === 'in-progress' ? 'border-amber-500/30' : 'border-gray-600/30'
                    }`}
                    style={{
                      background: 'rgba(16, 35, 21, 0.6)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(70, 130, 70, 0.4)',
                    }}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-amber-500">{milestone.year}</span>
                        {milestone.status === 'completed' && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                        {milestone.status === 'in-progress' && <Zap className="w-5 h-5 text-amber-400" />}
                      </div>
                      <p className="text-white font-medium">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="hidden md:block w-4 h-4 rounded-full bg-amber-500 relative z-10" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="rounded-3xl p-10 md:p-16 text-center"
            style={{
              background: 'rgba(16, 42, 26, 0.4)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(70, 130, 70, 0.4)',
            }}
          >
            <Rocket className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Join Us in Transforming Agriculture</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're a farmer, insurer, or technology partner, BimaSetu welcomes you to be part of the agricultural revolution.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 font-bold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 hover:scale-[1.02]">
                Get Started Today
              </button>
              <button className="px-6 py-3 rounded-xl border border-emerald-700/50 text-gray-300 font-semibold transition-all duration-300 hover:border-amber-500/50 hover:text-amber-400">
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default BimaSetuAbout;