import instance from './http'
import BaseUrl from './base'

export const exampleService = (): Promise<any> => instance.get(`${BaseUrl.example}/api/v1/topics`)
export const characterService = (): Promise<any> => instance.get(`${BaseUrl.character}/api/people/`)
