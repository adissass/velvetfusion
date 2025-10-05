package com.velvetfusion.velvetfusion_api.model;
import jakarta.persistence.*;

    @Entity
    @Table(name = "persona")
    public class Persona {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String name;
        private String arcana;
        private int level;

        // Getters and setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
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

