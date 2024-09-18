import {
  getUrl,
  getDescription,
  getLikes,
  getUserId,
  getAvatar,
  getMessage,
  getUserName,
} from "../js/func.js";

function getElement(id) {
  return [
    {
      id: id+1,
      url: getUrl(id+1),
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

let array = [];
function getArray() {
  const max = 25;
  for (let i = 0; i < max; i++) {
    array.push(getElement(i));
  }
  console.log(array);
}

getArray();
