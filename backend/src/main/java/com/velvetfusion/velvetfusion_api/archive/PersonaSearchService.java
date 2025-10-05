package com.velvetfusion.velvetfusion_api.archive;
import com.velvetfusion.velvetfusion_api.PersonaNotFoundException;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.Map;

@Service
public class PersonaSearchService {
    private Map<String, PersonaDTO> personaData;

    public PersonaSearchService() throws IOException {
       this.personaData = DataLoader.loadPersonaData("personaData.json");

        if (personaData == null || personaData.isEmpty()) {
            throw new IOException("Failed to load persona data or data is empty");
        }
    }


    private String normalize(String name) {
        return name.toLowerCase().replaceAll("[^a-z]", "");
    }

    private String findPersonaByName(String inputName) {
        String normalizedInput = normalize(inputName);

        for (String personaName : personaData.keySet()) {
            if (normalize(personaName).equals(normalizedInput)) {
                return personaName;
            }
        }
        return null;
    }

    public PersonaDTO find(String name) throws PersonaNotFoundException {
        String actualName = findPersonaByName(name);
        if (actualName == null) {
            throw new PersonaNotFoundException("Persona not found: " + name);
        }
        return personaData.get(actualName);
    }

    // Helper method to get the actual name (useful for display)
    public String getActualName(String inputName) {
        return findPersonaByName(inputName);
    }

    // Utility method to list all personas
    public Map<String, PersonaDTO> getAllPersonas() {
        return personaData;
    }
}