"use client";

import Avatar from "./Avatar";

interface AvatarUploadProps {
  currentImage?: string | null;
  userName?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
}

/**
 * Avatar Upload Component (TEMPORARILY DISABLED)
 * 
 * Upload functionality has been disabled.
 * To re-enable:
 * 1. Uncomment the upload code below
 * 2. Re-enable the API route at app/api/upload/avatar/route.ts
 * 3. Restore Cloudinary configuration
 */
export default function AvatarUpload({
  currentImage,
  userName,
  size = "xl",
}: AvatarUploadProps) {
  // Display avatar - if no image, Avatar component will show initials
  const avatarSrc = currentImage || null;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <Avatar
          src={avatarSrc}
          name={userName}
          size={size}
          className="ring-4 ring-slate-200 dark:ring-slate-700"
        />
      </div>
    </div>
  );
}

/* 
 * DISABLED UPLOAD CODE - Uncomment to re-enable
 * 
import { useState, useRef } from "react";
import { Upload, X, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

const [image, setImage] = useState<string | null>(currentImage || null);
const [preview, setPreview] = useState<string | null>(null);
const [isUploading, setIsUploading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState(false);
const fileInputRef = useRef<HTMLInputElement>(null);
const { update } = useSession();

const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    setError("Only JPG and PNG files are allowed");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setError("File size must be less than 5MB");
    return;
  }

  setError("");
  setSuccess(false);

  const reader = new FileReader();
  reader.onloadend = () => {
    setPreview(reader.result as string);
  };
  reader.readAsDataURL(file);

  uploadFile(file);
};

const uploadFile = async (file: File) => {
  setIsUploading(true);
  setError("");

  try {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch("/api/upload/avatar", {
      method: "POST",
      body: formData,
    });

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      console.error("Failed to parse response:", jsonError);
      throw new Error("Invalid response from server");
    }

    if (!response.ok) {
      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const message = retryAfter 
          ? `Too many upload attempts. Please wait ${retryAfter} seconds.`
          : "Too many upload attempts. Please try again later.";
        throw new Error(message);
      }
      
      const errorMessage = data.message || data.error || "Failed to upload avatar";
      console.error("Upload failed:", errorMessage);
      throw new Error(errorMessage);
    }

    if (!data.success) {
      const errorMessage = data.message || "Failed to upload avatar";
      console.error("Upload unsuccessful:", errorMessage);
      throw new Error(errorMessage);
    }

    if (data.avatarUrl) {
      setImage(data.avatarUrl);
    } else if (data.imageUrl) {
      setImage(data.imageUrl);
    }
    
    setPreview(null);
    setSuccess(true);
    
    await update();

    setTimeout(() => setSuccess(false), 3000);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Failed to upload avatar";
    console.error("Upload error:", errorMessage);
    setError(errorMessage);
    setPreview(null);
  } finally {
    setIsUploading(false);
  }
};

const handleClick = () => {
  fileInputRef.current?.click();
};

const handleRemove = () => {
  setPreview(null);
  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};

// Full component JSX with upload functionality:
// 
// return (
//   <div className="flex flex-col items-center">
//     <div className="relative group">
//       <div className="relative">
//         <Avatar
//           src={preview || image}
//           name={userName}
//           size={size}
//           className="ring-4 ring-slate-200 dark:ring-slate-700"
//         />
//         <AnimatePresence>
//           {isUploading && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="absolute inset-0 bg-slate-900/50 rounded-full flex items-center justify-center"
//             >
//               <Loader2 className="h-6 w-6 text-white animate-spin" />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//       <motion.div
//         initial={{ opacity: 0 }}
//         whileHover={{ opacity: 1 }}
//         className="absolute inset-0 bg-slate-900/60 rounded-full flex items-center justify-center cursor-pointer"
//         onClick={handleClick}
//       >
//         <Upload className="h-6 w-6 text-white" />
//       </motion.div>
//     </div>
//     <input
//       ref={fileInputRef}
//       type="file"
//       accept="image/jpeg,image/jpg,image/png"
//       onChange={handleFileSelect}
//       className="hidden"
//     />
//     <div className="mt-4 space-y-2">
//       <button
//         onClick={handleClick}
//         disabled={isUploading}
//         className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {isUploading ? "Uploading..." : "Change Photo"}
//       </button>
//       {preview && !isUploading && (
//         <button
//           onClick={handleRemove}
//           className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400"
//         >
//           Cancel
//         </button>
//       )}
//     </div>
//     <AnimatePresence>
//       {error && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           className="mt-2 text-sm text-red-600 dark:text-red-400"
//         >
//           {error}
//         </motion.div>
//       )}
//       {success && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -10 }}
//           className="mt-2 flex items-center gap-2 text-sm text-green-600 dark:text-green-400"
//         >
//           <CheckCircle2 className="h-4 w-4" />
//           Photo updated successfully
//         </motion.div>
//       )}
//     </AnimatePresence>
//   </div>
// );
*/
