package com.pilot.watchstore.exceptions;


import com.pilot.watchstore.exceptions.handlers.*;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Map;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler
    public final ResponseEntity<Object> handleUniqueConstraints(ValueAlreadyExistsException ex){
        ValueAlreadyExistsException exceptionResponse = new ValueAlreadyExistsException(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> invalidParameterException(InvalidParameterException ex){
        InvalidParameterException exceptionResponse = new InvalidParameterException(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }



    @ExceptionHandler(RequestedResourceNotFoundException.class)
    public ResponseEntity<Object> entityNotFound(InvalidParameterException ex) {
        RequestedResourceNotFoundException exceptionResponse = new RequestedResourceNotFoundException(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<Object> validationFailure(ValidationException exc) {
        Map<String,String> errorMap = exc.getErrors();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMap);
    }


}
