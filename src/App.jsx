import { useEffect, useRef, useState } from "react";
import "./App.css";
import { companyKnowledge } from "./config/companyKnowledge";

const supportedServiceKeywords = [
  ["structural framing", "Framing"],
  ["interior framing", "Framing"],
  ["framing", "Framing"],
  ["wood framing", "Framing"],
  ["wall framing", "Framing"],
  ["rough carpentry", "Framing"],
  ["estructura de madera", "Framing"],
  ["muros", "Framing"],
  ["divisiones", "Framing"],
  ["marcos", "Framing"],
  ["apoyo a constructoras", "Framing"],
  ["finish carpentry", "General finish carpentry"],
  ["finished carpentry", "General finish carpentry"],
  ["general finish carpentry", "General finish carpentry"],
  ["carpintería de acabado", "General finish carpentry"],
  ["carpinteria de acabado", "General finish carpentry"],
  ["detalles interiores", "General finish carpentry"],
  ["acabados interiores", "General finish carpentry"],
  ["interior trim", "Interior trim installation"],
  ["exterior trim", "Exterior trim repair"],
  ["baseboard", "Interior trim / baseboards / casing"],
  ["baseboards", "Interior trim / baseboards / casing"],
  ["casing", "Interior trim / baseboards / casing"],
  ["crown molding", "Crown molding or decorative trim"],
  ["door", "Door installation"],
  ["doors", "Door installation"],
  ["window", "Window installation"],
  ["windows", "Window installation"],
  ["hardware", "Hardware installation"],
  ["cabinet", "Cabinet installation"],
  ["cabinets", "Cabinet installation"],
  ["kitchen", "Kitchen remodeling and installation"],
  ["deck", "Deck construction and installation"],
  ["decks", "Deck construction and installation"],
  ["flooring", "Flooring installation"],
  ["floor", "Flooring installation"],
  ["siding", "Siding installation"],
  ["soffit", "Soffit and fascia installation"],
  ["fascia", "Soffit and fascia installation"],
  ["remodel", "Full remodeling carpentry support"],
  ["remodeling", "Full remodeling carpentry support"],
  ["demolition", "Bathroom demolition"],
  ["punch list", "Punch list / final details"],
  ["subcontract", "Jobsite subcontract support"],
  ["subcontractor", "Jobsite subcontract support"],
  ["subcontractor support for builders", "Builder subcontractor support"],
  ["builder subcontractor support", "Builder subcontractor support"],
  ["general contractor support", "General contractor support"],
  ["ceiling paneling", "Interior ceiling paneling"],
  ["interior ceiling siding", "Interior ceiling paneling"],
  ["decorative ceiling panels", "Interior ceiling paneling"],
  ["subcontratista para constructoras", "Builder subcontractor support"],
  ["apoyo a contratistas generales", "General contractor support"],
  ["revestimiento de cielo interior", "Interior ceiling paneling"],
  ["siding en cielo interior", "Interior ceiling paneling"],
  ["paneles en cielo interior", "Interior ceiling paneling"],
  ["cielo raso decorativo", "Interior ceiling paneling"],
  ["trim", "General finish carpentry"],
  ["trim interior", "General finish carpentry"],
  ["moldura", "General finish carpentry"],
  ["molduras", "General finish carpentry"],
  ["puerta", "Door installation"],
  ["puertas", "Door installation"],
  ["ventana", "Window installation"],
  ["ventanas", "Window installation"],
  ["pisos", "Flooring installation"],
  ["piso", "Flooring installation"],
  ["gabinete", "Cabinet installation"],
  ["gabinetes", "Cabinet installation"],
  ["cocina", "Kitchen remodeling and installation"],
  ["cocinas", "Kitchen remodeling and installation"],
  ["deck", "Deck construction and installation"],
  ["decks", "Deck construction and installation"],
  ["demolicion", "Bathroom demolition"],
  ["remodelacion", "Full remodeling carpentry support"],
  ["subcontratista", "Jobsite subcontract support"],
];

const hotKeywords = [
  "ready to start",
  "as soon as possible",
  "asap",
  "this week",
  "urgent",
  "need a crew",
  "need estimate",
  "call me",
  "ready to talk",
  "active jobsite",
  "subcontractor needed",
  "listo para empezar",
  "lo antes posible",
  "urgente",
  "esta semana",
  "necesito una cuadrilla",
  "necesito estimado",
  "llamame",
  "listo para hablar",
  "obra activa",
  "necesito subcontratista",
];

const CLIENT_MEDIA_BASE = "/media/jesus-garcia-llc";
const CLIENT_LOGO = `${CLIENT_MEDIA_BASE}/logo/logo.png`;
const CLIENT_HERO = `${CLIENT_MEDIA_BASE}/hero/hero-cover.jpg`;
const createServiceMediaImages = (serviceFolder) =>
  Array.from(
    { length: 4 },
    (_, index) =>
      `${CLIENT_MEDIA_BASE}/services/${serviceFolder}/image-${String(index + 1).padStart(2, "0")}.jpg`,
  );

function MediaImage({ src, alt, className }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <div className={`${className} mediaFallback`}>Pending client media</div>;
  }

  return <img className={className} src={src} alt={alt} onError={() => setHasError(true)} />;
}

function ServiceImageSlider({ mediaImages, alt }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedImages, setFailedImages] = useState([]);
  const availableImages = mediaImages.filter((image) => !failedImages.includes(image));
  const availableImageCount = availableImages.length;
  const visibleImageIndex = availableImageCount > 0 ? activeIndex % availableImageCount : 0;

  useEffect(() => {
    if (availableImageCount <= 1) {
      return undefined;
    }

    const sliderInterval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % availableImageCount);
    }, 3000);

    return () => window.clearInterval(sliderInterval);
  }, [availableImageCount]);

  const handleImageError = (image) => {
    setFailedImages((currentImages) =>
      currentImages.includes(image) ? currentImages : [...currentImages, image],
    );
  };

  if (availableImageCount === 0) {
    return <div className="serviceImageSlider mediaFallback">Pending client media</div>;
  }

  return (
    <div className="serviceImageSlider">
      {availableImages.map((image, index) => (
        <img
          className={`serviceCardMedia ${index === visibleImageIndex ? "active" : ""}`}
          src={image}
          alt={`${alt} ${index + 1}`}
          key={image}
          onError={() => handleImageError(image)}
        />
      ))}

      {availableImageCount > 1 && (
        <div className="serviceSliderIndicators" aria-hidden="true">
          {availableImages.map((image, index) => (
            <span className={index === visibleImageIndex ? "active" : ""} key={image} />
          ))}
        </div>
      )}
    </div>
  );
}

const translations = {
  en: {
    navServices: "Services",
    navAbout: "About",
    navArea: "Service Area",
    navProcess: "Process",
    navSafety: "Safety",
    navEstimate: "Estimate",
    navContact: "Contact",
    talkToNova: "Talk to NOVA",
    tagline: "Installation, Carpentry & Remodeling",
    heroTitle:
      "Installation, remodeling and subcontractor support in Jackson, WY and nearby areas.",
    heroText:
      "Jesús García LLC helps homeowners, businesses and builders with framing, general finish carpentry, doors, windows, flooring, cabinets, kitchens, interior ceiling paneling, siding, decks and complete remodeling projects.",
    requestReview: "Request estimate with NOVA",
    viewServices: "View services",
    notice:
      "Service in Jackson, Wyoming, and nearby communities.",
    trustItems: [
      "Jackson, WY",
      "Residential & Commercial",
      "Interior & Exterior Work",
      "Bilingual Service EN / ES",
    ],
    woodCardTitle: "Reliable Subcontractor Support",
    woodCardServices: "Framing - Finish - Doors - Windows - Floors - Siding",
    whatWeDo: "What We Do",
    servicesTitle: "Services We Provide",
    servicesIntro:
      "Framing, general finish carpentry, installation, interior ceiling paneling, remodeling and subcontractor support for residential and commercial projects.",
    serviceCards: [
      {
        title: "Door Installation",
        description: "Installation and adjustment of interior and exterior doors.",
        mediaImages: createServiceMediaImages("doors"),
      },
      {
        title: "Window Installation",
        description: "Window installation and replacement.",
        mediaImages: createServiceMediaImages("windows"),
      },
      {
        title: "Flooring",
        description: "Flooring installation for residential and commercial projects.",
        mediaImages: createServiceMediaImages("flooring"),
      },
      {
        title: "Cabinets",
        description: "Installation of kitchen, bathroom, and interior cabinets.",
        mediaImages: createServiceMediaImages("cabinets"),
      },
      {
        title: "Kitchens",
        description: "Kitchen remodeling and installation.",
        mediaImages: createServiceMediaImages("kitchens"),
      },
      {
        title: "Interior ceiling paneling",
        description:
          "Installation of ceiling panels, interior siding, wood or PVC paneling for decorative finishes in remodeling and construction projects.",
        mediaImages: createServiceMediaImages("ceiling-paneling"),
      },
      {
        title: "Framing",
        description:
          "Wood framing support for walls, partitions, openings and structural preparation for residential, commercial and builder projects.",
        mediaImages: createServiceMediaImages("framing"),
      },
      {
        title: "General finish carpentry",
        description:
          "Interior finish work, trim, molding, final details, adjustments, decorative pieces and carpentry finishing for remodeling and construction projects.",
        mediaImages: createServiceMediaImages("finish-carpentry"),
      },
      {
        title: "Siding",
        description: "Exterior siding installation and repair.",
        mediaImages: createServiceMediaImages("siding"),
      },
      {
        title: "Decks",
        description: "Deck construction and installation.",
        mediaImages: createServiceMediaImages("decks"),
      },
      {
        title: "Complete Remodeling",
        description: "Complete interior and exterior remodeling.",
        mediaImages: createServiceMediaImages("remodeling"),
      },
      {
        title: "Subcontractor support for builders",
        description:
          "Support for builders and general contractors with installation, carpentry, finishes, siding, decks, doors, windows, cabinets, flooring and remodeling work.",
        mediaImages: createServiceMediaImages("subcontractor"),
      },
    ],
    projectProof: "Project Proof",
    workTitle: "Our Work",
    workIntro:
      "Project photos and videos from Jesús García LLC will appear here as client media becomes available.",
    projectVideos: "Project Videos",
    projectVideoPlaceholder: "Project video placeholder",
    projectVideoTitle: "Project Video",
    projectVideoText:
      "Short work preview, installation process, jobsite progress, or before-and-after project clip.",
    projectImageGallery: "Project Image Gallery",
    image: "Image",
    projectPhoto: "Project photo",
    whoWeWorkWith: "About the Company",
    fitTitle: "Jesús García LLC",
    fitText:
      "Jesús García LLC is a local installation, carpentry, remodeling and builder support company serving Jackson, WY and nearby areas.",
    serviceAreaLabel: "Service Area",
    serviceAreaTitle: "Serving Jackson and Nearby Areas",
    serviceAreaIntro: "Primary service area: Jackson, WY.",
    serviceAreas: [
      "Alpine, WY",
      "Star Valley, WY",
      "Afton, WY",
      "Nearby areas",
    ],
    processLabel: "How We Work",
    processTitle: "A Clear Process from Review to Punch List",
    processIntro:
      "NOVA helps start the project review, then Jesús García LLC can confirm the scope and coordinate the work.",
    processSteps: [
      ["Project Review", "Share the project type, location, timing, and scope needs."],
      ["Scope Confirmation", "Confirm the carpentry work, materials, access, and jobsite expectations."],
      ["Scheduling", "Coordinate timing with the contractor, remodeling company, or property owner."],
      ["Jobsite Execution", "Complete the approved carpentry scope with organized jobsite communication."],
      ["Final Details / Punch List", "Review final details, adjustments, hardware, trim, and finish items."],
    ],
    safetyLabel: "Professional Standards",
    safetyTitle: "Safety, Clean Work, and Jobsite Respect",
    safetyIntro:
      "Professional carpentry support should protect the project, the people on site, and the quality of the finished work.",
    safetyItems: [
      "PPE and jobsite safety",
      "Clean and organized work",
      "Clear communication with contractors or property owners",
      "Quality-focused execution",
      "Respect for the jobsite",
    ],
    finalCtaTitle: "Request Your Estimate with NOVA",
    finalCtaText:
      "NOVA will help you share your project details, select the service you need and submit your request so the team can review it.",
    contactAddress: "115068 US 89, Alpine, WY 83128",
    quoteSectionLabel: "Direct Estimate",
    quoteSectionTitle: "Request Your Estimate with NOVA",
    quoteSectionText:
      "NOVA will help you share your project details, select the service you need and submit your request so the team can review it.",
    quoteSectionButton: "Talk to NOVA",
    footerServices:
      "Framing, general finish carpentry, installation, interior ceiling paneling, remodeling and subcontractor support",
    footerArea: "Jackson, WY and nearby areas",
    footerNovaCta: "Talk to NOVA",
    footerAlternativeContact: "Alternative contact: jesusgarciallccompany@gmail.com",
    footerSendEmail: "Send email",
    novaSubtitle: "Jesús García LLC Project Assistant",
    novaChatPlaceholder: "Write your message to NOVA",
    novaSend: "Send",
    novaTyping: "NOVA is typing...",
    novaFallback:
      "NOVA is temporarily unavailable. Please leave your name, phone number, and a brief description of your project so the team can follow up.",
    novaTemporaryError: "NOVA had a temporary issue. Please try sending your message again.",
    novaBasicFallback:
      "NOVA is temporarily unavailable. You can leave your information here and the team will follow up.",
    novaEmergencyIntro:
      "The assistant is currently undergoing maintenance. Please complete the form and a member of our team will contact you as soon as possible.",
    novaEmergencyRecipient: "Recipient",
    novaEmergencySend: "Send",
    novaEmergencySending: "Sending...",
    novaEmergencyEmailError: "Please enter a valid email address.",
    novaEmergencySubmitError:
      "Your message could not be sent at this time. Please try again.",
    novaEmergencySuccess:
      "Your message has been received. A member of our team will contact you as soon as possible. Thank you for contacting Jesús García LLC.",
    basicFinalThanks:
      "Thank you. We received your information. The team will review your request and follow up with you.",
    basicMissingInfo:
      "To continue, please leave your name, phone or email, and a brief description of your project.",
    startNewChat: "Start new chat",
    endChat: "End chat",
    schedulingSuccess:
      "Your call has been scheduled. Thank you for contacting Jesús García LLC. Our team will review your project and follow up at the selected time.",
    contactPreferencePrompt:
      "Thanks, {name}. I have your contact details now. Would you prefer the team to contact you as soon as possible, or would you like to choose a specific time for a call?",
    urgentContactConfirmed:
      "Perfect, {name}. I’ve recorded your request so the team can review your project and contact you as soon as possible.",
    chooseSchedulingSlot: "Please choose one of the available times for your call.",
    bookingOptionsLabel: "Available options",
    bookingOptionsCleanReply:
      "I have these available options. Choose the time that works best for you.",
    bookingSelection: "I choose {time}.",
    schedulingUnavailable:
      "I couldn’t load the available times right now. Please tell me what day and time you prefer for a call.",
    anythingElse: "Is there anything else I can help you with?",
    ratingPrompt:
      "Before closing, how would you rate NOVA's assistance? Your feedback helps us improve our service.",
    ratingTitle: "Rate NOVA’s service",
    ratingStarLabel: "Rate NOVA {rating} out of 5",
    ratingThanks: "Thank you for your rating.",
    increase30: "Increase 30%",
    increase60: "Increase 60%",
    increase100: "Increase 100%",
    initialNovaPrompt: "Ask NOVA about your project. Type your message to begin.",
    newChatStarted: "Ask NOVA about your project. Type your message to begin.",
    chatEnded: "Conversation ended. Press 'Start new chat' to begin another request.",
    normalizedLocationPrompt:
      "Perfect, I'll take that as Jackson, Wyoming. To continue, may I have your phone number and email?",
    otherPlaceholder: "Describe what you need help with",
    continue: "Continue",
    otherEmptyError: "Please describe what you need help with.",
    otherNotFit: companyKnowledge.customerServiceHandoffMessage.en,
    continueAnyway: "Continue Anyway",
    fullHomeMessage:
      "Jesús García LLC provides installation and remodeling services. Please share the scope so the team can review it.",
    subcontractInstead: "I need subcontractor support instead",
    startOver: "Start Over",
    startTimes: [
      ["As soon as possible", "As soon as possible"],
      ["This week", "This week"],
      ["This month", "This month"],
      ["Just planning", "Just planning"],
    ],
    readinessOptions: [
      ["I am ready to talk", "Yes, I am ready to talk"],
      ["I need an estimate", "I need an estimate first"],
      ["I am comparing options", "I am comparing options"],
      ["Just gathering information", "Just gathering information"],
    ],
    hotText:
      "Continue with NOVA so your request can be qualified, reviewed, and coordinated with the team.",
    warmText:
      "You can leave your details and Jesús García LLC can review your project information.",
    coldText:
      "You can review the services and leave your information when you have more project details.",
    reviewText:
      "NOVA can capture your details so the customer service team can review your request and give you the final answer.",
    name: "Full name",
    phone: "Phone number",
    email: "Email",
    projectLocation: "Project location",
    message: "Brief project description",
    serviceNeeded: "Service needed",
    projectDescription: "Project description",
    desiredStartDate: "Desired start date",
    previousClientQuestion: "Are you a previous client?",
    previousClientReference: "What name or project did we work with before?",
    callPreference: "Call preference",
    yes: "Yes",
    no: "No",
    callPreferences: [
      ["Morning", "Morning"],
      ["Midday", "Midday"],
      ["Afternoon", "Afternoon"],
      ["As soon as possible", "As soon as possible"],
    ],
    submitEstimate: "Submit Estimate Request",
    nameError: "Please enter your name.",
    phoneError: "Please enter your phone number.",
    locationError: "Please enter the project location.",
    serviceError: "Please enter the service needed.",
    projectDescriptionError: "Please enter the project description.",
    finalThanks:
      "Thank you. NOVA received your project details. Jesús García LLC will contact you soon.",
    quoteFinalThanks:
      "Thank you. NOVA received your estimate request. Our team will review the details and contact you.",
    leadStatus: "Lead Status:",
    serviceSelected: "Service selected:",
    locationSelected: "Project location:",
    startNewRequest: "Start New Request",
    closeNova: "Close NOVA",
    back: "Back",
    laterConnection:
      "Contact information will be securely routed to the team.",
    statusLabels: {
      "HOT LEAD": "HOT LEAD",
      "WARM LEAD": "WARM LEAD",
      "COLD LEAD": "COLD LEAD",
      "CURIOUS / NOT QUALIFIED": "CURIOUS / NOT QUALIFIED",
      "NEEDS REVIEW": "NEEDS REVIEW",
    },
  },
  es: {
    navServices: "Servicios",
    navAbout: "Empresa",
    navArea: "Zona de servicio",
    navProcess: "Proceso",
    navSafety: "Seguridad",
    navEstimate: "Cotización",
    navContact: "Contacto",
    talkToNova: "Hablar con NOVA",
    tagline: "Instalación, carpintería y remodelación",
    heroTitle:
      "Instalación, remodelación y apoyo a constructoras en Jackson, WY y áreas cercanas.",
    heroText:
      "Jesús García LLC ayuda a propietarios, negocios y constructoras con framing, carpintería de acabado general, puertas, ventanas, pisos, gabinetes, cocinas, revestimiento de cielo interior, siding, decks y remodelaciones completas.",
    requestReview: "Solicitar cotización con NOVA",
    viewServices: "Ver servicios",
    notice:
      "Servicio en Jackson, Wyoming y comunidades cercanas.",
    trustItems: [
      "Jackson, WY",
      "Residencial y comercial",
      "Interiores y exteriores",
      "Atención bilingüe EN / ES",
    ],
    woodCardTitle: "Apoyo confiable de subcontrato",
    woodCardServices: "Framing - Acabados - Puertas - Ventanas - Pisos - Siding",
    whatWeDo: "Qué hacemos",
    servicesTitle: "Servicios que ofrecemos",
    servicesIntro:
      "Servicios de framing, carpintería de acabado general, instalación, revestimiento de cielo interior, remodelación y apoyo a constructoras.",
    serviceCards: [
      {
        title: "Instalación de puertas",
        description: "Instalación y ajuste de puertas interiores y exteriores.",
        mediaImages: createServiceMediaImages("doors"),
      },
      {
        title: "Instalación de ventanas",
        description: "Instalación y reemplazo de ventanas.",
        mediaImages: createServiceMediaImages("windows"),
      },
      {
        title: "Pisos",
        description: "Instalación de pisos para proyectos residenciales y comerciales.",
        mediaImages: createServiceMediaImages("flooring"),
      },
      {
        title: "Gabinetes",
        description: "Instalación de gabinetes de cocina, baño y áreas interiores.",
        mediaImages: createServiceMediaImages("cabinets"),
      },
      {
        title: "Cocinas",
        description: "Remodelación e instalación de cocinas.",
        mediaImages: createServiceMediaImages("kitchens"),
      },
      {
        title: "Revestimiento de cielo interior",
        description:
          "Instalación de paneles, siding interior, madera o PVC en cielos interiores para acabados decorativos en remodelaciones y proyectos de construcción.",
        mediaImages: createServiceMediaImages("ceiling-paneling"),
      },
      {
        title: "Framing",
        description:
          "Construcción y apoyo en estructuras de madera, muros, divisiones, marcos y preparación de espacios para proyectos residenciales, comerciales y constructoras.",
        mediaImages: createServiceMediaImages("framing"),
      },
      {
        title: "Carpintería de acabado general",
        description:
          "Trabajos de acabado interior, molduras, trim, detalles finales, ajustes, instalación de piezas decorativas y terminaciones de carpintería para remodelaciones y construcción.",
        mediaImages: createServiceMediaImages("finish-carpentry"),
      },
      {
        title: "Siding",
        description: "Instalación y reparación de siding exterior.",
        mediaImages: createServiceMediaImages("siding"),
      },
      {
        title: "Decks",
        description: "Construcción e instalación de decks.",
        mediaImages: createServiceMediaImages("decks"),
      },
      {
        title: "Remodelaciones completas",
        description: "Remodelaciones completas de interiores y exteriores.",
        mediaImages: createServiceMediaImages("remodeling"),
      },
      {
        title: "Subcontratista para constructoras",
        description:
          "Apoyo a constructoras y contratistas generales en instalación, carpintería, acabados, siding, decks, puertas, ventanas, gabinetes, pisos y trabajos de remodelación.",
        mediaImages: createServiceMediaImages("subcontractor"),
      },
    ],
    projectProof: "Prueba de trabajo",
    workTitle: "Nuestro trabajo",
    workIntro:
      "Aquí aparecerán fotos y videos de proyectos de Jesús García LLC conforme esté disponible el material del cliente.",
    projectVideos: "Videos de proyectos",
    projectVideoPlaceholder: "Espacio para video de proyecto",
    projectVideoTitle: "Video de proyecto",
    projectVideoText:
      "Vista corta del trabajo, proceso de instalacion, avance de obra o clip antes y despues.",
    projectImageGallery: "Galería de imágenes",
    image: "Imagen",
    projectPhoto: "Foto de proyecto",
    whoWeWorkWith: "Sobre la empresa",
    fitTitle: "Jesús García LLC",
    fitText:
      "Jesús García LLC es una compañía local de instalación, carpintería, remodelación y apoyo a constructoras que atiende Jackson, WY y áreas cercanas.",
    serviceAreaLabel: "Zona de servicio",
    serviceAreaTitle: "Servicio en Jackson y áreas cercanas",
    serviceAreaIntro: "Zona principal de servicio: Jackson, WY.",
    serviceAreas: [
      "Alpine, WY",
      "Star Valley, WY",
      "Afton, WY",
      "Áreas cercanas",
    ],
    processLabel: "Cómo trabajamos",
    processTitle: "Un proceso claro desde la revisión hasta los detalles finales",
    processIntro:
      "NOVA ayuda a iniciar la revisión del proyecto; después Jesús García LLC puede confirmar el alcance y coordinar el trabajo.",
    processSteps: [
      ["Revision del proyecto", "Comparte el tipo de proyecto, ubicacion, tiempo y alcance necesario."],
      ["Confirmacion del alcance", "Confirmamos el trabajo de carpinteria, materiales, acceso y expectativas de obra."],
      ["Programacion", "Coordinamos fechas con el contratista, compania de remodelacion o dueno de propiedad."],
      ["Ejecucion en obra", "Completamos el alcance aprobado con comunicacion organizada en el sitio."],
      ["Detalles finales / punch list", "Revisamos detalles finales, ajustes, hardware, trim y acabados."],
    ],
    safetyLabel: "Estandares profesionales",
    safetyTitle: "Seguridad, trabajo limpio y respeto por la obra",
    safetyIntro:
      "El apoyo profesional de carpinteria debe proteger el proyecto, a las personas en obra y la calidad del trabajo terminado.",
    safetyItems: [
      "Uso de EPP y seguridad en obra",
      "Trabajo limpio y organizado",
      "Comunicacion clara con contratistas o duenos",
      "Ejecucion enfocada en calidad",
      "Respeto por el sitio de trabajo",
    ],
    finalCtaTitle: "Solicita tu cotización con NOVA",
    finalCtaText:
      "NOVA te ayudará a compartir los detalles de tu proyecto, seleccionar el servicio que necesitas y dejar registrada tu solicitud para que el equipo pueda revisarla.",
    contactAddress: "115068 US 89, Alpine, WY 83128",
    quoteSectionLabel: "Cotización directa",
    quoteSectionTitle: "Solicita tu cotización con NOVA",
    quoteSectionText:
      "NOVA te ayudará a compartir los detalles de tu proyecto, seleccionar el servicio que necesitas y dejar registrada tu solicitud para que el equipo pueda revisarla.",
    quoteSectionButton: "Hablar con NOVA",
    footerServices:
      "Framing, carpintería de acabado general, instalación, revestimiento de cielo interior, remodelación y apoyo a constructoras",
    footerArea: "Jackson, WY y áreas cercanas",
    footerNovaCta: "Hablar con NOVA",
    footerAlternativeContact: "Contacto alterno: jesusgarciallccompany@gmail.com",
    footerSendEmail: "Enviar correo",
    novaSubtitle: "Asistente de proyectos de Jesús García LLC",
    novaChatPlaceholder: "Escribe tu mensaje para NOVA",
    novaSend: "Enviar",
    novaTemporaryError: "NOVA tuvo un problema temporal. Intenta enviar tu mensaje otra vez.",
    novaTyping: "NOVA está escribiendo...",
    novaFallback:
      "NOVA no está disponible temporalmente. Por favor deja tu nombre, teléfono y una breve descripción de tu proyecto para que el equipo pueda darte seguimiento.",
    novaBasicFallback:
      "NOVA no está disponible temporalmente. Puedes dejar tus datos aquí y el equipo te contactará.",
    novaEmergencyIntro:
      "En este momento el asistente está en mantenimiento. Por favor, rellena el formulario y una persona de nuestro equipo se pondrá en contacto contigo lo más pronto posible.",
    novaEmergencyRecipient: "Destinatario",
    novaEmergencySend: "Enviar",
    novaEmergencySending: "Enviando...",
    novaEmergencyEmailError: "Por favor escribe un correo electrónico válido.",
    novaEmergencySubmitError:
      "No fue posible enviar tu mensaje en este momento. Por favor, inténtalo nuevamente.",
    novaEmergencySuccess:
      "Tu mensaje ha sido recibido. Una persona de nuestro equipo se pondrá en contacto contigo lo más pronto posible. Gracias por contactar a Jesús García LLC.",
    basicFinalThanks:
      "Gracias. Recibimos tu información. El equipo revisará tu solicitud y se comunicará contigo.",
    basicMissingInfo:
      "Para continuar, deja tu nombre, teléfono o correo y una breve descripción de tu proyecto.",
    startNewChat: "Iniciar nuevo chat",
    endChat: "Finalizar chat",
    schedulingSuccess:
      "Tu llamada ha sido agendada. Gracias por contactar a Jesús García LLC. El equipo revisará tu proyecto y dará seguimiento en el horario seleccionado.",
    contactPreferencePrompt:
      "Gracias, {name}. Ya tengo tus datos de contacto. ¿Prefieres que el equipo te contacte a la brevedad o quieres elegir una hora específica para una llamada?",
    urgentContactConfirmed:
      "Perfecto, {name}. Dejé registrada tu solicitud para que el equipo revise tu proyecto y te contacte a la brevedad.",
    chooseSchedulingSlot: "Elige uno de los horarios disponibles para tu llamada.",
    bookingOptionsLabel: "Opciones disponibles",
    bookingOptionsCleanReply:
      "Tengo estas opciones disponibles. Elige el horario que más te convenga.",
    bookingSelection: "Elijo {time}.",
    schedulingUnavailable:
      "No pude cargar los horarios disponibles en este momento. Indícame qué día y hora prefieres para una llamada.",
    anythingElse: "¿Deseas que te ayude con algo más?",
    ratingPrompt:
      "Antes de cerrar, ¿cómo calificas la atención de NOVA? Tu opinión nos ayuda a mejorar.",
    ratingTitle: "Califica la atención de NOVA",
    ratingStarLabel: "Calificar NOVA con {rating} de 5",
    ratingThanks: "Gracias por tu calificación.",
    increase30: "Aumentar 30%",
    increase60: "Aumentar 60%",
    increase100: "Aumentar 100%",
    initialNovaPrompt: "Pregúntale a NOVA sobre tu proyecto. Escribe tu mensaje para comenzar.",
    newChatStarted: "Pregúntale a NOVA sobre tu proyecto. Escribe tu mensaje para comenzar.",
    chatEnded: "Conversación finalizada. Presiona 'Iniciar nuevo chat' para comenzar otra solicitud.",
    normalizedLocationPrompt:
      "Perfecto, lo tomaré como Jackson, Wyoming. Para continuar, ¿me puedes compartir tu teléfono y correo electrónico?",
    otherPlaceholder: "Describe en qué necesitas ayuda",
    continue: "Continuar",
    otherEmptyError: "Por favor describe en qué necesitas ayuda.",
    otherNotFit: companyKnowledge.customerServiceHandoffMessage.es,
    continueAnyway: "Continuar de todas formas",
    fullHomeMessage:
      "Jesús García LLC ofrece servicios de instalación y remodelación. Comparte el alcance para que el equipo pueda revisarlo.",
    subcontractInstead: "Necesito apoyo de subcontrato",
    startOver: "Empezar de nuevo",
    startTimes: [
      ["As soon as possible", "Lo antes posible"],
      ["This week", "Esta semana"],
      ["This month", "Este mes"],
      ["Just planning", "Solo estoy planeando"],
    ],
    readinessOptions: [
      ["I am ready to talk", "Si, estoy listo para hablar"],
      ["I need an estimate", "Necesito un estimado primero"],
      ["I am comparing options", "Estoy comparando opciones"],
      ["Just gathering information", "Solo estoy buscando informacion"],
    ],
    hotText:
      "Continúa con NOVA para que tu solicitud sea calificada, revisada y coordinada con el equipo.",
    warmText:
      "Puedes dejar tus datos y Jesús García LLC puede revisar la información de tu proyecto.",
    coldText:
      "Puedes revisar los servicios y dejar tu información cuando tengas más detalles del proyecto.",
    reviewText:
      "NOVA puede capturar tus datos para que el equipo revise tu solicitud y te dé la respuesta final.",
    name: "Nombre",
    phone: "Teléfono",
    email: "Correo electrónico",
    projectLocation: "Ubicación del proyecto",
    message: "Mensaje",
    serviceNeeded: "Tipo de servicio",
    projectDescription: "Descripción del trabajo",
    desiredStartDate: "Fecha deseada de inicio",
    previousClientQuestion: "Ya eres cliente anterior?",
    previousClientReference: "Con que nombre o proyecto trabajamos anteriormente?",
    callPreference: "Preferencia para llamada",
    yes: "Si",
    no: "No",
    callPreferences: [
      ["Morning", "Manana"],
      ["Midday", "Mediodia"],
      ["Afternoon", "Tarde"],
      ["As soon as possible", "Lo antes posible"],
    ],
    submitEstimate: "Enviar solicitud de cotización",
    nameError: "Por favor escribe tu nombre.",
    phoneError: "Por favor escribe tu número de teléfono.",
    locationError: "Por favor escribe la ubicación del proyecto.",
    serviceError: "Por favor escribe el tipo de servicio.",
    projectDescriptionError: "Por favor escribe la descripción del trabajo.",
    finalThanks:
      "Gracias. NOVA recibió los detalles de tu proyecto. Jesús García LLC se comunicará contigo pronto.",
    quoteFinalThanks:
      "Gracias. NOVA recibio tu solicitud de cotizacion. Nuestro equipo revisara los detalles y se comunicara contigo.",
    leadStatus: "Estado del lead:",
    serviceSelected: "Servicio seleccionado:",
    locationSelected: "Ubicacion del proyecto:",
    startNewRequest: "Iniciar nueva solicitud",
    closeNova: "Cerrar NOVA",
    back: "Atras",
    laterConnection:
      "La informacion de contacto se enviara de forma segura al equipo.",
    statusLabels: {
      "HOT LEAD": "Prospecto caliente",
      "WARM LEAD": "Prospecto tibio",
      "COLD LEAD": "Prospecto frio",
      "CURIOUS / NOT QUALIFIED": "Curioso / no calificado",
      "NEEDS REVIEW": "Necesita revision",
    },
  },
};

const normalizeText = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const normalizeBookingOption = (option) => {
  if (typeof option === "string") {
    return {
      start: option,
      end: "",
      label: option,
    };
  }

  if (!option || typeof option !== "object") {
    return null;
  }

  const start =
    option.start ||
    option.startTime ||
    option.datetime ||
    option.dateTime ||
    option.value ||
    option.slot ||
    "";
  const end = option.end || option.endTime || "";
  const label =
    option.label ||
    option.display ||
    option.text ||
    option.time ||
    option.title ||
    start;

  if (!start && !label) {
    return null;
  }

  return {
    ...option,
    start,
    end,
    label,
  };
};

const getBookingOptionIdentity = (option) =>
  normalizeText(
    option.start
      ? `${option.start}|${option.end || ""}`
      : option.label || "",
  ).trim();

const getBookingOptions = (response = {}) => {
  const optionGroups = [
    response.bookingOptions,
    response.availableSlots,
    response.slots,
    response.data?.bookingOptions,
    response.data?.availableSlots,
    response.data?.slots,
  ];
  const seenOptions = new Set();

  return optionGroups
    .filter(Array.isArray)
    .flat()
    .map(normalizeBookingOption)
    .filter(Boolean)
    .filter((option) => {
      const optionKey = getBookingOptionIdentity(option);

      if (!optionKey || seenOptions.has(optionKey)) {
        return false;
      }

      seenOptions.add(optionKey);
      return true;
    });
};

const getBookingOptionsKey = (options = []) =>
  options
    .map(getBookingOptionIdentity)
    .sort()
    .join("::");

const appendAssistantMessageIfUnique = (messages, message) => {
  const lastAssistantMessage = [...messages]
    .reverse()
    .find((candidate) => candidate.role === "assistant");

  if (!lastAssistantMessage) {
    return [...messages, message];
  }

  const sameText =
    normalizeText(lastAssistantMessage.content || "").trim() ===
    normalizeText(message.content || "").trim();
  const sameUiAction =
    (lastAssistantMessage.metadata?.uiAction || "") === (message.metadata?.uiAction || "");
  const sameBookingOptions =
    (lastAssistantMessage.metadata?.bookingOptionsKey || "") ===
    (message.metadata?.bookingOptionsKey || "");

  return sameText && sameUiAction && sameBookingOptions ? messages : [...messages, message];
};

const removeBookingTimesFromReply = (reply) => {
  if (!reply) {
    return "";
  }

  const timePattern = /(?:\d{1,2}:\d{2}|\d{1,2}\s*(?:a\.?\s*m\.?|p\.?\s*m\.?))/i;
  const optionLinePattern = /^\s*(?:\d+[.)-]|[-•])\s+/;

  return reply
    .split(/\r?\n/)
    .filter((line) => !(optionLinePattern.test(line) && timePattern.test(line)))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const includesAnyKeyword = (text, keywords) =>
  keywords.some((keyword) => text.includes(normalizeText(keyword)));

const detectNovaLanguageFromText = (text = "") => {
  const normalizedText = normalizeText(text);
  const spanishPattern =
    /\b(?:hola|necesito|quiero|me llamo|mi nombre es|cambiar\b.*\bpiso\b.*\bcasa)\b/;
  const englishPattern =
    /\b(?:hello|i need|i want|my name is|change\b.*\bfloor\b.*\bhouse)\b/;
  const isSpanish = spanishPattern.test(normalizedText);
  const isEnglish = englishPattern.test(normalizedText);

  if (isSpanish === isEnglish) {
    return null;
  }

  return isSpanish ? "es" : "en";
};

const resolveNovaRequestLanguage = ({
  message = "",
  conversationHistory = [],
  fallbackLanguage = "en",
} = {}) => {
  const messageLanguage = detectNovaLanguageFromText(message);
  const recentHistoryText = conversationHistory
    .slice(-4)
    .map((historyMessage) => historyMessage.content || "")
    .join(" ");
  const historyLanguage = detectNovaLanguageFromText(recentHistoryText);

  return messageLanguage || historyLanguage || (fallbackLanguage === "es" ? "es" : "en");
};

const hasQuoteUrgency = (quoteForm) => {
  const combinedText = normalizeText(
    `${quoteForm.serviceNeeded} ${quoteForm.projectDescription} ${quoteForm.desiredStartDate} ${quoteForm.callPreference}`,
  );

  return (
    quoteForm.callPreference === "As soon as possible" ||
    includesAnyKeyword(combinedText, hotKeywords)
  );
};

const findPreviousClientMatch = ({ name, phone, email, previousClientReference }) => {
  const searchValues = [name, phone, email, previousClientReference]
    .map((value) => normalizeText(value || "").trim())
    .filter(Boolean);

  return companyKnowledge.previousClients.some((client) => {
    const clientValues = [client.name, client.phone, client.email, client.projectAddress]
      .map((value) => normalizeText(value || "").trim())
      .filter(Boolean);

    return searchValues.some((searchValue) =>
      clientValues.some(
        (clientValue) => clientValue.includes(searchValue) || searchValue.includes(clientValue),
      ),
    );
  });
};

const NOVA_FAST_CHAT_ENGINE_URL =
  "https://usedig.app.n8n.cloud/webhook/fast-chat-engine";
const NOVA_EMERGENCY_CONTACT_URL =
  "https://usedig.app.n8n.cloud/webhook/jg-nova-emergency-contact";
const NOVA_CLIENT_ID = "jesus-garcia-llc";
const NOVA_EMERGENCY_RECIPIENT = "jesusgarciallccompany@gmail.com";
const novaSmartModeEnabled = true;
const NOVA_REQUEST_TIMEOUT_MS = 45000;
const NOVA_SESSION_KEY = "novaSessionId_jesus-garcia-llc";
const NOVA_HISTORY_KEY = "novaConversationHistory_jesus-garcia-llc";
const NOVA_MESSAGES_KEY = `novaChatMessages_${NOVA_CLIENT_ID}`;
const NOVA_LEAD_DATA_KEY = `novaLeadData_${NOVA_CLIENT_ID}`;
const NOVA_ENDED_CHATS_KEY = `novaEndedChats_${NOVA_CLIENT_ID}`;
const NOVA_CHAT_RATINGS_KEY = `novaChatRatings_${NOVA_CLIENT_ID}`;
const NOVA_CHAT_STATE_KEY = `novaChatState_${NOVA_CLIENT_ID}`;
const NOVA_CONVERSATION_LANGUAGE_KEY = `novaConversationLanguage_${NOVA_CLIENT_ID}`;
const NOVA_META_TRACKING_KEY = `novaMetaTracking_${NOVA_CLIENT_ID}`;
const LEGACY_NOVA_STORAGE_KEYS = [
  "novaSessionId",
  "novaConversationHistory",
  "novaChatMessages",
  "novaLeadData",
];

const getCurrentNovaSessionId = () => {
  if (typeof localStorage === "undefined") {
    return "";
  }

  return localStorage.getItem(NOVA_SESSION_KEY) || "";
};

const getMetaUtmParams = () => {
  if (typeof window === "undefined") {
    return {};
  }

  const searchParams = new URLSearchParams(window.location.search);

  return {
    utm_source: searchParams.get("utm_source") || "",
    utm_medium: searchParams.get("utm_medium") || "",
    utm_campaign: searchParams.get("utm_campaign") || "",
    utm_content: searchParams.get("utm_content") || "",
  };
};

const getSafeMetaCommonParams = (options = {}) => ({
  session_id: options.sessionId || getCurrentNovaSessionId(),
  page_path: typeof window !== "undefined" ? window.location.pathname : "",
  ...getMetaUtmParams(),
  timestamp: new Date().toISOString(),
  event_source: options.eventSource || "nova_frontend",
});

const blockedMetaParamKeys = new Set([
  "name",
  "phone",
  "email",
  "projectLocation",
  "project_location",
  "projectDescription",
  "project_description",
  "message",
  "content",
  "userMessage",
  "address",
]);

const sanitizeMetaParams = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(([key]) => !blockedMetaParamKeys.has(key)),
  );

const trackMetaEvent = (eventName, params = {}, options = {}) => {
  const safeParams = sanitizeMetaParams({
    ...getSafeMetaCommonParams(options),
    ...params,
  });

  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    if (import.meta.env.DEV) {
      console.warn("[Meta Pixel Event skipped]", eventName, safeParams);
    }

    return false;
  }

  if (import.meta.env.DEV) {
    console.log("[Meta Pixel Event]", eventName, safeParams);
  }

  window.fbq("track", eventName, safeParams);
  return true;
};

const trackMetaCustomEvent = (eventName, params = {}, options = {}) => {
  const safeParams = sanitizeMetaParams({
    ...getSafeMetaCommonParams(options),
    ...params,
  });

  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    if (import.meta.env.DEV) {
      console.warn("[Meta Pixel Event skipped]", eventName, safeParams);
    }

    return false;
  }

  if (import.meta.env.DEV) {
    console.log("[Meta Pixel Event]", eventName, safeParams);
  }

  window.fbq("trackCustom", eventName, safeParams);
  return true;
};

const getTrackedMetaKeys = () => {
  try {
    const rawKeys = sessionStorage.getItem(NOVA_META_TRACKING_KEY) || "{}";

    return JSON.parse(rawKeys);
  } catch {
    return {};
  }
};

const saveTrackedMetaKeys = (trackedKeys) => {
  try {
    sessionStorage.setItem(NOVA_META_TRACKING_KEY, JSON.stringify(trackedKeys));
  } catch {
    // Tracking should never block the NOVA chat flow.
  }
};

const trackMetaOnce = (key, eventType, eventName, params = {}, options = {}) => {
  const sessionId = options.sessionId || getCurrentNovaSessionId();
  const scopedKey = `${sessionId || "anonymous"}:${key}`;
  const trackedKeys = getTrackedMetaKeys();

  if (trackedKeys[scopedKey]) {
    return false;
  }

  const didTrack =
    eventType === "standard"
      ? trackMetaEvent(eventName, params, { ...options, sessionId })
      : trackMetaCustomEvent(eventName, params, { ...options, sessionId });

  if (didTrack) {
    trackedKeys[scopedKey] = true;
    saveTrackedMetaKeys(trackedKeys);
  }

  return didTrack;
};

const normalizeMetaStatus = (value) =>
  String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const getMetaLeadStatus = (leadData = {}, response = {}) =>
  response.leadStatus ||
  response.lead_status ||
  leadData.leadStatus ||
  leadData.lead_status ||
  "";

const getMetaNextAction = (leadData = {}, response = {}) =>
  response.nextAction ||
  response.next_action ||
  leadData.nextAction ||
  leadData.next_action ||
  "";

const hasCapturedNovaLead = (leadData = {}) =>
  Boolean(
    leadData.name?.trim() &&
      (leadData.service?.trim() || leadData.projectDescription?.trim()) &&
      (leadData.phone?.trim() || leadData.email?.trim()),
  );

const getSafeServiceCategory = (...values) => {
  const matchedService = values
    .filter((value) => typeof value === "string")
    .map((value) => normalizeText(value))
    .filter(Boolean)
    .map((value) =>
      supportedServiceKeywords.find(([keyword]) =>
        value.includes(normalizeText(keyword)),
      )?.[1],
    )
    .find(Boolean);

  return matchedService ? normalizeMetaStatus(matchedService) : "unknown";
};

const getSafeNovaLeadMetaParams = (leadData = {}, response = {}) => ({
  lead_status: getMetaLeadStatus(leadData, response),
  next_action: getMetaNextAction(leadData, response),
  service_category: getSafeServiceCategory(leadData.service, response.detectedService),
  has_name: Boolean(leadData.name?.trim()),
  has_phone: Boolean(leadData.phone?.trim()),
  has_email: Boolean(leadData.email?.trim()),
  has_service: Boolean(leadData.service?.trim()),
  has_project_location: Boolean(
    leadData.projectLocation?.trim() || leadData.project_location?.trim(),
  ),
});

const qualifiedNovaLeadStatuses = new Set([
  "HOT_LEAD",
  "READY_TO_SCHEDULE",
  "SCHEDULE_CALL",
  "BUILDER_LEAD",
  "PRIORITY_BUILDER",
  "RETURNING_CLIENT",
]);

const lowIntentNovaLeadStatuses = new Set([
  "COLD_LEAD",
  "CURIOUS_VISITOR",
  "CURIOUS_NOT_QUALIFIED",
  "UNQUALIFIED",
  "NO_PROJECT",
]);

const notificationSentFields = [
  "notification_sent",
  "notificationSent",
  "owner_notified",
  "ownerNotified",
  "email_sent",
  "emailSent",
];

const hasOwnerNotificationSignal = (response = {}) =>
  notificationSentFields.some(
    (field) => response[field] === true || response.data?.[field] === true,
  );

const hasAppointmentConfirmedSignal = (response = {}) =>
  response.booking_confirmed === true ||
  response.bookingConfirmed === true ||
  response.appointment_scheduled === true ||
  response.appointmentScheduled === true ||
  response.success === true ||
  response.data?.booking_confirmed === true ||
  response.data?.bookingConfirmed === true ||
  response.data?.appointment_scheduled === true ||
  response.data?.appointmentScheduled === true ||
  response.data?.success === true;

const LEGACY_NOVA_IDENTITY_MARKERS = [
  ["use", "carpentry"].join(" "),
  ["use", "carpentry", "llc"].join(" "),
  ["use", "-carpentry-demo"].join(""),
  ["carpentry", "demo"].join(" "),
];

const emptyNovaLeadData = {
  name: "",
  phone: "",
  email: "",
  projectLocation: "",
  clientType: "",
  service: "",
  projectDescription: "",
  desiredStartDate: "",
  isPreviousClient: false,
  previousClientReference: "",
};

const readStorageJson = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
};

const createNovaRequestError = (type, message, details = {}) =>
  Object.assign(new Error(message), {
    novaRequestErrorType: type,
    ...details,
  });

let novaRequestSequence = 0;

const createNovaRequestId = () => {
  novaRequestSequence += 1;
  return `nova-request-${novaRequestSequence}`;
};

const isIntentionalNovaCancel = (error) =>
  error?.novaRequestErrorType === "INTENTIONAL_CANCEL" ||
  error?.novaRequestErrorType === "STALE_SESSION";

const readNovaChatEndedForCurrentSession = () => {
  const chatState = readStorageJson(NOVA_CHAT_STATE_KEY, {});
  const sessionId = getCurrentNovaSessionId();

  return Boolean(chatState.sessionId && chatState.sessionId === sessionId && chatState.ended);
};

const readNovaConversationLanguageForCurrentSession = () => {
  const languageState = readStorageJson(NOVA_CONVERSATION_LANGUAGE_KEY, {});
  const sessionId = getCurrentNovaSessionId();

  return languageState.sessionId === sessionId &&
    (languageState.language === "es" || languageState.language === "en")
    ? languageState.language
    : "";
};

const containsLegacyNovaIdentity = (value) => {
  const normalizedValue = String(value || "").toLowerCase();
  return LEGACY_NOVA_IDENTITY_MARKERS.some((marker) => normalizedValue.includes(marker));
};

const normalizeNovaIdentityText = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  return value
    .replace(/\buse[\s-]+carpentry(?:\s+llc)?\b/gi, "Jesús García LLC")
    .replace(/\bcarpentry\s+demo\b/gi, "Jesús García LLC");
};

const clearLegacyNovaStorage = () => {
  if (typeof localStorage === "undefined") {
    return;
  }

  const scopedHistory = localStorage.getItem(NOVA_HISTORY_KEY);
  const scopedMessages = localStorage.getItem(NOVA_MESSAGES_KEY);

  LEGACY_NOVA_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));

  if (containsLegacyNovaIdentity(scopedHistory) || containsLegacyNovaIdentity(scopedMessages)) {
    localStorage.removeItem(NOVA_SESSION_KEY);
    localStorage.removeItem(NOVA_HISTORY_KEY);
    localStorage.removeItem(NOVA_MESSAGES_KEY);
    localStorage.removeItem(NOVA_LEAD_DATA_KEY);
  }
};

clearLegacyNovaStorage();

const createNovaSessionId = () => {
  const savedSessionId = localStorage.getItem(NOVA_SESSION_KEY);

  if (savedSessionId) {
    return savedSessionId;
  }

  const sessionId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `nova-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  localStorage.setItem(NOVA_SESSION_KEY, sessionId);
  return sessionId;
};

const createNewNovaSessionId = () => {
  const sessionId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `nova-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  localStorage.setItem(NOVA_SESSION_KEY, sessionId);
  return sessionId;
};

const formatDateForScheduling = (date) => date.toISOString().slice(0, 10);

const getSchedulingWindow = () => {
  const dateFrom = new Date();
  dateFrom.setDate(dateFrom.getDate() + 1);
  const dateTo = new Date(dateFrom);
  dateTo.setDate(dateTo.getDate() + 7);

  return {
    dateFrom: formatDateForScheduling(dateFrom),
    dateTo: formatDateForScheduling(dateTo),
  };
};

const localNovaMessageKeys = [
  "initialNovaPrompt",
  "newChatStarted",
  "schedulingSuccess",
  "anythingElse",
  "ratingThanks",
  "normalizedLocationPrompt",
  "novaBasicFallback",
  "contactPreferencePrompt",
  "urgentContactConfirmed",
  "chooseSchedulingSlot",
  "bookingOptionsCleanReply",
  "schedulingUnavailable",
  "novaTemporaryError",
];

const isNovaEndedNoticeMessage = (message) =>
  message?.translationKey === "chatEnded" ||
  message?.content === translations.en.chatEnded ||
  message?.content === translations.es.chatEnded;

const isAutomaticNovaIntroMessage = (message) =>
  message?.translationKey === "initialNovaPrompt" ||
  message?.translationKey === "newChatStarted" ||
  (message?.role === "assistant" &&
    /\b(?:hi|hello|hola),?\s+(?:i['’]?m|soy)\s+nova\b/i.test(message?.content || ""));

const readStoredNovaMessages = (key) =>
  readStorageJson(key, []).filter(
    (message) => !isNovaEndedNoticeMessage(message) && !isAutomaticNovaIntroMessage(message),
  );

const hasCompleteContactDetails = (leadData) =>
  Boolean(leadData.name?.trim() && leadData.phone?.trim() && leadData.email?.trim());

const isDefinitiveNovaClose = (response = {}) => {
  const frontend = response.frontend || {};

  return (
    (response.conversation_state || response.conversationState) === "CONVERSATION_COMPLETED" &&
    (response.next_action || response.nextAction) === "CHAT_CLOSED" &&
    (response.workflow_action || response.workflowAction) === "CHAT_CLOSED" &&
    (frontend.widget_action || frontend.widgetAction) === "AUTO_CLOSE"
  );
};

const getNovaAutoCloseDelayMs = (response = {}) => {
  const delayMs = response.frontend?.auto_close_delay_ms ?? response.frontend?.autoCloseDelayMs;

  return typeof delayMs === "number" && Number.isFinite(delayMs) && delayMs >= 0
    ? delayMs
    : 10000;
};

const isUrgentContactPreference = (message) =>
  /\b(?:a la brevedad|lo antes posible|que me contacten|contactenme|contáctenme|urgent|as soon as possible|contact me)\b/i.test(
    message,
  );

const isSchedulingPreference = (message) =>
  /\b(?:quiero elegir hora|elegir (?:una )?hora|agendar|agenda|ma[nñ]ana|a las \d{1,2}|schedule|choose a time|book a call|specific time)\b/i.test(
    message,
  );

const responseRequestsContactPreference = (response) =>
  response?.nextAction === "ASK_CONTACT_PREFERENCE" ||
  /\b(?:a la brevedad|lo antes posible|hora espec[ií]fica|as soon as possible|specific time|schedule a call|choose a time)\b/i.test(
    response?.reply || "",
  );

const removePrematureClosingText = (message) =>
  String(message || "")
    .replace(/¿(?:hay algo|deseas que te ayude con algo|necesitas algo) m[aá]s[^?]*\?/gi, "")
    .replace(/is there anything else i can help you with\?/gi, "")
    .replace(/do you need anything else\?/gi, "")
    .trim();

const normalizeUserMessageForLeadData = (message, currentLeadData = emptyNovaLeadData) => {
  const nextLeadData = { ...currentLeadData };
  const normalizedMessage = normalizeText(message);
  const emailMatch = message.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const phoneMatch = message.match(/(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}/);
  const nameMatch = message.match(
    /\b(?:my name is|mi nombre es|me llamo|soy)\s+([a-zA-ZÀ-ÿ' -]{2,60})/i,
  );
  const locationMatch = message.match(/\b(?:project is in|project location is|ubicacion es|ubicación es|en)\s+([a-zA-ZÀ-ÿ0-9,.' -]{2,80})/i);
  const hasJacksonLocation = /\b(?:jacson|jakson|jacksn|jackson)(?:\s+(?:wy|wyoming))?\b/.test(
    normalizedMessage,
  );

  if (emailMatch) {
    nextLeadData.email = emailMatch[0].trim();
  }

  if (phoneMatch) {
    nextLeadData.phone = phoneMatch[0].trim();
  }

  if (nameMatch) {
    nextLeadData.name = nameMatch[1].trim();
  }

  if (hasJacksonLocation) {
    nextLeadData.projectLocation = "Jackson, Wyoming";
  } else if (locationMatch && !nextLeadData.projectLocation) {
    nextLeadData.projectLocation = locationMatch[1].trim();
  }

  if (/\b(?:ventans|ventanas|window|windows)\b/.test(normalizedMessage)) {
    nextLeadData.service = "Windows";
  }

  if (/\b(?:sidin|siding)\b/.test(normalizedMessage)) {
    nextLeadData.service = "Siding";
  }

  if (/\b(?:remodelasion|remodelacion|remodeling)\b/.test(normalizedMessage)) {
    const remodelingText = "remodeling project";
    nextLeadData.projectDescription = nextLeadData.projectDescription
      ? `${nextLeadData.projectDescription} ${remodelingText}`
      : remodelingText;
  }

  if (
    /\b(?:soy dueno|soy dueño|dueno de mi casa|dueño de mi casa|propietario|homeowner)\b/.test(
      normalizedMessage,
    )
  ) {
    nextLeadData.clientType = "Property Owner";
  }

  return nextLeadData;
};

const normalizeNovaLeadDataFields = (leadData = {}) => {
  const normalizedLeadData = {
    ...leadData,
    projectLocation: leadData.projectLocation || leadData.project_location,
    projectDescription: leadData.projectDescription || leadData.project_description,
    leadStatus: leadData.leadStatus || leadData.lead_status,
    nextAction: leadData.nextAction || leadData.next_action,
    clientType: leadData.clientType || leadData.client_type,
    desiredStartDate: leadData.desiredStartDate || leadData.desired_start_date,
  };

  return Object.fromEntries(
    Object.entries(normalizedLeadData).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );
};

function App() {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage === "es" || savedLanguage === "en") {
      return savedLanguage;
    }

    return "en";
  });
  const [activeServiceCard, setActiveServiceCard] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    projectLocation: "",
    message: "",
  });
  const [quoteMode, setQuoteMode] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    phone: "",
    email: "",
    projectLocation: "",
    serviceNeeded: "",
    projectDescription: "",
    desiredStartDate: "",
    isPreviousClient: "No",
    previousClientReference: "",
    callPreference: "Morning",
  });
  const [leadError, setLeadError] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);
  const [emergencySubmitting, setEmergencySubmitting] = useState(false);
  const [novaSessionId, setNovaSessionId] = useState(createNovaSessionId);
  const [conversationHistory, setConversationHistory] = useState(() =>
    readStoredNovaMessages(NOVA_HISTORY_KEY),
  );
  const [novaMessages, setNovaMessages] = useState(() =>
    readStoredNovaMessages(NOVA_MESSAGES_KEY),
  );
  const [novaLeadData, setNovaLeadData] = useState(() => ({
    ...emptyNovaLeadData,
    ...readStorageJson(NOVA_LEAD_DATA_KEY, {}),
  }));
  const [novaInput, setNovaInput] = useState("");
  const [novaLoading, setNovaLoading] = useState(false);
  const [novaSmartFallbackActive, setNovaSmartFallbackActive] = useState(false);
  const [novaChatEnded, setNovaChatEnded] = useState(readNovaChatEndedForCurrentSession);
  const [lastNovaResponse, setLastNovaResponse] = useState(null);
  const [lastUserSmartMessage, setLastUserSmartMessage] = useState("");
  const [novaConversationLanguage, setNovaConversationLanguage] = useState(
    readNovaConversationLanguageForCurrentSession,
  );
  const [novaSizeMode, setNovaSizeMode] = useState("large60");
  const [schedulingSlots, setSchedulingSlots] = useState([]);
  const [schedulingLoading, setSchedulingLoading] = useState(false);
  const [ratingPromptActive, setRatingPromptActive] = useState(false);
  const [ratingThanksVisible, setRatingThanksVisible] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const novaAutoCloseTimerRef = useRef(null);
  const novaRatingTimerRef = useRef(null);
  const activeNovaSessionRef = useRef(novaSessionId);
  const novaChatEndedRef = useRef(novaChatEnded);
  const novaRequestGenerationRef = useRef(0);
  const novaAutoCloseTokenRef = useRef(0);
  const novaSubmitInFlightRef = useRef(null);
  const novaEmergencySubmitRef = useRef(null);
  const novaLoadingRef = useRef(novaLoading);
  const schedulingLoadingRef = useRef(schedulingLoading);
  const novaSchedulingOperationsRef = useRef(new Set());
  const novaConversationLanguageRef = useRef(novaConversationLanguage);
  const pendingNovaRequestsRef = useRef(new Map());
  const emergencyNameRef = useRef(null);
  const emergencyPhoneRef = useRef(null);
  const emergencyEmailRef = useRef(null);

  const text = translations[language];
  const t = (key) => text[key];
  const currentLanguage = language === "en" ? "en" : "es";
  const effectiveNovaLanguage = novaConversationLanguage || currentLanguage;
  const novaFormText = translations[effectiveNovaLanguage] || text;
  const novaFormT = (key) => novaFormText[key];
  const getEffectiveNovaLanguage = () => novaConversationLanguageRef.current || currentLanguage;
  const formatStatus = (status) => text.statusLabels[status] || status;
  const formatNovaMessage = (key, values = {}) =>
    Object.entries(values).reduce(
      (message, [name, value]) => message.replaceAll(`{${name}}`, value || ""),
      t(key),
    );
  const isNovaSmartModeActive =
    novaSmartModeEnabled && !novaSmartFallbackActive && !quoteMode;
  const isNovaEmergencyModeActive = !quoteMode && novaSmartFallbackActive;

  const trackNovaLeadProgress = (leadData = novaLeadData, response = {}) => {
    const safeParams = getSafeNovaLeadMetaParams(leadData, response);
    const normalizedLeadStatus = normalizeMetaStatus(safeParams.lead_status);
    const normalizedNextAction = normalizeMetaStatus(safeParams.next_action);

    if (safeParams.lead_status) {
      trackMetaOnce(
        `classified:${normalizedLeadStatus}:${normalizedNextAction}`,
        "custom",
        "JG_NOVA_CLASSIFIED",
        {
          lead_status: safeParams.lead_status,
          next_action: safeParams.next_action,
          has_name: safeParams.has_name,
          has_phone: safeParams.has_phone,
          has_email: safeParams.has_email,
          has_service: safeParams.has_service,
          has_project_location: safeParams.has_project_location,
        },
        { sessionId: novaSessionId },
      );
    }

    if (hasCapturedNovaLead(leadData)) {
      trackMetaOnce("lead_captured_standard", "standard", "Lead", {
        lead_status: safeParams.lead_status,
        next_action: safeParams.next_action,
        service_category: safeParams.service_category,
        has_phone: safeParams.has_phone,
        has_email: safeParams.has_email,
      }, { sessionId: novaSessionId });
      trackMetaOnce("lead_captured_custom", "custom", "JG_NOVA_LEAD_CAPTURED", {
        lead_status: safeParams.lead_status,
        next_action: safeParams.next_action,
        service_category: safeParams.service_category,
        has_phone: safeParams.has_phone,
        has_email: safeParams.has_email,
      }, { sessionId: novaSessionId });
    }

    if (
      qualifiedNovaLeadStatuses.has(normalizedLeadStatus) ||
      qualifiedNovaLeadStatuses.has(normalizedNextAction)
    ) {
      trackMetaOnce("qualified_lead", "custom", "JG_NOVA_QUALIFIED_LEAD", {
        lead_status: safeParams.lead_status,
        next_action: safeParams.next_action,
      }, { sessionId: novaSessionId });
    }

    if (
      lowIntentNovaLeadStatuses.has(normalizedLeadStatus) ||
      lowIntentNovaLeadStatuses.has(normalizedNextAction)
    ) {
      trackMetaOnce(
        `low_intent:${normalizedLeadStatus}:${normalizedNextAction}`,
        "custom",
        "JG_NOVA_DISQUALIFIED_OR_LOW_INTENT",
        {
          lead_status: safeParams.lead_status,
          reason_code: normalizeMetaStatus(response.reasonCode || response.lowIntentReasonCode),
          next_action: safeParams.next_action,
        },
        { sessionId: novaSessionId },
      );
    }
  };

  const hasScheduledAppointmentForCurrentSession = () => {
    const storedScheduledCalls = readStorageJson("novaScheduledCalls", []);
    const hasStoredScheduledCall =
      Array.isArray(storedScheduledCalls) &&
      storedScheduledCalls.some((entry) => entry.sessionId === novaSessionId);

    return (
      hasStoredScheduledCall ||
      novaLeadData.appointment_scheduled === true ||
      novaLeadData.booking_confirmed === true ||
      novaLeadData.leadStatus === "SCHEDULED" ||
      novaLeadData.lead_status === "SCHEDULED"
    );
  };

  const trackNovaCompletedAndClosed = () => {
    if (!hasScheduledAppointmentForCurrentSession()) {
      return;
    }

    trackMetaOnce(
      "completed_and_closed",
      "custom",
      "JG_NOVA_COMPLETED_AND_CLOSED",
      {
        lead_status: novaLeadData.leadStatus || novaLeadData.lead_status || "SCHEDULED",
        next_action: novaLeadData.nextAction || novaLeadData.next_action || "END_CHAT_AFTER_BOOKING",
      },
      { sessionId: novaSessionId },
    );
  };

  const cancelNovaAutoClose = () => {
    novaAutoCloseTokenRef.current += 1;

    if (novaAutoCloseTimerRef.current) {
      window.clearTimeout(novaAutoCloseTimerRef.current);
      novaAutoCloseTimerRef.current = null;
    }
  };

  const cancelNovaRatingTimer = () => {
    if (novaRatingTimerRef.current) {
      window.clearTimeout(novaRatingTimerRef.current);
      novaRatingTimerRef.current = null;
    }
  };

  const isNovaSessionActive = (sessionId) => activeNovaSessionRef.current === sessionId;

  const isNovaGenerationCurrent = (sessionId, generation) =>
    isNovaSessionActive(sessionId) && novaRequestGenerationRef.current === generation;

  const isNovaRequestCurrent = (sessionId, generation) =>
    isNovaGenerationCurrent(sessionId, generation) &&
    !novaChatEndedRef.current;

  const releaseNovaSubmitLock = (generation) => {
    if (novaSubmitInFlightRef.current === generation) {
      novaSubmitInFlightRef.current = null;
    }
  };

  const hasActiveNovaWork = () =>
    novaSubmitInFlightRef.current !== null ||
    pendingNovaRequestsRef.current.size > 0 ||
    novaLoadingRef.current ||
    schedulingLoadingRef.current ||
    novaSchedulingOperationsRef.current.size > 0;

  const saveNovaConversationLanguage = (nextLanguage, sessionId = activeNovaSessionRef.current) => {
    const safeLanguage = nextLanguage === "es" ? "es" : "en";
    novaConversationLanguageRef.current = safeLanguage;
    setNovaConversationLanguage(safeLanguage);
    localStorage.setItem(
      NOVA_CONVERSATION_LANGUAGE_KEY,
      JSON.stringify({
        sessionId,
        language: safeLanguage,
        updatedAt: new Date().toISOString(),
      }),
    );
    return safeLanguage;
  };

  const markNovaChatEndedForSession = (sessionId, ended) => {
    localStorage.setItem(
      NOVA_CHAT_STATE_KEY,
      JSON.stringify({
        sessionId,
        ended: Boolean(ended),
        updatedAt: new Date().toISOString(),
      }),
    );
  };

  const cancelPendingNovaRequests = (reason = "INTENTIONAL_CANCEL") => {
    pendingNovaRequestsRef.current.forEach((entry) => {
      entry.cancelType = reason;

      if (entry.timeoutId) {
        window.clearTimeout(entry.timeoutId);
        entry.timeoutId = null;
      }

      entry.controller.abort();
    });
  };

  const fetchNovaJson = async (payload, { sessionId, requestType, generation }) => {
    const requestId = createNovaRequestId();
    const controller = new AbortController();
    const requestEntry = {
      controller,
      sessionId,
      requestType,
      cancelType: "",
      didTimeout: false,
      timeoutId: null,
    };

    requestEntry.timeoutId = window.setTimeout(() => {
      requestEntry.didTimeout = true;
      controller.abort();
    }, NOVA_REQUEST_TIMEOUT_MS);

    pendingNovaRequestsRef.current.set(requestId, requestEntry);

    try {
      const response = await fetch(NOVA_FAST_CHAT_ENGINE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!isNovaRequestCurrent(sessionId, generation)) {
        throw createNovaRequestError("STALE_SESSION", "NOVA response belongs to an inactive session.", {
          requestType,
        });
      }

      if (!response.ok) {
        throw createNovaRequestError("HTTP_ERROR", `NOVA request failed with ${response.status}`, {
          requestType,
          status: response.status,
        });
      }

      const responseText = await response.text();

      if (!isNovaRequestCurrent(sessionId, generation)) {
        throw createNovaRequestError("STALE_SESSION", "NOVA response belongs to an inactive session.", {
          requestType,
        });
      }

      if (!responseText.trim()) {
        throw createNovaRequestError("EMPTY_RESPONSE", "NOVA returned an empty response.", {
          requestType,
        });
      }

      try {
        const parsedResponse = JSON.parse(responseText);

        if (parsedResponse?.success === false) {
          throw createNovaRequestError("WORKFLOW_ERROR", "NOVA workflow returned success false.", {
            requestType,
          });
        }

        return parsedResponse;
      } catch (error) {
        if (error?.novaRequestErrorType) {
          throw error;
        }

        throw createNovaRequestError("INVALID_JSON", "NOVA returned invalid JSON.", {
          requestType,
          cause: error,
        });
      }
    } catch (error) {
      if (requestEntry.cancelType) {
        throw createNovaRequestError(requestEntry.cancelType, "NOVA request was intentionally cancelled.", {
          requestType,
        });
      }

      if (requestEntry.didTimeout) {
        throw createNovaRequestError("TIMEOUT", "NOVA request timed out.", { requestType });
      }

      if (!isNovaRequestCurrent(sessionId, generation)) {
        throw createNovaRequestError("STALE_SESSION", "NOVA request belongs to an inactive session.", {
          requestType,
        });
      }

      if (error?.novaRequestErrorType) {
        throw error;
      }

      if (error?.name === "AbortError") {
        throw createNovaRequestError("INTENTIONAL_CANCEL", "NOVA request was cancelled.", {
          requestType,
        });
      }

      throw createNovaRequestError("NETWORK_ERROR", "NOVA request failed before receiving a response.", {
        requestType,
        cause: error,
      });
    } finally {
      if (requestEntry.timeoutId) {
        window.clearTimeout(requestEntry.timeoutId);
      }

      pendingNovaRequestsRef.current.delete(requestId);
    }
  };

  const sendNovaEmergencyContact = async (payload, { sessionId, generation }) => {
    const requestType = "EMERGENCY_CONTACT";
    const requestId = createNovaRequestId();
    const controller = new AbortController();
    const requestEntry = {
      controller,
      sessionId,
      requestType,
      cancelType: "",
      didTimeout: false,
      timeoutId: null,
    };

    requestEntry.timeoutId = window.setTimeout(() => {
      requestEntry.didTimeout = true;
      controller.abort();
    }, NOVA_REQUEST_TIMEOUT_MS);

    pendingNovaRequestsRef.current.set(requestId, requestEntry);

    try {
      const response = await fetch(NOVA_EMERGENCY_CONTACT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!isNovaRequestCurrent(sessionId, generation)) {
        throw createNovaRequestError("STALE_SESSION", "Emergency contact belongs to an inactive session.", {
          requestType,
        });
      }

      if (!response.ok) {
        throw createNovaRequestError("HTTP_ERROR", `Emergency contact failed with ${response.status}`, {
          requestType,
          status: response.status,
        });
      }

      const responseText = await response.text();

      if (!responseText.trim()) {
        throw createNovaRequestError("EMPTY_RESPONSE", "Emergency contact returned an empty response.", {
          requestType,
        });
      }

      const emergencyResponse = JSON.parse(responseText);

      if (emergencyResponse?.success !== true) {
        throw createNovaRequestError("WORKFLOW_ERROR", "Emergency contact was not accepted.", {
          requestType,
        });
      }

      return emergencyResponse;
    } catch (error) {
      if (requestEntry.cancelType) {
        throw createNovaRequestError(requestEntry.cancelType, "Emergency contact was intentionally cancelled.", {
          requestType,
        });
      }

      if (requestEntry.didTimeout) {
        throw createNovaRequestError("TIMEOUT", "Emergency contact timed out.", { requestType });
      }

      if (!isNovaRequestCurrent(sessionId, generation)) {
        throw createNovaRequestError("STALE_SESSION", "Emergency contact belongs to an inactive session.", {
          requestType,
        });
      }

      if (error?.novaRequestErrorType) {
        throw error;
      }

      if (error instanceof SyntaxError) {
        throw createNovaRequestError("INVALID_JSON", "Emergency contact returned invalid JSON.", {
          requestType,
          cause: error,
        });
      }

      if (error?.name === "AbortError") {
        throw createNovaRequestError("INTENTIONAL_CANCEL", "Emergency contact was cancelled.", {
          requestType,
        });
      }

      throw createNovaRequestError("NETWORK_ERROR", "Emergency contact failed before receiving a response.", {
        requestType,
        cause: error,
      });
    } finally {
      if (requestEntry.timeoutId) {
        window.clearTimeout(requestEntry.timeoutId);
      }

      pendingNovaRequestsRef.current.delete(requestId);
    }
  };

  const scheduleNovaAutoClose = (delayMs = 10000) => {
    cancelNovaAutoClose();
    const sessionId = activeNovaSessionRef.current;
    const autoCloseToken = novaAutoCloseTokenRef.current + 1;
    novaAutoCloseTokenRef.current = autoCloseToken;

    novaAutoCloseTimerRef.current = window.setTimeout(() => {
      const canClose =
        isNovaSessionActive(sessionId) &&
        novaAutoCloseTokenRef.current === autoCloseToken &&
        !hasActiveNovaWork();

      if (canClose) {
        setChatOpen(false);
      }

      novaAutoCloseTimerRef.current = null;
    }, delayMs);
  };

  useEffect(() => {
    activeNovaSessionRef.current = novaSessionId;
  }, [novaSessionId]);

  useEffect(() => {
    novaChatEndedRef.current = novaChatEnded;
  }, [novaChatEnded]);

  useEffect(() => {
    novaLoadingRef.current = novaLoading;
  }, [novaLoading]);

  useEffect(() => {
    schedulingLoadingRef.current = schedulingLoading;
  }, [schedulingLoading]);

  useEffect(() => {
    novaConversationLanguageRef.current = novaConversationLanguage;
  }, [novaConversationLanguage]);

  useEffect(
    () => () => {
      cancelNovaAutoClose();
      cancelNovaRatingTimer();
      cancelPendingNovaRequests("INTENTIONAL_CANCEL");
    },
    [],
  );

  const toggleLanguage = () => {
    const nextLanguage = language === "en" ? "es" : "en";
    setLanguage(nextLanguage);
    localStorage.setItem("preferredLanguage", nextLanguage);
  };

  const toggleNovaSize = (sizeMode) => {
    setNovaSizeMode(novaSizeMode === sizeMode ? "normal" : sizeMode);
  };

  const getNovaMessageContent = (message) => {
    if (message.translationKey) {
      return t(message.translationKey);
    }

    const matchingKey = localNovaMessageKeys.find(
      (key) => message.content === translations.en[key] || message.content === translations.es[key],
    );

    return matchingKey ? t(matchingKey) : message.content;
  };

  const saveConversationHistory = (nextHistory) => {
    setConversationHistory(nextHistory);
    localStorage.setItem(NOVA_HISTORY_KEY, JSON.stringify(nextHistory));
  };

  const saveNovaMessages = (nextMessages) => {
    const persistentMessages = nextMessages.filter(
      (message) => !isNovaEndedNoticeMessage(message),
    );

    setNovaMessages(persistentMessages);
    localStorage.setItem(NOVA_MESSAGES_KEY, JSON.stringify(persistentMessages));
  };

  const updateNovaLeadData = (patch) => {
    const nextLeadData = { ...novaLeadData, ...patch };
    setNovaLeadData(nextLeadData);
    localStorage.setItem(NOVA_LEAD_DATA_KEY, JSON.stringify(nextLeadData));
    return nextLeadData;
  };

  const replaceNovaLeadData = (nextLeadData) => {
    const cleanLeadData = { ...nextLeadData };
    setNovaLeadData(cleanLeadData);
    localStorage.setItem(NOVA_LEAD_DATA_KEY, JSON.stringify(cleanLeadData));
    return cleanLeadData;
  };

  const resetNovaSmartSession = () => {
    cancelPendingNovaRequests("INTENTIONAL_CANCEL");
    cancelNovaAutoClose();
    cancelNovaRatingTimer();
    const nextSessionId = createNewNovaSessionId();

    activeNovaSessionRef.current = nextSessionId;
    novaChatEndedRef.current = false;
    novaRequestGenerationRef.current += 1;
    novaSubmitInFlightRef.current = null;
    novaEmergencySubmitRef.current = null;
    novaSchedulingOperationsRef.current.clear();
    markNovaChatEndedForSession(nextSessionId, false);
    saveNovaConversationLanguage(currentLanguage, nextSessionId);
    setNovaSessionId(nextSessionId);
    saveConversationHistory([]);
    saveNovaMessages([]);
    replaceNovaLeadData(emptyNovaLeadData);
    setLeadForm({
      name: "",
      phone: "",
      email: "",
      projectLocation: "",
      message: "",
    });
    setNovaInput("");
    novaLoadingRef.current = false;
    setNovaLoading(false);
    setNovaChatEnded(false);
    setNovaSmartFallbackActive(false);
    setLeadError("");
    setLeadSubmitted(false);
    setSubmittedLead(null);
    setEmergencySubmitting(false);
    setLastNovaResponse(null);
    setLastUserSmartMessage("");
    setSchedulingSlots([]);
    schedulingLoadingRef.current = false;
    setSchedulingLoading(false);
    setRatingPromptActive(false);
    setRatingThanksVisible(false);
    setRatingSubmitted(false);
    return nextSessionId;
  };

  const openNovaWidget = () => {
    trackMetaOnce("chat_open", "custom", "JG_NOVA_CHAT_OPEN", {}, { sessionId: novaSessionId });
    setChatOpen(true);
  };

  const closeNovaWidget = () => {
    trackNovaCompletedAndClosed();
    setChatOpen(false);
  };

  const startNewNovaChat = () => {
    cancelNovaAutoClose();
    resetNovaSmartSession();
  };

  const endNovaChat = () => {
    novaChatEndedRef.current = true;
    novaRequestGenerationRef.current += 1;
    novaSubmitInFlightRef.current = null;
    novaEmergencySubmitRef.current = null;
    novaSchedulingOperationsRef.current.clear();
    cancelPendingNovaRequests("INTENTIONAL_CANCEL");
    cancelNovaAutoClose();
    cancelNovaRatingTimer();
    trackNovaCompletedAndClosed();
    setRatingPromptActive(false);
    setNovaInput("");
    novaLoadingRef.current = false;
    setNovaLoading(false);
    schedulingLoadingRef.current = false;
    setSchedulingLoading(false);
    setEmergencySubmitting(false);
    setNovaChatEnded(true);
    setSchedulingSlots([]);
    setLeadError("");
    markNovaChatEndedForSession(activeNovaSessionRef.current, true);
  };

  const completeNovaChatAfterRating = (rating) => {
    const endedChats = readStorageJson(NOVA_ENDED_CHATS_KEY, []);
    const ratings = readStorageJson(NOVA_CHAT_RATINGS_KEY, []);

    if (ratingSubmitted || ratings.some((entry) => entry.sessionId === novaSessionId)) {
      return;
    }

    const ratedAt = new Date().toISOString();
    const endedRecord = {
      sessionId: novaSessionId,
      leadData: novaLeadData,
      conversationHistory,
      endedAt: ratedAt,
      status: "ENDED",
    };

    localStorage.setItem(NOVA_ENDED_CHATS_KEY, JSON.stringify([...endedChats, endedRecord]));
    localStorage.setItem(
      NOVA_CHAT_RATINGS_KEY,
      JSON.stringify([
        ...ratings,
        {
          sessionId: novaSessionId,
          rating,
          language: currentLanguage,
          createdAt: ratedAt,
        },
      ]),
    );
    trackNovaCompletedAndClosed();
    setRatingSubmitted(true);
    setRatingPromptActive(false);
    setRatingThanksVisible(true);
    saveNovaMessages([
      ...novaMessages,
      {
        role: "assistant",
        content: t("ratingThanks"),
        translationKey: "ratingThanks",
        createdAt: new Date().toISOString(),
      },
    ]);

    const ratingSessionId = activeNovaSessionRef.current;
    cancelNovaRatingTimer();
    novaRatingTimerRef.current = window.setTimeout(() => {
      if (!isNovaSessionActive(ratingSessionId)) {
        return;
      }

      setNovaInput("");
      setNovaChatEnded(true);
      novaLoadingRef.current = false;
      setNovaLoading(false);
      setNovaSmartFallbackActive(false);
      setLeadError("");
      setLastNovaResponse(null);
      setLastUserSmartMessage("");
      setSchedulingSlots([]);
      schedulingLoadingRef.current = false;
      setSchedulingLoading(false);
      setRatingThanksVisible(false);
      setChatOpen(false);
      markNovaChatEndedForSession(ratingSessionId, true);
      novaRatingTimerRef.current = null;
    }, 1000);
  };

  const getLeadDataFromConversationHistory = (history, baseLeadData = {}) =>
    history.reduce((currentLeadData, message) => {
      const metadata = message.metadata || {};
      const metadataLeadData = normalizeNovaLeadDataFields(metadata.leadData || {});
      const nextLeadData = {
        ...currentLeadData,
        ...metadataLeadData,
        ...(metadata.detectedService ? { service: metadata.detectedService } : {}),
        ...(metadata.leadStatus ? { leadStatus: metadata.leadStatus } : {}),
        ...(metadata.nextAction ? { nextAction: metadata.nextAction } : {}),
      };

      return message.role === "user"
        ? normalizeUserMessageForLeadData(message.content || "", nextLeadData)
        : nextLeadData;
    }, baseLeadData);

  const getSchedulingLeadData = (
    leadData = novaLeadData,
    schedulingConversationHistory = conversationHistory,
  ) => {
    const projectLocation = leadData.projectLocation || leadData.project_location || "";
    const projectDescription =
      leadData.projectDescription || leadData.project_description || "";
    const leadStatus = leadData.leadStatus || leadData.lead_status || "";
    const nextAction = leadData.nextAction || leadData.next_action || "";

    return {
      name: leadData.name || "",
      phone: leadData.phone || "",
      email: leadData.email || "",
      projectLocation,
      project_location: projectLocation,
      clientType: leadData.clientType || leadData.client_type || "",
      service: leadData.service || "",
      projectDescription,
      project_description: projectDescription,
      desiredStartDate: leadData.desiredStartDate || leadData.desired_start_date || "",
      lead_status: leadStatus,
      next_action: nextAction,
      conversationHistory: schedulingConversationHistory,
    };
  };

  const formatSlotLabel = (slot) => {
    const start = new Date(slot.start);

    if (Number.isNaN(start.getTime())) {
      return slot.label || slot.start || "";
    }

    return start.toLocaleString(currentLanguage === "es" ? "es-US" : "en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatSlotTimeLabel = (slot) => {
    const start = new Date(slot.start);

    if (Number.isNaN(start.getTime())) {
      return slot.label || slot.start || "";
    }

    return start.toLocaleTimeString(currentLanguage === "es" ? "es-US" : "en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const sendToNovaScheduling = async ({
    schedulingMode,
    selectedSlot,
    leadData,
    conversationHistory: schedulingConversationHistory = conversationHistory,
    requestGeneration = novaRequestGenerationRef.current,
  }) => {
    const { dateFrom, dateTo } = getSchedulingWindow();
    const currentSessionId =
      activeNovaSessionRef.current ||
      novaSessionId ||
      getCurrentNovaSessionId() ||
      createNovaSessionId();
    const payloadConversationHistory = schedulingConversationHistory;
    const requestLanguage = resolveNovaRequestLanguage({
      message: payloadConversationHistory.at(-1)?.content || "",
      conversationHistory: payloadConversationHistory,
      fallbackLanguage: currentLanguage,
    });
    return fetchNovaJson(
      {
        clientId: NOVA_CLIENT_ID,
        client_id: NOVA_CLIENT_ID,
        sessionId: currentSessionId,
        session_id: currentSessionId,
        language: requestLanguage,
        requestType: "SCHEDULING_REQUEST",
        schedulingMode,
        dateFrom,
        dateTo,
        selectedSlot: selectedSlot
          ? {
              start: selectedSlot.start,
              end: selectedSlot.end,
            }
          : undefined,
        source: "NOVA_CHAT_SCHEDULING",
        pageUrl: window.location.href,
        userAgent: navigator.userAgent,
        leadData: getSchedulingLeadData(leadData, schedulingConversationHistory),
        conversationHistory: payloadConversationHistory,
        conversation_history: payloadConversationHistory,
      },
      { sessionId: currentSessionId, requestType: "SCHEDULING_REQUEST", generation: requestGeneration },
    );
  };

  const requestSchedulingSlots = async (leadData, baseMessages = novaMessages, baseHistory = conversationHistory) => {
    const requestSessionId = activeNovaSessionRef.current;
    const requestGeneration = novaRequestGenerationRef.current;
    const schedulingOperationId = createNovaRequestId();

    try {
      novaSchedulingOperationsRef.current.add(schedulingOperationId);
      schedulingLoadingRef.current = true;
      setSchedulingLoading(true);

      try {
        trackMetaOnce(
          "scheduling_started",
          "custom",
          "JG_NOVA_SCHEDULING_STARTED",
          {
            lead_status: leadData.leadStatus || leadData.lead_status || "",
            next_action: "SCHEDULE_CALL",
            scheduling_mode: "GET_SLOTS",
          },
          { sessionId: novaSessionId },
        );
      } catch (trackingError) {
        console.warn("NOVA scheduling tracking failed before slots request.", trackingError);
      }

      const schedulingResponse = await sendToNovaScheduling({
        schedulingMode: "GET_SLOTS",
        leadData,
        conversationHistory: baseHistory,
        requestGeneration,
      });

      if (!isNovaRequestCurrent(requestSessionId, requestGeneration)) {
        return;
      }

      const slots = getBookingOptions(schedulingResponse).slice(0, 6);
      const normalizedSchedulingReply = removePrematureClosingText(
        normalizeNovaIdentityText(schedulingResponse.reply),
      );
      const schedulingReply = slots.length
        ? t("bookingOptionsCleanReply")
        : removeBookingTimesFromReply(normalizedSchedulingReply);
      const schedulingMessage = {
        role: "assistant",
        content: schedulingReply || t("chooseSchedulingSlot"),
        createdAt: new Date().toISOString(),
        metadata: {
          uiAction: schedulingResponse.uiAction || (slots.length ? "SHOW_BOOKING_OPTIONS" : ""),
          bookingOptionsKey: getBookingOptionsKey(slots),
        },
      };
      const nextHistory = appendAssistantMessageIfUnique(baseHistory, schedulingMessage);
      const nextMessages = appendAssistantMessageIfUnique(baseMessages, schedulingMessage);

      setSchedulingSlots(slots);
      saveConversationHistory(nextHistory);
      saveNovaMessages(nextMessages);
    } catch (error) {
      if (isIntentionalNovaCancel(error) || !isNovaRequestCurrent(requestSessionId, requestGeneration)) {
        return;
      }

      setSchedulingSlots([]);
      setNovaSmartFallbackActive(true);
      const schedulingErrorMessage = {
        role: "assistant",
        content: t("schedulingUnavailable"),
        translationKey: "schedulingUnavailable",
        createdAt: new Date().toISOString(),
      };
      saveNovaMessages([...baseMessages, schedulingErrorMessage]);
    } finally {
      novaSchedulingOperationsRef.current.delete(schedulingOperationId);
      const hasSchedulingOperations = novaSchedulingOperationsRef.current.size > 0;
      schedulingLoadingRef.current = hasSchedulingOperations;

      if (isNovaGenerationCurrent(requestSessionId, requestGeneration)) {
        setSchedulingLoading(hasSchedulingOperations);
      }
    }
  };

  const bookSchedulingSlot = async (slot) => {
    const requestSessionId = activeNovaSessionRef.current;
    const requestGeneration = novaRequestGenerationRef.current;
    const schedulingOperationId = createNovaRequestId();
    let messagesWithSelection = novaMessages;

    try {
      novaSchedulingOperationsRef.current.add(schedulingOperationId);
      cancelNovaAutoClose();
      const selectedTime = formatSlotTimeLabel(slot);
      const selectedDate = new Date(slot.start);
      const selectedDay = Number.isNaN(selectedDate.getTime())
        ? ""
        : selectedDate.toISOString().slice(0, 10);
      const selectionMessage = {
        role: "user",
        content: formatNovaMessage("bookingSelection", { time: selectedTime }),
        createdAt: new Date().toISOString(),
      };
      messagesWithSelection = [...novaMessages, selectionMessage];
      const historyWithSelection = [...conversationHistory, selectionMessage];

      setSchedulingSlots([]);
      saveNovaMessages(messagesWithSelection);
      saveConversationHistory(historyWithSelection);
      schedulingLoadingRef.current = true;
      setSchedulingLoading(true);

      try {
        trackMetaOnce(
          `slot_selected:${slot.start || slot.label || selectedTime}`,
          "custom",
          "JG_NOVA_SLOT_SELECTED",
          {
            scheduling_mode: "BOOK_SLOT",
            selected_day: selectedDay,
            selected_time_window: selectedTime,
          },
          { sessionId: novaSessionId },
        );
      } catch (trackingError) {
        console.warn("NOVA slot selection tracking failed before booking request.", trackingError);
      }

      const storedLeadData = readStorageJson(NOVA_LEAD_DATA_KEY, {});
      const latestLeadData = getLeadDataFromConversationHistory(historyWithSelection, {
        ...novaLeadData,
        ...normalizeNovaLeadDataFields(storedLeadData),
      });
      const schedulingResponse = await sendToNovaScheduling({
        schedulingMode: "BOOK_SLOT",
        selectedSlot: slot,
        leadData: latestLeadData,
        conversationHistory: historyWithSelection,
        requestGeneration,
      });

      if (!isNovaRequestCurrent(requestSessionId, requestGeneration)) {
        return;
      }

      const normalizedSchedulingResponseReply = normalizeText(schedulingResponse.reply || "");
      const isAppointmentScheduled =
        schedulingResponse.mode === "APPOINTMENT_SCHEDULED" ||
        schedulingResponse.leadStatus === "SCHEDULED" ||
        schedulingResponse.lead_status === "SCHEDULED" ||
        schedulingResponse.nextAction === "END_CHAT_AFTER_BOOKING" ||
        schedulingResponse.next_action === "END_CHAT_AFTER_BOOKING" ||
        normalizedSchedulingResponseReply.includes("your call has been scheduled") ||
        normalizedSchedulingResponseReply.includes("tu llamada ha sido agendada");
      const slots = getBookingOptions(schedulingResponse).slice(0, 6);
      const hasReplacementOptions =
        schedulingResponse.mode === "SLOT_UNAVAILABLE" && slots.length > 0;
      const bookingMessage = {
        role: "assistant",
        content:
          isAppointmentScheduled
            ? t("schedulingSuccess")
            : hasReplacementOptions
              ? t("bookingOptionsCleanReply")
              : removeBookingTimesFromReply(normalizeNovaIdentityText(schedulingResponse.reply)) ||
                t("anythingElse"),
        translationKey:
          isAppointmentScheduled
            ? "schedulingSuccess"
            : "",
        createdAt: new Date().toISOString(),
        metadata: {
          uiAction:
            schedulingResponse.uiAction ||
            (hasReplacementOptions ? "SHOW_BOOKING_OPTIONS" : ""),
          bookingOptionsKey: getBookingOptionsKey(slots),
        },
      };
      const storedBookings = readStorageJson("novaScheduledCalls", []);

      if (isAppointmentScheduled) {
        const hasAppointmentConfirmation = hasAppointmentConfirmedSignal(schedulingResponse);

        localStorage.setItem(
          "novaScheduledCalls",
          JSON.stringify([
            ...storedBookings,
            {
              sessionId: novaSessionId,
              selectedSlot: slot,
              response: schedulingResponse,
              createdAt: new Date().toISOString(),
            },
          ]),
        );
        updateNovaLeadData({
          ...latestLeadData,
          leadStatus: "SCHEDULED",
          lead_status: "SCHEDULED",
          nextAction: "END_CHAT_AFTER_BOOKING",
          next_action: "END_CHAT_AFTER_BOOKING",
          appointment_scheduled: true,
          booking_confirmed: true,
          needsScheduling: false,
          selectedSlot: {
            start: slot.start,
            end: slot.end,
          },
          scheduledAppointment: {
            start: slot.start,
            end: slot.end,
            response: schedulingResponse,
          },
        });
        if (hasAppointmentConfirmation) {
          try {
            trackMetaOnce("call_scheduled_standard", "standard", "Schedule", {
              lead_status: "SCHEDULED",
              service_category: getSafeServiceCategory(latestLeadData.service),
              scheduling_mode: "BOOK_SLOT",
              appointment_confirmed: true,
            }, { sessionId: novaSessionId });
            trackMetaOnce("call_scheduled_custom", "custom", "JG_NOVA_CALL_SCHEDULED", {
              lead_status: "SCHEDULED",
              service_category: getSafeServiceCategory(latestLeadData.service),
              scheduling_mode: "BOOK_SLOT",
              appointment_confirmed: true,
            }, { sessionId: novaSessionId });
          } catch (trackingError) {
            console.warn("NOVA scheduled call tracking failed after booking.", trackingError);
          }
        }

        if (hasOwnerNotificationSignal(schedulingResponse)) {
          try {
            trackMetaOnce("owner_notified", "custom", "JG_NOVA_OWNER_NOTIFIED", {
              lead_status: "SCHEDULED",
              service_category: getSafeServiceCategory(latestLeadData.service),
              scheduling_mode: "BOOK_SLOT",
            }, { sessionId: novaSessionId });
          } catch (trackingError) {
            console.warn("NOVA owner notification tracking failed after booking.", trackingError);
          }
        }
        // TODO: If backend does not expose notification_sent/owner_notified/email_sent,
        // keep this event off until that safe boolean is returned.
      }

      setSchedulingSlots(schedulingResponse.mode === "SLOT_UNAVAILABLE" ? slots : []);
      saveConversationHistory(
        appendAssistantMessageIfUnique(historyWithSelection, bookingMessage),
      );
      saveNovaMessages(
        appendAssistantMessageIfUnique(messagesWithSelection, bookingMessage),
      );
      if (isDefinitiveNovaClose(schedulingResponse)) {
        setNovaChatEnded(true);
        markNovaChatEndedForSession(requestSessionId, true);
        setRatingPromptActive(schedulingResponse.showRating === true);
        setSchedulingSlots([]);
        novaLoadingRef.current = false;
        setNovaLoading(false);
        schedulingLoadingRef.current = false;
        setSchedulingLoading(false);
        scheduleNovaAutoClose(getNovaAutoCloseDelayMs(schedulingResponse));
      }
    } catch (error) {
      if (isIntentionalNovaCancel(error) || !isNovaRequestCurrent(requestSessionId, requestGeneration)) {
        return;
      }

      setNovaSmartFallbackActive(true);
      const errorMessage = {
        role: "assistant",
        content: t("schedulingUnavailable"),
        translationKey: "schedulingUnavailable",
        createdAt: new Date().toISOString(),
      };
      saveNovaMessages(
        appendAssistantMessageIfUnique(messagesWithSelection, errorMessage),
      );
    } finally {
      novaSchedulingOperationsRef.current.delete(schedulingOperationId);
      const hasSchedulingOperations = novaSchedulingOperationsRef.current.size > 0;
      schedulingLoadingRef.current = hasSchedulingOperations;

      if (isNovaGenerationCurrent(requestSessionId, requestGeneration)) {
        setSchedulingLoading(hasSchedulingOperations);
      }
    }
  };

  const sendToNovaAgent = async (message) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || novaLoading || novaChatEnded || novaChatEndedRef.current) {
      return;
    }

    if (novaSubmitInFlightRef.current !== null) {
      return;
    }

    const requestGeneration = novaRequestGenerationRef.current;
    novaSubmitInFlightRef.current = requestGeneration;
    let currentSessionId = activeNovaSessionRef.current || novaSessionId || "";
    let nextMessagesForError = null;
    let requestLanguage;

    try {
      currentSessionId = currentSessionId || getCurrentNovaSessionId() || createNovaSessionId();
      cancelNovaAutoClose();
      requestLanguage = resolveNovaRequestLanguage({
        message: trimmedMessage,
        conversationHistory,
        fallbackLanguage: currentLanguage,
      });
      saveNovaConversationLanguage(requestLanguage, currentSessionId);

      try {
        trackMetaOnce("first_message_standard", "standard", "Contact", {}, { sessionId: novaSessionId });
        trackMetaOnce("first_message_custom", "custom", "JG_NOVA_FIRST_MESSAGE", {}, { sessionId: novaSessionId });
      } catch (trackingError) {
        console.warn("NOVA tracking failed before message request.", trackingError);
      }

      const storedLeadData = readStorageJson(NOVA_LEAD_DATA_KEY, {});
      const baseLeadDataForRequest = {
        ...novaLeadData,
        ...normalizeNovaLeadDataFields(storedLeadData),
      };
      const leadDataForRequest = {
        ...baseLeadDataForRequest,
        ...normalizeUserMessageForLeadData(trimmedMessage, baseLeadDataForRequest),
      };
      updateNovaLeadData(leadDataForRequest);

      try {
        trackNovaLeadProgress(leadDataForRequest);
      } catch (trackingError) {
        console.warn("NOVA lead tracking failed before message request.", trackingError);
      }

      const userMessage = {
        role: "user",
        content: trimmedMessage,
        createdAt: new Date().toISOString(),
      };
      const payloadConversationHistory = conversationHistory;
      const historyWithUserMessage = [...payloadConversationHistory, userMessage];
      const nextMessages = [...novaMessages, userMessage];
      nextMessagesForError = nextMessages;
      const waitingForContactPreference =
        lastNovaResponse?.nextAction === "ASK_CONTACT_PREFERENCE" &&
        lastNovaResponse?.conversationComplete === false;
      const shouldResolveRepeatedLocationLocally =
        leadDataForRequest.projectLocation === "Jackson, Wyoming" &&
        normalizeText(trimmedMessage) === normalizeText(lastUserSmartMessage) &&
        (lastNovaResponse?.nextAction === "ASK_LOCATION" ||
          lastNovaResponse?.missingFields?.includes("projectLocation"));

      saveNovaMessages(nextMessages);
      saveConversationHistory(historyWithUserMessage);
      setSchedulingSlots([]);
      setNovaInput("");
      setLastUserSmartMessage(trimmedMessage);

      if (waitingForContactPreference && isUrgentContactPreference(trimmedMessage)) {
        const urgentConfirmation = {
          role: "assistant",
          content: `${formatNovaMessage("urgentContactConfirmed", {
            name: leadDataForRequest.name,
          })} ${t("anythingElse")}`,
          createdAt: new Date().toISOString(),
        };
        const nextHistory = [...historyWithUserMessage, urgentConfirmation];

        setLastNovaResponse({
          nextAction: "ASK_ANYTHING_ELSE",
          conversationComplete: false,
          contactPreference: "AS_SOON_AS_POSSIBLE",
        });
        saveConversationHistory(nextHistory);
        saveNovaMessages([...nextMessages, urgentConfirmation]);
        releaseNovaSubmitLock(requestGeneration);
        return;
      }

      if (waitingForContactPreference && isSchedulingPreference(trimmedMessage)) {
        const nextHistory = historyWithUserMessage;

        setLastNovaResponse({
          nextAction: "SCHEDULE_CALL",
          conversationComplete: false,
          needsScheduling: true,
        });
        saveConversationHistory(nextHistory);
        requestSchedulingSlots(leadDataForRequest, nextMessages, nextHistory);
        releaseNovaSubmitLock(requestGeneration);
        return;
      }

      if (shouldResolveRepeatedLocationLocally) {
        const localAssistantMessage = {
          role: "assistant",
          content: t("normalizedLocationPrompt"),
          translationKey: "normalizedLocationPrompt",
          createdAt: new Date().toISOString(),
        };
        const nextHistory = [...historyWithUserMessage, localAssistantMessage];

        saveConversationHistory(nextHistory);
        saveNovaMessages([...nextMessages, localAssistantMessage]);
        releaseNovaSubmitLock(requestGeneration);
        return;
      }

      novaLoadingRef.current = true;
      setNovaLoading(true);
      console.log("NOVA mode:", novaSmartModeEnabled ? "SMART" : "BASIC");
      console.log("NOVA engine URL:", NOVA_FAST_CHAT_ENGINE_URL);

      const novaResponse = await fetchNovaJson(
        {
          message: trimmedMessage,
          language: requestLanguage,
          sessionId: currentSessionId,
          session_id: currentSessionId,
          clientId: NOVA_CLIENT_ID,
          client_id: NOVA_CLIENT_ID,
          requestType: "NORMAL_CHAT",
          leadData: leadDataForRequest,
          conversationHistory: payloadConversationHistory,
          conversation_history: payloadConversationHistory,
        },
        { sessionId: currentSessionId, requestType: "NORMAL_CHAT", generation: requestGeneration },
      );

      if (!isNovaRequestCurrent(currentSessionId, requestGeneration)) {
        return;
      }

      const responseLeadData = novaResponse.leadData
        ? normalizeNovaLeadDataFields(novaResponse.leadData)
        : {};
      const latestLeadDataForRequest = {
        ...leadDataForRequest,
        ...responseLeadData,
      };

      if (novaResponse.leadData) {
        updateNovaLeadData(latestLeadDataForRequest);
      }
      const waitingForPreference =
        hasCompleteContactDetails(latestLeadDataForRequest) &&
        responseRequestsContactPreference(novaResponse);
      const normalizedResponse = waitingForPreference
        ? {
            ...novaResponse,
            nextAction: "ASK_CONTACT_PREFERENCE",
            conversationComplete: false,
            needsScheduling: false,
          }
        : novaResponse;
      const latestTrackedLeadData = {
        ...latestLeadDataForRequest,
        leadStatus: getMetaLeadStatus(latestLeadDataForRequest, normalizedResponse),
        lead_status: getMetaLeadStatus(latestLeadDataForRequest, normalizedResponse),
        nextAction: getMetaNextAction(latestLeadDataForRequest, normalizedResponse),
        next_action: getMetaNextAction(latestLeadDataForRequest, normalizedResponse),
      };
      try {
        trackNovaLeadProgress(latestTrackedLeadData, normalizedResponse);
      } catch (trackingError) {
        console.warn("NOVA lead tracking failed after message response.", trackingError);
      }
      const responseBookingOptions = getBookingOptions(novaResponse).slice(0, 6);
      const hasBookingOptions =
        responseBookingOptions.length > 0 ||
        normalizedResponse.uiAction === "SHOW_BOOKING_OPTIONS";
      const isSchedulingResponse =
        hasBookingOptions ||
        normalizedResponse.needsScheduling ||
        normalizedResponse.nextAction === "SCHEDULE_CALL";
      if (isSchedulingResponse) {
        try {
          trackMetaOnce(
            "scheduling_started",
            "custom",
            "JG_NOVA_SCHEDULING_STARTED",
            {
              lead_status: latestTrackedLeadData.leadStatus || latestTrackedLeadData.lead_status || "",
              next_action: normalizedResponse.nextAction || "",
              scheduling_mode: hasBookingOptions ? "SHOW_BOOKING_OPTIONS" : "GET_SLOTS",
            },
            { sessionId: novaSessionId },
          );
        } catch (trackingError) {
          console.warn("NOVA scheduling tracking failed after message response.", trackingError);
        }
      }
      const existingRatings = readStorageJson(NOVA_CHAT_RATINGS_KEY, []);
      const hasExistingRating = existingRatings.some(
        (entry) => entry.sessionId === novaSessionId,
      );
      const responseIsDefinitiveClose = isDefinitiveNovaClose(normalizedResponse);

      const shouldShowRating =
        responseIsDefinitiveClose &&
        (normalizedResponse.showRating === true ||
          normalizedResponse.uiAction === "SHOW_RATING_AND_AUTOCLOSE") &&
        !hasExistingRating;
      const reply = waitingForPreference
        ? formatNovaMessage("contactPreferencePrompt", { name: latestLeadDataForRequest.name })
        : responseBookingOptions.length > 0
          ? t("bookingOptionsCleanReply")
          : normalizeNovaIdentityText(novaResponse.reply || novaResponse.ratingPrompt) ||
            t("novaFallback");
      setLastNovaResponse(normalizedResponse);
      const assistantMessage = {
        role: "assistant",
        content: reply,
        createdAt: new Date().toISOString(),
        metadata: {
          detectedService: novaResponse.detectedService || "",
          serviceFit: novaResponse.serviceFit ?? null,
          leadStatus: novaResponse.leadStatus || "",
          nextAction: normalizedResponse.nextAction || "",
          missingFields: novaResponse.missingFields || [],
          uiAction: normalizedResponse.uiAction || (hasBookingOptions ? "SHOW_BOOKING_OPTIONS" : ""),
          bookingOptionsKey: getBookingOptionsKey(responseBookingOptions),
        },
      };
      const nextHistory = appendAssistantMessageIfUnique(
        historyWithUserMessage,
        assistantMessage,
      );
      const nextVisibleMessages = appendAssistantMessageIfUnique(
        nextMessages,
        assistantMessage,
      );
      const shouldEndChat = responseIsDefinitiveClose;
      const shouldAutoCloseChat = responseIsDefinitiveClose;

      saveConversationHistory(nextHistory);
      saveNovaMessages(nextVisibleMessages);
      setSchedulingSlots(responseBookingOptions);

      if (shouldAutoCloseChat) {
        scheduleNovaAutoClose(getNovaAutoCloseDelayMs(normalizedResponse));
      }

      if (
        !waitingForPreference &&
        responseBookingOptions.length === 0 &&
        (normalizedResponse.needsScheduling || normalizedResponse.nextAction === "SCHEDULE_CALL")
      ) {
        requestSchedulingSlots(latestLeadDataForRequest, nextVisibleMessages, nextHistory);
      }

      if (shouldShowRating) {
        setNovaChatEnded(true);
        markNovaChatEndedForSession(currentSessionId, true);
        setRatingPromptActive(true);
        setSchedulingSlots([]);
      } else if (shouldEndChat) {
        setNovaChatEnded(true);
        markNovaChatEndedForSession(currentSessionId, true);
        setRatingPromptActive(false);
        setSchedulingSlots([]);
      }
    } catch (error) {
      if (
        isIntentionalNovaCancel(error) ||
        (currentSessionId && !isNovaRequestCurrent(currentSessionId, requestGeneration))
      ) {
        return;
      }

      const temporaryErrorMessage = {
        role: "assistant",
        content: t("novaTemporaryError"),
        translationKey: "novaTemporaryError",
        createdAt: new Date().toISOString(),
        metadata: {
          frontendOnly: true,
          errorType: error?.novaRequestErrorType || "UNKNOWN_ERROR",
        },
      };

      setNovaSmartFallbackActive(true);
      if (nextMessagesForError) {
        try {
          saveNovaMessages([...nextMessagesForError, temporaryErrorMessage]);
        } catch (saveError) {
          console.warn("NOVA temporary error message could not be persisted.", saveError);
        }
      }
      setLeadError("");
    } finally {
      const isCurrentSubmit = currentSessionId
        ? isNovaGenerationCurrent(currentSessionId, requestGeneration)
        : novaRequestGenerationRef.current === requestGeneration;

      if (isCurrentSubmit) {
        novaLoadingRef.current = false;
        setNovaLoading(false);
        releaseNovaSubmitLock(requestGeneration);
      }
    }
  };

  const handleNovaChatSubmit = (event) => {
    event.preventDefault();
    sendToNovaAgent(novaInput);
  };

  const updateLeadForm = (field, value) => {
    setLeadForm({ ...leadForm, [field]: value });
    const novaField = field === "message" ? "projectDescription" : field;
    updateNovaLeadData({ [novaField]: value });
    setLeadError("");
  };

  const updateQuoteForm = (field, value) => {
    setQuoteForm({ ...quoteForm, [field]: value });
    const novaFieldMap = {
      serviceNeeded: "service",
      projectDescription: "projectDescription",
      name: "name",
      phone: "phone",
      email: "email",
      projectLocation: "projectLocation",
      desiredStartDate: "desiredStartDate",
      isPreviousClient: "isPreviousClient",
      previousClientReference: "previousClientReference",
    };
    const novaField = novaFieldMap[field];

    if (novaField) {
      updateNovaLeadData({
        [novaField]: field === "isPreviousClient" ? value === "Yes" : value,
      });
    }

    setLeadError("");
  };

  const openQuoteRequest = () => {
    setQuoteMode(true);
    setChatOpen(true);
    setLeadError("");
    setLeadSubmitted(false);
    setSubmittedLead(null);
  };

  const resetNova = () => {
    setLeadForm({
      name: "",
      phone: "",
      email: "",
      projectLocation: "",
      message: "",
    });
    setLeadError("");
    setLeadSubmitted(false);
    setSubmittedLead(null);
    setEmergencySubmitting(false);
    novaEmergencySubmitRef.current = null;
    setQuoteMode(false);
    setQuoteForm({
      name: "",
      phone: "",
      email: "",
      projectLocation: "",
      serviceNeeded: "",
      projectDescription: "",
      desiredStartDate: "",
      isPreviousClient: "No",
      previousClientReference: "",
      callPreference: "Morning",
    });
  };

  const handleLeadSubmit = async () => {
    if (emergencySubmitting || leadSubmitted || novaEmergencySubmitRef.current !== null) {
      return;
    }

    const emergencyLanguage = getEffectiveNovaLanguage();
    const emailValue = leadForm.email.trim();

    if (!leadForm.name.trim()) {
      setLeadError(novaFormT("nameError"));
      setLeadSubmitted(false);
      emergencyNameRef.current?.focus();
      return;
    }

    if (!leadForm.phone.trim()) {
      setLeadError(novaFormT("phoneError"));
      setLeadSubmitted(false);
      emergencyPhoneRef.current?.focus();
      return;
    }

    if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setLeadError(novaFormT("novaEmergencyEmailError"));
      setLeadSubmitted(false);
      emergencyEmailRef.current?.focus();
      return;
    }

    const emergencyLeadData = {
      name: leadForm.name.trim(),
      phone: leadForm.phone.trim(),
      email: emailValue,
      projectLocation: leadForm.projectLocation.trim(),
      message: leadForm.message.trim(),
      projectDescription: leadForm.message.trim(),
      language: emergencyLanguage,
      createdAt: new Date().toISOString(),
    };

    updateNovaLeadData({
      name: emergencyLeadData.name,
      phone: emergencyLeadData.phone,
      email: emergencyLeadData.email,
      projectLocation: emergencyLeadData.projectLocation,
      projectDescription: emergencyLeadData.message,
    });

    const requestSessionId = activeNovaSessionRef.current;
    const requestGeneration = novaRequestGenerationRef.current;
    novaEmergencySubmitRef.current = requestGeneration;
    setEmergencySubmitting(true);
    setLeadError("");

    try {
      const emergencyResponse = await sendNovaEmergencyContact(
        {
          request_type: "EMERGENCY_CONTACT",
          client_id: NOVA_CLIENT_ID,
          source: "nova_emergency_form",
          language: emergencyLanguage,
          session_id: requestSessionId,
          name: emergencyLeadData.name,
          phone: emergencyLeadData.phone,
          email: emergencyLeadData.email,
          project_location: emergencyLeadData.projectLocation,
          message: emergencyLeadData.message,
        },
        { sessionId: requestSessionId, generation: requestGeneration },
      );

      if (!isNovaRequestCurrent(requestSessionId, requestGeneration)) {
        return;
      }

      setSubmittedLead({
        ...emergencyLeadData,
        emergencyReply:
          emergencyResponse.message ||
          emergencyResponse.reply ||
          emergencyResponse.data?.message ||
          novaFormT("novaEmergencySuccess"),
      });
      setLeadSubmitted(true);
      setLeadError("");
    } catch (error) {
      if (isIntentionalNovaCancel(error) || !isNovaRequestCurrent(requestSessionId, requestGeneration)) {
        return;
      }

      setLeadError(novaFormT("novaEmergencySubmitError"));
      setLeadSubmitted(false);
    } finally {
      if (isNovaGenerationCurrent(requestSessionId, requestGeneration)) {
        setEmergencySubmitting(false);
      }

      if (novaEmergencySubmitRef.current === requestGeneration) {
        novaEmergencySubmitRef.current = null;
      }
    }
  };

  const handleQuoteSubmit = () => {
    if (!quoteForm.name.trim()) {
      setLeadError(t("nameError"));
      return;
    }

    if (!quoteForm.phone.trim()) {
      setLeadError(t("phoneError"));
      return;
    }

    if (!quoteForm.projectLocation.trim()) {
      setLeadError(t("locationError"));
      return;
    }

    if (!quoteForm.serviceNeeded.trim()) {
      setLeadError(t("serviceError"));
      return;
    }

    if (!quoteForm.projectDescription.trim()) {
      setLeadError(t("projectDescriptionError"));
      return;
    }

    const previousClientMatch =
      quoteForm.isPreviousClient === "Yes" ? findPreviousClientMatch(quoteForm) : false;
    const leadStatus = hasQuoteUrgency(quoteForm) ? "HOT LEAD" : "WARM LEAD";
    const leadData = {
      name: quoteForm.name.trim(),
      phone: quoteForm.phone.trim(),
      email: quoteForm.email.trim(),
      projectLocation: quoteForm.projectLocation.trim(),
      service: quoteForm.serviceNeeded.trim(),
      serviceLabel: quoteForm.serviceNeeded.trim(),
      message: quoteForm.projectDescription.trim(),
      quoteRequest: true,
      requestType: "DIRECT_QUOTE",
      isPreviousClient: quoteForm.isPreviousClient === "Yes",
      previousClientReference: quoteForm.previousClientReference.trim(),
      previousClientMatch,
      desiredStartDate: quoteForm.desiredStartDate.trim(),
      callPreference: quoteForm.callPreference,
      callScheduling: {
        requested: true,
        preference: quoteForm.callPreference,
        proposedDateTime: "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
        calendarStatus: "PENDING_SCHEDULING_REVIEW",
        bufferMinutes: 60,
      },
      requiresHumanReview: true,
      leadStatus,
      language: currentLanguage,
      createdAt: new Date().toISOString(),
    };

    const storedLeads = JSON.parse(localStorage.getItem("novaLeads") || "[]");
    localStorage.setItem("novaLeads", JSON.stringify([...storedLeads, leadData]));
    updateNovaLeadData({
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email,
      projectLocation: leadData.projectLocation,
      service: leadData.service,
      projectDescription: leadData.message,
      desiredStartDate: leadData.desiredStartDate,
      isPreviousClient: leadData.isPreviousClient,
      previousClientReference: leadData.previousClientReference,
    });
    trackNovaLeadProgress(leadData);
    setSubmittedLead(leadData);
    setLeadSubmitted(true);
    setLeadError("");
  };

  return (
    <div className="page">
      <header className="header">
        <div className="logo">
          <MediaImage
            className="logoMedia"
            src={CLIENT_LOGO}
            alt=""
          />
          <span>Jesús García LLC</span>
        </div>

        <nav>
          <a href="#services">{t("navServices")}</a>
          <a href="#about">{t("navAbout")}</a>
          <a href="#service-area">{t("navArea")}</a>
          <a href="#estimate">{t("navEstimate")}</a>
        </nav>

        <div className="headerActions">
          <button className="languageButton" onClick={toggleLanguage}>
            🌐 EN / ES
          </button>

          <button className="headerButton" onClick={openNovaWidget}>
            {t("talkToNova")}
          </button>
        </div>
      </header>

      <section className="hero">
        <MediaImage
          className="heroMedia"
          src={CLIENT_HERO}
          alt="Jesús García LLC project"
        />

        <div className="heroContent">
          <p className="tagline">{t("tagline")}</p>

          <h1>{t("heroTitle")}</h1>

          <p className="heroText">{t("heroText")}</p>

          <div className="heroButtons">
            <button onClick={openQuoteRequest}>{t("requestReview")}</button>
            <a className="secondaryButton" href="#services">
              {t("viewServices")}
            </a>
          </div>

          <p className="notice">{t("notice")}</p>
        </div>

      </section>

      <section className="trustStrip" aria-label="Trust highlights">
        {text.trustItems.map((item) => (
          <div className="trustItem" key={item}>
            {item}
          </div>
        ))}
      </section>

      <section id="services" className="section servicesSection">
        <div className="sectionIntro">
          <p className="sectionLabel">{t("whatWeDo")}</p>
          <h2>{t("servicesTitle")}</h2>
          <p>{t("servicesIntro")}</p>
        </div>

        <div className="grid">
          {text.serviceCards.map(({ title, description, mediaImages }, index) => (
            <div
              className={`card ${activeServiceCard === index ? "active" : ""}`}
              key={title}
              role="button"
              tabIndex={0}
              aria-expanded={activeServiceCard === index}
              onClick={() =>
                setActiveServiceCard((currentIndex) => (currentIndex === index ? null : index))
              }
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveServiceCard((currentIndex) =>
                    currentIndex === index ? null : index,
                  );
                }
              }}
            >
              <ServiceImageSlider mediaImages={mediaImages} alt={title} />
              <div className="serviceCardContent">
                <h3>{title}</h3>
                <p className="serviceDescription">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="section fitSection">
        <div className="fitContent">
          <div>
            <p className="sectionLabel">{t("whoWeWorkWith")}</p>
            <h2>{t("fitTitle")}</h2>
            <p>{t("fitText")}</p>
          </div>
        </div>

      </section>

      <section id="service-area" className="section serviceAreaSection">
        <div className="sectionIntro">
          <p className="sectionLabel">{t("serviceAreaLabel")}</p>
          <h2>{t("serviceAreaTitle")}</h2>
          <p>{t("serviceAreaIntro")}</p>
        </div>

        <div className="serviceAreaGrid">
          {text.serviceAreas.map((area) => (
            <div key={area}>{area}</div>
          ))}
        </div>
      </section>

      <section id="process" className="section processSection">
        <div className="sectionIntro">
          <p className="sectionLabel">{t("processLabel")}</p>
          <h2>{t("processTitle")}</h2>
          <p>{t("processIntro")}</p>
        </div>

        <div className="processGrid">
          {text.processSteps.map(([title, description], index) => (
            <div className="processStep" key={title}>
              <span>{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="safety" className="section safetySection">
        <div className="safetyContent">
          <div>
            <p className="sectionLabel">{t("safetyLabel")}</p>
            <h2>{t("safetyTitle")}</h2>
            <p>{t("safetyIntro")}</p>
          </div>

          <div className="safetyList">
            {text.safetyItems.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="estimate" className="finalCta">
        <h2>{t("finalCtaTitle")}</h2>
        <p>{t("finalCtaText")}</p>
        <button onClick={openNovaWidget}>{t("talkToNova")}</button>
      </section>

      <footer className="footer">
        <div>
          <strong>Jesús García LLC</strong>
          <p>{t("footerServices")}</p>
          <p>{t("footerArea")}</p>
          <div className="footerAlternativeContact">
            <span>{t("footerAlternativeContact")}</span>
            <a href="mailto:jesusgarciallccompany@gmail.com">
              {t("footerSendEmail")}
            </a>
          </div>
        </div>

        <div>
          <button className="footerNovaButton" onClick={openNovaWidget}>
            {t("footerNovaCta")}
          </button>
        </div>
      </footer>

      <button className="floatingNova" onClick={openNovaWidget}>
        NOVA
      </button>

      {chatOpen && (
        <div className={`chatBox nova-chat-panel nova-size-${novaSizeMode}`}>
          <div className="chatHeader">
            <div>
              <strong>NOVA</strong>
              <small>{t("novaSubtitle")}</small>
            </div>

            <div className="novaHeaderActions">
              <button
                className={novaSizeMode === "large30" ? "active" : ""}
                onClick={() => toggleNovaSize("large30")}
                title={t("increase30")}
                type="button"
              >
                ⧉
              </button>
              <button
                className={novaSizeMode === "large60" ? "active" : ""}
                onClick={() => toggleNovaSize("large60")}
                title={t("increase60")}
                type="button"
              >
                ⛶
              </button>
              <button
                className={novaSizeMode === "large100" ? "active" : ""}
                onClick={() => toggleNovaSize("large100")}
                title={t("increase100")}
                type="button"
              >
                +100%
              </button>
              <button onClick={closeNovaWidget} type="button">X</button>
            </div>
          </div>

          <div className="chatBody">
            {isNovaSmartModeActive && (
              <div className="novaLiveChat">
                {novaChatEnded && !ratingPromptActive && !ratingThanksVisible && (
                  <div className="novaMessage assistant">
                    <p>{t("chatEnded")}</p>
                  </div>
                )}

                {novaMessages.map((message, index) => (
                  <div className={`novaMessage ${message.role}`} key={`${message.createdAt}-${index}`}>
                    <p>{getNovaMessageContent(message)}</p>
                  </div>
                ))}

                {ratingPromptActive && !ratingSubmitted && (
                  <div className="novaRatingBlock">
                    <p className="novaRatingTitle">{t("ratingTitle")}</p>
                    <div className="novaRatingButtons" role="group" aria-label={t("ratingTitle")}>
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          className="novaRatingButton"
                          key={rating}
                          type="button"
                          onClick={() => completeNovaChatAfterRating(rating)}
                          aria-label={formatNovaMessage("ratingStarLabel", { rating })}
                        >
                          {"★".repeat(rating)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!ratingPromptActive &&
                  !novaChatEnded &&
                  novaMessages.length === 0 &&
                  conversationHistory.length === 0 && (
                    <p className="smallText">{t("initialNovaPrompt")}</p>
                )}

                {schedulingSlots.length > 0 && !ratingPromptActive && (
                  <div className="bookingOptionsBlock">
                    <p className="bookingOptionsLabel">{t("bookingOptionsLabel")}</p>
                    <div className="bookingOptionsGrid">
                      {schedulingSlots.map((slot) => (
                        <button
                          className="bookingOptionButton"
                          key={`${slot.start}-${slot.end}-${slot.label}`}
                          type="button"
                          onClick={() => bookSchedulingSlot(slot)}
                          disabled={schedulingLoading}
                        >
                          {formatSlotLabel(slot)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {(novaLoading || schedulingLoading) && !ratingPromptActive && (
                  <p className="novaTyping" aria-label={t("novaTyping")}>
                    <span>{t("novaTyping").replace(/\.\.\.$/, "")}</span>
                    <span className="novaTypingDots" aria-hidden="true">
                      <span>.</span>
                      <span>.</span>
                      <span>.</span>
                    </span>
                  </p>
                )}

                {!ratingPromptActive && !ratingThanksVisible && (
                  <form className="novaChatForm" onSubmit={handleNovaChatSubmit}>
                    <input
                      placeholder={t("novaChatPlaceholder")}
                      value={novaInput}
                      onChange={(event) => {
                        cancelNovaAutoClose();
                        setNovaInput(event.target.value);
                      }}
                      disabled={novaLoading || novaChatEnded || schedulingLoading}
                    />
                    <button
                      type="submit"
                      disabled={novaLoading || novaChatEnded || schedulingLoading || !novaInput.trim()}
                    >
                      {t("novaSend")}
                    </button>
                  </form>
                )}

                {!ratingPromptActive && !ratingThanksVisible && (
                  <div className="novaChatControls">
                    <button type="button" onClick={startNewNovaChat}>
                      {t("startNewChat")}
                    </button>
                    <button type="button" onClick={endNovaChat} disabled={novaChatEnded}>
                      {t("endChat")}
                    </button>
                  </div>
                )}
              </div>
            )}

            {quoteMode && leadSubmitted && submittedLead && (
              <>
                <div className="confirmationPanel">
                  <strong>{t("quoteFinalThanks")}</strong>

                  <div className="confirmationDetails">
                    <p>
                      <span>{t("leadStatus")}</span>{" "}
                      {formatStatus(submittedLead.leadStatus)}
                    </p>
                    <p>
                      <span>{t("serviceSelected")}</span>{" "}
                      {submittedLead.serviceLabel || submittedLead.service}
                    </p>
                    <p>
                      <span>{t("locationSelected")}</span>{" "}
                      {submittedLead.projectLocation}
                    </p>
                  </div>
                </div>

                <div className="finalActions">
                  <button onClick={resetNova}>{t("startNewRequest")}</button>
                  <button className="closeNovaButton" onClick={closeNovaWidget}>
                    {t("closeNova")}
                  </button>
                </div>
              </>
            )}

            {quoteMode && !leadSubmitted && (
              <>
                <p>{t("quoteSectionText")}</p>

                <div className="quoteForm">
                  <input
                    placeholder={t("name")}
                    value={quoteForm.name}
                    onChange={(event) => updateQuoteForm("name", event.target.value)}
                  />
                  <input
                    placeholder={t("phone")}
                    value={quoteForm.phone}
                    onChange={(event) => updateQuoteForm("phone", event.target.value)}
                  />
                  <input
                    placeholder={t("email")}
                    value={quoteForm.email}
                    onChange={(event) => updateQuoteForm("email", event.target.value)}
                  />
                  <input
                    placeholder={t("projectLocation")}
                    value={quoteForm.projectLocation}
                    onChange={(event) =>
                      updateQuoteForm("projectLocation", event.target.value)
                    }
                  />
                  <input
                    placeholder={t("serviceNeeded")}
                    value={quoteForm.serviceNeeded}
                    onChange={(event) =>
                      updateQuoteForm("serviceNeeded", event.target.value)
                    }
                  />
                  <textarea
                    placeholder={t("projectDescription")}
                    value={quoteForm.projectDescription}
                    onChange={(event) =>
                      updateQuoteForm("projectDescription", event.target.value)
                    }
                  ></textarea>
                  <input
                    placeholder={t("desiredStartDate")}
                    value={quoteForm.desiredStartDate}
                    onChange={(event) =>
                      updateQuoteForm("desiredStartDate", event.target.value)
                    }
                  />

                  <label>
                    {t("previousClientQuestion")}
                    <select
                      value={quoteForm.isPreviousClient}
                      onChange={(event) =>
                        updateQuoteForm("isPreviousClient", event.target.value)
                      }
                    >
                      <option value="No">{t("no")}</option>
                      <option value="Yes">{t("yes")}</option>
                    </select>
                  </label>

                  {quoteForm.isPreviousClient === "Yes" && (
                    <input
                      placeholder={t("previousClientReference")}
                      value={quoteForm.previousClientReference}
                      onChange={(event) =>
                        updateQuoteForm("previousClientReference", event.target.value)
                      }
                    />
                  )}

                  <label>
                    {t("callPreference")}
                    <select
                      value={quoteForm.callPreference}
                      onChange={(event) =>
                        updateQuoteForm("callPreference", event.target.value)
                      }
                    >
                      {text.callPreferences.map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <button onClick={handleQuoteSubmit}>{t("submitEstimate")}</button>
                </div>

                {leadError && <p className="smallText">{leadError}</p>}
              </>
            )}
            {isNovaEmergencyModeActive && (
              <>
                <div className="leadMessage cold">
                  <p>{novaFormT("novaEmergencyIntro")}</p>
                </div>

                {leadSubmitted && submittedLead ? (
                  <div className="confirmationPanel">
                    <strong>{submittedLead.emergencyReply || novaFormT("novaEmergencySuccess")}</strong>
                  </div>
                ) : (
                  <>
                    <div className="leadForm">
                      <label>
                        {novaFormT("novaEmergencyRecipient")}
                        <input
                          value={NOVA_EMERGENCY_RECIPIENT}
                          disabled
                          readOnly
                        />
                      </label>
                      <input
                        ref={emergencyNameRef}
                        placeholder={novaFormT("name")}
                        value={leadForm.name}
                        maxLength={120}
                        onChange={(event) => updateLeadForm("name", event.target.value)}
                      />
                      <input
                        ref={emergencyPhoneRef}
                        placeholder={novaFormT("phone")}
                        value={leadForm.phone}
                        maxLength={40}
                        inputMode="tel"
                        autoComplete="tel"
                        onChange={(event) => updateLeadForm("phone", event.target.value)}
                      />
                      <input
                        ref={emergencyEmailRef}
                        placeholder={novaFormT("email")}
                        value={leadForm.email}
                        maxLength={160}
                        inputMode="email"
                        autoComplete="email"
                        onChange={(event) => updateLeadForm("email", event.target.value)}
                      />
                      <input
                        placeholder={novaFormT("projectLocation")}
                        value={leadForm.projectLocation}
                        maxLength={250}
                        onChange={(event) =>
                          updateLeadForm("projectLocation", event.target.value)
                        }
                      />
                      <textarea
                        placeholder={novaFormT("message")}
                        value={leadForm.message}
                        maxLength={3000}
                        onChange={(event) => updateLeadForm("message", event.target.value)}
                      ></textarea>

                      <button
                        type="button"
                        onClick={handleLeadSubmit}
                        disabled={emergencySubmitting}
                      >
                        {emergencySubmitting ? novaFormT("novaEmergencySending") : novaFormT("novaEmergencySend")}
                      </button>
                    </div>

                    {leadError && <p className="smallText">{leadError}</p>}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
