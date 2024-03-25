import dayjs from "dayjs";
import { KEY, MAXDAYS } from "./constants";

const now = dayjs();
const currentDate = now.format("YYYY-MM-DD");
const pastDate = now.subtract(MAXDAYS, "day").format("YYYY-MM-DD");
class NewsApi {
  constructor(options) {
    this.options = options;
  }

  searchNews(keyword) {
    return fetch(
      `${this.options.baseUrl}?q=${keyword}&from=${pastDate}&to=${currentDate}&pageSize=100&language=en&apiKey=${KEY}`,
      {
        method: "GET",
      }
    ).then(async (res) => {
      if (res.ok) {
        return res.json();
      }
      const body = await res.json();
      return Promise.reject(body.error || body.message);
    });
  }
}

const newsApi = new NewsApi({
  baseUrl: "https://nomoreparties.co/news/v2/everything",
});

export default newsApi;
