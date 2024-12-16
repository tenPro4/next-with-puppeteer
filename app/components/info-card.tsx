import Image from 'next/image';
import React from 'react'

type Props = {
  name?:string;
  bio?:string;
  socialLink?:string;
  imageLink?:string;
}

const InfoCard = ({
  name="-",
  bio="-",
  socialLink="-",
  imageLink
}: Props) => {
  return (
    <div className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="p-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden">
          <img
            src={imageLink || "/placeholder.svg?height=96&width=96"}
            alt={name}
            className="object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-center text-gray-600">{bio}</p>
      </div>
    </div>
    <div className="px-6 py-4 bg-gray-100">
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => window.open(socialLink, '_blank')}
        disabled={socialLink === "-"}
      >
        Connect
      </button>
    </div>
  </div>
  )
}

export default InfoCard