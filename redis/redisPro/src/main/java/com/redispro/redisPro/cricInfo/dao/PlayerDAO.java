package com.redispro.redisPro.cricInfo.dao;

import com.redispro.redisPro.cricInfo.entity.Player;

import java.util.Optional;

public interface PlayerDAO {
    Optional<Player> findById(String id);
    Player save(Player player);
    void deleteById(String id);
    boolean existsById(String id);
}
