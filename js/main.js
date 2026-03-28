(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const languageButtons = document.querySelectorAll("[data-language-toggle]");
  const seoElements = {
    description: document.querySelector('meta[name="description"]'),
    ogTitle: document.querySelector('meta[property="og:title"]'),
    ogDescription: document.querySelector('meta[property="og:description"]'),
    ogImageAlt: document.querySelector('meta[property="og:image:alt"]'),
    ogLocale: document.querySelector('meta[property="og:locale"]'),
    ogLocaleAlternate: document.querySelector('meta[property="og:locale:alternate"]'),
    twitterTitle: document.querySelector('meta[name="twitter:title"]'),
    twitterDescription: document.querySelector('meta[name="twitter:description"]'),
    twitterImageAlt: document.querySelector('meta[name="twitter:image:alt"]')
  };

  const serviceModal = document.getElementById("service-modal");
  const serviceModalTitle = document.getElementById("service-modal-title");
  const serviceModalBody = document.getElementById("service-modal-body");
  const serviceModalClose = serviceModal ? serviceModal.querySelector(".service-modal__close") : null;
  const serviceOpenButtons = document.querySelectorAll("[data-service-open]");

  const contactForm = document.querySelector(".contact-form");
  const formStatus = document.querySelector(".form-status");

  const LANGUAGE_STORAGE_KEY = "chitchat-language";
  const SUPPORTED_LANGUAGES = ["es", "en"];

  let currentLanguage = "es";
  let activeServiceTrigger = null;
  let activeServiceId = null;

  // Keep these runtime metadata values aligned with the default Spanish head tags in index.html.
  const translations = {
    es: {
      meta: {
        title: "ChitChat | Logopedia infantil para niños y familias",
        description:
          "ChitChat ofrece logopedia infantil con sesiones personalizadas, cercanas y basadas en el juego para niños y familias.",
        locale: "es_ES",
        alternateLocale: "en_GB",
        imageAlt: "Ilustración principal de ChitChat para niños y familias"
      },
      ui: {
        skipLink: "Saltar al contenido",
        languageToggle: "Selector de idioma",
        openMenu: "Abrir menú",
        closeMenu: "Cerrar menú",
        serviceModalClose: "Cerrar información del servicio",
        // Update or remove this message once the contact form is connected to a real submission endpoint.
        formPreviewMessage: "Gracias. Este formulario es solo una vista previa y todavía no envía consultas."
      },
      nav: {
        brandAria: "Ir al inicio de ChitChat",
        mainAria: "Navegación principal",
        home: "Inicio",
        services: "Servicios",
        about: "Sobre mí",
        contact: "Contacto",
        cta: "Contactar"
      },
      hero: {
        imageAlt: "Ilustración principal de ChitChat para niños y familias",
        kicker: "Espacio terapéutico infantil",
        subtitle: "Logopedia para niños y familias",
        text: "Sesiones personalizadas, cercanas y basadas en el juego para acompañar el desarrollo del habla, el lenguaje y la comunicación.",
        notesAria: "Áreas principales",
        noteEarly: "Atención temprana",
        noteNeuro: "Neurodesarrollo",
        noteFamilies: "Trabajo con familias",
        primaryCta: "Contactar",
        secondaryCta: "Ver servicios"
      },
      services: {
        eyebrow: "Acompañamiento personalizado",
        heading: "Servicios",
        intro:
          "En ChitChat ofrecemos sesiones personalizadas para niños y sus familias, adaptadas a las necesidades de cada etapa del desarrollo. Trabajamos desde el juego, la evidencia y la colaboración con el entorno del niño para construir objetivos funcionales y realistas.",
        gridAria: "Servicios principales de ChitChat",
        modalEyebrow: "Servicios",
        moreButton: "Más información",
        items: {
          "estimulación-temprana": {
            imageAlt: "Ilustración de estimulación temprana y juego inicial",
            title: "Estimulación temprana (0–3 años)",
            preview:
              "Acompañamiento en los primeros años para favorecer la comunicación, el lenguaje y la interacción desde el juego y el vínculo con la familia.",
            blocks: [
              {
                type: "paragraph",
                text:
                  "Los primeros años son una etapa clave para el desarrollo de la comunicación y el lenguaje. En ChitChat acompañamos a bebés y niños pequeños cuando aparecen señales de alerta o cuando la familia necesita orientación para estimular el desarrollo de forma respetuosa y natural."
              },
              {
                type: "paragraph",
                text: "En sesión trabajamos aspectos como:"
              },
              {
                type: "list",
                items: [
                  "atención conjunta y contacto visual",
                  "primeros gestos y sonidos",
                  "comprensión del lenguaje",
                  "juego y comunicación funcional",
                  "participación de la familia en la vida diaria"
                ]
              },
              {
                type: "paragraph",
                text:
                  "El objetivo es potenciar la comunicación del niño dentro de sus rutinas reales y ofrecer a la familia herramientas claras y prácticas para acompañarlo en casa."
              }
            ]
          },
          "comunicación-y-lenguaje": {
            imageAlt: "Ilustración de comunicación y lenguaje infantil",
            title: "Comunicación y lenguaje (a partir de 4 años)",
            preview:
              "Apoyo para niños que tienen dificultades para expresarse, comprender, conversar o desarrollar el lenguaje de forma funcional en su día a día.",
            blocks: [
              {
                type: "paragraph",
                text:
                  "Algunos niños encuentran dificultades para expresar lo que piensan, comprender mensajes, mantener conversaciones o adquirir nuevo vocabulario y estructuras del lenguaje. Estas dificultades pueden afectar al juego, al aprendizaje y a la relación con los demás."
              },
              {
                type: "paragraph",
                text: "En ChitChat trabajamos para fortalecer:"
              },
              {
                type: "list",
                items: [
                  "comprensión verbal",
                  "expresión oral",
                  "vocabulario y organización del lenguaje",
                  "narración y conversación",
                  "uso funcional del lenguaje en distintos contextos"
                ]
              },
              {
                type: "paragraph",
                text:
                  "Las sesiones se adaptan al perfil de cada niño para que el lenguaje sea una herramienta útil, espontánea y cada vez más segura."
              }
            ]
          },
          "habla-fonemas-y-articulación": {
            imageAlt: "Ilustración de habla, sonidos y articulación",
            title: "Habla, fonemas y articulación",
            preview:
              "Intervención en dificultades de pronunciación, articulación y claridad del habla para que el niño se comunique con mayor seguridad.",
            blocks: [
              {
                type: "paragraph",
                text:
                  "Cuando un niño omite, sustituye o distorsiona sonidos, puede resultarle difícil hacerse entender o ganar confianza al hablar. En estos casos trabajamos de forma progresiva y lúdica para mejorar la precisión y claridad del habla."
              },
              {
                type: "paragraph",
                text: "Podemos intervenir en:"
              },
              {
                type: "list",
                items: [
                  "errores articulatorios",
                  "dificultad para producir determinados fonemas",
                  "habla poco clara",
                  "coordinación motora oral relacionada con el habla",
                  "generalización de los sonidos al lenguaje espontáneo"
                ]
              },
              {
                type: "paragraph",
                text:
                  "El objetivo no es solo “decir bien un sonido”, sino lograr una comunicación más eficaz y segura en la vida diaria."
              }
            ]
          },
          "alimentación-oral-infantil": {
            imageAlt: "Ilustración de alimentación oral infantil",
            title: "Alimentación oral infantil",
            preview:
              "Apoyo en dificultades relacionadas con la alimentación, la aceptación de texturas, la masticación o el uso funcional de la boca.",
            blocks: [
              {
                type: "paragraph",
                text:
                  "La alimentación también forma parte del desarrollo oral y sensorial del niño. Algunas familias consultan porque su hijo rechaza alimentos, tiene dificultades con determinadas texturas, mastica poco, presenta selectividad extrema o vive la comida con estrés."
              },
              {
                type: "paragraph",
                text:
                  "En ChitChat abordamos estas dificultades de forma respetuosa, gradual y coordinada con la familia, teniendo en cuenta:"
              },
              {
                type: "list",
                items: [
                  "experiencia sensorial",
                  "habilidades orales",
                  "aceptación de texturas",
                  "masticación y coordinación",
                  "bienestar emocional alrededor de la comida"
                ]
              },
              {
                type: "paragraph",
                text:
                  "El objetivo es construir una relación más tranquila, segura y funcional con la alimentación."
              }
            ]
          },
          "acompañamiento-en-neurodiversidad": {
            imageAlt: "Ilustración de acompañamiento en neurodiversidad",
            title: "Acompañamiento en neurodiversidad",
            preview:
              "Intervención centrada en el niño y su entorno cuando existen perfiles de desarrollo diverso o diagnósticos asociados.",
            blocks: [
              {
                type: "paragraph",
                text:
                  "En algunos casos, las dificultades en comunicación, lenguaje, aprendizaje o interacción social aparecen junto a un perfil de neurodesarrollo diverso o a un diagnóstico concreto. En ChitChat entendemos al niño como el centro de la intervención y diseñamos objetivos que respetan su forma de desarrollarse, comunicarse y participar en el mundo."
              },
              {
                type: "paragraph",
                text: "Podemos acompañar procesos relacionados con:"
              },
              {
                type: "list",
                items: [
                  "TEA",
                  "TDL/TEL",
                  "TDAH",
                  "dispraxia",
                  "dislexia",
                  "otras diferencias del desarrollo y aprendizaje"
                ]
              },
              {
                type: "paragraph",
                text:
                  "Trabajamos en coordinación con la familia, el colegio y otros profesionales para crear una intervención funcional, comprensiva y realmente útil para el día a día."
              }
            ]
          },
          "orientación-y-acompañamiento-a-familias": {
            imageAlt: "Ilustración de apoyo y acompañamiento a familias",
            title: "Orientación y acompañamiento a familias",
            preview:
              "Espacio para orientar, resolver dudas y dar herramientas prácticas a las familias en cada etapa del proceso terapéutico.",
            blocks: [
              {
                type: "paragraph",
                text:
                  "La familia forma parte esencial del proceso terapéutico. Por eso, además del trabajo directo con el niño, ofrecemos un espacio de orientación para ayudar a comprender mejor sus necesidades y trasladar estrategias útiles al entorno cotidiano."
              },
              {
                type: "paragraph",
                text: "Este acompañamiento puede incluir:"
              },
              {
                type: "list",
                items: [
                  "resolución de dudas",
                  "pautas para casa",
                  "apoyo en rutinas diarias",
                  "coordinación con el colegio",
                  "acompañamiento emocional y práctico durante el proceso"
                ]
              },
              {
                type: "paragraph",
                text:
                  "La meta es que la familia se sienta acompañada, informada y con recursos para sostener el desarrollo del niño fuera de la sesión."
              }
            ]
          }
        }
      },
      about: {
        imageAlt: "Ilustración del enfoque cercano y creativo de ChitChat",
        eyebrow: "Una terapia cercana y respetuosa",
        heading: "Sobre mí",
        intro: "Experiencia clínica, trabajo bilingüe y una mirada centrada en el desarrollo natural de cada niño.",
        signature: "Amaya Dunworth · Logopeda infantil",
        cards: {
          who: {
            title: "Quién soy",
            text:
              "Mi nombre es Amaya Dunworth. Soy logopeda especialista en atención temprana y niños en edad escolar. Me licencié en la Universidad de Cork (Irlanda) y además tengo formación en métodos Hanen."
          },
          what: {
            title: "Qué hago",
            text:
              "En mi vida profesional he trabajado con niños con dificultades del desarrollo en el Sistema de Salud en Irlanda (HSE) y en diversos equipos de Atención Temprana en España. Esto es lo que me permite llevar a cabo mi trabajo de logopeda en ambos idiomas."
          },
          how: {
            title: "Cómo lo hago",
            text:
              "Mi visión de la terapia en logopedia parte del respeto al desarrollo natural del niño y la importancia del trabajo con la familia puesto que supone su núcleo vital más cercano. Así, desde la comprensión de cada situación particular, diseño sesiones personalizadas, creativas y basadas en el juego que fomentan el desarrollo de cada individuo."
          }
        }
      },
      reviews: {
        eyebrow: "Espacio preparado para crecer",
        heading: "Reseñas",
        intro: "Una sección sencilla y lista para incorporar testimonios reales cuando quieras añadirlos.",
        cards: {
          one: {
            tag: "Próximamente",
            text: "Este espacio está reservado para compartir opiniones reales de familias sobre el acompañamiento recibido en ChitChat."
          },
          two: {
            tag: "Próximamente",
            text: "Aquí se podrán añadir reseñas breves sobre sesiones individuales, coordinación con la familia y evolución en objetivos cotidianos."
          },
          three: {
            tag: "Próximamente",
            text: "También queda preparado para incluir experiencias relacionadas con terapia grupal, trabajo con colegios y sesiones online."
          }
        }
      },
      contact: {
        imageAlt: "Ilustración de un cocodrilo señalando la ubicación de la consulta",
        eyebrow: "Primer contacto",
        heading: "Contacto",
        intro: "Cuéntame un poco sobre vuestra situación y preparo la mejor forma de acompañaros.",
        support: {
          share: {
            title: "Qué puedes contarme",
            text: "Edad, motivo de consulta, idioma habitual en casa y cualquier detalle que te ayude a explicar vuestra situación."
          },
          start: {
            title: "Cómo empieza el proceso",
            text: "Primer contacto, valoración inicial y una propuesta de acompañamiento adaptada a vuestro contexto familiar y escolar."
          }
        },
        form: {
          nameLabel: "Nombre",
          namePlaceholder: "Tu nombre",
          phoneLabel: "Teléfono",
          phonePlaceholder: "Tu teléfono",
          emailLabel: "Correo electrónico",
          emailPlaceholder: "Tu correo electrónico",
          childAgeLabel: "Edad del niño/niña",
          childAgePlaceholder: "Por ejemplo: 4 años",
          inquiryLabel: "Consulta",
          inquiryPlaceholder: "Cuéntame qué os preocupa o qué apoyo estáis buscando",
          submit: "Enviar consulta"
        },
        details: {
          heading: "Datos de contacto",
          addressLabel: "Dirección:",
          addressValue: "Plaza del Pilar, 16, 1, derecha, Oficina 4",
          // Replace the placeholder values below with the final public contact details before launch.
          phoneLabel: "Teléfono:",
          phoneValue: "Pendiente de confirmar",
          emailLabel: "Correo electrónico:",
          emailValue: "Pendiente de confirmar",
          licenseLabel: "N° colegiada:",
          licenseValue: "Pendiente de confirmar",
          note:
            "Cuando tengas los datos definitivos, este bloque está listo para actualizarse con la información definitiva."
        }
      },
      footer: {
        copy: "ChitChat. Logopedia infantil para niños y familias.",
        backToTop: "Volver arriba"
      }
    },
    en: {
      meta: {
        title: "ChitChat | Speech and language therapy for children and families",
        description:
          "ChitChat offers warm, personalised, play-based speech and language therapy for children and families.",
        locale: "en_GB",
        alternateLocale: "es_ES",
        imageAlt: "Main ChitChat illustration for children and families"
      },
      ui: {
        skipLink: "Skip to content",
        languageToggle: "Language selector",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        serviceModalClose: "Close service information",
        // Update or remove this message once the contact form is connected to a real submission endpoint.
        formPreviewMessage: "Thank you. This form is currently a preview and does not submit enquiries yet."
      },
      nav: {
        brandAria: "Go to the ChitChat home page",
        mainAria: "Main navigation",
        home: "Home",
        services: "Services",
        about: "About",
        contact: "Contact",
        cta: "Get in touch"
      },
      hero: {
        imageAlt: "Main ChitChat illustration for children and families",
        kicker: "A warm therapy space",
        subtitle: "Speech and language therapy for children and families",
        text: "Personalised, warm, play-based sessions to support speech, language, and communication development.",
        notesAria: "Main areas",
        noteEarly: "Early intervention",
        noteNeuro: "Neurodevelopment",
        noteFamilies: "Family support",
        primaryCta: "Get in touch",
        secondaryCta: "View services"
      },
      services: {
        eyebrow: "Personalised support",
        heading: "Services",
        intro:
          "At ChitChat, we offer personalised sessions for children and their families, tailored to each stage of development. We work through play, evidence, and close collaboration with the child's everyday environment to build functional, realistic goals.",
        gridAria: "Main ChitChat services",
        modalEyebrow: "Services",
        moreButton: "Learn more",
        items: {
          "estimulación-temprana": {
            imageAlt: "Illustration of early intervention and first play experiences",
            title: "Early intervention (0–3 years)",
            preview:
              "Support in the early years to nurture communication, language, and interaction through play and family connection.",
            blocks: [
              {
                type: "paragraph",
                text:
                  "The early years are a key stage in communication and language development. At ChitChat, we support babies and young children when early concerns arise or when families need guidance to encourage development in a respectful, natural way."
              },
              {
                type: "paragraph",
                text: "In sessions we work on areas such as:"
              },
              {
                type: "list",
                items: [
                  "joint attention and eye contact",
                  "first gestures and sounds",
                  "language comprehension",
                  "play and functional communication",
                  "family participation in everyday life"
                ]
              },
              {
                type: "paragraph",
                text:
                  "The goal is to strengthen the child's communication within their real routines and give the family clear, practical tools to support them at home."
              }
            ]
          },
          "comunicación-y-lenguaje": {
            imageAlt: "Illustration of children's communication and language",
            title: "Communication and language (age 4+)",
            preview:
              "Support for children who find it hard to express themselves, understand language, take part in conversation, or use language confidently in daily life.",
            blocks: [
              {
                type: "paragraph",
                text:
                  "Some children find it hard to express what they think, understand messages, hold conversations, or acquire new vocabulary and language structures. These difficulties can affect play, learning, and relationships with others."
              },
              {
                type: "paragraph",
                text: "At ChitChat, we work on strengthening:"
              },
              {
                type: "list",
                items: [
                  "verbal comprehension",
                  "oral expression",
                  "vocabulary and language organisation",
                  "storytelling and conversation",
                  "functional language use across contexts"
                ]
              },
              {
                type: "paragraph",
                text:
                  "Sessions are tailored to each child's profile so that language becomes an increasingly useful, spontaneous, and confident tool."
              }
            ]
          },
          "habla-fonemas-y-articulación": {
            imageAlt: "Illustration of speech sounds and articulation",
            title: "Speech, sounds, and articulation",
            preview:
              "Support for pronunciation, articulation, and speech clarity so each child can communicate with greater confidence.",
            blocks: [
              {
                type: "paragraph",
                text:
                  "When a child omits, substitutes, or distorts sounds, it can be hard for them to be understood or to feel confident speaking. In these cases, we work in a gradual, playful way to improve speech accuracy and clarity."
              },
              {
                type: "paragraph",
                text: "We can support areas such as:"
              },
              {
                type: "list",
                items: [
                  "articulation errors",
                  "difficulty producing specific speech sounds",
                  "unclear speech",
                  "oral-motor coordination related to speech",
                  "generalising sounds into spontaneous speech"
                ]
              },
              {
                type: "paragraph",
                text:
                  "The goal is not only to “say a sound correctly”, but to achieve more effective and confident everyday communication."
              }
            ]
          },
          "alimentación-oral-infantil": {
            imageAlt: "Illustration of pediatric feeding support",
            title: "Pediatric feeding support",
            preview:
              "Support with feeding challenges involving textures, chewing, food acceptance, or the functional use of the mouth.",
            blocks: [
              {
                type: "paragraph",
                text:
                  "Feeding is also part of a child's oral and sensory development. Some families seek support because their child rejects foods, struggles with certain textures, chews very little, shows extreme selectivity, or experiences mealtimes as stressful."
              },
              {
                type: "paragraph",
                text:
                  "At ChitChat, we approach these difficulties respectfully, gradually, and in coordination with the family, taking into account:"
              },
              {
                type: "list",
                items: [
                  "sensory experience",
                  "oral skills",
                  "acceptance of textures",
                  "chewing and coordination",
                  "emotional wellbeing around food"
                ]
              },
              {
                type: "paragraph",
                text:
                  "The goal is to build a calmer, safer, and more functional relationship with feeding."
              }
            ]
          },
          "acompañamiento-en-neurodiversidad": {
            imageAlt: "Illustration of neurodiversity support",
            title: "Neurodiversity support",
            preview:
              "Child- and context-centred support for neurodivergent profiles or related diagnoses.",
            blocks: [
              {
                type: "paragraph",
                text:
                  "In some cases, differences in communication, language, learning, or social interaction sit alongside a neurodivergent profile or a specific diagnosis. At ChitChat, we place the child at the centre of intervention and create goals that respect the way they develop, communicate, and participate in the world."
              },
              {
                type: "paragraph",
                text: "We can support processes related to:"
              },
              {
                type: "list",
                items: [
                  "ASD",
                  "DLD",
                  "ADHD",
                  "dyspraxia",
                  "dyslexia",
                  "other developmental and learning differences"
                ]
              },
              {
                type: "paragraph",
                text:
                  "We work closely with families, schools, and other professionals to create support that is functional, respectful, and genuinely useful in daily life."
              }
            ]
          },
          "orientación-y-acompañamiento-a-familias": {
            imageAlt: "Illustration of family guidance and support",
            title: "Family guidance and support",
            preview:
              "A space to guide, answer questions, and share practical tools with families throughout the therapeutic process.",
            blocks: [
              {
                type: "paragraph",
                text:
                  "The family is an essential part of the therapeutic process. Alongside direct work with the child, we offer guidance sessions to help families better understand their child's needs and carry useful strategies into everyday life."
              },
              {
                type: "paragraph",
                text: "This support can include:"
              },
              {
                type: "list",
                items: [
                  "answering questions",
                  "guidance for home",
                  "support with everyday routines",
                  "coordination with school",
                  "emotional and practical support throughout the process"
                ]
              },
              {
                type: "paragraph",
                text:
                  "The aim is for families to feel supported, informed, and equipped with practical tools to sustain their child's development beyond the session."
              }
            ]
          }
        }
      },
      about: {
        imageAlt: "Illustration of ChitChat's warm and creative approach",
        eyebrow: "Warm and respectful therapy",
        heading: "About me",
        intro: "Clinical experience, bilingual work, and an approach centred on each child's natural development.",
        signature: "Amaya Dunworth · Speech and language therapist",
        cards: {
          who: {
            title: "Who I am",
            text:
              "My name is Amaya Dunworth. I am a speech and language therapist specialising in early intervention and school-aged children. I graduated from University College Cork in Ireland and also have training in Hanen approaches."
          },
          what: {
            title: "What I do",
            text:
              "I have worked with children with developmental differences in the Irish Health Service (HSE) and in several Early Intervention teams in Spain. That experience allows me to work as a speech and language therapist in both languages."
          },
          how: {
            title: "How I work",
            text:
              "My approach to speech and language therapy is grounded in respect for each child's natural development and in the importance of working closely with the family, who are their closest everyday support system. From a clear understanding of each situation, I design personalised, creative, play-based sessions that support every child's development."
          }
        }
      },
      reviews: {
        eyebrow: "A space ready to grow",
        heading: "Reviews",
        intro: "A simple section ready to include real testimonials whenever you want to add them.",
        cards: {
          one: {
            tag: "Coming soon",
            text: "This space is reserved for sharing real feedback from families about the support they received at ChitChat."
          },
          two: {
            tag: "Coming soon",
            text: "This space can also include short reviews about individual sessions, family coordination, and progress in everyday goals."
          },
          three: {
            tag: "Coming soon",
            text: "It can also include feedback about group therapy, school collaboration, and online sessions."
          }
        }
      },
      contact: {
        imageAlt: "Illustration of a crocodile pointing to the practice location",
        eyebrow: "First contact",
        heading: "Contact",
        intro: "Tell me a little about your situation and I can suggest the best way to support you.",
        support: {
          share: {
            title: "What to share",
            text:
              "Your child's age, the reason for your enquiry, the language spoken at home, and any detail that helps explain your situation."
          },
          start: {
            title: "How it starts",
            text: "Initial contact, a first assessment, and a support plan tailored to your family and school context."
          }
        },
        form: {
          nameLabel: "Name",
          namePlaceholder: "Your name",
          phoneLabel: "Phone",
          phonePlaceholder: "Your phone number",
          emailLabel: "Email",
          emailPlaceholder: "Your email address",
          childAgeLabel: "Child's age",
          childAgePlaceholder: "For example: 4 years old",
          inquiryLabel: "Message",
          inquiryPlaceholder: "Tell me what concerns you or what kind of support you are looking for",
          submit: "Send enquiry"
        },
        details: {
          heading: "Contact details",
          addressLabel: "Address:",
          addressValue: "Plaza del Pilar, 16, 1, derecha, Oficina 4",
          // Replace the placeholder values below with the final public contact details before launch.
          phoneLabel: "Phone:",
          phoneValue: "To be confirmed",
          emailLabel: "Email:",
          emailValue: "To be confirmed",
          licenseLabel: "Registration no.:",
          licenseValue: "To be confirmed",
          note: "Once you have the final details, this block is ready to be updated with the confirmed information."
        }
      },
      footer: {
        copy: "ChitChat. Speech and language therapy for children and families.",
        backToTop: "Back to top"
      }
    }
  };

  function readPath(source, path) {
    return path.split(".").reduce(function (value, segment) {
      if (value && Object.prototype.hasOwnProperty.call(value, segment)) {
        return value[segment];
      }
      return undefined;
    }, source);
  }

  function getTranslationValue(language, path) {
    const localizedValue = readPath(translations[language], path);
    if (localizedValue !== undefined) {
      return localizedValue;
    }
    return readPath(translations.es, path);
  }

  function setMetaContent(element, value) {
    if (!element || typeof value !== "string") return;
    element.setAttribute("content", value);
  }

  function updateSeoMetadata(language) {
    const meta = getTranslationValue(language, "meta");
    if (!meta) return;

    if (typeof meta.title === "string") {
      document.title = meta.title;
      setMetaContent(seoElements.ogTitle, meta.title);
      setMetaContent(seoElements.twitterTitle, meta.title);
    }

    if (typeof meta.description === "string") {
      setMetaContent(seoElements.description, meta.description);
      setMetaContent(seoElements.ogDescription, meta.description);
      setMetaContent(seoElements.twitterDescription, meta.description);
    }

    if (typeof meta.imageAlt === "string") {
      setMetaContent(seoElements.ogImageAlt, meta.imageAlt);
      setMetaContent(seoElements.twitterImageAlt, meta.imageAlt);
    }

    if (typeof meta.locale === "string") {
      setMetaContent(seoElements.ogLocale, meta.locale);
    }

    if (typeof meta.alternateLocale === "string") {
      setMetaContent(seoElements.ogLocaleAlternate, meta.alternateLocale);
    }
  }

  function updateUrlMetadata() {
    if (window.location.protocol !== "http:" && window.location.protocol !== "https:") return;

    const currentUrl = new URL(window.location.href);
    currentUrl.hash = "";
    currentUrl.search = "";

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", currentUrl.toString());

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute("content", currentUrl.toString());
  }

  function setActiveLink(activeId) {
    navLinks.forEach(function (link) {
      const isActive = link.getAttribute("href") === "#" + activeId;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function updateMenuLabel(isOpen) {
    if (!navToggle) return;
    const labelKey = isOpen ? "ui.closeMenu" : "ui.openMenu";
    const label = getTranslationValue(currentLanguage, labelKey);
    if (typeof label === "string") {
      navToggle.setAttribute("aria-label", label);
    }
  }

  function closeMenu() {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
    updateMenuLabel(false);
  }

  function getFocusableElements(container) {
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(function (element) {
      return !element.hasAttribute("hidden");
    });
  }

  function renderServiceBlocks(blocks) {
    if (!serviceModalBody) return;
    serviceModalBody.textContent = "";

    blocks.forEach(function (block) {
      if (block.type === "paragraph") {
        const paragraph = document.createElement("p");
        paragraph.textContent = block.text;
        serviceModalBody.appendChild(paragraph);
      }

      if (block.type === "list") {
        const list = document.createElement("ul");

        block.items.forEach(function (item) {
          const listItem = document.createElement("li");
          listItem.textContent = item;
          list.appendChild(listItem);
        });

        serviceModalBody.appendChild(list);
      }
    });
  }

  function getServiceItem(language, serviceId) {
    return getTranslationValue(language, "services.items." + serviceId);
  }

  function updateServiceCards(language) {
    const buttonLabel = getTranslationValue(language, "services.moreButton");

    document.querySelectorAll("[data-service-card]").forEach(function (card) {
      const serviceId = card.dataset.serviceCard;
      const service = getServiceItem(language, serviceId);
      if (!service) return;

      const image = card.querySelector("[data-service-image]");
      const title = card.querySelector("[data-service-title]");
      const preview = card.querySelector("[data-service-preview]");
      const button = card.querySelector("[data-service-button]");

      if (image) {
        image.setAttribute("alt", service.imageAlt);
      }

      if (title) {
        title.textContent = service.title;
      }

      if (preview) {
        preview.textContent = service.preview;
      }

      if (button) {
        button.textContent = buttonLabel;
      }
    });
  }

  function closeServiceModal() {
    if (!serviceModal || serviceModal.hidden) return;
    serviceModal.hidden = true;
    document.body.classList.remove("has-modal-open");
    activeServiceId = null;

    if (activeServiceTrigger) {
      activeServiceTrigger.focus();
    }
  }

  function openServiceModal(serviceId, trigger) {
    const service = getServiceItem(currentLanguage, serviceId);
    if (!serviceModal || !serviceModalTitle || !serviceModalBody || !service) return;

    activeServiceTrigger = trigger || null;
    activeServiceId = serviceId;
    serviceModalTitle.textContent = service.title;
    renderServiceBlocks(service.blocks);
    serviceModal.hidden = false;
    document.body.classList.add("has-modal-open");

    if (serviceModalClose) {
      serviceModalClose.focus();
    }
  }

  function updateLanguageButtons(language) {
    languageButtons.forEach(function (button) {
      const isActive = button.dataset.languageToggle === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function applyStaticTranslations(language) {
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const value = getTranslationValue(language, element.dataset.i18n);
      if (typeof value === "string") {
        element.textContent = value;
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
      const value = getTranslationValue(language, element.dataset.i18nPlaceholder);
      if (typeof value === "string") {
        element.setAttribute("placeholder", value);
      }
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (element) {
      const value = getTranslationValue(language, element.dataset.i18nAriaLabel);
      if (typeof value === "string") {
        element.setAttribute("aria-label", value);
      }
    });

    document.querySelectorAll("[data-i18n-alt]").forEach(function (element) {
      const value = getTranslationValue(language, element.dataset.i18nAlt);
      if (typeof value === "string") {
        element.setAttribute("alt", value);
      }
    });
  }

  function applyTranslations(language) {
    currentLanguage = language;
    document.documentElement.lang = language;

    applyStaticTranslations(language);
    updateServiceCards(language);
    updateSeoMetadata(language);
    updateUrlMetadata();
    updateLanguageButtons(language);
    updateMenuLabel(navToggle && navToggle.getAttribute("aria-expanded") === "true");

    if (activeServiceId && serviceModal && !serviceModal.hidden) {
      const service = getServiceItem(language, activeServiceId);
      if (service && serviceModalTitle) {
        serviceModalTitle.textContent = service.title;
        renderServiceBlocks(service.blocks);
      }
    }

    if (formStatus && formStatus.classList.contains("is-visible")) {
      formStatus.textContent = getTranslationValue(language, "ui.formPreviewMessage");
    }
  }

  function setLanguage(language) {
    if (!SUPPORTED_LANGUAGES.includes(language)) return;
    applyTranslations(language);

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      // Ignore storage failures and keep the current session language only.
    }
  }

  function getInitialLanguage() {
    try {
      const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
        return savedLanguage;
      }
    } catch (error) {
      // Ignore storage failures and fall back to Spanish.
    }

    return "es";
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
      siteNav.classList.toggle("is-open", !isOpen);
      updateMenuLabel(!isOpen);
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) {
        closeMenu();
      }
    });
  }

  languageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setLanguage(button.dataset.languageToggle);
    });
  });

  const sections = document.querySelectorAll("[data-section]");
  if (sections.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          const activeId = entry.target.getAttribute("id");
          setActiveLink(activeId);
        });
      },
      {
        rootMargin: "-45% 0px -40% 0px",
        threshold: 0.01
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  if (serviceModal && serviceOpenButtons.length) {
    serviceOpenButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        openServiceModal(button.dataset.serviceId, button);
      });
    });

    serviceModal.addEventListener("click", function (event) {
      if (event.target.closest("[data-modal-close]")) {
        closeServiceModal();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (serviceModal.hidden) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeServiceModal();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements(serviceModal);
      if (!focusableElements.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    });
  }

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      formStatus.classList.add("is-visible");
      formStatus.textContent = getTranslationValue(currentLanguage, "ui.formPreviewMessage");
      contactForm.reset();
    });
  }

  setLanguage(getInitialLanguage());
})();
