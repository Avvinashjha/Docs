package com.redispro.redisPro.cricInfo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PlayerDTO {
    private String id;
    private String name;
    private String country;

    public PlayerDTO(String id, String name, String country) {
        this.id = id;
        this.name = name;
        this.country = country;
    }
    public PlayerDTO(){}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
