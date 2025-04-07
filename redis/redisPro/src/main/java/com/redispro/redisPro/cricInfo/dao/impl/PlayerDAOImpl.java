package com.redispro.redisPro.cricInfo.dao.impl;

import com.redispro.redisPro.cricInfo.dao.PlayerDAO;
import com.redispro.redisPro.cricInfo.entity.Player;
import com.redispro.redisPro.cricInfo.repository.PlayerRepository;

import java.util.Optional;

public class PlayerDAOImpl implements PlayerDAO {
    // Assuming you have a PlayerRepository instance injected here
    private final PlayerRepository playerRepository;

    public PlayerDAOImpl(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    @Override
    public Optional<Player> findById(String id) {
        return playerRepository.findById(id);
    }

    @Override
    public Player save(Player player) {
        return playerRepository.save(player);
    }

    @Override
    public void deleteById(String id) {
        playerRepository.deleteById(id);
    }

    @Override
    public boolean existsById(String id) {
        return playerRepository.existsById(id);
    }
}
