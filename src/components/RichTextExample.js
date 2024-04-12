import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import { useCallback, useEffect, useState } from 'react'

function RichTextExample() {
  const [richTextContent, setRichTextContent] = useState('')

  useEffect(() => {
    // call api
  }, [])

  const postData = useCallback(() => {
    // post to backend
    console.log(richTextContent)
  }, [richTextContent])

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={richTextContent}
        onChange={(event, editor) => {
          const data = editor.getData()
          setRichTextContent(data)
        }}
      />
      <button onClick={postData}>Submit</button>
    </>
  )
}

export default RichTextExample
