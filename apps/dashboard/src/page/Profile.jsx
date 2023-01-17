import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Posts from '~/components/Posts'

const Profile = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    (async () => {
      const res = await fetch ('https://jsonplaceholder.typicode.com/posts')

      const data = await res.json()
      console.log(data);
      setPosts(data)
    })()
  }, [])
  
  return (
    <>
      <Posts />
        <div className="">pisah</div>
        {/* <ol>
          {
            posts.map(post => (
              <li key={post.id}>{`${post.id}. ${post.title}`}</li>
            ))
          }
        </ol> */}
    </>
  )
}

export default Profile