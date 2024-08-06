// import React from 'react'
import CoverCard from './CoverCard'
import StateCardAbout from './StateCardAbout'

export default function HomeHeader() {
  return (
    <div>
      <div className="h-[90vh] relative z-10 mt-0">
        <div className="absolute top-0 left-0 right-0 bg-[url('./img/cover.png')] bg-cover bg-center bg-no-repeat  w-full h-screen -z-10" style={{ backgroundSize: '100%' }}></div>
        <CoverCard />
      </div>
    </div>
  )
}
