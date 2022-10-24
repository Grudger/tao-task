package com.tao.task.service;

import com.tao.task.model.Student;
import com.tao.task.repository.StudentRepository;
import org.jboss.logging.Logger;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class StudentService {

    private final StudentRepository studentRepository;
    private final Logger log = Logger.getLogger(StudentService.class);

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        log.info("Number of students found : " + students.size());
        return students;
    }

    public Student addStudent(Student student) {
        Optional<Student> studentDb = studentRepository.findByEmail(student.getEmail());
        if (studentDb.isEmpty()) {
            log.info("Adding new student record");
            return studentRepository.save(student);
        } else {
            log.info("Student already exists !");
            return null;
        }
    }

    public Student editStudent(Student student) {
        Optional<Student> studentdb = studentRepository.findById(student.getStudentId());
        if (studentdb.isPresent()) {
            log.info("Existing student found, updating");
            studentRepository.save(student);
            return student;
        } else {
            log.info("Student not found, unable to update");
            return null;
        }
    }

    public void deleteStudent(String id) {
        Integer parsId = Integer.parseInt(id);
        Optional<Student> studentdb = studentRepository.findById(parsId);
        if (studentdb.isPresent()) {
            log.info("Existing student found, removing record");
            studentRepository.deleteById(parsId);
        } else {
            log.info("Student by ID :" + id + "  not found, unable to delete");
        }
    }

}
