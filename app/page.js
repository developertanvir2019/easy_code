"use client";
import { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function Home() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [inputStyles, setInputStyles] = useState({
    size: "w-52 h-5",
    color: "text-black",
    border: "border-gray-300",
  });
  const [buttonStyles, setButtonStyles] = useState({
    size: "px-4 py-0",
    color: "bg-blue-500 text-white",
    text: "Button",
  });

  const sizeMapping = {
    "w-48 h-5": { width: "12rem", height: "1.25rem" },
    "w-36 h-3": { width: "9rem", height: "0.75rem" },
    "w-56 h-6": { width: "14rem", height: "1.5rem" },
    "w-52 h-5": { width: "13rem", height: "1.25rem" },
  };

  const borderMapping = {
    "border-gray-300": "1px solid #D1D5DB",
    "border-red-500": "1px solid #EF4444",
    "border-blue-500": "1px solid #3B82F6",
    "border-green-500": "1px solid #10B981",
  };

  const colorMapping = {
    "text-black": "black",
    "text-red-500": "red",
    "text-blue-500": "blue",
  };

  const buttonSizeMapping = {
    "px-4 py-2": { padding: "1rem 0.5rem" },
    "px-6 py-3": { padding: "1.5rem 0.75rem" },
    "px-2 py-1": { padding: "0.5rem 0.25rem" },
  };

  const buttonColorMapping = {
    "bg-blue-500 text-white": { background: "#3B82F6", textColor: "white" },
    "bg-red-500 text-white": { background: "#EF4444", textColor: "white" },
    "bg-green-500 text-white": { background: "#10B981", textColor: "white" },
  };
  const handleDownload = async () => {
    const zip = new JSZip();

    // Dynamically resolve styles
    const inputSizeStyles = sizeMapping[inputStyles.size] || {};
    const inputBorderStyle = borderMapping[inputStyles.border] || "";
    const inputColorStyle = colorMapping[inputStyles.color] || "";
    const buttonSizeStyles = buttonSizeMapping[buttonStyles.size] || {};
    const buttonColorStyles = buttonColorMapping[buttonStyles.color] || {};
    const formattedButtonColorClass = buttonStyles.color.replace(/\s+/g, "-");
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        <div>
          <input class="${inputStyles.size} ${inputStyles.color} ${inputStyles.border}" placeholder="...." />
         <button class="${buttonStyles.size} ${formattedButtonColorClass}">${buttonStyles.text}</button>
        </div>
      </body>
      </html>
    `;

    const cssContent = `
      .${inputStyles.size} {
        width: ${inputSizeStyles.width};
        height: ${inputSizeStyles.height};
      }
      .${inputStyles.color} {
        color: ${inputColorStyle};
      }
      .${inputStyles.border} {
        border: ${inputBorderStyle};
      }
       .${buttonStyles.size} {
    padding: ${buttonSizeStyles.padding};
  }
   .${formattedButtonColorClass} {
    background-color: ${buttonColorStyles.background};
    color: ${buttonColorStyles.textColor};
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
              <option value="w-48 h-5">Medium</option>
              <option value="w-36 h-3">Small</option>
              <option value="w-56 h-6">Large</option>
            </select>

            <label className="mt-4 block">Border Color:</label>
            <select
              value={inputStyles.border}
              onChange={(e) =>
                setInputStyles({ ...inputStyles, border: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              <option value="border-gray-300">Gray</option>
              <option value="border-red-500">Red</option>
              <option value="border-blue-500">Blue</option>
            </select>

            <label className="mt-4 block">Text Color:</label>
            <div className="flex gap-4">
              {Object.entries(colorMapping).map(([className, color]) => (
                <label key={className} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="text-color"
                    value={className}
                    checked={inputStyles.color === className}
                    onChange={() =>
                      setInputStyles({ ...inputStyles, color: className })
                    }
                  />
                  <span style={{ color }}>{color}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        {selectedElement === "button" && (
          <div>
            {/* Button Text */}
            <label className="block mt-4">Button Text:</label>
            <input
              value={buttonStyles.text}
              onChange={(e) =>
                setButtonStyles({ ...buttonStyles, text: e.target.value })
              }
              className="w-full p-2 border rounded mb-2"
            />

            {/* Button Size */}
            <label className="block mt-4">Button Size:</label>
            <select
              value={buttonStyles.size}
              onChange={(e) =>
                setButtonStyles({ ...buttonStyles, size: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              <option value="px-4 py-0">Medium</option>
              <option value="px-2 py-0">Small</option>
              <option value="px-6 py-1">Large</option>
            </select>

            {/* Button Color */}
            <label className="block mt-4">Button Color:</label>
            <div className="flex gap-4">
              {Object.entries(buttonColorMapping).map(([className, colors]) => (
                <label key={className} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="button-color"
                    value={className}
                    checked={buttonStyles.color === className}
                    onChange={() =>
                      setButtonStyles({ ...buttonStyles, color: className })
                    }
                  />
                  <span
                    style={{
                      backgroundColor: colors.background,
                      color: colors.textColor,
                      padding: "5px",
                      borderRadius: "0.25rem",
                    }}
                  >
                    {colors.textColor}
                  </span>
                </label>
              ))}
            </div>
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
          className="mt-8 bg-green-500 text-white px-3 py-1"
          onClick={handleDownload}
        >
          Export
        </button>
      </div>
    </div>
  );
}
