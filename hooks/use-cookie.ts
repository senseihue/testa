export const useCookies = () => {
  const get = (name: string) => {
    if (typeof document === "undefined") {
      try {
        // Use dynamic import to avoid bundling on client side
        // Note: this approach might still cause issues with some bundlers
        // but it's a common pattern for dual-side code.
        const { cookies } = require("next/headers");
        const cookieStore = cookies();
        return cookieStore.get(name)?.value;
      } catch (e) {
        return undefined;
      }
    }
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return undefined;
  };

  const set = (name: string, value: string, days?: number) => {
    if (typeof document === "undefined") {
      try {
        const { cookies } = require("next/headers");
        const cookieStore = cookies();
        cookieStore.set(name, value, { maxAge: days ? days * 24 * 60 * 60 : undefined, path: "/" });
        return;
      } catch (e) {
        return;
      }
    }
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };

  const remove = (name: string) => {
    if (typeof document === "undefined") {
      try {
        const { cookies } = require("next/headers");
        const cookieStore = cookies();
        cookieStore.delete(name);
        return;
      } catch (e) {
        return;
      }
    }
    document.cookie = name + "=; Max-Age=-99999999; path=/";
  };

  return { get, set, remove };
};