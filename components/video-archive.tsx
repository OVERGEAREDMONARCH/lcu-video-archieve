"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import VideoCard from "./video-card"
import UploadVideoForm from "./upload-video-form"
import Header from "./header"

// Sample video data - would come from a database in a real application
const initialVideos = [
  {
    id: "1",
    title: "University Orientation 2023",
    description: "Welcome orientation for new students",
    thumbnail: "/placeholder.svg?height=180&width=320",
    url: "https://example.com/video1",
    date: "2023-09-15",
    category: "Events",
  },
  {
    id: "2",
    title: "Faculty of Science Lecture Series",
    description: "Guest lecture on Quantum Computing",
    thumbnail: "/placeholder.svg?height=180&width=320",
    url: "https://example.com/video2",
    date: "2023-08-22",
    category: "Academics",
  },
  {
    id: "3",
    title: "Campus Tour",
    description: "Virtual tour of Lead City University campus",
    thumbnail: "/placeholder.svg?height=180&width=320",
    url: "https://example.com/video3",
    date: "2023-07-10",
    category: "Campus Life",
  },
  {
    id: "4",
    title: "Graduation Ceremony 2023",
    description: "Highlights from this year's graduation",
    thumbnail: "/placeholder.svg?height=180&width=320",
    url: "https://example.com/video4",
    date: "2023-06-30",
    category: "Events",
  },
]

export default function VideoArchive() {
  const [videos, setVideos] = useState(initialVideos)
  const [searchQuery, setSearchQuery] = useState("")
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = ["All", "Events", "Academics", "Campus Life", "Sports"]

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || video.category === activeCategory

    return matchesSearch && matchesCategory
  })

  const handleAddVideo = (newVideo) => {
    setVideos([...videos, { id: (videos.length + 1).toString(), ...newVideo }])
    setShowUploadForm(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-primary">Video Archives</h1>

          <div className="flex w-full md:w-auto gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search videos..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={() => setShowUploadForm(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Video
            </Button>
          </div>
        </div>

        {showUploadForm ? (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <UploadVideoForm onSubmit={handleAddVideo} onCancel={() => setShowUploadForm(false)} />
            </CardContent>
          </Card>
        ) : null}

        <Tabs defaultValue="All" className="mb-8">
          <TabsList className="mb-4">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} onClick={() => setActiveCategory(category)}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No videos found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

