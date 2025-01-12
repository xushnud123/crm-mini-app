import * as Yup from "yup";

export const addProductSchema = Yup.object({
  name: Yup.string().required("Name is required").min(5).max(200),
  category: Yup.string().required("Category is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10)
    .max(200),
  photo: Yup.mixed()
    .test("fileSize", "File size must be less than 10MB", (value: any) => {
      return value && value[0]?.size <= 10 * 1024 * 1024;
    })
    .test(
      "fileType",
      "Only JPG, PNG, or GIF files are allowed",
      (value: any) => {
        return (
          value &&
          ["image/jpeg", "image/png", "image/gif"].includes(value[0]?.type)
        );
      }
    )
    .required("Photo is required"),
});

export const updateProductSchema = Yup.object({
  name: Yup.string().required("Name is required").min(5).max(200),
  category: Yup.string().required("Category is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10)
    .max(200),
  photo: Yup.mixed()
    .test("fileSize", "File size must be less than 10MB", (value: any) => {
      if (!value || value.length === 0) return true;
      return value[0]?.size <= 10 * 1024 * 1024;
    })
    .test(
      "fileType",
      "Only JPG, PNG, or GIF files are allowed",
      (value: any) => {
        if (!value || value.length === 0) return true;
        return ["image/jpeg", "image/png", "image/gif"].includes(
          value[0]?.type
        );
      }
    ),
});
