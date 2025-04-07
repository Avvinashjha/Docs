package com.redispro.redisPro.cricInfo.service;

import com.redispro.redisPro.cricInfo.dto.PlayerDTO;

import java.util.List;

public interface PlayerService {
    List<PlayerDTO> fetchAndStorePlayers(int offset);
}
