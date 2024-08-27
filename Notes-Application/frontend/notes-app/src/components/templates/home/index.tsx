import MultiSelectComponent from "@/components/ui/multipleSelect";
import AddNotes from "../displayNotes";
import Navbar from "../navbars/navbar";
import { useState } from "react";
import NotesList from "../displayTable";
import CreateTags from "../CreateTags";

interface UnitsData {
  id: number;
  name: string;
}

export default function Home() {
  const [unitsData, setUnitsData] = useState<UnitsData[]>([
    { id: 1, name: "Unit 1" },
    { id: 2, name: "Unit 2" },
    { id: 3, name: "Unit 3" },
  ]);

  const [selectedUnits, setSelectedUnits] = useState<UnitsData[]>([]);

  return (
    <div className="bg-secondary min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow p-6">
            <AddNotes />
            
        </main>
        <footer className="p-4 text-center text-sm text-muted-foreground border-t border-border">
            &copy; {new Date().getFullYear()} Notes-App. All rights reserved.
        </footer>
    </div>
);
}
