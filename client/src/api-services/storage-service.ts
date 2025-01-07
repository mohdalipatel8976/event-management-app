import { supabase } from "../config/firebase-config"; // Ensure correct path to Supabase config

/**
 * Uploads a file to Supabase storage and returns the public URL.
 * @param file - The file to upload.
 * @returns Public URL of the uploaded file or null on failure.
 */
async function uploadFileAndReturnURL(file: File): Promise<string | null> {
  const bucketName = "planaroma"; // Replace with your Supabase bucket name
  const fileName = `${Date.now()}_${file.name}`; // Unique file name based on timestamp

  try {
    // Step 1: Upload the file to the Supabase bucket
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: "3600", // Optional: Set cache control headers
        upsert: true,        // Replace the file if it already exists
        contentType: file.type, // Ensure correct file type
      });

    if (uploadError) {
      console.error("Upload error:", uploadError.message);
      throw new Error(uploadError.message);
    }

    // Step 2: Get the public URL of the uploaded file
    const { data: publicUrlData } = await supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    if (!publicUrlData) {
      throw new Error("Failed to retrieve public URL for the uploaded file.");
    }

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("Error uploading file:", err);
    return null; // Return null on failure
  }
}

export { uploadFileAndReturnURL };
