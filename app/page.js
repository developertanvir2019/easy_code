"use client";
import { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function Home() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [inputStyles, setInputStyles] = useState({
    size: "w-64",
    color: "text-black",
    border: "border-gray-300",
  });
  const [buttonStyles, setButtonStyles] = useState({
    size: "px-4 py-2",
    color: "bg-blue-500 text-white",
    text: "Button",
  });

  const handleDownload = async () => {
    const zip = new JSZip();

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        <div>
          <input class="${inputStyles.size} ${inputStyles.color} ${inputStyles.border}" placeholder="Input Field" />
          <button class="${buttonStyles.size} ${buttonStyles.color}">${buttonStyles.text}</button>
        </div>
      </body>
      </html>
    `;

    const cssContent = `
      .${inputStyles.size} {
        width: 16rem;
      }
      .${inputStyles.color} {
        color: black;
      }
      .${inputStyles.border} {
        border: 1px solid #D1D5DB;
      }
      .${buttonStyles.size} {
        padding: 0.5rem 1rem;
      }
      .${buttonStyles.color} {
        background-color: #3B82F6;
        color: white;
      }
    `;

    // Add files to a folder inside the ZIP
    const folder = zip.folder("exported_files");
    folder.file("index.html", htmlContent);
    folder.file("style.css", cssContent);

    // Generate ZIP and trigger download
    const zipContent = await zip.generateAsync({ type: "blob" });
    saveAs(zipContent, "customization.zip");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4">
        <h2 className="font-bold mb-4">Customize</h2>
        {selectedElement === "input" && (
          <div>
            <label>Size:</label>
            <select
              value={inputStyles.size}
              onChange={(e) =>
                setInputStyles({ ...inputStyles, size: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              <option value="w-64">Medium</option>
              <option value="w-48">Small</option>
              <option value="w-80">Large</option>
            </select>
          </div>
        )}
        {selectedElement === "button" && (
          <div>
            <label>Text:</label>
            <input
              value={buttonStyles.text}
              onChange={(e) =>
                setButtonStyles({ ...buttonStyles, text: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
            />
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8">
        <div>
          <input
            className={`border ${inputStyles.size} ${inputStyles.color} ${inputStyles.border}`}
            placeholder="Input Field"
            onClick={() => setSelectedElement("input")}
          />
          <button
            className={`ml-4 ${buttonStyles.size} ${buttonStyles.color}`}
            onClick={() => setSelectedElement("button")}
          >
            {buttonStyles.text}
          </button>
        </div>
        <button
          className="mt-8 bg-green-500 text-white px-4 py-2"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
}
