import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import {
  Sprout,
  Microchip,
  MapPin,
  FileText,
  Tractor,
  ChartLine,
  Camera,
  Shield,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  Leaf,
  Zap,
  Clock,
  Globe,
  AlertCircle,
  ChevronDown,
} from 'lucide-react'

const cardGlass = {
  background: 'rgba(20, 35, 25, 0.55)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(70, 130, 70, 0.35)',
}

const FeatureCard = ({ icon: Icon, title, description, index, hoveredCard, setHoveredCard }) => (
  <div
    className={`group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 ${
      hoveredCard === index ? 'border-amber-500/60' : 'border-emerald-800/40'
    }`}
    style={cardGlass}
    onMouseEnter={() => setHoveredCard(index)}
    onMouseLeave={() => setHoveredCard(null)}
  >
    <div className="w-14 h-14 bg-emerald-900 rounded-xl flex justify-center items-center mb-4 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6 text-amber-500" />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-300 leading-relaxed">{description}</p>
  </div>
)

const StepCard = ({ number, title, body, icon: Icon }) => (
  <div className="relative rounded-2xl p-6" style={cardGlass}>
    <span className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center text-sm">
      {number}
    </span>
    <Icon className="w-8 h-8 text-emerald-400 mb-4 mt-2" />
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
  </div>
)

const BimaSetuLanding = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [hoveredCard, setHoveredCard] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const handleGetStarted = () => navigate('/signup')
  const handleLogin = () => navigate('/login')

  const heroBullets = useMemo(
    () => [t('landing.bulletSeg'), t('landing.bulletClass'), t('landing.bulletGps'), t('landing.bulletPdf')],
    [t]
  )

  const coreFeatures = useMemo(() => [
    {
      icon: Microchip,
      title: t('landing.featAi'),
      description:
        'YOLOv8 segmentation maps healthy crop versus damaged areas in your field photo. A ResNet50 classifier then labels the damage type—waterlogging, lodging, hail, or pest—with a confidence score insurers can review.',
    },
    {
      icon: MapPin,
      title: t('landing.featGeo'),
      description:
        'Every assessment is tied to GPS coordinates and a capture timestamp from your device. This creates a verifiable chain of evidence for field visits and reduces disputes over when and where damage occurred.',
    },
    {
      icon: FileText,
      title: t('landing.featPdf'),
      description:
        'ReportLab generates a structured two-page claim document with your photo, AI overlay mask, damage percentage, classification, and metadata—formatted for Pradhan Mantri Fasal Bima Yojana (PMFBY) review workflows.',
    },
    {
      icon: Camera,
      title: t('landing.featMobile'),
      description:
        'Use your phone’s rear camera directly in the browser to photograph affected plots. No separate app install required—ideal for farmers documenting losses immediately after a weather event.',
    },
    {
      icon: ChartLine,
      title: t('landing.featDash'),
      description:
        'After sign-in, track every claim in one place: view analysis results, download PDFs, monitor pending versus completed assessments, and start new uploads without repeating paperwork.',
    },
    {
      icon: Shield,
      title: t('landing.featTransparent'),
      description:
        'BimaSetu assists—not replaces—licensed agricultural assessors. All outputs are clearly marked for insurer verification, keeping the process honest for farmers and fair for insurance partners.',
    },
  ], [t])

  const processSteps = useMemo(() => [
    {
      icon: Camera,
      title: t('landing.stepCapture'),
      body: 'Log in, open the dashboard, and photograph damaged crops. GPS and time are recorded automatically when location access is enabled on your device.',
    },
    {
      icon: Zap,
      title: t('landing.stepAnalyze'),
      body: 'Images are uploaded to our FastAPI backend. Segmentation estimates damaged area percentage; classification identifies the likely cause. If ML weights are unavailable, proven colour-rule fallbacks still produce usable results.',
    },
    {
      icon: FileText,
      title: t('landing.stepReport'),
      body: 'A PMFBY-oriented PDF is generated and stored. Download it from your dashboard, share with your insurer or cooperative, and keep a digital copy for your records.',
    },
    {
      icon: CheckCircle2,
      title: t('landing.stepTrack'),
      body: 'All claims stay linked to your account. Revisit past assessments, compare damage levels across events, and build a history that supports faster processing on future claims.',
    },
  ], [t])

  const audiences = useMemo(() => [
    {
      icon: Users,
      title: t('landing.audFarmers'),
      body: 'Document crop loss quickly after floods, storms, or pest outbreaks—without waiting days for a manual survey team to reach remote plots.',
    },
    {
      icon: Building2,
      title: t('landing.audInsurers'),
      body: 'Receive standardized photos, masks, and PDFs that speed up desk review. AI pre-analysis highlights severity before field officers confirm final liability.',
    },
    {
      icon: Globe,
      title: t('landing.audFpo'),
      body: 'Support member farmers with a single digital platform. Bulk awareness of PMFBY documentation norms improves claim acceptance rates across the group.',
    },
  ], [t])

  const faqs = [
    {
      q: 'Is BimaSetu an official PMFBY portal?',
      a: 'No. BimaSetu is an independent assistive tool that formats reports for PMFBY-style review. Final claim approval always rests with your insurer and licensed assessor.',
    },
    {
      q: 'What crops and damage types are supported?',
      a: 'The AI is trained around common damage classes: waterlogging, lodging, hail, and pest. Segmentation works on visible crop canopy in daylight photos; accuracy improves with clear, close-up images.',
    },
    {
      q: 'Do I need internet in the field?',
      a: 'You need connectivity to upload and run analysis. Capture photos offline if needed, then upload when you reach network coverage.',
    },
    {
      q: 'Is my data secure?',
      a: 'Claims are stored against your account ID. Use Google sign-in or a registered email. Do not share login credentials; downloaded PDFs are your responsibility to store safely.',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A120E] to-[#0D1811] text-white">
      <main className="pt-4">
        {/* Hero */}
        <section id="hero" className="px-6 py-20 md:py-28">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex gap-2 items-center text-amber-500 mb-4 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-sm">
                <Microchip className="w-4 h-4" />
                {t('landing.badge')}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('landing.heroTitle')}
              </h1>
              <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                {t('landing.heroP1')}
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                {t('landing.heroP2')}
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleGetStarted}
                  className="bg-amber-500 px-8 py-3 rounded-full text-black font-bold hover:bg-amber-400 transition flex items-center gap-2"
                >
                  {t('landing.getStarted')}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleLogin}
                  className="border border-emerald-600 px-8 py-3 rounded-full hover:bg-emerald-900/40 transition"
                >
                  {t('landing.farmerLogin')}
                </button>
              </div>
              <button
                type="button"
                onClick={() => scrollToSection('why')}
                className="mt-10 flex items-center gap-2 text-gray-500 hover:text-emerald-400 text-sm transition"
              >
                {t('landing.learnMore')}
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>

            <div className="rounded-3xl p-8 border border-emerald-700/50 bg-emerald-900/20">
              <div className="flex justify-center mb-6">
                <Tractor className="w-20 h-20 text-emerald-400" />
              </div>
              <ul className="space-y-4 text-sm">
                {heroBullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-emerald-800/50 flex items-center justify-center gap-3">
                <ChartLine className="w-6 h-6 text-amber-500" />
                <span className="text-emerald-300 font-medium">{t('landing.trustedPipeline')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* What we provide */}
        <section id="why" className="px-6 py-20 bg-[#07100B]/80 border-y border-emerald-900/50">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.whatService')}</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              We offer an end-to-end <span className="text-emerald-300">digital damage assessment service</span> for
              crop insurance claims—not just a photo upload tool. From capture to classified report, every step is
              designed around real PMFBY field practices and the documents insurers expect.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl p-8" style={cardGlass}>
              <Leaf className="w-10 h-10 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">{t('landing.forFarmers')}</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                When cyclones, unseasonal rain, or pests destroy standing crops, delay in documentation often weakens
                claims. BimaSetu lets you record damage while it is still visible: take a photo, get an AI-estimated
                damage percentage, and leave with a PDF you can submit to your bank, insurer, or panchayat-supported
                insurance scheme.
              </p>
              <p className="text-gray-400 leading-relaxed">
                The farmer portal stores your history so you do not rebuild files every season. Edit your profile,
                track assessments, and download reports anytime after login.
              </p>
            </div>
            <div className="rounded-2xl p-8" style={cardGlass}>
              <Shield className="w-10 h-10 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold mb-3">{t('landing.forInsurance')}</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Assessors and insurers receive consistent artefacts: original image, segmentation mask URL, damage
                type label, confidence score, and coordinates. That reduces back-and-forth over incomplete photos and
                helps prioritize high-severity cases for urgent field visits.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Reports are generated with ReportLab and include evidence suitable for review—not a replacement for
                the licensed officer’s final sign-off, but a strong first pass that saves everyone time.
              </p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.howWorks')}</h2>
            <p className="text-gray-400 leading-relaxed">
              {t('landing.howWorksDesc')}
            </p>
          </div>
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <StepCard key={step.title} number={i + 1} {...step} />
            ))}
          </div>
        </section>

        {/* Core features - detailed */}
        <section id="features" className="px-6 py-20 bg-[#0A120E]">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.coreCapabilities')}</h2>
            <p className="text-gray-400 leading-relaxed">
              Everything included in the BimaSetu service today—expandable as we add more crops, languages, and insurer
              integrations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {coreFeatures.map((f, i) => (
              <FeatureCard
                key={f.title}
                {...f}
                index={i}
                hoveredCard={hoveredCard}
                setHoveredCard={setHoveredCard}
              />
            ))}
          </div>
        </section>

        {/* PMFBY section */}
        <section className="px-6 py-20 border-t border-emerald-900/40">
          <div className="max-w-6xl mx-auto rounded-3xl p-8 md:p-12 border border-amber-500/20 bg-gradient-to-br from-emerald-950/80 to-amber-950/20">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">{t('landing.pmfbyAligned')}</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The Pradhan Mantri Fasal Bima Yojana (PMFBY) requires timely intimation of crop loss, supported by
                  evidence of area and nature of damage. BimaSetu packages that evidence into a repeatable digital
                  format: photograph, geo-tag, AI damage estimate, and PDF summary.
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Our PDF generator follows a two-page structure insurers can scan quickly—photo page plus analysis
                  summary with damage percentage and type. Farmers still follow local cutoff dates and insurer
                  channels; we make the technical documentation step faster and clearer.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  {[
                    'Damage types: waterlogging, lodging, hail, pest',
                    'Segmentation mask stored for audit',
                    'Claim ID and timestamp on every report',
                  ].map((line) => (
                    <li key={line} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-500" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-6 bg-black/30 border border-emerald-800/50">
                <FileText className="w-12 h-12 text-amber-500 mb-4" />
                <h3 className="text-lg font-bold mb-2">{t('landing.whatYouReceive')}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Each successful analysis returns claim metadata, mask image URL, damage percent, classified type,
                  confidence, and a direct PDF link—available in your dashboard and via our REST API for integrations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.whoWeServe')}</h2>
            <p className="text-gray-400 leading-relaxed">
              One platform, multiple stakeholders in the crop insurance value chain.
            </p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            {audiences.map((a) => (
              <div key={a.title} className="rounded-2xl p-6 text-center" style={cardGlass}>
                <a.icon className="w-10 h-10 text-amber-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-2">{a.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology */}
        <section className="px-6 py-16 bg-[#07100B]/60">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">{t('landing.technology')}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              {[
                { label: 'Frontend', value: 'React 18 + Vite + Tailwind' },
                { label: 'Backend', value: 'FastAPI + SQLite' },
                { label: 'Vision AI', value: 'YOLOv8 seg + ResNet50' },
                { label: 'Auth', value: 'Firebase / secure login' },
              ].map((t) => (
                <div key={t.label} className="rounded-xl p-4 border border-emerald-800/40 bg-emerald-950/30">
                  <p className="text-amber-500 text-xs uppercase tracking-wide mb-1">{t.label}</p>
                  <p className="text-white text-sm font-medium">{t.value}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm text-center mt-8 max-w-2xl mx-auto leading-relaxed">
              When GPU weights are not installed, the system gracefully uses HSV colour analysis and rule-based
              classification so pilots and demos still work in the field.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 py-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">{t('landing.faq')}</h2>
            <div className="space-y-3">
              {faqs.map((item, i) => (
                <div key={item.q} className="rounded-xl overflow-hidden border border-emerald-800/40">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-emerald-950/40 transition"
                  >
                    <span className="font-medium text-white pr-4">{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-amber-500 shrink-0 transition-transform ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-emerald-900/50 pt-4">
                      {item.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto text-center rounded-3xl p-10 md:p-14 border border-emerald-700/50 bg-emerald-900/20">
            <h2 className="text-3xl font-bold mb-4">{t('landing.readyCta')}</h2>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
              Create a free account, complete your farmer profile, and file your first AI-assisted assessment today.
              Takes less than five minutes once you are in the field with a clear photo.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleGetStarted}
                className="bg-amber-500 px-8 py-3 rounded-full text-black font-bold hover:bg-amber-400 transition"
              >
                {t('landing.createAccount')}
              </button>
              <button
                onClick={handleLogin}
                className="border border-emerald-600 px-8 py-3 rounded-full hover:bg-emerald-900/40 transition"
              >
                {t('landing.signIn')}
              </button>
            </div>
          </div>
        </section>

        {/* Footer / contact */}
        <footer id="contact" className="border-t border-emerald-900 py-14 bg-[#07100B] px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sprout className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-emerald-300">BimaSetu</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                {t('landing.platformTagline')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">{t('landing.contact')}</h4>
              <p className="text-gray-400 text-sm">support@bimasetu.com</p>
              <p className="text-gray-500 text-sm mt-2">{t('landing.supportHours')}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm leading-relaxed flex gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                {t('landing.disclaimer')}
              </p>
            </div>
          </div>
          <div className="text-center text-gray-600 text-sm border-t border-emerald-900/50 pt-8">
            <p>{t('nav.brand')} © {new Date().getFullYear()} · Automated Crop Damage Assessment Platform</p>
            <p className="mt-2 flex items-center justify-center gap-2 text-gray-500">
              <Clock className="w-3 h-3" />
              {t('landing.builtFor')}
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default BimaSetuLanding
