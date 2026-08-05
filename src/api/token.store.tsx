let accessToken: null | string = null;
let expiresAt: null | number = null;
export const tokenStore = {
  set(token: string, ttls: number) {
    accessToken = token;
    expiresAt = Date.now() + ttls * 1000;
  },
  clear() {
    accessToken = null;
    expiresAt = null;
  },
  get() {
    return accessToken;
  },
  getExiresAt() {
    return expiresAt;
  },
};
