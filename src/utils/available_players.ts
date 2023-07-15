export const availablePlayers = [
  {
    origin: 'voidboost.net',
    hrefs: ['https://voidboost.net'],
    path_movie: '/embed',
    path_serial: '/embed',
    key: 'kp',
    construct: (arg) => {
      return '/' + arg;
    },
  },
  {
    origin: '47.annacdn.cc',
    hrefs: ['https://47.annacdn.cc/bPc1TBx1jCZH'],
    path_movie: '',
    path_serial: '',
    key: 'kp',
    construct: (arg) => {
      return '?kp_id=' + arg;
    },
  },
  {
    origin: '47.svetacdn.in',
    hrefs: ['https://47.svetacdn.in/bPc1TBx1jCZH'],
    path_movie: '',
    path_serial: '',
    key: 'kp',
    construct: (arg) => {
      return '?kp_id=' + arg;
    },
  },
  {
    origin: 'api.wprefix.ws',
    hrefs: [
      'https://api.hostemb.ws/embed',
      'https://api.strvid.ws/embed',
      'https://api.tobaco.ws/embed',
      'https://api.hostemb.ws/embed',
      'https://api.getcodes.ws/embed',
      'https://api.loadbox.ws/embed',
      'https://api1607865863.synchroncode.com/embed',
      'https://api1620722761.tobaco.ws/embed',
      'https://api1607865942.synchroncode.com/embed',
      'https://api1635150719.delivembd.ws/embed',
    ],
    path_movie: '/kp',
    path_serial: '/kp',
    key: 'kp',
    construct: (arg) => {
      return '/' + arg;
    },
  },
];
