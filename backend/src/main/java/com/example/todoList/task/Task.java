package com.example.todoList.task;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Task implements Comparable<Task> {
    private LocalDateTime createAt;
    private String name;
    private int priority;
    private String status;
    private String note;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return Objects.equals(createAt, task.createAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(createAt);
    }

    @Override
    public int compareTo(Task o) {
        return o.createAt.compareTo(this.createAt);
    }

    @Override
    public String toString() {
        return "Task{" +
                "createAt=" + createAt +
                ", name='" + name + '\'' +
                ", priority=" + priority +
                ", status='" + status + '\'' +
                ", note='" + note + '\'' +
                '}';
    }
}
