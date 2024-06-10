import React from 'react'
import "./home.css"
import Welcome from '../welcome/welcome'
import Nav from '../nav/nav'
import Stories from './stories/stories'
import StoryBoard from './stories/storyboard'
import Post from './post/post'

function Home() {
  return (
    <div className='home-container' >
      {/* <Welcome/> */}
      <div className='nav4logo' >
        <div>logo</div>
        <div>
              <svg className='nav-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path></svg>
            </div>
      </div>
      <Stories />
      {/* <StoryBoard/> */}
      <Post/>
    </div>
  )
}

export default Home