import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PersonaCard({ name, imageSrc, arcana, level }) {
  return (
    <Card className="w-60 shadow-md hover:shadow-lg transition-all">
      <CardContent className="flex flex-col items-center h-full">
      <CardTitle className="text-center text-lg  pb-4">{name}</CardTitle>
        {imageSrc ? (<img
          src={imageSrc}
          alt={name}
          className="h-40 object-contain"
          loading="lazy"
        />) : <div className="w-full h-40 flex bg-gray-200 items-center justify-center text-gray-400 text-6xl font-semibold rounded-md">N/A</div>}
        <div className="flex-grow" />
        <div className="mt-auto pt-4 w-full">
            <p className="text-sm text-gray-600">Arcana: {arcana}</p>
            <p className="text-sm text-gray-600">Level: {level}</p>
        </div>
      </CardContent>
    </Card>
  );
}