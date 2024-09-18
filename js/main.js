import { descriptions, hashtags, messages, userNames } from "./constants.js";
import { getRandomElement, getRandomNumber } from "../js/func.js";

function getUrl(id) {
  return `photos/${id}.jpg`;
}

function getDescription() {
  const description = getRandomElement(descriptions);

  let resultHashtag = [];
  const minCount = 2;
  const maxCount = 4;
  const countHashtag = getRandomNumber(minCount, maxCount);
  while (resultHashtag.length < countHashtag) {
    const hashtag = getRandomElement(hashtags);
    if (!resultHashtag.includes(hashtag)) {
      resultHashtag.push(hashtag);
    }
  }
  return `${description} ${resultHashtag.join("")}`;
}

export function getLikes() {
  const minLikes = 15;
  const maxLikes = 200;
  const countLikes = getRandomNumber(minLikes, maxLikes);
  return countLikes;
}

export function getMessage() {
  let resultMessage = [];
  const minCount = 1;
  const maxCount = 2;
  const countMessage = getRandomNumber(minCount, maxCount);
  while (resultMessage.length < countMessage) {
    const message = getRandomElement(messages);
    if (!resultMessage.includes(message)) {
      resultMessage.push(message);
    }
  }
  return `${resultMessage.join(" ")}`;
}

export function getAvatar() {
  const min = 1;
  const max = 6;
  const id = getRandomNumber(min, max);
  return `img/avatar-${id}.svg`;
}

export function getUserName() {
  return getRandomElement(userNames);
}

export function getUserId(i) {
  let arrayId = [];
  const min = 1;
  const max = 1000;
  const countId = 25;
  while (arrayId.length < countId) {
    const id = getRandomNumber(min, max);
    if (!arrayId.includes(id)) {
      arrayId.push(id);
    }
  }
  return arrayId[i];
}

function getElement(id) {
  return [
    {
      id: id + 1,
      url: getUrl(id + 1),
      description: getDescription(),
      likes: getLikes(),
      comments: [
        {
          userId: getUserId(id),
          avatar: getAvatar(),
          message: getMessage(),
          name: getUserName(),
        },
      ],
    },
  ];
}

function getArray() {
  const max = 25;
  const array = Array(max)
    .fill(null)
    .map((_, i) => getElement(i));
  console.log(array);
}
  
getArray();
