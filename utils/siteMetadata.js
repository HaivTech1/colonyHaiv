const siteMetadata = {
  title: 'Colony',
  author: 'HaivTech',
  headerTitle: 'The future of living',
  description: 'The future of living',
  snippets: 'The future of living',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://colony.com.ng',
  siteRepo: 'https://github.com/HaivTech/colony',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'colonyent9@gmail.com',
  phone: '09066100815',
  github: 'https://github.com/HiveTech22',
  twitter: 'https://twitter.com/colony',
  linkedin: 'https://www.linkedin.com/in/colony/',
  website: 'https://colony.com.ng',
  locale: 'en-US',
  analytics: {
    plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    umamiWebsiteId: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    googleAnalyticsId: 'G-F6V2QTJ628', // e.g. UA-000000-2 or G-XXXXXXX
  },
  newsletter: {
    provider: 'emailOctopus',
  },
  comment: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      inputPosition: 'bottom',
      lang: 'en',
      darkTheme: 'dark',
      themeURL: '',
    },
  },
  socialAccount: {
    twitter: 'Thecolony5',
  },
}

module.exports = siteMetadata
