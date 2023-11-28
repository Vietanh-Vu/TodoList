package com.example.autocompleted;

import com.example.autocompleted.trie.Trie;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
@RequiredArgsConstructor
public class TodoApplication implements CommandLineRunner {
    private final Trie trie;

    public static void main(String[] args) {
        SpringApplication.run(TodoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
//        String inputText = "In computer science, a trie, also called digital tree or prefix tree, is a type of k-ary search tree, a tree data structure used for locating specific keys from within a set. These keys are most often strings, with links between nodes defined not by the entire key, but by individual characters. In order to access a key (to recover its value, change it, or remove it), the trie is traversed depth-first, following the links between nodes, which represent each character in the key.";
        String inputText = "Hello my name is vietanh hi him hem";
        String[] words = inputText.split("\\s+|\\p{Punct}");
        List<String> wordList = Arrays.asList(words);

        trie.buildTrie(wordList);
    }
}
