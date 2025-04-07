package com.redispro.redisPro.cricInfo.repository;

import com.redispro.redisPro.cricInfo.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, String> {
    boolean existsById(String id);
}

