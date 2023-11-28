package com.example.todoList.task;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

@CrossOrigin(origins = "https://vietanh-vu.github.io/TodoList/")
//@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api")
public class TaskController {
    private final List<Task> tasks;

    public TaskController() {
        tasks = new LinkedList<>();
        tasks.add(new Task(LocalDateTime.now().minusHours(2), "Complete homework", 3, "Todo", "xyz"));
        tasks.add(new Task(LocalDateTime.now().minusDays(1), "Buy groceries", 1, "Done", "def"));
        tasks.add(new Task(LocalDateTime.now().minusMinutes(30), "Read a book", 5, "Doing", "ghi"));
        tasks.add(new Task(LocalDateTime.now().minusDays(2), "Attend meeting", 2, "Todo", "jkl"));
        tasks.add(new Task(LocalDateTime.now().minusHours(1), "Write report", 4, "Doing", "mno"));
        tasks.add(new Task(LocalDateTime.now().minusDays(3), "Exercise", 1, "Done", "pqr"));
        tasks.add(new Task(LocalDateTime.now().minusMinutes(45), "Call friend", 3, "Doing", "stu"));
        tasks.add(new Task(LocalDateTime.now().minusDays(4), "Plan weekend", 5, "Todo", "vwx"));
        tasks.add(new Task(LocalDateTime.now().minusHours(3), "Cook dinner", 2, "Done", "yza"));
        tasks.add(new Task(LocalDateTime.now().minusDays(5), "Visit museum", 4, "Doing", "bcd"));
        tasks.add(new Task(LocalDateTime.now().minusMinutes(15), "Learn coding", 1, "Todo", "efg"));
        tasks.add(new Task(LocalDateTime.now().minusDays(6), "Clean house", 3, "Done", "hij"));
        tasks.add(new Task(LocalDateTime.now().minusHours(4), "Attend workshop", 5, "Doing", "klm"));
        tasks.add(new Task(LocalDateTime.now().minusDays(7), "Watch movie", 2, "Todo", "nop"));
        tasks.add(new Task(LocalDateTime.now().minusMinutes(20), "Travel to new place", 4, "Done", "qrs"));
        tasks.add(new Task(LocalDateTime.now().minusDays(8), "Practice music", 1, "Doing", "tuv"));
        tasks.add(new Task(LocalDateTime.now().minusHours(5), "Write poetry", 3, "Todo", "wxy"));
        tasks.add(new Task(LocalDateTime.now().minusDays(9), "Visit park", 5, "Done", "zab"));
        tasks.add(new Task(LocalDateTime.now().minusMinutes(25), "Complete project", 2, "Doing", "cde"));
        tasks.add(new Task(LocalDateTime.now().minusDays(10), "Study for exam", 4, "Todo", "fgh"));

    }

    @GetMapping("/task")
    public ResponseEntity<?> getTasks() {
        return ResponseEntity
                .ok()
                .body(tasks.stream().sorted().toArray());
    }


    @PostMapping("/task")
    public ResponseEntity<?> insertTask(@RequestBody Task newTask) {
        newTask.setCreateAt(LocalDateTime.now());
        tasks.add(newTask);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Success add task.");
    }

    @PutMapping("/task")
    public ResponseEntity<?> updateTask(@RequestBody Task updateTask) {
        int index = tasks.indexOf(updateTask);
        if (index == -1) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not found task.");
        tasks.set(index, updateTask);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Success update task.");
    }

    @DeleteMapping("/task")
    public ResponseEntity<?> deleteTask(@RequestBody Task task) {
        if (tasks.remove(task)) {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body("Success delete task.");
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Fail to delete task.");
        }
    }
}
