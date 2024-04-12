import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

import { useCallback, useEffect, useState } from 'react'

function ShowCKEdtior({ data }) {
  return (
    <>
      <CKEditor
        data={data}
        editor={ClassicEditor}
        disabled={true}
        config={{
          toolbar: [],
        }}
      />
    </>
  )
}

export default ShowCKEdtior
