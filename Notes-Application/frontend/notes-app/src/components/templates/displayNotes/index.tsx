import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultiSelectComponent from "@/components/ui/multipleSelect";
import { Textarea } from "@/components/ui/textarea";
import { SearchAndSelect } from "@/components/utils";
import { useEffect, useState } from "react";
import { APISERVICE } from "./Apiservices";

const tags = ["Important", "Science","General", "Notes"]

interface Tags{
    id: number,
    name: string
}

interface NotesData{
    title:string,
    description: string,
    tags: Tags[]
}

interface NotesRequestData{
    title: string,
    description: string,
    tags: number[]
}


export default function AddNotes(){

    const [searchId, setSearchId] = useState(0);
    const [searchTags, setSearchTags] = useState<Tags[]>([])
    const [tagArray, setTagArray] = useState<Tags[]>([])
    const [notesData, setNotesData] = useState<NotesData[]>([])

    // this will be used to store the data of the notes in the backend of the system
    const [formData, setFormData] = useState<NotesData>({
        title: "",
        description: "",
        tags: []
    })

    /*const tagsArray: Tags[] = tags.map((item, index) => {
        return{
            id: index + 1,
            name: item
        }
    })*/

    const fetchAllTags = async() => {
        try {
            const response = await APISERVICE.GET(
              `http://localhost:7071/api/v1/tags`
            );
            if (response.status === 200) {
              setTagArray(response.data);
            } else {
              throw new Error("No data present");
            }
          }
        catch(error){
            console.error("The data could not be fetched")
            throw error;
        }
    }

    useEffect(() => {
        fetchAllTags();   // calling the fetch all tags function
    },[])

    /*useEffect(() => {
        setTagArray(tagsArray)
      }, []);*/

    // this will be used to add the tags acting as a multiselect
    const handleItemChange = (field: keyof NotesData, value: any) => {
        const currentData = formData[field]   // getting the tags array
        const updatedData = [...currentData, value]  // adding the new tag to the array

        setFormData((prevData) => {
            return{
                ...prevData,
                [field]: updatedData
            }
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleItemFoundChange = (placeholder: string, isItemFound: boolean, value: string) => {
        if (value === "Unit") {
            const newTag: Tags = { id: tagArray.length + 1, name: placeholder };
            setTagArray((prevTags) => [...prevTags, newTag]);
        }
    }

    console.log("The current state of the formData: ", formData)
    console.log("The tags array: ", searchTags)

    // run this when the search tags has been updated and add the value in the search tags function
    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            tags: searchTags
        }))
    },[searchTags])

    const handleSubmit = async(e:any) => {

        e.preventDefault()

        const dataToSubmit: NotesRequestData = {
            title: formData.title,
            description: formData.description,
            tags: formData.tags.map((tag: any) => Number(tag.id)),
        }

        console.log("The request Data to send is: ", dataToSubmit)

        try {
            const response = await APISERVICE.POST(
              `http://localhost:7071/api/v1/notes`,
              dataToSubmit
            );
            if (response.status === 200) {
              setNotesData(response.data);

              // clearing the form state 
              setFormData({ title: "", description: "", tags: [] });
            } else {
              throw new Error("No data present");
            }
          } catch (error) {
            console.error("Could not fetch the data", error);
            throw error;
          }
    }

    return(
        <div className="ml-20 flex flex-col gap-2 rounded-lg bg-secondary w-1/2">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-6 w-3/4">
                        <Label className = "text-xl font-semibold px-4 py-4">
                            {formData.title !== "" ? formData.title : "Note Title"}
                        </Label>
                        <Input 
                        className = "rounded-md shadow-md px-4 border-none w-auto" 
                        type="text" 
                        placeholder="Title..."
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <MultiSelectComponent 
                            unitsData={tagArray}
                            selectedUnits={searchTags}
                            setSelectedUnits={setSearchTags}
                            placeholder="Tags"
                            onCreate={handleItemFoundChange}
                        />
                    </div>
                </div>
                <div>
                    <Textarea 
                    className = "rounded-md shadow-md border-none h-96"
                    placeholder = "Note Description..."
                    name = "description"
                    value={formData.description}
                    onChange={handleInputChange}
                    ></Textarea>
                </div>
                <Button type = "button" className="items-end rounded-full shadow-lg font-semibold bg-black
                 text-white px-2 py-2 hover:bg-white hover:text-black" onClick={handleSubmit}>Add Note</Button>
        </div>
    )
}

/*

<SearchAndSelect
                        value={searchTags}
                        //setValue={(value) => handleItemChange("tags", value)}
                        setValue={setSearchTags}
                        array={tagArray}
                        setId={setSearchId}
                        placeholder="Search Tags"
                        classname="w-[200px] justify-between bg-secondary"
                        />
*/