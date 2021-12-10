module.exports = {
  pwa: {
    name: 'Tote',
    themeColor: '#e0f7e0',
    msTileColor: '#e0f7e0',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    manifestOptions: {
      start_url: '/',
      scope_url: '/',
      display: 'standalone',
      orientation: 'portrait',
      icons: [
        {
          src: '/img/icons/icon-72x72.png',
          type: 'image/png',
          sizes: '72x72',
        },
        {
          src: '/img/icons/icon-96x96.png',
          type: 'image/png',
          sizes: '96x96',
        },
        {
          src: '/img/icons/icon-128x128.png',
          type: 'image/png',
          sizes: '128x128',
        },
        {
          src: '/img/icons/icon-144x144.png',
          type: 'image/png',
          sizes: '144x144',
        },
      ],
    },
  },
}
