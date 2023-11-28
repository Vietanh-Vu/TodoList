package com.example.todoList;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Response {
    private int status;
    private String message;
    private Object data;
}
