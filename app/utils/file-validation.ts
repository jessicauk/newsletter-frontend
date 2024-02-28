export default function fileValidate(file: File) {
  const validTypes = ["application/pdf", "image/png"];
  if (validTypes.indexOf(file.type) === -1) {
    return false;
  }
  return true;
}