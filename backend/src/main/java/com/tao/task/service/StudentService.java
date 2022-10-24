package com.tao.task.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tao.task.model.Student;
import com.tao.task.repository.StudentRepository;
import org.apache.commons.lang3.StringUtils;
import org.jboss.logging.Logger;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service

public class StudentService {

    private final StudentRepository studentRepository;
    private final Logger log = Logger.getLogger(StudentService.class);

    private final ObjectMapper om = new ObjectMapper();

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
        Optional<Student> studentDb = studentRepository.findById(parsId);
        if (studentDb.isPresent()) {
            log.info("Existing student found, removing record");
            studentRepository.deleteById(parsId);
        } else {
            log.info("Student by ID :" + id + "  not found, unable to delete");
        }
    }

    public Student updateStudent(HashMap<String, Object> studentData, Integer id) {
        Optional<Student> studentDb = studentRepository.findById(id);
        //om.configure(SerializationFeature.FAIL_ON_UNWRAPPED_TYPE_IDENTIFIERS, false);
        if (studentDb.isPresent()) {
            Student reqStudent;
            log.info("Existing student found, updating");
            Student finalStudent = studentDb.get();
            reqStudent = om.convertValue(studentData, Student.class);
            if (!StringUtils.isBlank(reqStudent.getStudentName())) {
                finalStudent.setStudentName(reqStudent.getStudentName());
            }
            if (!StringUtils.isBlank(reqStudent.getAddress())) {
                finalStudent.setAddress(reqStudent.getAddress());
            }
            if (!StringUtils.isBlank(reqStudent.getPhone())) {
                finalStudent.setPhone(reqStudent.getPhone());
            }
            if (!StringUtils.isBlank(reqStudent.getMobile())) {
                finalStudent.setMobile(reqStudent.getMobile());
            }
            if (!StringUtils.isBlank(reqStudent.getEmail())) {
                finalStudent.setEmail(reqStudent.getEmail());
            }
            if (reqStudent.getDob() != null) {
                finalStudent.setDob(reqStudent.getDob());
            }
            if (reqStudent.getGender() != null) {
                finalStudent.setGender(reqStudent.getGender());
            }

            studentRepository.save(finalStudent);
            return finalStudent;
        } else {
            log.info("Student not found, unable to update");
            return null;
        }
    }
}
