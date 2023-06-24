import { useState, useRef } from "react"

import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"

import "./App.css"
import { FileUploader } from "react-drag-drop-files"

function App() {
  const [content, setContent] = useState("")
  const [dropDown, setDropDown] = useState(false)
  const fileTypes = ["JPG", "PNG", "GIF", "JPEGs"]
  const quillRef = useRef(null)

  const [toolbarOptions] = useState([[{ "size": ["small", false, "large", "huge"] }], ["link", "image"], [{ "align": "" }, { "align": "right" }, { "align": "center" }], ["bold", "italic"], [{ "list": "ordered" }, { "list": "bullet" }, "blockquote"]])

  const handleChange = async (dt) => {
    const q = quillRef.current.getEditor()
    console.log(q)
    const reader = new FileReader()
    // console.log(q)
    reader.onloadend = () => {
      const range = q.selection
      const url = reader.result
      q.insertEmbed(range, "image", url)
      q.insertText(range + 1, "\n", "user")

      q.focus()
    }
    reader.readAsDataURL(dt)
  }
  const showOption = () => setDropDown(!dropDown)

  return (
    <>
      <div className="w-2/5 mx-auto border  h-[900px] rounded-[4px] border-[#E7F1E9] my-10 overflow-auto">
        <div className="py-7 border-b border-b-[#E7F1E9]"></div>
        <div className="p-5">
          <h3 className="py-[12px] text-[24px] text-[#343E37]">This is the title</h3>
          <ReactQuill
            ref={quillRef}
            className="my-[16px] "
            value={content}
            onChange={setContent}
            placeholder="Write here..."
            // placeholder="Content here"
            modules={{
              toolbar: toolbarOptions
            }}
          />
          <button className="block" onClick={showOption}>
            <i className="fa-solid fa-circle-plus text-[#E7F1E9] text-[24px] "></i>
          </button>
          {dropDown ? (
            <div className="border rounded mt-[10px]  w-[277px] rounded-[4px] bg-white options ">
              <button onClick={showOption}>Picture</button>
              <button onClick={showOption}>Video</button>
              <button onClick={showOption}>Social</button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="absolute top-0 w-screen h-screen bg-gray-200">
        <div className="h-full flex justify-center items-center">
          {/* image upload box */}
          <div className="p-5 bg-white p-[24px] w-2/5 mx-auto rounded">
            <p className="text-[#010E05] font-bold ">Embed</p>
            <p className="text-[#343E37] font-semibold py-[16px]">Upload Image</p>
            <div className="pb-[16px]">
              <label htmlFor="upload" className="mb-2 block text-xs">
                File upload
              </label>
              <FileUploader handleChange={handleChange} name="file" types={fileTypes} id="upload" className="py-[24px]" />
            </div>
            <div>
              <button className="bg-[#0A7227] p-3 rounded-[4px] mr-5 text-white px-[16px]">Embed</button>
              <button className="border border-[#CEE3D4] p-3 rounded px-[16px]">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
