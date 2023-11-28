package com.example.autocompleted.trie;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
@Service
public class Trie {
    private TrieNode root;

    public Trie() {
        this.root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode current = root;

        for (char ch : word.toCharArray()) {
            current.children.putIfAbsent(ch, new TrieNode());
            current = current.children.get(ch);
        }

        current.isEndOfWord = true;
    }

    public List<String> autoComplete(String prefix) {
        List<String> suggestions = new ArrayList<>();
        TrieNode current = root;

        for (char ch : prefix.toCharArray()) {
            if (!current.children.containsKey(ch)) {
                return suggestions; // Prefix not found
            }
            current = current.children.get(ch);
        }

        findAllWordsWithPrefix(current, prefix, suggestions);
        return suggestions;
    }

    private void findAllWordsWithPrefix(TrieNode node, String currentPrefix, List<String> suggestions) {
        if (node.isEndOfWord) {
            suggestions.add(currentPrefix);
        }

        for (Map.Entry<Character, TrieNode> entry : node.children.entrySet()) {
            findAllWordsWithPrefix(entry.getValue(), currentPrefix + entry.getKey(), suggestions);
        }
    }

    public void buildTrie(List<String> words) {
        for (String word : words) {
            this.insert(word.toLowerCase());
        }
    }
}
