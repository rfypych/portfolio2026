// Nav type
export type navLinkType = {
  label: string;
  url: string;
};

// Nav
const navLinks = [
  {
    label: 'Services',
    url: '#services',
  },
  {
    label: 'Projects',
    url: '#works',
  },
  {
    label: 'About',
    url: '#about-me-section',
  },
  {
    label: 'Testimonials',
    url: '#testimonials-section',
  },
  {
    label: 'Credentials',
    url: '#certifications-section',
  },
  {
    label: 'Contact',
    url: '#contact-section',
  },
];
const navbarLinks = [
  {
    label: 'Home',
    url: '#app',
  },
  ...navLinks,
];

const socialLinks = [
  {
    label: 'Instagram',
    url: 'https://instagram.com/rfikl_',
  },
  {
    label: 'Telegram',
    url: 'https://t.me/rfyycrnge',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/rfypych',
  },
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/rofikulhuda/',
  },
  {
    label: 'Threads',
    url: 'https://www.threads.net/@rfikl_',
  },
];

const resourceLinks = [
  {
    label: 'Vue.js',
    url: 'https://vuejs.org/',
  },
  {
    label: 'TypeScript',
    url: 'https://www.typescriptlang.org/',
  },
  {
    label: 'Tailwind CSS',
    url: 'https://tailwindcss.com/',
  },
  {
    label: 'GSAP Animation',
    url: 'https://gsap.com/',
  },
  {
    label: 'Lenis Scroll',
    url: 'https://lenis.darkroom.engineering/',
  },
  {
    label: 'Firebase',
    url: 'https://firebase.google.com/',
  },
  {
    label: 'Vite',
    url: 'https://vitejs.dev/',
  },
];

const heroText =
  'A freelance full-stack developer, making good shit since 2023, hiding bad shit since 2023.';

const locationPlace = `15°22'22.0"N 44°10'39.5"E`;
const locationCountry = 'Yemen, Sanaa';

// cal.com
const dataCalNamespace = '30min';
const dataCalLink = 'brhoom/30min';
const dataCalConfig =
  '{"layout":"month_view", "theme": "dark", "brand": "#8C8C73"}';

export {
  socialLinks,
  resourceLinks,
  heroText,
  locationPlace,
  locationCountry,
  navLinks,
  navbarLinks,
  dataCalNamespace,
  dataCalLink,
  dataCalConfig,
};
