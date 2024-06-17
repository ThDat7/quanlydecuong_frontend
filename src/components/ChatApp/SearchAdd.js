import './ChatApp.css'
import { useContext, useState } from 'react'
import UserContext from '../../contexts/UserContext'
import { addDoc, collection } from 'firebase/firestore'
import { FirebaseDb } from '../../configs/Firebase'
import { authApis, endpoints } from '../../configs/Apis'
import * as qs from 'qs'

const SearchAdd = ({ currentChatUsers }) => {
  const [isAdd, setIsAdd] = useState(false)
  const [currentUser] = useContext(UserContext)
  const [searchResult, setSearchResult] = useState([])

  const excludedIds = [...currentChatUsers.map((e) => e.id), currentUser.id]

  const searchAddUser = async (kw) => {
    if (!kw) {
      setSearchResult([])
      return
    }
    try {
      const res = await authApis.get(endpoints['search-teachers'], {
        params: { kw, excludedIds },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        },
      })
      setSearchResult(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleAdd = async (id) => {
    if (!id) return

    const chatRef = collection(FirebaseDb, 'chats')

    try {
      await addDoc(chatRef, {
        lastMessage: { text: '', createdAt: null, uid: null },
        users: [currentUser.id, parseInt(id)],
      })
      setIsAdd(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <img
        src={!isAdd ? '/plus.png' : '/minus.png'}
        alt=''
        onClick={() => setIsAdd(!isAdd)}
        className='add'
      />
      {isAdd && (
        <div className='addUser'>
          <div>
            <input
              type='text'
              placeholder='Tìm kiếm'
              onChange={async (e) => await searchAddUser(e.target.value)}
            />
          </div>
          {searchResult.map((rs) => (
            <div
              className='search-user-result'
              key={rs.id}
              onClick={() => handleAdd(rs.id)}
            >
              <img src={rs.avatar || '/default_avatar.png'} alt='' />
              <span>
                {rs.fullName}
                <div>{rs.majorName}</div>
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default SearchAdd
