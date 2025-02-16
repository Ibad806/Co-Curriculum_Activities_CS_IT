import React from "react"
import banner from "../assets/banner.png"
import image1 from "../assets/image 1.png"
import image2 from "../assets/image 2.png"
import image3 from "../assets/Rectangle 15.png"
import image4 from "../assets/Rectangle 16.png"
import image5 from "../assets/Rectangle 17.png"
import image6 from "../assets/Rectangle 18.png"
import image7 from "../assets/Rectangle 19.png"
import image8 from "../assets/Rectangle 20.png"
import { Link } from "react-router-dom"


export default function Qawwali() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <img
          src={banner}
          alt="Qawwali performers"
          className="w-full h-full object-cover rounded-lg brightness-75"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-8">QAWWALI</h1>
          {/* <button className="text-white border-white hover:bg-white/20">
            View Events
          </button> */}
        </div>
      </div>

      {/* Event Details */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Experience the Soul-Stirring Music of Qawwali</h2>
            <p className="text-gray-600 leading-relaxed">
              Join us for an unforgettable evening of timeless Sufi music, where artists create a spiritual symphony. Let the rhythmic beats, soulful verses, and deep devotion transport you to a realm of pure musical ecstasy.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold">📅 Date:</span>
                <span>19-Feb-2025</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">📅 Days Left:</span>
                <span>5 days</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">📍 Venue:</span>
                <span>Sir Syed University</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">💫 Our:</span>
                <span>Night Special Event</span>
              </div>
            </div>
            <Link to="/payment">
            <button className="border px-5 py-2 rounded-full text-xl bg-red-600 text-white bold">BUY </button>
            </Link>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg bg-gray-200">
            <img
              src={image1}
              alt="Event preview"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start space-y-16">
          <div className="relative h-[300px] md:h-[400px] rounded-lg bg-gray-200">
            <img
              src={image2}
              alt="Event preview"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="space-y-6 ">
            <p className="text-gray-600 leading-relaxed bold">
              Join us for an unforgettable evening of timeless Sufi music, where artists create a spiritual symphony. Let the rhythmic beats, soulful verses, and deep devotion transport you to a realm of pure musical ecstasy.
              Let the rhythmic beats, soulful verses, and deep devotion transport you to a realm of pure musical ecstasy. Let the rhythmic beats, soulful verses, and deep devotion transport you to a realm of pure musical ecstasy.
            </p>
          </div>

        </div>
      </div>

      {/* Gallery Section */}
      {/* <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">GALLERY</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 md:h-64">
                    <image
                      src="https://www.bing.com/images/search?view=detailV2&ccid=SGjQ3uVB&id=9FA5BBFC243513EB6817D4AA005A32F627FAF907&thid=OIP.SGjQ3uVBTILsT0CaHS1mYQHaEb&mediaurl=https%3a%2f%2fwww.youlinmagazine.com%2farticles%2f2172-5.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.4868d0dee5414c82ec4f409a1d2d6661%3frik%3dB%252fn6J%252fYyWgCq1A%26pid%3dImgRaw%26r%3d0&exph=599&expw=1000&q=qawwali+pictures&simid=608048060241287031&FORM=IRPRST&ck=D0874F82F48E2D91452DA15711F004FB&selectedIndex=2&itb=0"
                      alt={`Gallery image ${i + 1}`}
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div> */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">GALLERY</h2>
          <div className="grid grid-cols-12 gap-4">
            {/* Large left image */}
            <div className="col-span-5 row-span-2">
              <div className="relative h-[500px]">
                <img
                  src={image1}
                  alt="Audience at event"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Top right wide image */}
            <div className="col-span-7">
              <div className="relative h-[250px]">
                <img
                  src={image3}
                  alt="Outdoor crowd"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Two small images in middle right */}
            <div className="col-span-3">
              <div className="relative h-[200px]">
                <img
                  src={image4}
                  alt="Performers"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="col-span-4">
              <div className="relative h-[200px]">
                <img
                  src={image5}
                  alt="Venue setup"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Two small images on bottom left */}
            <div className="col-span-2">
              <div className="relative h-[150px]">
                <img
                  src={image6}
                  alt="Purple lit performance"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="relative h-[150px]">
                <img
                  src={image7}
                  alt="Night event"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Bottom right wide image */}
            <div className="col-span-7">
              <div className="relative h-[150px]">
                <img
                  src={image8}
                  alt="Performers at microphones"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
