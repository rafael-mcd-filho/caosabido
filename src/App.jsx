import { createElement, useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.jsx'
import { MapPin, Phone, Clock, Star, Heart, Shield, Zap, Users, CheckCircle, ChevronLeft, ChevronRight, Instagram, Menu, X, Home, PlayCircle } from 'lucide-react'
import LazyVideo from "@/components/ui/lazy-video.jsx"
import './App.css'

const caoSabidoLogo = '/cao-sabido.png'

function WhatsAppIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
    >
      <path d="M16.04 3C8.87 3 3.05 8.82 3.05 15.99c0 2.29.6 4.53 1.75 6.5L3 29l6.69-1.76a12.93 12.93 0 0 0 6.35 1.62h.01c7.16 0 12.99-5.82 12.99-12.99C29.03 8.82 23.2 3 16.04 3Zm0 23.66h-.01c-1.98 0-3.92-.53-5.62-1.54l-.4-.24-3.97 1.04 1.06-3.87-.26-.4a10.7 10.7 0 0 1-1.64-5.66c0-5.98 4.86-10.84 10.85-10.84 2.9 0 5.62 1.13 7.66 3.18a10.77 10.77 0 0 1 3.17 7.66c0 5.98-4.86 10.84-10.84 10.84Zm5.94-8.12c-.33-.16-1.94-.96-2.24-1.07-.3-.11-.52-.16-.74.16-.22.33-.85 1.07-1.04 1.29-.19.22-.38.25-.71.08-.33-.16-1.38-.51-2.63-1.62a9.9 9.9 0 0 1-1.82-2.26c-.19-.33-.02-.51.14-.67.15-.15.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.74-1.78-1.01-2.43-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.33-1.14 1.12-1.14 2.72 0 1.61 1.17 3.16 1.33 3.38.16.22 2.3 3.52 5.58 4.93.78.34 1.39.54 1.86.69.78.25 1.5.21 2.06.13.63-.09 1.94-.79 2.21-1.56.27-.77.27-1.42.19-1.56-.08-.14-.3-.22-.63-.38Z" />
    </svg>
  )
}

function AnimatedWhatsAppButton({
  href,
  children,
  dataCta,
  size = "lg",
  variant = "solid",
  className = "",
}) {
  const handleClick = () => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: "whatsapp_click",
      cta_id: dataCta,
      cta_text: typeof children === "string" ? children : undefined,
    })
  }

  return (
    <Button
      asChild
      size={size}
      variant={variant === "outline" ? "outline" : "default"}
      className={`animated-pill animated-pill-${variant} ${className}`}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cta={dataCta}
        onClick={handleClick}
      >
        <span className="animated-pill-text">{children}</span>
        <span className="animated-pill-circle">
          <WhatsAppIcon className="h-4 w-4" />
        </span>
      </a>
    </Button>
  )
}

function InlineIcon({ icon, className }) {
  return createElement(icon, { className })
}

const googleMapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.3829112685676!2d-34.83637842415567!3d-7.0815300929213665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7acdda4a53da3a9%3A0xa1fed8444bb23de1!2sR.%20Norberto%20de%20Castro%20Nogueira%20-%20Jardim%20Oceania%2C%20Jo%C3%A3o%20Pessoa%20-%20PB%2C%2058037-603!5e0!3m2!1spt-BR!2sbr!4v1754933352653!5m2!1spt-BR!2sbr"
const googleMapDirectionsUrl = "https://www.google.com/maps/search/?api=1&query=Rua%20Norberto%20de%20Castro%20N%C3%B3brega%2C%20160%2C%20Jardim%20Oceania%2C%20Jo%C3%A3o%20Pessoa%2C%20PB"

function LazyContactMap() {
  const mapRef = useRef(null)
  const [shouldLoadMap, setShouldLoadMap] = useState(false)

  useEffect(() => {
    if (shouldLoadMap) return

    const node = mapRef.current
    if (!node) return

    if (!('IntersectionObserver' in window)) {
      setShouldLoadMap(true)
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setShouldLoadMap(true)
          observer.disconnect()
        }
      },
      { rootMargin: '320px 0px' }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [shouldLoadMap])

  return (
    <div ref={mapRef} className="h-full min-h-[400px]">
      {shouldLoadMap ? (
        <iframe
          src={googleMapEmbedUrl}
          width="100%"
          height="100%"
          className="h-full min-h-[400px] w-full"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Localização Cão Sabido"
        />
      ) : (
        <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-4 bg-amber-50 p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700">
            <MapPin className="h-6 w-6" />
          </div>
          <div>
            <p className="font-semibold text-amber-900">Localização da Cão Sabido</p>
            <p className="mt-1 text-sm text-gray-600">O mapa será carregado quando esta seção entrar na tela.</p>
          </div>
          <a
            href={googleMapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="google-maps-placeholder"
            className="rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-700"
          >
            Abrir no Google Maps
          </a>
        </div>
      )}
    </div>
  )
}

function App() {
  const [showWhatsAppTooltip, setShowWhatsAppTooltip] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [visibleTestimonials, setVisibleTestimonials] = useState(1)
  const currentYear = new Date().getFullYear()


  const testimonials = [
    {
      name: "Gustavo Carvalho",
      text: "Fábio foi acolhedor e preciso nas orientações. Aplicamos suas dicas logo após a avaliação e já percebemos resultados positivos. Profissional atencioso e competente.",
      image: "/testimonial-1.png"
    },
    {
      name: "Reinaldo Araújo",
      text: "Meu cachorro adora a creche educativa! Sempre volta feliz e tranquilo. Fábio cuida com atenção e carinho, oferecendo o melhor tratamento.",
      image: "/testimonial-2.png"
    },
    {
      name: "Flávia Cavalcanti",
      text: "Fábio está sempre disposto a ajudar, dividindo seu conhecimento e tratando nosso cão com muito respeito e carinho.",
      image: "/testimonial-3.png"
    },
    {
      name: "Rafaella Rocha",
      text: "Na primeira avaliação já senti segurança. Fábio explica cada detalhe e mostra a importância da continuidade. Ansiosa pelas próximas aulas!",
      image: "/testimonial-4.png"
    },
    {
      name: "Angelo Antonio",
      text: "Fábio é seguro e competente. A avaliação foi clara e já estamos aplicando as orientações com bons resultados.",
      image: "/testimonial-5.png"
    },
    {
      name: "Deborah Sarmento",
      text: "Excelente no que faz! Sua forma de explicar transmite confiança desde o início. Recomendo sem hesitar.",
      image: "/testimonial-6.png"
    },
    {
      name: "Edwin Almeida",
      text: "Mostrou muita autoridade e conhecimento no adestramento. Assumiu um grande desafio com nosso cão e entregou um trabalho de qualidade.",
      image: "/testimonial-7.png"
    },
    {
      name: "Farias Odi",
      text: "Adestrador de excelência, acompanha de perto cada etapa e mantém contato constante. Profissional de confiança e muito competente.",
      image: "/testimonial-8.png"
    },
    {
      name: "Ramon Rocha Rodrigues",
      text: "Deixamos nossa spitz com Fábio durante viagens e ela sempre voltou tranquila e bem cuidada. Recebemos fotos e vídeos. Experiência excelente!",
      image: "/testimonial-9.png"
    },
    {
      name: "Avanyr Carvalho",
      text: "Profissional responsável e dedicado. Em menos de um mês de trabalho, nosso golden já apresenta muito mais obediência e calma.",
      image: "/testimonial-10.png"
    },
    {
      name: "Ana Patrícia",
      text: "Cuidou do nosso Husky com atenção, alimentação correta, limpeza e exercícios. Nosso cão se adaptou rapidamente.",
      image: "/testimonial-11.png"
    },
    {
      name: "Victor Viana",
      text: "Muito atencioso e com manejo seguro. Profissional de extrema confiança. Recomendo fortemente.",
      image: "/testimonial-12.png"
    }
  ]
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false)
  const [isNavScrolled, setIsNavScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  const whatsappNumber = "5583998276229"
  const whatsappUrl = `https://wa.me/${whatsappNumber}`
  const testimonialPageCount = Math.ceil(testimonials.length / visibleTestimonials)

  useEffect(() => {
    const updateVisibleTestimonials = () => {
      if (window.innerWidth >= 1024) {
        setVisibleTestimonials(3)
        return
      }

      if (window.innerWidth >= 768) {
        setVisibleTestimonials(2)
        return
      }

      setVisibleTestimonials(1)
    }

    updateVisibleTestimonials()
    window.addEventListener('resize', updateVisibleTestimonials)

    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 24)

      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        setShowWhatsAppButton(window.scrollY > heroBottom)
      }

      const sectionIds = ['hero', 'sobre', 'servicos', 'como-funciona', 'videos', 'depoimentos', 'adestrador', 'contato']
      let currentSection = 'hero'
      const isAtPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 12

      sectionIds.forEach(id => {
        const section = document.getElementById(id)
        if (section && window.scrollY >= section.offsetTop - 140) {
          currentSection = id
        }
      })

      setActiveSection(isAtPageBottom ? 'contato' : currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    // Auto-rotate testimonials every 5 seconds
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonialPageCount)
    }, 5000)

    // Show tooltip after 7 seconds
    const tooltipTimer = setTimeout(() => {
      setShowWhatsAppTooltip(true)
    }, 7000)

    return () => {
      window.removeEventListener('resize', updateVisibleTestimonials)
      window.removeEventListener('scroll', handleScroll)
      clearInterval(testimonialInterval)
      clearTimeout(tooltipTimer)
    }
  }, [testimonialPageCount])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''

    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    setCurrentTestimonial(prev => Math.min(prev, testimonialPageCount - 1))
  }, [testimonialPageCount])

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonialPageCount)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + testimonialPageCount) % testimonialPageCount)
  }

  const defaultWhatsAppMessage = "Olá! Gostaria de saber mais sobre os serviços da Cão Sabido."
  const getWhatsAppHref = (message = defaultWhatsAppMessage) => {
    const encodedMessage = encodeURIComponent(message || defaultWhatsAppMessage)
    return `${whatsappUrl}?text=${encodedMessage}`
  }

  const scrollToSection = (event, id) => {
    event.preventDefault()

    const section = document.getElementById(id)
    if (!section) return

    const navHeight = document.querySelector('.site-nav')?.offsetHeight || 0
    const targetTop = section.getBoundingClientRect().top + window.scrollY - navHeight - 12

    setActiveSection(id)
    setIsMobileMenuOpen(false)
    window.history.pushState(null, '', `#${id}`)
    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: 'smooth',
    })
  }

  const trustItems = [
    { label: "Avaliação comportamental", Icon: Shield },
    { label: "Grupos supervisionados", Icon: Users },
    { label: "Fotos e vídeos no WhatsApp", Icon: Phone },
    { label: "Creche educativa", Icon: Star },
    { label: "Hotel e adestramento", Icon: CheckCircle },
    { label: "Atividades para corpo e mente", Icon: Heart },
  ]

  const howItWorksSteps = [
    {
      title: "Agende uma visita",
      text: "Você fala com a equipe pelo WhatsApp e marca um horário para conhecer a estrutura da Cão Sabido.",
      Icon: Clock,
    },
    {
      title: "Avaliação comportamental",
      text: "Entendemos o perfil, temperamento e necessidades do seu cão antes de inserir na rotina.",
      Icon: Shield,
    },
    {
      title: "Adaptação guiada",
      text: "A entrada na creche é feita com acompanhamento para reduzir estresse e aumentar segurança.",
      Icon: Heart,
    },
    {
      title: "Rotina educativa",
      text: "Seu cão participa de atividades supervisionadas, socialização e estímulos durante o dia.",
      Icon: CheckCircle,
    },
  ]

  const navItems = [
    { href: '#hero', id: 'hero', label: 'Início', Icon: Home },
    { href: '#sobre', id: 'sobre', label: 'Sobre', Icon: Heart },
    { href: '#servicos', id: 'servicos', label: 'Serviços', Icon: Star },
    { href: '#como-funciona', id: 'como-funciona', label: 'Como funciona', Icon: CheckCircle },
    { href: '#videos', id: 'videos', label: 'Ambientes', Icon: PlayCircle },
    { href: '#depoimentos', id: 'depoimentos', label: 'Depoimentos', Icon: Users },
    { href: '#adestrador', id: 'adestrador', label: 'Adestrador', Icon: Shield },
    { href: '#contato', id: 'contato', label: 'Contato', Icon: Phone },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Navigation */}
      <nav className={`site-nav ${isNavScrolled ? 'site-nav-scrolled' : ''}`}>
        <div className="site-nav-inner">
          <a
            href="#hero"
            className="site-nav-brand"
            aria-label="Ir para o início"
            onClick={event => scrollToSection(event, 'hero')}
          >
            <img
              loading="eager"
              decoding="async"
              src={caoSabidoLogo}
              alt="Cão Sabido"
              className="site-nav-logo-img"
            />
            <span className="site-nav-title">Cão Sabido</span>
          </a>

          {/* Navigation Links */}
          <div className="nav-pill hidden lg:flex" aria-label="Navegação principal">
            {navItems.filter(item => item.id !== 'hero').map(item => (
              <a
                key={item.id}
                href={item.href}
                className={`nav-pill-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={event => scrollToSection(event, item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <AnimatedWhatsAppButton
            href={getWhatsAppHref("Gostaria de agendar uma visita!")}
            dataCta="whatsapp-header-agendar-visita"
            size="default"
            className="hidden sm:inline-flex"
          >
            Agendar Visita
          </AnimatedWhatsAppButton>

          <button
            type="button"
            className="mobile-menu-button lg:hidden"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={`mobile-nav-panel lg:hidden ${isMobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <div className="mobile-nav-links">
          {navItems.map(item => (
            <a
              key={item.id}
              href={item.href}
              className={`mobile-nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={event => scrollToSection(event, item.id)}
            >
              <InlineIcon icon={item.Icon} className="h-5 w-5" />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
        <AnimatedWhatsAppButton
          href={getWhatsAppHref("Gostaria de agendar uma visita!")}
          dataCta="whatsapp-mobile-menu-agendar-visita"
          size="lg"
          className="mt-8 w-full justify-center"
        >
          Agendar visita no WhatsApp
        </AnimatedWhatsAppButton>
        <p className="mobile-nav-footer">Jardim Oceania · João Pessoa, PB</p>
      </div>

      {/* Hero Section */}
      <section id="hero" className="pawprint-bg pt-32 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8">
              <h1 className="hero-title-main text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 leading-tight">
                A única <span className="hero-title-highlight">creche educativa</span> de João Pessoa
              </h1>
              <p className="text-xl md:text-2xl text-amber-700 leading-relaxed">
                Muito além de uma creche para cães: aqui eles aprendem, se divertem e se desenvolvem!
              </p>
              <div className="hero-actions">
                <AnimatedWhatsAppButton
                  href={getWhatsAppHref("Gostaria de agendar uma visita para conhecer a Cão Sabido!")}
                  dataCta="whatsapp-hero-agendar-visita"
                  className="hero-primary-cta text-lg"
                >
                  Agende uma Visita
                </AnimatedWhatsAppButton>
                <AnimatedWhatsAppButton
                  href={getWhatsAppHref("Olá! Tenho uma dúvida sobre a Cão Sabido.")}
                  dataCta="whatsapp-hero-falar"
                  variant="outline"
                  className="hero-secondary-cta text-lg"
                >
                  Tirar dúvida
                </AnimatedWhatsAppButton>
              </div>
            </div>

            {/* Video Content */}
            <div className="relative">
              <div className="relative h-128 rounded-2xl overflow-hidden shadow-2xl">

                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"  // só puxa cabeçalho e inicia rápido
                  className="w-full h-full object-cover object-[center_60%]"
                >
                  {/* fontes alternativas: mobile carrega 480p, desktop 720p */}
                  <source src="/videos/presentation.mp4" type="video/mp4" media="(max-width: 640px)" />
                  <source src="/videos/presentation-720.mp4" type="video/mp4" media="(max-width: 1280px)" />
                  <source src="/videos/presentation.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeos.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="trust-bar-cao" aria-label="Diferenciais da Cão Sabido">
        <div className="trust-track-cao">
          {[...trustItems, ...trustItems].map((item, index) => (
            <div className="trust-item-cao" key={`${item.label}-${index}`}>
              <InlineIcon icon={item.Icon} className="h-4 w-4" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="sobre" className="section-fade section-fade-amber py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-amber-900 mb-6">
              Uma rotina feita para o seu cão <span className="section-title-highlight">evoluir</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              O Cão Sabido é a única creche educativa de João Pessoa. Um espaço pensado com todo carinho
              para oferecer aos nossos peludinhos um ambiente seguro, divertido e educativo.
              Aqui, cada dia é repleto de atividades que estimulam corpo e mente.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {/* Service Cards */}
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">

              <Card className="text-center p-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-4">
                  <CheckCircle className="w-7 h-7 text-amber-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">Escola de Adestramento</h3>
                  <p className="text-gray-600 text-sm">Treinamento individualizado para cães que não forem aprovado na avaliação comportamental na creche educativa</p>
                </CardContent>
              </Card>

              <Card className="text-center p-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-4">
                  <Zap className="w-7 h-7 text-amber-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">Enriquecimento Ambiental</h3>
                  <p className="text-gray-600 text-sm">Atividades que estimulam os sentidos e a curiosidade natural dos cães</p>
                </CardContent>
              </Card>

              <Card className="text-center p-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-4">
                  <Heart className="w-7 h-7 text-amber-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">Relaxamento e Autocontrole</h3>
                  <p className="text-gray-600 text-sm">Técnicas para desenvolver calma e equilíbrio emocional</p>
                </CardContent>
              </Card>

              <Card className="text-center p-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-4">
                  <Shield className="w-7 h-7 text-amber-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">Aulas para Obediência</h3>
                  <p className="text-gray-600 text-sm">Comandos básicos e avançados para uma convivência harmoniosa</p>
                </CardContent>
              </Card>

              <Card className="text-center p-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-4">
                  <Users className="w-7 h-7 text-amber-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">Passeios Recreativos</h3>
                  <p className="text-gray-600 text-sm">Exercícios físicos e socialização em ambiente controlado</p>
                </CardContent>
              </Card>

              <Card className="text-center p-2 hover:shadow-lg transition-shadow">
                <CardContent className="pt-4">
                  <Star className="w-7 h-7 text-amber-600 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">Adestramento Incorporado</h3>
                  <p className="text-gray-600 text-sm">Treinamento integrado à rotina diária de forma natural</p>
                </CardContent>
              </Card>
            </div>

            {/* Image */}
            <div className="lg:col-span-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  loading="eager"
                  decoding="async"
                  src="/about-daycare.jpg"
                  alt="Ambiente da Creche Cão Sabido"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="pawprint-bg section-fade section-fade-white py-16 px-4 bg-amber-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-amber-900 mb-6">
              Cuidado, educação e hospedagem no <span className="section-title-highlight">mesmo lugar</span>
            </h2>
            <p className="text-xl text-amber-800 mb-8">Soluções completas para o bem-estar do seu cão</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {[
              "Creche educativa com atividades supervisionadas",
              "Hotel para cães com cuidados especializados",
              "Adestramento integrado à rotina diária",
              "Socialização controlada com outros cães"
            ].map((service, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
                <CheckCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{service}</span>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Na Cão Sabido, cada serviço é pensado para proporcionar o melhor cuidado e desenvolvimento
              para seu pet. Nossa equipe especializada trabalha com técnicas modernas e humanizadas.
            </p>
            <AnimatedWhatsAppButton
              href={getWhatsAppHref("Gostaria de conhecer melhor os serviços da Cão Sabido!")}
              dataCta="whatsapp-servicos-conhecer"
            >
              Conhecer Nossos Serviços
            </AnimatedWhatsAppButton>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              Da primeira visita à <span className="section-title-highlight">rotina educativa</span>
            </h2>
            <p className="text-lg text-gray-700">
              Um processo simples para seu cão entrar na rotina com segurança e bem-estar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {howItWorksSteps.map((step, index) => (
              <Card key={step.title} className="relative overflow-hidden border-amber-100 bg-white py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <CardContent className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                      <InlineIcon icon={step.Icon} className="h-5 w-5" />
                    </div>
                    <span className="text-3xl font-bold leading-none text-amber-100">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-amber-900">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{step.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <AnimatedWhatsAppButton
              href={getWhatsAppHref("Gostaria de agendar uma visita e entender como funciona a Cão Sabido!")}
              dataCta="whatsapp-como-funciona-agendar"
            >
              Agendar uma visita
            </AnimatedWhatsAppButton>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="section-fade section-fade-amber py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-amber-900 mb-6">
              Veja onde seu cão vai <span className="section-title-highlight">brincar, aprender e descansar</span>
            </h2>
            <p className="text-lg text-gray-700">
              Veja como é o dia a dia na Cão Sabido
            </p>
          </div>

          <div className="grid max-w-5xl gap-6 mx-auto md:grid-cols-3">


            <Card className="w-full max-w-sm mx-auto overflow-hidden hover:shadow-xl transition-all duration-300 md:max-w-none">
              <LazyVideo
                sources={[
                  { src: "/videos/dogs-hotel.mp4", label: "720p" },
                ]}
                aspectRatio="aspect-[4/5]"
                objectFit="cover"
                rounded="rounded-xl"
              />
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold text-amber-900 mb-3">Diversão na Creche</h3>
                <p className="text-gray-600">Veja nossos peludinhos se divertindo em um ambiente seguro e estimulante, com atividades supervisionadas e muito carinho.</p>
              </CardContent>
            </Card>

            <Card className="w-full max-w-sm mx-auto overflow-hidden hover:shadow-xl transition-all duration-300 md:max-w-none">
              <LazyVideo
                sources={[
                  { src: "/videos/training.mp4", label: "720p" },
                ]}
                aspectRatio="aspect-[4/5]"
                objectFit="cover"
                rounded="rounded-xl"
              />
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold text-amber-900 mb-3">Treinamento Profissional</h3>
                <p className="text-gray-600">Nossos adestradores trabalham com técnicas modernas e humanizadas para o desenvolvimento comportamental.</p>
              </CardContent>
            </Card>

            <Card className="w-full max-w-sm mx-auto overflow-hidden hover:shadow-xl transition-all duration-300 md:max-w-none">
              <LazyVideo
                sources={[
                  { src: "/videos/presentation.mp4", label: "720p" },
                ]}
                aspectRatio="aspect-[4/5]"
                objectFit="cover"
                rounded="rounded-xl"
              />
              <CardContent className="p-5">
                <h3 className="text-xl font-semibold text-amber-900 mb-3">Tour pelas Instalações</h3>
                <p className="text-gray-600">Conheça nossos ambientes climatizados, playground especial e toda infraestrutura pensada para o bem-estar.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="pawprint-bg section-fade section-fade-white py-10 px-4 bg-amber-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-6">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-amber-900 mb-2">
              Famílias que <span className="section-title-highlight">confiam</span> na Cão Sabido
            </h2>
            <p className="text-base text-gray-700">
              Depoimentos reais de tutores satisfeitos
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
                  >
                    <Card className="h-full border border-amber-100 bg-white py-0 shadow-sm transition-shadow duration-300 hover:shadow-md">
                      <CardContent className="flex flex-col p-4 text-center sm:p-5 md:min-h-[235px] md:justify-between">
                        <div>
                          <div className="flex justify-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <p className="text-gray-700 text-sm md:text-base leading-relaxed italic">
                            "{testimonial.text}"
                          </p>
                        </div>
                        <div className="mt-4 flex items-center justify-center space-x-3 md:mt-5">
                          <img
                            loading="eager"
                            decoding="async"
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-amber-200"
                          />
                          <div className="text-left">
                            <p className="text-sm font-semibold text-amber-900">{testimonial.name}</p>
                            <p className="text-xs text-gray-600">Cliente Cão Sabido</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={prevTestimonial}
              aria-label="Depoimentos anteriores"
              className="absolute -left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:bg-amber-50 hover:shadow-lg md:-left-3"
            >
              <ChevronLeft className="w-5 h-5 text-amber-600" />
            </button>

            <button
              type="button"
              onClick={nextTestimonial}
              aria-label="Próximos depoimentos"
              className="absolute -right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 hover:bg-amber-50 hover:shadow-lg md:-right-3"
            >
              <ChevronRight className="w-5 h-5 text-amber-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: testimonialPageCount }).map((_, pageIndex) => (
                <button
                  type="button"
                  key={pageIndex}
                  onClick={() => setCurrentTestimonial(pageIndex)}
                  aria-label={`Ir para página ${pageIndex + 1} dos depoimentos`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${pageIndex === currentTestimonial
                    ? 'bg-amber-600'
                    : 'bg-amber-200'
                    }`}
                  style={{ width: pageIndex === currentTestimonial ? '1.5rem' : '0.625rem' }}
                />
              ))}
            </div>


          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-fade section-fade-amber py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-amber-900 mb-6">
              Dúvidas comuns para começar com <span className="section-title-highlight">segurança</span>
            </h2>
            <p className="text-lg text-gray-700">
              Tire suas dúvidas sobre nossos serviços
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="faq-idade-minima" className="bg-amber-50 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold text-amber-900 hover:text-amber-700">
                  Qual a idade mínima para deixar meu cão na creche?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2">
                  Aceitamos cães a partir de 4 meses de idade, desde que tenham completado o esquema vacinal básico.
                  É importante que o filhote já tenha desenvolvido um pouco de socialização e esteja adaptado a sair de casa.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-vacinas" className="bg-amber-50 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold text-amber-900 hover:text-amber-700">
                  Quais as vacinas que meu cão precisa ter pra frequentar a creche?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2">
                  Para manter um ambiente seguro e saudável para todos, solicitamos que os cães estejam com as seguintes vacinas e cuidados em dia:
                  <li>Viral</li>
                  <li>Raiva</li>
                  <li>Giardia</li>
                  <li>Gripe</li>
                  <li>Vermífugo em dia</li>
                  Protocolo de reforço a cada 3 meses
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-avaliacao-comportamental" className="bg-amber-50 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold text-amber-900 hover:text-amber-700">
                  O meu cão precisa passar por avaliação comportamental para participar da creche?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2">
                  Sim! Antes de iniciar, realizamos uma avaliação comportamental para entender o perfil e as necessidades do seu cão. Assim, conseguimos inseri-lo no grupo de forma tranquila, proporcionando uma adaptação positiva e evitando qualquer situação de estresse.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-escola-adestramento" className="bg-amber-50 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold text-amber-900 hover:text-amber-700">
                  Como funciona a Escola de Adestramento?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2">
                  Trabalhamos com reforço positivo e um plano 100% personalizado. Começamos com uma avaliação inicial (mediante agendamento) para entender o temperamento do cão e as metas da família. A partir disso, estruturamos aulas práticas — individuais e/ou em pequenos grupos — 1 a 2 vezes por semana, focando em: obediência básica (sentar, deitar, vir quando chamado), autocontrole, socialização e ajuste de comportamentos (puxar na guia, latidos excessivos, ansiedade, higiene no local correto etc.).
                  <br></br>Cada encontro inclui exercícios para praticar em casa, material de apoio e acompanhamento via WhatsApp. O progresso é revisto em ciclos quinzenais, com ajustes no plano conforme a evolução. Sempre que possível, integramos o dia a dia da creche educativa ao adestramento para manter consistência e acelerar os resultados.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-castracao" className="bg-amber-50 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold text-amber-900 hover:text-amber-700">
                  Meu cão precisa ser castrado para frequentar a creche?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2">
                  Não é obrigatório, mas recomendamos a castração para cães acima de 1 ano. Cães não castrados podem
                  participar, mas passam por uma avaliação comportamental mais rigorosa para garantir a harmonia do grupo.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-quantidade-caes" className="bg-amber-50 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold text-amber-900 hover:text-amber-700">
                  Quantos cães ficam juntos durante o dia?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2">
                  Trabalhamos com grupos pequenos de até 8 cães por monitor, sempre separados por porte e temperamento.
                  Isso garante maior segurança e atenção individualizada para cada animal.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-transporte" className="bg-amber-50 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold text-amber-900 hover:text-amber-700">
                  Vocês oferecem transporte para buscar e levar meu cão?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2">
                  Sim! Oferecemos serviço de transporte para algumas regiões de João Pessoa. O valor varia conforme
                  a distância. Entre em contato pelo WhatsApp para verificar se atendemos sua região.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-adaptacao" className="bg-amber-50 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold text-amber-900 hover:text-amber-700">
                  Como funciona o período de adaptação?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2">
                  O período de adaptação dura em média 3 a 5 dias, começando com permanências mais curtas.
                  Acompanhamos de perto o comportamento do cão e ajustamos o tempo conforme sua adaptação ao ambiente e aos outros animais.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-emergencia" className="bg-amber-50 rounded-lg px-6">
                <AccordionTrigger className="text-left text-lg font-semibold text-amber-900 hover:text-amber-700">
                  O que acontece se meu cão ficar doente durante o dia?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pt-2">
                  Temos protocolo de emergência e parceria com clínicas veterinárias. Em caso de mal-estar,
                  entramos em contato imediatamente com o tutor e, se necessário, levamos o animal ao veterinário.
                  A saúde e bem-estar são nossa prioridade.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Trainer Section */}
      <section id="adestrador" className="pawprint-bg py-12 px-4 lg:py-16 bg-amber-50">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-8 lg:grid lg:grid-cols-2 lg:gap-12 lg:space-y-0 lg:items-center">
              {/* Trainer Photo */}
              <div className="mx-auto max-w-[280px] sm:max-w-[320px] lg:order-1 lg:max-w-none">
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <img
                    loading="eager"
                    decoding="async"
                    src="/trainer-photo.jpg"
                    alt="Adestrador Profissional Cão Sabido"
                    className="aspect-[4/5] w-full object-cover object-top lg:aspect-auto lg:h-auto"
                  />
                </div>
              </div>

              {/* Trainer Info */}
              <div className="space-y-6 lg:order-2">
                <h2 className="section-title text-3xl md:text-4xl font-bold text-amber-900 lg:mb-6">
                  Adestramento com <span className="section-title-highlight">método</span>, rotina e acompanhamento
                </h2>

                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-amber-800">
                    Prof. Fábio Nicolas
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Fundador da Cão Sabido e adestrador especializado em comportamento canino. Com ampla experiência prática e diversas formações na área, ele se dedica a transformar a convivência entre cães e famílias de forma positiva e saudável. Sua missão é proporcionar bem-estar e equilíbrio para cada cão atendido.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-amber-900">Certificações e Formação:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <span className="text-gray-700">Formação em Adestramento de Cães</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <span className="text-gray-700">Curso de Comportamento e Psicologia Canina</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <span className="text-gray-700">Certificação em Técnicas de Socialização para Cães</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      <span className="text-gray-700">Treinamento Avançado em Modificação de Comportamento</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold text-amber-900 mb-3">Resultados Comprovados:</h4>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-amber-600">100+</div>
                      <div className="text-sm text-gray-600">Cães Treinados</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-amber-600">98%</div>
                      <div className="text-sm text-gray-600">Taxa de Sucesso</div>
                    </div>
                  </div>
                </div>

                <AnimatedWhatsAppButton
                  href={getWhatsAppHref("Gostaria de falar diretamente com o adestrador Fábio Nicolas sobre o adestramento do meu cão!")}
                  dataCta="whatsapp-adestrador-falar"
                  className="w-full"
                >
                  Falar com o Adestrador
                </AnimatedWhatsAppButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location and Contact Section */}
      <section id="contato" className="pawprint-bg section-fade section-fade-brown py-16 px-4 bg-amber-50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="section-title text-3xl md:text-4xl font-bold text-amber-900 mb-6">
              Venha conhecer a Cão Sabido <span className="section-title-highlight">de perto</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-2xl shadow-lg h-full">
                <h3 className="text-2xl font-bold text-amber-900 mb-6">Venha nos Visitar</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-900">Endereço</p>
                      <p className="text-gray-700">Rua Norberto de Castro Nóbrega, 160<br />Jardim Oceania - João Pessoa, PB</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-900">WhatsApp</p>
                      <p className="text-gray-700">(83) 99827-6229</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-900">Horário de Funcionamento</p>
                      <p className="text-gray-700">Segunda a Sexta: 7h às 19h</p>
                    </div>
                  </div>
                </div>

                <AnimatedWhatsAppButton
                  href={getWhatsAppHref("Gostaria de agendar uma visita para conhecer as instalações!")}
                  dataCta="whatsapp-contato-falar"
                  className="w-full"
                >
                  Falar no WhatsApp
                </AnimatedWhatsAppButton>
              </div>
            </div>

            {/* Building Image */}
            <div className="lg:col-span-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl h-full">
                <img
                  loading="eager"
                  decoding="async"
                  src="/frente_casa.png"
                  alt="Fachada da Cão Sabido"
                  className="w-full h-full object-cover min-h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-lg">Nossa creche em João Pessoa</p>
                  <p className="text-white/90 text-sm">Ambiente moderno e acolhedor</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-1">
              <div className="bg-gray-100 rounded-2xl overflow-hidden h-full shadow-lg">
                <LazyContactMap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img
                  loading="eager"
                  decoding="async" src={caoSabidoLogo} alt="Cão Sabido" className="w-12 h-12 rounded-full" />
                <span className="text-2xl font-bold">Cão Sabido</span>
              </div>
              <p className="text-amber-200 mb-4 leading-relaxed">
                A única creche educativa de João Pessoa. Muito cuidado com o seu melhor amigo.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-amber-300" />
                  <span className="text-amber-200 text-sm">Jardim Oceania - João Pessoa, PB</span>
                </div>
                <a
                  href="tel:+5583998276229"
                  className="flex items-center space-x-2 text-amber-200 transition-colors hover:text-white"
                  data-cta="phone-footer"
                >
                  <Phone className="w-4 h-4 text-amber-300" />
                  <span className="text-sm">(83) 99827-6229</span>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Nossos Serviços</h4>
              <ul className="space-y-2 text-amber-200 text-sm">
                <li>Creche Educativa e Recreativa
                </li>
                <li>Escola de Adestramento
                </li>
                <li>Treinamento intensivo com Internato
                </li>
                <li>Hospedagem</li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 text-amber-200 text-sm">
                <li><a href="#sobre" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#como-funciona" className="hover:text-white transition-colors">Como funciona</a></li>
                <li><a href="#videos" className="hover:text-white transition-colors">Ambientes</a></li>
                <li><a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos</a></li>
                <li><a href="#adestrador" className="hover:text-white transition-colors">Adestrador</a></li>
                <li><a href="#contato" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-amber-800 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-amber-300 text-sm mb-4 md:mb-0">
                © {currentYear} Cão Sabido. Todos os direitos reservados.
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-amber-200 text-sm">Siga-nos:</span>
                <div className="flex space-x-3">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-amber-200 hover:text-white hover:bg-amber-800"
                  >
                    <a
                      href="https://www.instagram.com/caosabidojp/"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cta="instagram-footer"
                      aria-label="Abrir Instagram da Cão Sabido"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      {showWhatsAppButton && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            {showWhatsAppTooltip && (
              <a
                href={getWhatsAppHref()}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp-floating-tooltip"
                className="absolute bottom-16 right-0 mb-3 block w-[260px] rounded-2xl bg-white px-4 py-3 text-gray-800 shadow-xl ring-1 ring-black/5 transition-transform duration-200 hover:-translate-y-1"
                onClick={() => { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: "whatsapp_click", cta_id: "whatsapp-floating-tooltip" }) }}
              >
                <span className="block text-sm font-semibold leading-snug">
                  Tem alguma dúvida?
                </span>
                <span className="mt-1 block text-sm leading-snug text-gray-600">
                  <span className="font-semibold text-green-600">Estamos online</span>, fale agora!
                </span>
                <span className="absolute -bottom-1.5 right-5 h-4 w-4 rotate-45 bg-white ring-1 ring-black/5"></span>
              </a>
            )}
            <Button
              asChild
              className="h-14 w-14 rounded-full bg-[#25D366] p-0 text-white shadow-lg shadow-green-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fb855] hover:shadow-xl"
              size="icon"
            >
              <a
                href={getWhatsAppHref()}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp-floating"
                aria-label="Falar no WhatsApp"
                onClick={() => { window.dataLayer = window.dataLayer || []; window.dataLayer.push({ event: "whatsapp_click", cta_id: "whatsapp-floating" }) }}
              >
                <WhatsAppIcon className="h-7 w-7" />
              </a>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
