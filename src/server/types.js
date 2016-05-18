/**@flow*/
import type {Store} from '../types'

export type ExpressResponse = {
  status: (code: number) => ExpressResponse,
  json: (data: any) => ExpressResponse,
  send: (data: any) => ExpressResponse,
  set: (key: string, value: string) => ExpressResponse,
  redirect: (code: number | string, path?: string) => ExpressResponse,
  renderMarkup: () => ExpressResponse
}

export type ExpressRequest = {
  url: string,
  params: {[key: string]: string},
  query: {[key: string]: string},
  store: Store
}
