const staticTranslation = {
  singIn: ['Sign in', 'Войти', 'Увайсці '],
  singOut: ['Sing out', 'Выйти', 'Выхад'],
  temperature: ['Temperature', 'Температура', 'Tэмпература'],
  feelsLike: ['Feels like', 'Ощущается как', 'адчуваецца як'],
  regis: ['Sign In and Registarion', 'Вход и Регистсрация', 'Уваход i Рэгистрация'],
  email: ['Email', 'Почта', 'Пошта'],
  emailEnt: ['Enter email', 'Введите почту', 'Увядзіце пошту'],
  pass: ['Password', 'Пороль', 'Пароль'],
  passEnt: ['Enter password', 'Введите пороль', 'Увядзiце пароль'],
  nickName: ['Name of Nickname', 'Имя или Никнейм', 'Iмя альбо Нiкнэйм'],
  nickNameEnt: ['Enter name of nickname', 'Введите имя или никнейм', 'Увядзiце iмя альбо нiкнэйм'],
  signInBtn: ['Sign in', 'Вход', 'Уваход'],
  regBtn: ['Registration', 'Регистрация', 'Рэгiстрацыя'],
  ratethis: ['Rate this sight', 'Оцени достопримечательность', 'Ацані славутасць'],
  average: ['Average rate', 'Средняя оценка', 'Средняя оценка'],
  sendrate: ['Rate', 'Оцени', 'Ацэнiць'],
  noRate: ['No rates yet', 'Пока нет оценок', 'Пакуль няма адзнак']

};

export const sendTranslation = (field) => {
  switch (field) {
    case 'singIn':
      return staticTranslation.singIn
    case 'singOut':
      return staticTranslation.singOut
    case 'temperature':
      return staticTranslation.temperature
    case 'feelsLike':
      return staticTranslation.feelsLike
    case 'regis':
      return staticTranslation.regis
    case 'email':
      return staticTranslation.email
    case 'emailEnt':
      return staticTranslation.emailEnt
    case 'pass':
      return staticTranslation.pass
    case 'passEnt':
      return staticTranslation.passEnt
    case 'nickName':
      return staticTranslation.nickName
    case 'nickNameEnt':
      return staticTranslation.nickNameEnt
    case 'signInBtn':
      return staticTranslation.signInBtn
    case 'regBtn':
      return staticTranslation.regBtn
    case 'rateThis':
      return staticTranslation.ratethis
    case 'average':
      return staticTranslation.average
    case 'rateSend':
      return staticTranslation.sendrate
    case 'noMark':
      return staticTranslation.noRate
    default: break;

  }
};