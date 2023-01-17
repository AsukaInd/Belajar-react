const TOKENS_KEY = "t";

export const ADMIN_KEY = "1";
export const SUBSCRIBER_KEY = "2";
export const OFFICER_KEY = "3";
export const FREELANCER_KEY = "4";
export const FREELANCER_ADMIN_KEY = "5";

class Token {
   setToken(key, token) {
      const currentToken = this.getTokens();

      return window.localStorage.setItem(
         TOKENS_KEY,
         JSON.stringify({
            ...currentToken,
            [key]: token,
         })
      );
   }

   getTokens() {
      const currentToken = window.localStorage.getItem(TOKENS_KEY);

      return JSON.parse(currentToken);
   }

   getTokenId(token) {
      const currentToken = this.getTokens();

      if (currentToken) {
         return Object.entries(currentToken).find(
            ([key, value]) => value === token
         )[0];
      }

      return false;
   }

   deleteToken(key) {
      const currentToken = this.getTokens();

      delete currentToken[key];

      return window.localStorage.setItem(
         TOKENS_KEY,
         JSON.stringify(currentToken)
      );
   }

   deleteAllTokens() {
      return window.localStorage.removeItem(TOKENS_KEY);
   }
}

export const tokenStorage = new Token();
