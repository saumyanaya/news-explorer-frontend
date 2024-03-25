import { newsOptions } from "./constants";

export const fetchCards = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(newsOptions);
    }, 1000);
  });
};
