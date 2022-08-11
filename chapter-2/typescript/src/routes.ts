import {Request, Response} from 'express'
import CreateCourseService from './CreateCourseService'

export const createCourse = (request: Request, response: Response) => {
  // dessa forma é possível setar os itens na ordem que quiser
  CreateCourseService.execute({name:'NodeJS', duration:10, educator:'Dani'})
  CreateCourseService.execute({name: 'ReactJS', educator: "Diego"}) // não foi passado a duration então ela retornou o valor default
  return response.send()
}