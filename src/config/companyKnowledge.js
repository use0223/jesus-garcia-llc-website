export const companyKnowledge = {
  companyName: "Jesús García LLC",
  ownerName: "Jesús García",
  assistantName: "NOVA",
  status: "ACTIVE",
  plan: "DEMO",
  timezone: "America/Denver",
  defaultLanguage: "auto",
  businessType:
    "Framing, general finish carpentry, installation, interior ceiling paneling, interior and exterior finishes, complete remodeling, and subcontractor support services.",
  mission:
    "Help homeowners, businesses, builders, and general contractors with reliable installation, carpentry, finish, remodeling, and jobsite support.",
  vision:
    "Serve Jackson, Wyoming, and nearby communities with professional interior and exterior improvement services.",
  contact: {
    phone: "307-249-7650",
    email: "usepresion@gmail.com",
    address: "115068 US 89, Alpine, WY 83128",
    preferredMethod: "Phone, email, or NOVA lead capture form",
  },
  serviceArea: {
    primary: "Jackson, WY",
    nearby: [
      "Alpine, WY",
      "Star Valley, WY",
      "Afton, WY",
      "Nearby areas",
    ],
  },
  businessHours: {
    mondayToFriday: "Pending information",
    saturday: "Pending information",
    sunday: "Pending information",
  },
  idealClients: [
    "Homeowners",
    "Businesses",
    "Property owners",
    "Builders",
    "General contractors",
  ],
  coreServices: [
    "Door installation",
    "Window installation",
    "Flooring installation",
    "Cabinet installation",
    "Kitchen remodeling and installation",
    "Interior ceiling paneling with wood, PVC, panels, or interior siding",
    "Wood framing for walls, partitions, openings, and structural preparation",
    "General finish carpentry, trim, molding, decorative pieces, adjustments, and final details",
    "Siding installation or repair",
    "Deck construction and installation",
    "Complete interior and exterior remodeling",
    "Subcontractor support for builders and general contractors",
  ],
  serviceCategories: {
    doorsAndWindows: ["Door installation", "Window installation"],
    interiors: [
      "Flooring installation",
      "Cabinet installation",
      "Kitchen remodeling and installation",
      "Interior ceiling paneling with wood, PVC, panels, or interior siding",
      "General finish carpentry, trim, molding, decorative pieces, adjustments, and final details",
    ],
    framing: ["Wood framing for walls, partitions, openings, and structural preparation"],
    exteriors: [
      "Siding installation or repair",
      "Deck construction and installation",
    ],
    remodeling: ["Complete interior and exterior remodeling"],
    subcontractorSupport: [
      "Builder subcontractor support",
      "General contractor support",
      "Installation, carpentry, finishes, siding, decks, doors, windows, cabinets, flooring, and remodeling support",
    ],
  },
  notPrimaryServices: [
    "Electrical work only",
    "Plumbing work only",
    "HVAC only",
    "Roofing only",
    "Concrete only",
    "Painting only",
    "Landscaping",
    "Architecture or design only",
  ],
  responsePolicy: {
    inScope:
      "If the client asks for something clearly inside company services, continue qualifying and capture the lead.",
    unclear:
      "If the request is unclear, ask a clarifying question or route the request for human review.",
    outOfScope:
      "If the request is not listed and does not seem related to the company's services, offer customer service review.",
  },
  leadScoringRules: {
    hot:
      "The project matches company services and includes urgency such as ASAP, this week, need an estimate, or ready to talk.",
    warm:
      "The project matches company services but does not include clear urgency.",
    cold:
      "The project appears future-focused, exploratory, or price-checking while still related to company services.",
    curiousNotQualified:
      "The request is mostly curious, vague, or not clearly aligned with company services.",
    needsReview:
      "The request may be outside primary services or requires customer service to give the final answer.",
  },
  escalationRules: {
    customerServiceReview:
      "Use when the request is outside primary services, unclear, or needs a human decision.",
    doNotPromise:
      "NOVA should not promise availability, pricing, scheduling, licensing, or final acceptance of a project.",
  },
  customerServiceHandoffMessage: {
    en: "Thanks for explaining. That request is not listed as one of our primary services, but I can send your details to the team for review.",
    es: "Gracias por explicarlo. Esa solicitud no aparece entre nuestros servicios principales, pero puedo enviar tus datos al equipo para que la revise.",
  },
  previousClients: [],
};
