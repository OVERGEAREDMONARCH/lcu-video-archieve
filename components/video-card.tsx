import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function VideoCard({ video }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-video">
        <Image src={video.thumbnail || "/placeholder.svg"} alt={video.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="icon" className="rounded-full">
            <Play className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold line-clamp-1">{video.title}</h3>
          <Badge variant="outline">{video.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center text-xs text-muted-foreground">
        <Calendar className="h-3 w-3 mr-1" />
        {formatDate(video.date)}
      </CardFooter>
    </Card>
  )
}

