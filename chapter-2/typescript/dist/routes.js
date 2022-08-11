"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
const CreateCourseService_1 = __importDefault(require("./CreateCourseService"));
const createCourse = (request, response) => {
    // dessa forma é possível setar os itens na ordem que quiser
    CreateCourseService_1.default.execute({ name: 'NodeJS', duration: 10, educator: 'Dani' });
    CreateCourseService_1.default.execute({ name: 'ReactJS', educator: "Diego" });
    return response.send();
};
exports.createCourse = createCourse;
