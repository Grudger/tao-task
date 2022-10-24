package com.tao.task.controller;

import com.tao.task.service.StudentService;
import org.joda.time.DateTime;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

//@Controller
public class StudentController {

    //private final StudentService studentService;

    /*public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }*/

    /*@GetMapping("/home")
    public ModelAndView test() {
        ModelAndView modelAndView = new ModelAndView("homePage");
        modelAndView.addObject("name", "Sok Ean");
        modelAndView.addObject("studentList", studentService.getAllStudents());
        modelAndView.addObject("dateTime", new DateTime());
        return modelAndView;
    }*/

}
