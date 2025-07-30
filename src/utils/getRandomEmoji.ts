export const getRandomEmoji = (emojis: string[]) => {
  return emojis[Math.floor(Math.random() * emojis.length)];
};
