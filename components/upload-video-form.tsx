"use client"

import { useState } from "react"
import { Upload, LinkIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UploadVideoForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    category: "",
    thumbnail: "/placeholder.svg?height=180&width=320",
    date: new Date().toISOString().split("T")[0],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add New Video</h2>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="link">
        <TabsList className="mb-4">
          <TabsTrigger value="link">
            <LinkIcon className="mr-2 h-4 w-4" />
            Video Link
          </TabsTrigger>
          <TabsTrigger value="upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Video
          </TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="link" className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="url">Video URL</Label>
              <Input
                id="url"
                name="url"
                placeholder="https://example.com/video"
                value={formData.url}
                onChange={handleChange}
                required
              />
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="file">Video File</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your video file here, or click to browse
                </p>
                <Input id="file" type="file" className="hidden" accept="video/*" />
                <Button type="button" variant="secondary" size="sm">
                  Browse Files
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Maximum file size: 500MB. Supported formats: MP4, MOV, AVI
              </p>
            </div>
          </TabsContent>

          <div className="space-y-4 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Video title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Video description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Events">Events</SelectItem>
                  <SelectItem value="Academics">Academics</SelectItem>
                  <SelectItem value="Campus Life">Campus Life</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="thumbnail">Thumbnail URL (optional)</Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                placeholder="https://example.com/thumbnail.jpg"
                value={formData.thumbnail}
                onChange={handleChange}
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Save Video</Button>
            </div>
          </div>
        </form>
      </Tabs>
    </div>
  )
}

