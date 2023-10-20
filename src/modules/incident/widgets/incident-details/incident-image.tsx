import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export const IncidentImage = () => {
  const imageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 })

  console.log(originalSize)
  useEffect(() => {
    const bbox = [263, 444, 23, 35]
    const imageEl = imageRef.current
    const canvasEl = canvasRef.current
    if (!imageEl || !canvasEl) return

    const ctx = canvasEl?.getContext('2d')
    canvasEl.width = imageEl.width
    canvasEl.height = imageEl.height

    if (!ctx) return

    ctx.drawImage(imageEl, 0, 0, imageEl.width, imageEl.height)
    ctx.strokeStyle = 'red' // Set the color
    ctx.lineWidth = 4 // Set the line width
    ctx.strokeRect(50, 75, 95, 100)
  }, [])

  return (
    <div className="h-96 w-[35%]">
      <div className="relative h-full w-full rounded-xl bg-gray-300">
        <Image
          ref={imageRef}
          src="/images/photo1.jpg"
          alt="фото"
          fill
          onLoad={(image) => {
            setOriginalSize({
              width: image.currentTarget.height,
              height: image.currentTarget.width
            })
          }}
        />
        <canvas ref={canvasRef} className="absolute"></canvas>
      </div>
    </div>
  )
}
