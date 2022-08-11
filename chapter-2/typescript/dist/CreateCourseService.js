"use strict";
/*
  name - string
  duration -  number
  educator - string
*/
Object.defineProperty(exports, "__esModule", { value: true });
// a ideia é que a função receba dados pra poder criar o curso
class CreateCourseService {
    // a interface foi utilizada para tipar para não ter que seguir o padrão de itens e sim setar eles como quiser
    // é possível setar um valor default para a variável como foi feito na duration
    execute({ name, duration = 8, educator }) {
        console.log(name, duration, educator);
    }
}
exports.default = new CreateCourseService();
