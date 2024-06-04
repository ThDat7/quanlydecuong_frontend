import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Home'
import RichTextExample from './components/RichTextExample'
import Footer from './layout/Footer'
import Header from './layout/Header'
import AssignOutlines from './components/CourseOutlines'
import ShowCKEdtior from './components/ShowCKEditor'
import SearchResult from './components/SearchResult'
import CourseOutlineEdit from './components/CourseOutlineEdit'
import CourseOutlineView from './components/CourseOutlineView'
import EducationPrograms from './components/EducationPrograms'
import Urls from './configs/Urls'
import Template from './components/template'
import CourseOutlines from './components/CourseOutlines'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Container>
          <Routes>
            <Route
              path='/s'
              element={
                <ShowCKEdtior
                  data={`<p>44<strong>44</strong></p><ol><li>da</li><li>bc</li><li><p>&nbsp;</p><figure class="table"><table><tbody><tr><td>6</td><td>6</td><td>6</td><td>5</td></tr><tr><td>3</td><td>4</td><td>4</td><td>5</td></tr><tr><td>3</td><td>2</td><td>6</td><td>4</td></tr><tr><td>2</td><td>&nbsp;</td><td>5</td><td>4</td></tr></tbody></table></figure></li></ol>`}
                />
              }
            />
            <Route
              path={Urls['course-outlines']}
              element={<CourseOutlines />}
            />
            <Route
              path={`${Urls['course-outline-edit']}:id`}
              element={<CourseOutlineEdit />}
            />
            <Route path={Urls['home']} element={<Home />} />
            <Route path={Urls['search-result']} element={<SearchResult />} />
            <Route
              path={`${Urls['course-outline-view']}:id`}
              element={<CourseOutlineView />}
            />
            <Route
              path={`${Urls['education-program-view']}:id`}
              element={<EducationPrograms />}
            />
            <Route path={`${Urls['search']}`} element={<SearchResult />} />
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
