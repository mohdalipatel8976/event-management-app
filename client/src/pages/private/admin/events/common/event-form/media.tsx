import React, { useEffect } from "react";
import { Button, Upload } from "antd";
import { EventFormStepProps } from ".";

function Media({
  currentStep,
  setCurrentStep,
  selectedMediaFiles,
  setSelectedMediaFiles,
}: EventFormStepProps) {
  // Function to remove a selected media file
  const onSelectedMediaRemove = (index: number) => {
    const updatedMediaFiles = selectedMediaFiles.filter((_: any, i: number) => i !== index);
    const fileToRemove = selectedMediaFiles[index];
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    setSelectedMediaFiles(updatedMediaFiles);
  };

  // Cleanup object URLs on component unmount
  useEffect(() => {
    return () => {
      selectedMediaFiles.forEach((file: any) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [selectedMediaFiles]);

  // Handle file upload
  const handleBeforeUpload = (file: any) => {
    file.preview = URL.createObjectURL(file); // Generate preview URL
    setSelectedMediaFiles((prev: any) => [...prev, file]); // Add file to the selected list
    return false; // Prevent automatic upload
  };

  return (
    <div>
      {/* Upload Component */}
      <Upload
        listType="picture-card"
        beforeUpload={handleBeforeUpload}
        multiple
        showUploadList={false}
      >
        <span className="text-gray-500 text-xs">Click here to upload media</span>
      </Upload>

      {/* Display Uploaded Media */}
      <div className="flex flex-wrap gap-5 mt-4">
        {selectedMediaFiles.map((file: any, index: number) => (
          <div
            className="border p-3 border-solid border-gray-200 flex flex-col items-center"
            key={file.name}
          >
            <img
              src={file.preview || URL.createObjectURL(file)}
              alt="media"
              className="w-40 h-40 object-cover"
            />
            <button
              className="mt-2 text-red-500 underline text-sm"
              onClick={() => onSelectedMediaRemove(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-5">
        <Button onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
        <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default Media;
