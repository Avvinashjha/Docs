package com.redispro.redisPro.cricInfo.service.impl;

import com.redispro.redisPro.cricInfo.api.CricApiService;
import com.redispro.redisPro.cricInfo.dao.PlayerDAO;
import com.redispro.redisPro.cricInfo.dto.PlayerDTO;
import com.redispro.redisPro.cricInfo.entity.Player;
import com.redispro.redisPro.cricInfo.service.PlayerService;
import com.redispro.redisPro.cricInfo.utils.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlayerServiceImpl implements PlayerService {
    @Autowired
    private CricApiService apiService;

    @Autowired
    private PlayerDAO playerDAO;

    @Autowired
    private RedisUtil redisUtil;

    @Override
    public List<PlayerDTO> fetchAndStorePlayers(int offset) {
        List<PlayerDTO> allPlayers = apiService.fetchPlayers(offset);
        List<PlayerDTO> stored = new ArrayList<>();

        for (PlayerDTO dto : allPlayers) {
            if (!playerDAO.existsById(dto.getId())) {
                Player entity = new Player(dto.getId(), dto.getName(), dto.getCountry());
                playerDAO.save(entity);
                redisUtil.cachePlayer(dto); // store in cache
                stored.add(dto);
            }
        }
        return stored;
    }
}
