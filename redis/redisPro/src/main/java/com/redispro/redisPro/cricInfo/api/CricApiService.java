package com.redispro.redisPro.cricInfo.api;

import com.redispro.redisPro.cricInfo.dto.PlayerDTO;
import com.redispro.redisPro.cricInfo.entity.PlayerApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Objects;

public class CricApiService {

    @Value("${cricket.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    private final String PLAYER_API = "https://api.cricapi.com/v1/players?apikey=";

    public List<PlayerDTO> fetchPlayers(int offset) {
        String url = PLAYER_API + apiKey + "&offset=" + offset;
        ResponseEntity<PlayerApiResponse> response = restTemplate.getForEntity(url, PlayerApiResponse.class);
        return Objects.requireNonNull(response.getBody()).getData();
    }
}
