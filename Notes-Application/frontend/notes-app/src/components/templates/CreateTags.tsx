import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { APISERVICE } from "./displayNotes/Apiservices";

interface Tags {
  id: number;
  name: string;
}

export default function CreateTags() {
  // Setting the initial contents of the form for the tags creation
  const [formData, setFormData] = useState<Tags>({
    id: 0,
    name: "",
  });
  const [tagsArray, setTagsArray] = useState<Tags[]>([])

  const handleSubmit = async(e: any) => {

    e.preventDefault();   // preventing the default form submissions
    console.log("The request data to be sent is: ", formData);
    const method = formData.id ? "PUT" : "POST";
    const url = `http://localhost:7071/api/v1/tags`

    try {
        
        const response = await APISERVICE[method](url,formData)
        if (response.status === 200) {
            setTagsArray(response.data.map((tag:any) => {
                return{id: tag.id, name: tag.name}
            }));
        } else {
            throw new Error("No data present");
        }
    } catch (error) {
        console.error("Problem fetching the data")
        throw error
    }
  };

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, name: e.target.value });
  };

  // clearing the form data for the tags
  const handleClear = (e: any) => {
    setFormData({
      id: 0,
      name: "",
    });
  };

  return (
    <>
      <div className="flex justify-center items-center bg-secondary">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-md"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">
            Create Tags
          </h2>
          <div className="mb-4">
            <Label className="block text-sm font-medium mb-2">
              Tag Name
            </Label>
            <Input
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter tag name"
            />
          </div>
          <div className="flex justify-between mt-6">
            <Button
              type="submit"
              className="px-4 py-2 text-white font-medium rounded-md shadow transition"
            >
              Create
            </Button>
            <Button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-md shadow hover:bg-gray-400 transition"
            >
              Clear
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
