import React, { useEffect } from "react";
import { Button, Upload } from "antd";
import { EventFormStepProps } from ".";

function Media({
  currentStep,
  setCurrentStep,
  selectedMediaFiles,
  setSelectedMediaFiles,
  eventData,
  setEventData,
}: EventFormStepProps) {
  // Remove a selected file
  const onSelectedMediaRemove = (index: number) => {
    const updatedMediaFiles = selectedMediaFiles.filter((_: any, i: number) => i !== index);
    const fileToRemove = selectedMediaFiles[index];
    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    setSelectedMediaFiles(updatedMediaFiles);
  };

  // Remove already uploaded media
  const onAlreadyUploadedMediaRemove = (index: number) => {
    const updatedMedia = eventData.media.filter((_: any, i: number) => i !== index);
    setEventData({ ...eventData, media: updatedMedia });
  };

  // Cleanup URLs on unmount
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
    file.preview = URL.createObjectURL(file);
    setSelectedMediaFiles((prev: any) => [...prev, file]);
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

      {/* Display Selected Files */}
      <div className="flex flex-wrap gap-5 mt-4">
        {selectedMediaFiles.map((file: any, index: number) => (
          <div
            className="border p-3 border-solid border-gray-200 flex flex-col items-center"
            key={file.name + index}
          >
            <img
              src={file.preview}
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

      {/* Display Already Uploaded Media */}
      <div className="flex flex-wrap gap-5 mt-4">
        {eventData?.media?.map((url: string, index: number) => (
          <div
            className="border p-3 border-solid border-gray-200 flex flex-col items-center"
            key={url + index}
          >
            <img
              src={url}
              alt="media"
              className="w-40 h-40 object-cover"
            />
            <button
              className="mt-2 text-red-500 underline text-sm"
              onClick={() => onAlreadyUploadedMediaRemove(index)}
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
