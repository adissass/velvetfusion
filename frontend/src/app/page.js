'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import personas from "../../public/data/personaData.json";
import PersonaSearch from "@/components/PersonaSearch";



export default function Home() {
  const [personaA, setPersonaA] = useState("");
  const [personaB, setPersonaB] = useState("");
  const [result, setResult] = useState("");
  

  const handleFuse = () => {
    const p1 = personas[personaA];
    const p2 = personas[personaB];
    if (!p1 || !p2) {
      setResult("One or both personas not found.");
      return;
    }
  

  const avgLevel = Math.floor((p1.lvl + p2.lvl) / 2);
  const fusedArcana = `${p1.arcana} × ${p2.arcana}`;

  setResult(`Fusion: ${personaA} × ${personaB}
    Result Arcana: ${fusedArcana}
    Estimated Level: ${avgLevel}`);

    };


  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <h1 className="text-3xl font-bold">VelvetFusion</h1>

      <div className="flex gap-2">
        <PersonaSearch label="Persona A" onSelect={setPersonaA} />
        <span className="text-2xl">x</span>
        <PersonaSearch label="Persona B" onSelect={setPersonaB} />
        
      </div>
      <Button onClick={handleFuse}>Fuse</Button>

      {result && (
        <div className="mt-4 p-4 border rounded-md bg-gray-100 w-full max-w-md whitespace-pre-wrap text-left">
        <strong>Result:</strong> {result}
      </div>
      )}
     
    </div>



  );
}
