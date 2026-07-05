/**
 * Vertex Infoservices — AI Assistant Chatbot Widget
 * Fully offline — no API key required
 * All company knowledge is baked in
 */
(function () {
  'use strict';

  /* =============================================
     CONFIGURATION
     ============================================= */
  const CONFIG = {
    companyName: 'Vertex Infoservices',
    assistantName: 'Vertex AI',
    welcomeDelay: 800,
    typingDelay: { min: 600, max: 1200 },
  };

  /* =============================================
     COMPANY KNOWLEDGE BASE
     ============================================= */
  const KB = {
    company: {
      name: 'Vertex Infoservices Pvt. Ltd.',
      tagline: 'Transforming Ideas into Intelligent Digital Solutions',
      founded: 'over 20 years of industry experience',
      clients: 'more than 250 clients across diverse industries in India and internationally',
      address: '601, TNR Grandilla, Street 4, Road No. 29, Alkapoor Township, Neknampur, Hyderabad – 500089, Telangana, India',
      phone: '+91-9923924078',
      email: 'info@vertexinfo.co.in',
      website: 'http://localhost:3000',
    },
    services: {
      web: {
        title: 'Web Development',
        desc: 'We design and build secure, responsive websites and enterprise portals. From robust e-commerce solutions to complex content management architectures, our web solutions are fast, SEO-friendly, and optimized for performance.',
      },
      app: {
        title: 'App Development',
        desc: 'Our mobile app division specializes in native iOS/Android development and cross-platform frameworks (Flutter, React Native). We create highly interactive applications with smooth UX and offline-first functionalities.',
      },
      seo: {
        title: 'SEO Services',
        desc: 'Grow your digital footprint and rank higher on search engines. Our SEO specialists perform audit checks, keyword optimization, on-page and off-page optimization, and drive high-intent organic traffic.',
      },
      software: {
        title: 'Custom Software',
        desc: 'We build customized ERPs, CRM systems, SharePoint portals, and custom back-office applications. Our solutions automate operations, streamline communication, and scale smoothly as your business grows.',
      },
      consulting: {
        title: 'IT Consulting',
        desc: 'Leverage our consulting expertise to outline solution architecture, perform legacy modernization, choose correct database engines, configure cloud infrastructure, and plan digital transformation roadmaps.',
      },
      support: {
        title: 'Support & Maintenance',
        desc: 'Ensure maximum uptime and system health with our support agreements. We monitor server loads, check error logs, apply security patches, optimize databases, and provide ongoing enhancements.',
      },
      ai: {
        title: 'AI & Generative AI',
        desc: 'We develop AI-powered solutions including custom AI chatbots, RAG applications, LLM integrations, AI agents, workflow automation, predictive analytics, and enterprise AI consulting.',
      },
      cloud: {
        title: 'Cloud Solutions',
        desc: 'We provide cloud infrastructure services on AWS, Azure, and Google Cloud including serverless architectures, Kubernetes orchestration, DevOps pipelines, and cloud-native application development.',
      },
      data: {
        title: 'Data Engineering',
        desc: 'Our data engineering team builds ETL pipelines, data warehouses, business intelligence dashboards, analytics platforms, and real-time data streaming solutions.',
      },
    },
    sdlc: [
      '1. Requirements Gathering – Detailed business analysis and discovery',
      '2. Architecture & Design – Secure, reliable, scalable system design',
      '3. UI/UX Prototyping – Intuitive, user-friendly wireframes and prototypes',
      '4. Agile Development – High-quality, maintainable code in sprints',
      '5. Quality Assurance – Rigorous automated and manual testing',
      '6. Deployment – CI/CD pipelines and production-ready rollouts',
      '7. Support & Maintenance – Ongoing monitoring, patches, and enhancements',
    ],
    philosophy: [
      'Client-Centric Innovation – Consultative approach using Cloud, AI, and Analytics',
      'Strategic Partnership – Long-term relationships from strategy to ongoing support',
      'Quality, Security & Reliability – Cloud-native best practices for performance and scalability',
      'Trust Through Transparency – Open communication and accountability throughout every project',
      'Continuous Improvement – Staying ahead of emerging technologies and best practices',
    ],
    industries: ['Healthcare', 'Finance', 'Insurance', 'Retail', 'Manufacturing', 'Logistics', 'Education', 'Real Estate', 'Legal', 'Government', 'Hospitality', 'E-commerce', 'Startups', 'Enterprises'],
    portfolio: 'We have served 250+ clients including global brands, educational institutions, government organizations, and fast-growing startups across India and internationally over 20+ years, delivering enterprise cloud systems, responsive applications, e-commerce platforms, and AI-powered solutions.',
  };

  /* =============================================
     INTENT DETECTION + RESPONSE ENGINE
     ============================================= */
  function detectIntent(msg) {
    const m = msg.toLowerCase();

    // Greetings
    if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|namaste|howdy|greetings|sup)\b/.test(m)) return 'greeting';

    // About company
    if (/who are you|about (vertex|company|you)|what (is|are) vertex|tell me about/.test(m)) return 'about';

    // Contact / location
    if (/(contact|reach|phone|email|address|location|office|where|map|hyderabad|call)/.test(m)) return 'contact';

    // Services overview
    if (/(services?|offer|provide|do you (do|make|build|develop)|what (can|do) you)/.test(m) && !/(web|app|seo|custom|software|consult|support|ai|cloud|data)/.test(m)) return 'services';

    // Specific services
    if (/(web(site)?|portal|e.?commerce|wordpress|cms|landing page)/.test(m)) return 'service_web';
    if (/(mobile|app|ios|android|flutter|react native|apk)/.test(m)) return 'service_app';
    if (/(seo|search engine|rank|keyword|organic|google traffic)/.test(m)) return 'service_seo';
    if (/(erp|crm|sharepoint|custom software|back.?office|enterprise software)/.test(m)) return 'service_software';
    if (/(consult|architect|legacy|transform|roadmap|advise)/.test(m)) return 'service_consulting';
    if (/(support|maintain|uptime|patch|monitor|bug fix)/.test(m)) return 'service_support';
    if (/(ai|artificial intelligence|machine learning|ml|llm|gpt|chatgpt|chatbot|generative|agent|automation|rag|langchain|openai)/.test(m)) return 'service_ai';
    if (/(cloud|aws|azure|google cloud|gcp|kubernetes|devops|serverless|docker)/.test(m)) return 'service_cloud';
    if (/(data|etl|pipeline|warehouse|analytics|bi|dashboard|tableau|power bi)/.test(m)) return 'service_data';

    // Portfolio / work
    if (/(portfolio|work|project|client|case study|example|past work|reference)/.test(m)) return 'portfolio';

    // Industries
    if (/(industr|sector|healthcare|finance|retail|education|logistics|manufactur|real estate|legal|government|hospitality|ecommerce)/.test(m)) return 'industries';

    // Pricing / cost
    if (/(price|cost|quote|budget|how much|rate|charge|fee|estimate|package|plan)/.test(m)) return 'pricing';

    // Process / how you work
    if (/(process|how (do|does)|methodology|agile|sdlc|step|phase|workflow|deliver)/.test(m)) return 'process';

    // Technology / tech stack
    if (/(tech(nology|stack)?|react|node|python|php|javascript|angular|vue|sql|mongodb|postgresql|redis|api)/.test(m)) return 'techstack';

    // Booking / consultation
    if (/(book|schedul|appointment|consult|demo|meet|talk|discuss|get start|start project|hire)/.test(m)) return 'booking';

    // Location / remote work
    if (/(remote|offshore|onsite|india|hyderabad|global|international)/.test(m)) return 'location';

    // Timeline / delivery
    if (/(time|timeline|deadline|deliver|when|how long|duration|days|weeks|months)/.test(m)) return 'timeline';

    // Why us / differentiator
    if (/(why (choose|vertex|you)|different|better|unique|strength|advantage|special)/.test(m)) return 'why';

    // Thanks / bye
    if (/(thank|thanks|bye|goodbye|see you|great|awesome|perfect|got it|understood)/.test(m)) return 'thanks';

    // Help
    if (/help|what can|option|menu/.test(m)) return 'help';

    return 'unknown';
  }

  function generateResponse(intent, msg) {
    const kb = KB;
    switch (intent) {

      case 'greeting':
        return `👋 Hello! Welcome to **Vertex Infoservices**!\n\nI'm your AI assistant. I can help you with:\n• Our services & solutions\n• Pricing & timelines\n• Technology stack\n• Booking a consultation\n\nWhat can I help you with today?`;

      case 'about':
        return `**Vertex Infoservices Pvt. Ltd.** is a leading IT solutions company based in Hyderabad, India.\n\n🏢 **Experience:** ${kb.company.founded}\n👥 **Clients:** ${kb.company.clients}\n🌍 **Presence:** India & International\n\n**Our tagline:** *"${kb.company.tagline}"*\n\nWe empower businesses with robust IT solutions — from web development and mobile apps to AI, cloud, and enterprise software. Would you like to know about our specific services?`;

      case 'contact':
        return `📍 **Office Address:**\n${kb.company.address}\n\n📞 **Phone:** ${kb.company.phone}\n📧 **Email:** ${kb.company.email}\n\nYou can also [fill out our contact form](contact.html) and we'll get back to you within 24 hours!`;

      case 'services':
        return `We offer a comprehensive range of IT services:\n\n🌐 **Web Development** – Responsive websites, portals, e-commerce\n📱 **App Development** – iOS, Android, Flutter, React Native\n🔍 **SEO Services** – Rank higher, drive organic traffic\n💻 **Custom Software** – ERP, CRM, SharePoint, back-office apps\n🤖 **AI & Automation** – Chatbots, AI agents, ML, generative AI\n☁️ **Cloud Solutions** – AWS, Azure, Google Cloud, DevOps\n📊 **Data Engineering** – Pipelines, BI dashboards, analytics\n🔧 **IT Consulting** – Architecture, legacy modernization, roadmaps\n🛡️ **Support & Maintenance** – Uptime monitoring, patches, enhancements\n\nWhich service are you most interested in?`;

      case 'service_web':
        return `🌐 **Web Development**\n\n${kb.services.web.desc}\n\n**What we build:**\n• Corporate & business websites\n• E-commerce platforms\n• Enterprise portals & intranets\n• Content Management Systems (CMS)\n• Landing pages & marketing sites\n• Progressive Web Apps (PWA)\n\nWould you like to discuss your web project? [Contact us](contact.html) or I can help you plan it out!`;

      case 'service_app':
        return `📱 **App Development**\n\n${kb.services.app.desc}\n\n**Platforms & Technologies:**\n• iOS (Swift, Objective-C)\n• Android (Kotlin, Java)\n• Cross-platform (Flutter, React Native)\n• Hybrid apps\n\n**Features we specialize in:**\n• Offline-first architecture\n• Push notifications\n• Payment integrations\n• Real-time data sync\n\nTell me more about your app idea!`;

      case 'service_seo':
        return `🔍 **SEO Services**\n\n${kb.services.seo.desc}\n\n**Our SEO Process:**\n• Technical SEO audit\n• Keyword research & strategy\n• On-page optimization\n• Off-page & link building\n• Content strategy\n• Performance tracking & reporting\n\nLooking to improve your website's search rankings? [Let's talk](contact.html)!`;

      case 'service_software':
        return `💻 **Custom Software Development**\n\n${kb.services.software.desc}\n\n**Solutions we build:**\n• ERP Systems\n• CRM Platforms\n• SharePoint Portals\n• HR Management Systems\n• Inventory Management\n• Custom Back-office Applications\n• API Development & Integration\n\nWhat kind of software solution are you looking for?`;

      case 'service_consulting':
        return `🧠 **IT Consulting**\n\n${kb.services.consulting.desc}\n\n**Consulting Areas:**\n• Solution architecture design\n• Technology stack selection\n• Legacy system modernization\n• Cloud migration strategy\n• Digital transformation roadmap\n• Database optimization\n• Security assessment\n\nNeed expert guidance on your technology decisions? [Book a consultation](contact.html)!`;

      case 'service_support':
        return `🛡️ **Support & Maintenance**\n\n${kb.services.support.desc}\n\n**What's included:**\n• 24/7 server monitoring\n• Security patch management\n• Performance optimization\n• Database maintenance\n• Bug fixes & enhancements\n• Regular backups\n• SLA-based response times\n\nInterested in a support plan? [Contact us](contact.html) for details.`;

      case 'service_ai':
        return `🤖 **AI & Generative AI Solutions**\n\n${kb.services.ai.desc}\n\n**Our AI Capabilities:**\n• Custom AI Chatbots (like this one!)\n• RAG Applications (document Q&A)\n• LLM Integration (GPT, Claude, Gemini)\n• AI Agents & Workflow Automation\n• Predictive Analytics & Forecasting\n• Computer Vision & NLP\n• Machine Learning Models\n• AI Strategy Consulting\n\n**Technologies:** OpenAI, LangChain, LangGraph, Pinecone, Weaviate, Python, FastAPI\n\nReady to bring AI to your business? [Let's discuss](contact.html)!`;

      case 'service_cloud':
        return `☁️ **Cloud Solutions**\n\n${kb.services.cloud.desc}\n\n**Cloud Platforms:**\n• Amazon Web Services (AWS)\n• Microsoft Azure\n• Google Cloud Platform (GCP)\n\n**Services:**\n• Cloud migration & infrastructure\n• Serverless architecture\n• Kubernetes & container orchestration\n• CI/CD pipelines & DevOps\n• Cloud-native app development\n• Cost optimization & security\n\nWhich cloud platform are you working with?`;

      case 'service_data':
        return `📊 **Data Engineering**\n\n${kb.services.data.desc}\n\n**Solutions:**\n• ETL Pipeline Development\n• Data Warehouse Design\n• Business Intelligence Dashboards\n• Real-time Analytics\n• Data Lake Architecture\n• Reporting & Visualization\n\n**Tools & Technologies:**\n• PostgreSQL, MongoDB, Redis\n• Apache Spark, Kafka\n• Power BI, Tableau, Metabase\n\nLooking to unlock insights from your data? [Talk to us](contact.html)!`;

      case 'portfolio':
        return `🏆 **Our Portfolio**\n\n${kb.portfolio}\n\n**Our Experience Includes:**\n• Enterprise cloud systems\n• E-commerce platforms\n• Mobile applications\n• AI-powered solutions\n• Government & educational portals\n• Healthcare & finance applications\n\nWith **20+ years** and **250+ clients**, we have proven expertise across multiple domains.\n\nWant to know more about specific projects? [Visit our Works page](works.html) or [contact us](contact.html)!`;

      case 'industries':
        return `🏭 **Industries We Serve**\n\nWe have delivered solutions across a wide range of sectors:\n\n${kb.industries.map(i => `• ${i}`).join('\n')}\n\nWhich industry are you in? I can suggest the most relevant solutions for your sector.`;

      case 'pricing':
        return `💰 **Pricing**\n\nOur pricing depends on several factors:\n\n• **Scope & complexity** of the project\n• **Technology stack** required\n• **Timeline & urgency**\n• **Integrations** needed\n• **Ongoing support** requirements\n\nWe offer **flexible engagement models:**\n• Fixed price projects\n• Time & material contracts\n• Dedicated team model\n• Monthly retainers\n\nPricing is always customized to your specific needs. The best way to get an accurate estimate is to **share your project requirements** with our team.\n\n📞 Call us: **${kb.company.phone}**\n📧 Email: **${kb.company.email}**\n[Get a Free Quote](contact.html)`;

      case 'process':
        return `⚙️ **Our Development Process**\n\nWe follow a proven full-cycle development methodology:\n\n${kb.sdlc.join('\n')}\n\nWe use **Agile & DevOps** methodologies ensuring faster delivery, greater transparency, and continuous improvement throughout every project phase.\n\nWant to discuss how we'd approach your project?`;

      case 'techstack':
        return `🛠️ **Our Technology Stack**\n\n**Frontend:** React.js, Next.js, Vue.js, Angular, Flutter\n**Backend:** Node.js, Python (FastAPI, Django), PHP (Laravel)\n**Mobile:** Swift, Kotlin, Flutter, React Native\n**AI/ML:** OpenAI, LangChain, Hugging Face, TensorFlow, PyTorch\n**Databases:** PostgreSQL, MongoDB, MySQL, Redis, Elasticsearch\n**Cloud:** AWS, Azure, Google Cloud\n**DevOps:** Docker, Kubernetes, GitHub Actions, Jenkins\n**CMS:** WordPress, Strapi, HubSpot\n\nWe always recommend the best technology for **your specific use case** — not just what's trendy. What kind of project are you working on?`;

      case 'booking':
        return `📅 **Book a Consultation**\n\nWe'd love to learn about your project and see how we can help!\n\n**Ways to reach us:**\n📞 **Phone:** ${kb.company.phone}\n📧 **Email:** ${kb.company.email}\n🌐 **Contact Form:** [Click here](contact.html)\n\n**What to expect:**\n• Free 30-minute discovery call\n• Understanding your business goals\n• Technical feasibility assessment\n• Custom solution recommendation\n• Transparent pricing discussion\n\nWould you like to share a bit about your project so we can prepare?`;

      case 'location':
        return `🌍 **Our Location & Remote Work**\n\n**Head Office:**\n${kb.company.address}\n\n✅ We work with clients **globally** — India, USA, UK, Australia, Middle East, and more.\n✅ **Remote-friendly** — We deliver projects 100% remotely with daily communication.\n✅ **Offshore development** available with significant cost savings vs. Western rates.\n\nDistance is never a barrier to great collaboration!`;

      case 'timeline':
        return `⏱️ **Project Timelines**\n\nTimelines depend on project scope:\n\n• **Simple Website:** 2–4 weeks\n• **E-commerce Platform:** 4–8 weeks\n• **Mobile App (MVP):** 6–10 weeks\n• **Custom Software/ERP:** 8–16 weeks\n• **AI/ML Solution:** 4–12 weeks\n• **Enterprise Platform:** 3–6 months\n\nWe use **Agile sprints** (2-week cycles) so you see progress continuously — not just at the end.\n\nShare your project details and we'll give you an accurate estimate!`;

      case 'why':
        return `⭐ **Why Choose Vertex Infoservices?**\n\n✅ **20+ Years of Experience** — Proven track record\n✅ **250+ Clients Served** — India & international\n✅ **End-to-End Delivery** — From strategy to support\n✅ **Agile Methodology** — Transparent, iterative delivery\n✅ **Full-Stack Expertise** — Web, mobile, AI, cloud, data\n✅ **Client-Centric Approach** — Your goals drive our solutions\n✅ **Quality & Security** — Industry best practices always\n✅ **Long-term Partnership** — We stay with you post-launch\n✅ **Competitive Pricing** — Premium quality, fair rates\n\nOur philosophy: *We measure our success by your success.*\n\nReady to work with us? [Let's connect](contact.html)!`;

      case 'thanks':
        return `You're most welcome! 😊\n\nIf you have any more questions about **Vertex Infoservices** or want to discuss a project, I'm always here.\n\nYou can also reach us directly:\n📞 ${kb.company.phone}\n📧 ${kb.company.email}\n\nHave a great day! 🚀`;

      case 'help':
        return `I can help you with:\n\n🏢 **About Us** – Company background & philosophy\n🛠️ **Services** – Web, App, AI, Cloud, Data, SEO, Consulting\n💼 **Portfolio** – Our past work & clients\n💰 **Pricing** – How we price projects\n⚙️ **Process** – How we work (SDLC)\n🏭 **Industries** – Sectors we serve\n⏱️ **Timelines** – Typical project durations\n📅 **Consultation** – Book a free call\n📍 **Contact** – Phone, email, address\n\nJust ask me anything!`;

      default:
        return `Thank you for your message! I want to make sure I give you accurate information about **Vertex Infoservices**.\n\nI can help with:\n• Our **services** (Web, App, AI, Cloud, SEO, Software)\n• **Pricing** & timelines\n• **Portfolio** & past work\n• **Contact** details & booking a consultation\n\nOr reach us directly:\n📞 **${kb.company.phone}**\n📧 **${kb.company.email}**\n[Contact Us](contact.html)`;
    }
  }

  /* =============================================
     QUICK REPLIES PER INTENT
     ============================================= */
  function getQuickReplies(intent) {
    const maps = {
      greeting:          ['Our Services', 'About Vertex', 'Book a Consultation', 'Contact Details'],
      about:             ['View Our Services', 'Our Portfolio', 'Contact Us'],
      services:          ['Web Development', 'AI Solutions', 'Mobile App', 'Cloud & DevOps'],
      service_ai:        ['📅 Book a Consultation', 'View Our Services', 'Pricing Info'],
      service_web:       ['📅 Book a Consultation', 'Pricing Info', 'Our Process'],
      service_app:       ['📅 Book a Consultation', 'Tech Stack', 'Pricing Info'],
      pricing:           ['📅 Book a Consultation', 'Our Services', 'Our Process'],
      portfolio:         ['📅 Book a Consultation', 'Our Services'],
      booking:           ['📞 Call +91-9923924078', '📧 Email Us', 'View Services'],
      why:               ['📅 Book a Consultation', 'Our Portfolio'],
      industries:        ['Our Services', 'Book a Consultation'],
      unknown:           ['Our Services', 'Book a Consultation', 'Contact Details'],
    };
    return maps[intent] || [];
  }

  /* =============================================
     STATE
     ============================================= */
  let isOpen = false;
  let isTyping = false;
  let hasGreeted = false;

  /* =============================================
     HTML TEMPLATE
     ============================================= */
  function createWidget() {
    const wrapper = document.createElement('div');
    wrapper.id = 'vi-chatbot-root';
    wrapper.innerHTML = `
      <div id="vi-chat-window" role="dialog" aria-label="${CONFIG.assistantName} Chat" aria-hidden="true">
        <div id="vi-chat-header">
          <div class="vi-avatar">
            <img src="hubfs/logo_white_mobile.png" alt="Vertex" style="width:40px;height:40px;object-fit:contain;display:block;">
          </div>
          <div class="vi-header-info">
            <div class="vi-header-name">${CONFIG.assistantName}</div>
            <div class="vi-header-status">Online — Typically replies instantly</div>
          </div>
          <button id="vi-chat-clear" title="Clear conversation" aria-label="Clear conversation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
              <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
            </svg>
          </button>
        </div>

        <div id="vi-chat-messages" role="log" aria-live="polite" aria-relevant="additions"></div>

        <div id="vi-chat-footer">
          <div id="vi-chat-input-wrap">
            <textarea
              id="vi-chat-input"
              placeholder="Ask me about our services, pricing, portfolio…"
              rows="1"
              aria-label="Type your message"
              maxlength="500"
            ></textarea>
            <button id="vi-chat-send" title="Send message" aria-label="Send message" disabled>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
          <div class="vi-footer-note">
            Powered by <strong style="color:rgba(243,115,33,0.7)">Vertex AI</strong> · <a href="contact.html">Talk to a human</a>
          </div>
        </div>
      </div>

      <button id="vi-chat-launcher" aria-label="Open AI Assistant chat" aria-expanded="false">
        <span id="vi-chat-badge">1</span>
        <!-- Vertex logo icon -->
        <img class="icon-chat" src="hubfs/logo_white_mobile.png" alt="Vertex AI" style="width:52px;height:52px;object-fit:contain;position:relative;z-index:1;">
        <!-- Close icon -->
        <svg class="icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="position:relative;z-index:1;color:#fff;">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    `;
    document.body.appendChild(wrapper);
  }

  /* =============================================
     DOM HELPERS
     ============================================= */
  const $ = (id) => document.getElementById(id);

  function getTimestamp() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function appendMessage(role, text, quickReplies = []) {
    const messages = $('vi-chat-messages');
    const isUser = role === 'user';

    const wrap = document.createElement('div');
    wrap.className = `vi-msg ${isUser ? 'user' : 'bot'}`;

    const avatarEl = document.createElement('div');
    avatarEl.className = 'vi-msg-avatar';
    if (isUser) {
      avatarEl.textContent = 'You';
    } else {
      avatarEl.innerHTML = '<img src="hubfs/logo_white_mobile.png" alt="Vertex AI" style="width:28px;height:28px;object-fit:contain;display:block;">';
    }

    const bubble = document.createElement('div');
    bubble.className = 'vi-bubble';
    bubble.innerHTML = formatText(text);

    const ts = document.createElement('div');
    ts.className = 'vi-timestamp';
    ts.textContent = getTimestamp();

    const inner = document.createElement('div');
    inner.style.maxWidth = '100%';
    inner.appendChild(bubble);
    inner.appendChild(ts);

    wrap.appendChild(avatarEl);
    wrap.appendChild(inner);
    messages.appendChild(wrap);

    if (quickReplies.length > 0) {
      const qr = document.createElement('div');
      qr.className = 'vi-quick-replies';
      quickReplies.forEach(label => {
        const btn = document.createElement('button');
        btn.className = 'vi-quick-btn';
        btn.textContent = label;
        btn.addEventListener('click', () => {
          qr.remove();
          // Handle action buttons
          if (label.includes('+91-9923924078')) { window.open('tel:+919923924078'); return; }
          if (label.includes('Email')) { window.open('mailto:info@vertexinfo.co.in'); return; }
          if (label.includes('Book')) { window.open('contact.html'); return; }
          sendMessage(label);
        });
        qr.appendChild(btn);
      });
      messages.appendChild(qr);
    }

    messages.scrollTop = messages.scrollHeight;
    return wrap;
  }

  function showTyping() {
    const messages = $('vi-chat-messages');
    const wrap = document.createElement('div');
    wrap.className = 'vi-msg bot vi-typing';
    wrap.id = 'vi-typing-indicator';
    wrap.innerHTML = `
      <div class="vi-msg-avatar"><img src="hubfs/logo_white_mobile.png" alt="Vertex AI" style="width:28px;height:28px;object-fit:contain;display:block;"></div>
      <div class="vi-bubble">
        <span></span><span></span><span></span>
      </div>`;
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideTyping() {
    const el = $('vi-typing-indicator');
    if (el) el.remove();
  }

  function formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.1);padding:1px 5px;border-radius:3px;font-size:12px">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#f37321;text-decoration:underline;" target="_self">$1</a>')
      .replace(/\n•\s?/g, '<br>• ')
      .replace(/\n(\d+)\.\s/g, '<br>$1. ')
      .replace(/\n/g, '<br>');
  }

  function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 110) + 'px';
  }

  /* =============================================
     SEND MESSAGE
     ============================================= */
  function sendMessage(text) {
    const input = $('vi-chat-input');
    const sendBtn = $('vi-chat-send');
    const msg = text || input.value.trim();
    if (!msg || isTyping) return;

    if (!text) {
      input.value = '';
      input.style.height = 'auto';
    }
    sendBtn.disabled = true;
    isTyping = true;

    appendMessage('user', msg);
    showTyping();

    const intent = detectIntent(msg);
    const delay = CONFIG.typingDelay.min + Math.random() * (CONFIG.typingDelay.max - CONFIG.typingDelay.min);

    setTimeout(() => {
      hideTyping();
      const reply = generateResponse(intent, msg);
      const qr = getQuickReplies(intent);
      appendMessage('bot', reply, qr);
      isTyping = false;
      sendBtn.disabled = input.value.trim().length === 0;
    }, delay);
  }

  /* =============================================
     WELCOME MESSAGE
     ============================================= */
  function showWelcome() {
    if (hasGreeted) return;
    hasGreeted = true;
    showTyping();
    setTimeout(() => {
      hideTyping();
      appendMessage('bot',
        `👋 Hello! Welcome to **Vertex Infoservices**!\n\nI'm **Vertex AI**, your intelligent assistant. I know everything about our company, services, portfolio, and team.\n\nHow can I help you today?`,
        ['🌐 Our Services', '🤖 AI Solutions', '📅 Book a Consultation', '📞 Contact Details']
      );
    }, CONFIG.welcomeDelay);
  }

  /* =============================================
     TOGGLE OPEN / CLOSE
     ============================================= */
  function toggleChat() {
    isOpen = !isOpen;
    const win = $('vi-chat-window');
    const launcher = $('vi-chat-launcher');
    const badge = $('vi-chat-badge');

    win.classList.toggle('open', isOpen);
    launcher.classList.toggle('open', isOpen);
    launcher.setAttribute('aria-expanded', isOpen);
    win.setAttribute('aria-hidden', !isOpen);

    if (isOpen) {
      if (badge) badge.style.display = 'none';
      showWelcome();
      setTimeout(() => $('vi-chat-input')?.focus(), 350);
    }
  }

  /* =============================================
     CLEAR CONVERSATION
     ============================================= */
  function clearChat() {
    hasGreeted = false;
    const messages = $('vi-chat-messages');
    if (messages) messages.innerHTML = '';
    showWelcome();
  }

  /* =============================================
     INIT
     ============================================= */
  function init() {
    createWidget();

    const input = $('vi-chat-input');
    const sendBtn = $('vi-chat-send');

    $('vi-chat-launcher').addEventListener('click', toggleChat);
    $('vi-chat-clear').addEventListener('click', clearChat);
    sendBtn.addEventListener('click', () => sendMessage());

    input.addEventListener('input', () => {
      autoResize(input);
      sendBtn.disabled = input.value.trim().length === 0 || isTyping;
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Show badge after 6 seconds
    setTimeout(() => {
      if (!isOpen) {
        const badge = $('vi-chat-badge');
        if (badge) badge.style.display = 'flex';
      }
    }, 6000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
