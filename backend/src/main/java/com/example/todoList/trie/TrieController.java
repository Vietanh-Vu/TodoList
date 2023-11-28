package com.example.todoList.trie;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "https://vietanh-vu.github.io/TodoList/")
//@CrossOrigin("http://localhost:5173/")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TrieController {
    private final Trie trie;

    @GetMapping("/trie")
    public ResponseEntity<?> getWord(@RequestParam String prefix) {
        List<String> res = trie.autoComplete(prefix.toLowerCase());
        return ResponseEntity.status(HttpStatus.OK).body(res);
    }

    @PostMapping("/trie/insert")
    public ResponseEntity<?> insertWord(@RequestParam String word) {
        trie.insert(word);
        return ResponseEntity.status(HttpStatus.OK).body(word);
    }

    @PostMapping("/trie/build")
    public ResponseEntity<?> buildTrie(@RequestParam String paragraph) {
        String[] words = paragraph.split("\\s+|\\p{Punct}");
        List<String> wordList = Arrays.asList(words);

        trie.buildTrie(wordList);
        return ResponseEntity.status(HttpStatus.OK).body(wordList);
    }
}
