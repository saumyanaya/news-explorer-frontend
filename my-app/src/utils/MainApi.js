// class MainApi {
//   constructor(options) {
//     this.options = options;
//   }

//   setToken(token) {
//     this.token = token;
//   }

//   register(credentials) {
//     return this.authRequest("/signup", "POST", JSON.stringify(credentials));
//   }

//   authorize(credentials) {
//     return this.authRequest("/signin", "POST", JSON.stringify(credentials));
//   }

//   getUser() {
//     return this.request("/users/me", "GET");
//   }

//   getSavedArticles() {
//     return this.request("/articles", "GET");
//   }

//   getAppInfo() {
//     return Promise.all([this.getSavedArticles(), this.getUser()]);
//   }

//   addBookmark(article) {
//     return this.request(
//       "/articles",
//       "POST",
//       JSON.stringify({
//         keyword: article.keyword,
//         title: article.title,
//         description: article.description,
//         publishedAt: article.publishedAt,
//         source: article.source,
//         url: article.url,
//         urlToImage: article.urlToImage,
//       })
//     );
//   }

//   removeBookmark(articleId) {
//     return this.request(`/articles/${articleId}`, "DELETE");
//   }

//   request(mainApi, method, body) {
//     return fetch(`${this.options.baseUrl}${mainApi}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${this.token}`,
//       },
//       method,
//       body,
//     }).then(async (res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       const body = await res.json();
//       return Promise.reject(body.error || body.message);
//     });
//   }

//   authRequest(mainApi, method, body) {
//     return fetch(`${this.options.baseUrl}${mainApi}`, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//       method,
//       body,
//     }).then(async (res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       const body = await res.json();
//       return Promise.reject(body.error || body.message);
//     });
//   }
// }

// const mainApi = new MainApi({
//   baseUrl: "https://saumya.jumpingcrab.com/",
// });

// export default mainApi;
