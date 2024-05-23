import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Home'
import RichTextExample from './components/RichTextExample'
import Footer from './layout/Footer'
import Header from './layout/Header'
import AssignOutlines from './components/AssignOutlines'
import ShowCKEdtior from './components/ShowCKEditor'
import CourseOutlineDetail from './components/CourseOutlineDetail'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route path='/' element={<RichTextExample />} />
            <Route
              path='/s'
              element={
                <ShowCKEdtior
                  data={`<p>44<strong>44</strong></p><ol><li>da</li><li>bc</li><li><p>&nbsp;</p><figure class="table"><table><tbody><tr><td>6</td><td>6</td><td>6</td><td>5</td></tr><tr><td>3</td><td>4</td><td>4</td><td>5</td></tr><tr><td>3</td><td>2</td><td>6</td><td>4</td></tr><tr><td>2</td><td>&nbsp;</td><td>5</td><td>4</td></tr></tbody></table></figure></li></ol>`}
                />
              }
            />
            <Route path='/assign-outlines' element={<AssignOutlines />} />
            <Route
              path='/course-outlines/:assignId'
              element={<CourseOutlineDetail />}
            />

            <Route path='/home' element={<Home />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
