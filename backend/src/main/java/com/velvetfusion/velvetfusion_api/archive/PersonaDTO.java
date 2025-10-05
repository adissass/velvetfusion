package com.velvetfusion.velvetfusion_api.archive;

import com.fasterxml.jackson.annotation.*;

public class PersonaDTO {
    private String arcana;

    @JsonProperty("lvl")
    private int level;

    public PersonaDTO() {
    }
    public PersonaDTO(String arcana, int level) {
        this.arcana = arcana;
        this.level = level;
    }

    public String getArcana() {
        return arcana;
    }

    public void setArcana(String arcana) {
        this.arcana = arcana;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String toString() {
        return "\narcana:" + arcana +
                "\nlevel:" + level;
    }
}
