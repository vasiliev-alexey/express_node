const fortuneCookies = [
  'Победи свои страхи, или они победят тебя.',
  'Рекам нужны истоки.',
  'Не бойся неведомого.',
  'Тебя ждет приятный сюрприз.',
  'Будь проще везде, где только можно.',
];
const getFortune = () => {
  const idx = Math.floor(Math.random() * fortuneCookies.length);
  return fortuneCookies[idx];
};

export default getFortune;
