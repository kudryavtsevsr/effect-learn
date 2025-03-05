import { getAPI } from './apiFactory';

export const termsAPI = getAPI();

export type TermsAPI = typeof termsAPI;
