import React from 'react'
import Template1 from './template/Template1'
import Template2 from './template/Template2'
import Template3 from './template/Template3'
import Template4 from './template/Template4'
import Template5 from './template/Template5'
import Template6 from './template/Template6'
import Template7 from './template/Template7'
import Template8 from './template/Template8'

const ShowTemplate = ({ theme, id }) => {
  return (
    <div>
      {
        theme == 1 && <Template1 id={id} />

      }
      {
        theme == 2 && <Template2 id={id} />

      }
      {
        theme == 3 && <Template3 id={id} />

      }
      {
        theme == 4 && <Template4 id={id} />

      }
      {
        theme == 5 && <Template5 id={id} />

      }
      {
        theme == 6 && <Template6 id={id} />

      }
      {
        theme == 7 && <Template7 id={id} />

      }
      {
        theme == 8 && <Template8 id={id} />

      }
    </div>
  )
}

export default ShowTemplate