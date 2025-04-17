import { type BaseDataResp, type BaseListResp } from '#/api/model/baseModel';

/**
 *  @description: OauthProvider info response
 */
export interface OauthProviderInfo {
  id?: number;
  createdAt?: number;
  updatedAt?: number;
  name?: string;
  clientId?: string;
  clientSecret?: string;
  redirectUrl?: string;
  scopes?: string;
  authUrl?: string;
  tokenUrl?: string;
  authStyle?: number;
  infoUrl?: string;
}

/**
 *  @description: OauthProvider list response
 */

export type OauthProviderListResp = BaseListResp<OauthProviderInfo>;

/**
 *  author: gumingdong Su
 *  @description: Oauth log in request parameters
 */
export interface OauthLoginReq {
  state: string;
  provider: string;
}

/**
 *  author: gumingdong Su
 *  @description: redirect information
 */
export interface RedirectInfo {
  URL: string;
}

/**
 *  author: gumingdong Su
 *  @description: redirect response
 */
export type RedirectResp = BaseDataResp<RedirectInfo>;
