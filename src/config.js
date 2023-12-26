module.exports = {
  email: 'alessajohar@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/aafiqah',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/fykalessa',
    },
    {
      name: 'Linkedin',
      url: 'https://my.linkedin.com/in/alessaafiqahjohar',
    },
    {
      name: 'Youtube',
      url: 'https://www.youtube.com/@lezjoy8',
    },
    {
      name: 'Figma',
      url: 'https://www.figma.com/@lezjoy8',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Portfolio',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#64ffda',
    darkpurple: '#340034',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
