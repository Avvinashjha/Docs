package com.redispro.redisPro.cricInfo.entity;

import com.redispro.redisPro.cricInfo.dto.PlayerDTO;
import lombok.Data;

import java.util.List;

@Data
public class PlayerApiResponse {
    private String status;
    private List<PlayerDTO> data;
}
