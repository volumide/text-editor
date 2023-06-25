import { useState, useRef } from "react"

import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css"
import "./App.css"
import { FileUploader } from "react-drag-drop-files"

// const VideoBot = Quill.import("formats/video")
// VideoBot.blotName = "video"
// VideoBot.tagName = "iframe"
// Quill.register(VideoBot)

function App() {
  const [content, setContent] = useState("")
  const [dropDown, setDropDown] = useState(false)
  const fileTypes = ["JPG", "PNG", "GIF", "JPEGs"]
  const [modal, setModal] = useState(false)
  const quillRef = useRef(null)
  const [file, setFile] = useState("")
  const [modalType, setModalType] = useState("")
  const [videoLink, setVideoLink] = useState("")

  const [toolbarOptions] = useState([[{ "size": ["small", false, "large", "huge"] }], ["link", "image"], [{ "align": "" }, { "align": "right" }, { "align": "center" }], ["bold", "italic"], [{ "list": "ordered" }, { "list": "bullet" }, "blockquote"]])

  const handleChange = (dt) => {
    setFile(dt)
  }

  const extractVideoId = (url) => {
    const regex = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/)?([a-zA-Z0-9_-]{11})/
    const match = url.match(regex)
    return match ? match[1] : null
  }

  const uploadImage = () => {
    const q = quillRef.current.getEditor()
    const range = q.selection
    if (modalType === "picture") {
      const reader = new FileReader()
      const range = q.getSelection(true)
      console.log(range.index)
      reader.onloadend = () => {
        const url = reader.result
        q.insertEmbed(range, "image", url)
        q.setSelector(range.index + 1)
      }
      reader.readAsDataURL(file)
    }

    if (modalType === "video") {
      const videoId = extractVideoId(videoLink)
      const videoHtml = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen  width="100%" height="300px" ></iframe>`
      const range = q.getSelection(true)
      q.clipboard.dangerouslyPasteHTML(range.index, videoHtml)

      // q.insertEmbed(range, "video", videoLink)
    }

    // https://www.youtube.com/watch?v=9_X8XV2X9I4

    q.insertText(range + 1, "\n", "user")
    // q.setSelector(range)
    q.focus()
    setModal(false)
  }

  const showOption = () => setDropDown(!dropDown)
  const showModal = (type) => () => {
    setModalType(type)
    setDropDown(false)
    setModal(true)
  }

  const hideModal = () => setModal(false)

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
            <div className="border rounded mt-[10px] w-[80%] rounded-[4px] bg-white options text-[#010E05]">
              <div onClick={showModal("picture")} className="flex gap-3 items-center p-3" role="button">
                <i className="fa-solid fa-image block"></i>
                <span className="block">
                  Picture
                  <small className="block text-[#343E37]">jpeg,png</small>
                </span>
              </div>
              <div onClick={showModal("video")} className="flex gap-3 items-center p-3" role="button">
                <i className="fa-solid fa-image block"></i>
                <span className="block text-[#343E37]">
                  Video
                  <small className="block">Embed a youtube video</small>
                </span>
              </div>
              <div onClick={showModal("social")} className="flex gap-3 items-center p-3" role="button">
                <i className="fa-solid fa-image block"></i>
                <span className="block text-[#343E37]">
                  Socials
                  <small className="block">Embed a facebook link</small>
                </span>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      {modal && (
        <div className="absolute top-0 w-screen h-screen bg-gray-200">
          <div className="h-full flex justify-center items-center">
            {/* image upload box */}
            <div className="p-5 bg-white p-[24px] w-2/5 mx-auto rounded">
              <p className="text-[#010E05] font-bold ">Embed</p>
              {/* Image Upload */}
              {modalType === "picture" && (
                <div>
                  <p className="text-[#343E37] font-semibold py-[16px]">Upload Image</p>
                  <div className="pb-[16px]">
                    <label htmlFor="upload" className="mb-2 block text-xs">
                      File upload
                    </label>
                    <FileUploader handleChange={handleChange} name="file" types={fileTypes} id="upload" className="py-[24px]">
                      <div className="p-[50px] border border-dashed border-[#6CAA7D] rounded text-center" role="button">
                        <span className="border rounded-[4px] p-3 border-[#6CAA7D]">Import Image from Device</span>
                      </div>
                    </FileUploader>
                  </div>
                </div>
              )}

              {/* youtube video upload */}
              {modalType === "video" && (
                <div>
                  <div className="py-[16px]">
                    <label htmlFor="provider text-[#333333]"> VIDEO PROVIDER </label>
                    <input type="text" className="p-3 rounded border border=[#E7F1E9] block w-full my-1 bg-[#FAFAFA]" />
                  </div>
                  <div className="py-[16px]">
                    <label htmlFor="provider text-[#333333]"> URL </label>
                    <input type="text" className="p-3 rounded border border=[#E7F1E9] block w-full my-1 bg-[#FAFAFA]" onChange={(e) => setVideoLink(e.target.value)} />
                  </div>
                </div>
              )}

              {/* Social media platform */}
              {modalType === "social" && (
                <div>
                  <div className="py-[16px]">
                    <label htmlFor="provider text-[#333333]"> SOCIAL MEDIA PLATFORM </label>
                    <input type="text" className="p-3 rounded border border=[#E7F1E9] block w-full my-1 bg-[#FAFAFA]" />
                  </div>
                  <div className="py-[16px]">
                    <label htmlFor="provider text-[#333333]"> URL </label>
                    <input type="text" className="p-3 rounded border border=[#E7F1E9] block w-full my-1 bg-[#FAFAFA]" />
                  </div>
                  <div className="py-[16px]">
                    <label htmlFor="provider text-[#333333]"> CODE </label>
                    <input type="text" className="p-3 rounded border border=[#E7F1E9] block w-full my-1 bg-[#FAFAFA]" />
                  </div>
                </div>
              )}

              {/* video upload */}
              <div>
                <button className="bg-[#0A7227] p-3 rounded-[4px] mr-5 text-white px-[16px]" onClick={uploadImage}>
                  Embed
                </button>
                <button className="border border-[#CEE3D4] p-3 rounded px-[16px]" onClick={hideModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
