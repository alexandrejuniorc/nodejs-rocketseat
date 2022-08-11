/* 
  name - string
  duration -  number 
  educator - string
*/

// interface 
interface Course {
  name: string,
  duration?: number, // a ? serve para dizer que a variável é opcional setar ela ou não
  educator: string
}


// a ideia é que a função receba dados pra poder criar o curso
class CreateCourseService {
  // a interface foi utilizada para tipar para não ter que seguir o padrão de itens e sim setar eles como quiser
  // é possível setar um valor default para a variável como foi feito na duration
  execute ({name, duration = 8, educator}: Course){
    console.log(name, duration, educator)
  }
}

export default new CreateCourseService ()