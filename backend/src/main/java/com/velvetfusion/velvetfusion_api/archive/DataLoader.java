package com.velvetfusion.velvetfusion_api.archive;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

public class DataLoader {
    public static Map<String, PersonaDTO> loadPersonaData(String filename) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);

        InputStream inputStream = DataLoader.class.getClassLoader().getResourceAsStream(filename);

        if (inputStream == null) {
            throw new IOException("Resource not found: " + filename);
        }

        // Parse the rich JSON structure
        JsonNode rootNode = mapper.readTree(inputStream);
        Map<String, PersonaDTO> personaMap = new HashMap<>();

        // Iterate through each persona entry
        rootNode.fields().forEachRemaining(entry -> {
            String personaName = entry.getKey();
            JsonNode personaNode = entry.getValue();
            
            // Extract only arcana and level from the rich data
            String arcana = personaNode.get("arcana").asText();
            int level = personaNode.get("lvl").asInt();
            
            // Create Persona object with only the needed fields
            PersonaDTO personaDTO = new PersonaDTO(arcana, level);
            personaMap.put(personaName, personaDTO);
        });

        return personaMap;
    }

    public static Map<String, Map<String, String>> loadFusionChart(String filename) throws IOException {
        ObjectMapper mapper = new ObjectMapper();

        InputStream inputStream = DataLoader.class.getClassLoader().getResourceAsStream(filename);

        if (inputStream == null) {
            throw new IOException("Resource not found: " + filename);
        }

        return mapper.readValue(inputStream, new TypeReference<Map<String, Map<String, String>>>() {});
    }
}
