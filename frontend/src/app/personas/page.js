"use client"
//import { promises as fs } from 'fs';
//import path from 'path';

import { useState, useEffect } from 'react';
import personaImageMap from '../../../data/personaImageMap';
import PersonaCard from '@/components/PersonaCard';
import { Input } from "@/components/ui/input";
import SliderRange from '@/components/DualSlider';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


export default function PersonasPage() {
    const [data, setData] = useState({})
    const [names, setNames] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedArcana, setSelectedArcana] = useState("all")
    const [levelRange, setLevelRange] = useState([0, 100])

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/data/personaData.json")
            const json = await res.json()
            setData(json)
            setNames(Object.keys(json))
        }
        fetchData()
    }, [])

    const filteredNames = names.filter((name) => {
        const persona = data[name]
        const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesArcana = selectedArcana === "all" || persona.arcana === selectedArcana
        const matchesLevel = persona.lvl >= levelRange[0] && persona.lvl <= levelRange[1]
        return matchesSearch && matchesArcana && matchesLevel
      })

    // const filePath = path.join(process.cwd(), 'data/personaData.json'); // Construct full path
    //   const fileContents = await fs.readFile(filePath, 'utf8');
    //   const data = JSON.parse(fileContents);
    //   const names = Object.keys(data);
    return (
        <div className='p-6'>
            <h1 className="text-2xl font-bold mb-4">All Personas</h1>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
                <Input type="text" placeholder="Search by name..." className="py-8 md:w-1/2" value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Select onValueChange={(value) => setSelectedArcana(value)}>
                    <SelectTrigger className="py-8 min-w-[160px]">
                        <SelectValue placeholder="Arcana" ></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Arcana</SelectItem>
                        <SelectItem value="Fool">Fool</SelectItem>
                        <SelectItem value="Magician">Magician</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex items-center gap-3 rounded-md border px-4">
  <span className="text-sm text-muted-foreground">Level</span>
  <div className="w-[150px]">
    <SliderRange value={levelRange} onChange={setLevelRange} />
  </div>
</div>
                
                {/* Range slider would go here */}
            </div>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                {filteredNames.map(name => {
                const p = data[name];
                const imagePath = personaImageMap[name];
                return (
                    <PersonaCard 
                    key={name} 
                    name={name} 
                    imageSrc={imagePath}
                    arcana={p.arcana}
                    level={p.lvl}
                    className='border p-4 rounded shadow-sm' />
                );
                })}
                </div>
        </div>
    )
}