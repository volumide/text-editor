import { useState } from "react"

import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

import "./App.css"

function App() {
  const [content, setContent] = useState("")
  const [dropDown, setDropDown] = useState(false)
  const [toolbarOptions] = useState([[{ "size": ["small", false, "large", "huge"] }], ["link", "image"], [{ "align": "" }, { "align": "right" }, { "align": "center" }], ["bold", "italic"], [{ "list": "ordered" }, { "list": "bullet" }, "blockquote"]])

  const showOption = () => setDropDown(!dropDown)

  // const handleInputChange = (e) => {
  //   setContent(e.target.value)
  // }

  return (
    <div className="w-2/5 mx-auto border  h-[900px] rounded-[4px] border-[#E7F1E9] my-10 overflow-auto">
      <div className="py-7 border-b border-b-[#E7F1E9]"></div>
      <div className="p-5">
        <h3 className="py-[12px] text-[24px] text-[#343E37]">This is the title</h3>
        <ReactQuill
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
  )
}

export default App
