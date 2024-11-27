import { ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'

const events = [
  {
    id: 1,
    title: 'Taylor Swift in Big Tour',
    description:
      'Lorem ipsum dolor sit amet consectetur. A vivamus donec bibendum massa erat the ultrices nulla. Velit euismod gravida...',
    image: 'https://live.staticflickr.com/65535/49049007453_c0c4b272ca_o.jpg',
    author: {
      name: 'Jonathan Willis',
      avatar: 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png',
      date: 'July 17, 2024',
      readTime: '5 min',
    },
  },
  {
    id: 2,
    title: 'Royal Albert Hall Events',
    description:
      'Lorem ipsum dolor sit amet consectetur. A vivamus donec bibendum massa erat the ultrices nulla. Velit euismod gravida...',
    image:
      'https://th.bing.com/th/id/OIP.voLVMJX4Uka6I99CIPCv6QHaE8?w=2560&h=1707&rs=1&pid=ImgDetMain',
    author: {
      name: 'Marian Ed',
      avatar: 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png',
      date: 'June 13, 2024',
      readTime: '10 min',
    },
  },
  {
    id: 3,
    title: 'Yanni Will Be in London',
    description:
      'Lorem ipsum dolor sit amet consectetur. A vivamus donec bibendum massa erat the ultrices nulla. Velit euismod gravida...',
    image: 'https://th.bing.com/th/id/R.6cdf26728f97f5780a69ee333df8eb02?rik=lZuMk4y4hej9Jg&pid=ImgRaw&r=0',
    author: {
      name: 'Jack Nikelson',
      avatar: 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png',
      date: 'May 08, 2024',
      readTime: '7 min',
    },
  },
  {
    id: 4,
    title: 'Yanni Will Be in London',
    description:
      'Lorem ipsum dolor sit amet consectetur. A vivamus donec bibendum massa erat the ultrices nulla. Velit euismod gravida...',
    image: 'https://th.bing.com/th/id/R.6cdf26728f97f5780a69ee333df8eb02?rik=lZuMk4y4hej9Jg&pid=ImgRaw&r=0',
    author: {
      name: 'Jack Nikelson',
      avatar: 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png',
      date: 'May 08, 2024',
      readTime: '7 min',
    },
  },
  {
    id: 5,
    title: 'Yanni Will Be in London',
    description:
      'Lorem ipsum dolor sit amet consectetur. A vivamus donec bibendum massa erat the ultrices nulla. Velit euismod gravida...',
    image: 'https://th.bing.com/th/id/R.6cdf26728f97f5780a69ee333df8eb02?rik=lZuMk4y4hej9Jg&pid=ImgRaw&r=0',
    author: {
      name: 'Jack Nikelson',
      avatar: 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png',
      date: 'May 08, 2024',
      readTime: '7 min',
    },
  },
]

export default function NewsletterEvents() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideCount = 3

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + slideCount) % events.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - slideCount + events.length) % events.length)
  }

  return (
    <div className="max-w-[80%] mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 space-y-4">
          <h2 className="text-2xl font-semibold">Subscribe to our newsletter</h2>
          <p className="text-gray-600">
            For weekly later news and offers about music world, Join us here.
          </p>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors">
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:w-2/3">
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${(currentSlide * 100) / slideCount}%)` }}
              >
                {events.map((event) => (
                  <div key={event.id} className="w-full lg:w-1/3 flex-shrink-0 px-4">
                    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="flex items-center gap-3">
                          <img
                            src={event.author.avatar}
                            alt={event.author.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{event.author.name}</p>
                            <p className="text-sm text-gray-500">
                              {event.author.date} · {event.author.readTime}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {events.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentSlide === index ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <a
              href="#"
              className="text-black font-medium flex items-center gap-2 hover:text-gray-700"
            >
              All News
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
