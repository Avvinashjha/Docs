package com.redispro.redisPro.cricInfo.controller;

import com.redispro.redisPro.cricInfo.dto.PlayerDTO;
import com.redispro.redisPro.cricInfo.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/players")
public class PlayerController {
    @Autowired
    private PlayerService playerService;

    @GetMapping("/load")
    public ResponseEntity<List<PlayerDTO>> loadPlayers(@RequestParam(defaultValue = "0") int offset) {
        List<PlayerDTO> saved = playerService.fetchAndStorePlayers(offset);
        return ResponseEntity.ok(saved);
    }
}
