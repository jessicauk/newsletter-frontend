export default function InputFile() {
  function showFileName(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const output =
      document.getElementById("file-name") ?? document.createElement("div");
    const children = Array.from(input?.files ?? []).map((file) => {
      return `<div>${file?.name}</div>`;
    });
    output.innerHTML = children.join("");
  }
  return (
    <>
      <label
        htmlFor="file-upload"
        className="cursor-pointer inline-block bg-blue-500 text-white rounded-md px-4 py-2"
      >
        Upload files
      </label>
      <input
        id="file-upload"
        className="hidden"
        type="file"
        name="document"
        onChange={showFileName}
        required
        multiple
      />
      <div id="file-name" className="mt-2 text-gray-700"></div>
    </>
  );
}
