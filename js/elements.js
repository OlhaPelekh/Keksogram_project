import { descriptions, hashtags, messages, userNames } from "./constants.js";
import { getRandomElement, getRandomNumber } from "../js/random.js";

function getUrl(id) {
  return `photos/${id}.jpg`;
}

const hashtagsCount = {
  min: 2,
  max: 4,
};
function getDescription() {
  const description = getRandomElement(descriptions);
  let resultHashtag = [];
  const countHashtag = getRandomNumber(hashtagsCount.min, hashtagsCount.max);
  while (resultHashtag.length < countHashtag) {
    const hashtag = getRandomElement(hashtags);
    if (!resultHashtag.includes(hashtag)) {
      resultHashtag.push(hashtag);
    }
  }
  return `${description} ${resultHashtag.join("")}`;
}

const likesCount = {
  min: 15,
  max: 200,
};
function getLikes() {
  return getRandomNumber(likesCount.min, likesCount.max);
}

const messagesCount = {
  min: 1,
  max: 2,
};
function getMessage() {
  let resultMessage = [];
  const countMessage = getRandomNumber(messagesCount.min, messagesCount.max);
  while (resultMessage.length < countMessage) {
    const message = getRandomElement(messages);
    if (!resultMessage.includes(message)) {
      resultMessage.push(message);
    }
  }
  return `${resultMessage.join(" ")}`;
}

const avatarId = {
  min: 1,
  max: 6,
};
function getAvatar() {
  const id = getRandomNumber(avatarId.min, avatarId.max);
  return `img/avatar-${id}.svg`;
}

function getUserName() {
  return getRandomElement(userNames);
}

const usersRange = {
  min: 1,
  max: 1000,
};
let usersId = [];
function getUserId() {
  let newId;
  do {
    newId = getRandomNumber(usersRange.min, usersRange.max);
  } while (usersId.includes(newId));
  usersId.push(newId);
  return newId;
}

function getComment() {
  return {
    userId: getUserId(),
    avatar: getAvatar(),
    message: getMessage(),
    name: getUserName(),
  };
}

function getComments(count) {
  const array = Array(count)
    .fill(null)
    .map((_, i) => getComment());
  return array;
}

const commentsCount = {
  min: 1,
  max: 10,
};
function getElement(id) {
  return {
    id: id + 1,
    url: getUrl(id + 1),
    description: getDescription(),
    likes: getLikes(),
    comments: getComments(
      getRandomNumber(commentsCount.min, commentsCount.max)
    ),
  };
}

export function getArray(count) {
  const array = Array(count)
    .fill(null)
    .map((_, i) => getElement(i));
  return array;
}
