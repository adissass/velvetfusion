"use client"
import { Slider } from "@/components/ui/slider"
import { useState, useRef, useEffect } from "react"
export default function SliderRange({ onChange }) {
    const [value, setValue] = useState([0, 100])
    const handleChange = (val) => {
      setValue(val)
      onChange?.(val)  // if parent passed a handler, call it
    }
  
    const [active, setActive] = useState(false)
    const timeoutRef = useRef(null)

    useEffect(() => {
        if (active) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = setTimeout(() => setActive(false), 1500)
        }
        return () => clearTimeout(timeoutRef.current)
      }, [active])
  return (
    <div className="space-y-3 mt-8">
        
        <div className="flex justify-center">
        <Slider
        value={value}
        onValueChange={handleChange}
        onPointerDown={() => setActive(true)}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        max={100}
        step={10}
        />
        </div>


        <div className={`flex justify-between text-sm text-muted-foreground transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0"}`}>
        <span>{value[0]}</span>
        <span>{value[1]}</span>
        </div>
    
    
    </div>
    
  )
}