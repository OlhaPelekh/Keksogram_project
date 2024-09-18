import { descriptions, hashtags, messages, userNames } from "./constants.js";

export function getUrl(id) {
  return `photos/${id}.jpg`;
}

export function getDescription() {
  const numberDescription = Math.floor(Math.random() * descriptions.length);
  const description = descriptions[numberDescription];

  let resultHashtag = [];
  const minCount = 3;
  const maxCount = 4;
  const countHashtag =
    Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
  while (resultHashtag.length < countHashtag) {
    const numberHashtag = Math.floor(Math.random() * hashtags.length);
    const hashtag = hashtags[numberHashtag];
    if (!resultHashtag.includes(hashtag)) {
      resultHashtag.push(hashtag);
    }
  }
  return `${description} ${resultHashtag.join("")}`;
}

export function getLikes() {
  const minLikes = 15;
  const maxLikes = 200;
  const countLikes =
    Math.floor(Math.random() * (maxLikes - minLikes + 1)) + minLikes;
  return countLikes;
}

export function getMessage() {
  let resultMessage = [];
  const minCount = 1;
  const maxCount = 2;
  const countMessage =
    Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
  while (resultMessage.length < countMessage) {
    const numberMessage = Math.floor(Math.random() * messages.length);
    const message = messages[numberMessage];
    if (!resultMessage.includes(message)) {
      resultMessage.push(message);
    }
  }
  return `${resultMessage.join(" ")}`;
}

export function getAvatar() {
  const min = 1;
  const max = 6;
  const id = Math.floor(Math.random() * (max - min + 1)) + min;
  return `img/avatar-${id}.svg`;
}

export function getUserName() {
  const min = 0;
  const max = userNames.length - 1;
  const id = Math.floor(Math.random() * (max - min + 1)) + min;
  return userNames[id];
}

export function getUserId(i) {
  const min = 1;
  const max = 1000;
  const countId = 25;
  let arrayId = [];

  while (arrayId.length < countId) {
    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!arrayId.includes(id)) {
      arrayId.push(id);
    }
  }
  return arrayId[i];
}
