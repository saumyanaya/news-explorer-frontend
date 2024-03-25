export const authorize = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        email === "Yasmeen_Abernathy@hotmail.com" &&
        password ===
          "$2a$10$ld3ZnoSxn5bJKCkOwffcLuVPWiz.VoKxrVpcPgNb0JOZCzxw8G7uq"
      ) {
        resolve({
          token:
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};

export const checkToken = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        email === "Yasmeen_Abernathy@hotmail.com" &&
        password ===
          "$2a$10$ld3ZnoSxn5bJKCkOwffcLuVPWiz.VoKxrVpcPgNb0JOZCzxw8G7uq"
      ) {
        resolve({
          data: {
            name: "Lazaro Bins",
            email: "Yasmeen_Abernathy@hotmail.com",
            id: "65fe8d4286e7f1cbc0049590",
          },
        });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};
