// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';

const getItem = (key: string): string => document.cookie.split('; ').reduce((total, currentCookie) => {
  const item = currentCookie.split('=');
  const storedKey = item[0];
  const storedValue = item[1];

  return key === storedKey ? decodeURIComponent(storedValue) : total;
}, '');

const setItem = (key: string, value: string, numberOfDays: number) => {
  const now = new Date();

  // set the time to be now + numberOfDays
  now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000);

  document.cookie = `${key}=${value}; expires=${now.toUTCString()}; path=/`;
};

export declare type CookieHook = [
  string,
  (v: string, nod?: number) => void,
];

/**
 *
 * @param {String} key The key to store our data to
 * @param {String} defaultValue The default value to return in case the cookie doesn't exist
 */
export const useCookie = (key: string, defaultValue = ''): [string, (v: string, nod?: number) => void] => {
  const getCookie = () => getItem(key) || defaultValue;
  const [cookie, setCookie] = useState(getCookie());

  const updateCookie = (value: string, numberOfDays = 5) => {
    setCookie(value);
    setItem(key, value, numberOfDays);
  };

  return [cookie, updateCookie];
};
