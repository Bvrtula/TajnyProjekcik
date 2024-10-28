import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function PDFUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [testname, setTestName] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile || !testname) {
      alert("Please provide both a test name and a file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", selectedFile);
    formData.append("testname", testname);  // Add test name to FormData

    try {
      const response = await fetch("http://localhost:4000/teacher/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.text();
        console.log("File uploaded successfully:", result);
      } else {
        console.error("Error uploading file:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="grid items-center text-center mx-[30%] my-[3%] gap-2">
      <div>
        <Label htmlFor="testname">Nazwa testu</Label>
        <Input onChange={(e) => setTestName(e.target.value)} type="text" id="testname" />
      </div>
      <div>
        <Label htmlFor="pdf">PDF</Label>
        <Input id="pdf" type="file" onChange={handleFileChange} />
      </div>
      <Button onClick={handleUpload}>Zapisz</Button>
    </div>
  );
}