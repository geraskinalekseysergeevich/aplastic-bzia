import React, { useEffect, useRef } from 'react'

export const ParticleCanvas = () => {
	const canvasRef = useRef(null)

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')

		// Устанавливаем размеры канваса
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		// Объект для хранения координат мыши
		const mouse = {
			x: null,
			y: null,
			radius: 100,
		}

		// Обработчик события движения мыши
		window.addEventListener('mousemove', event => {
			mouse.x = event.x
			mouse.y = event.y
		})

		// Загрузка изображения
		const img = new Image()
		img.src = 'image2.png' // Путь к изображению

		img.onload = function () {
			const adjustX = (canvas.width - img.width) / 2
			const adjustY = (canvas.height - img.height) / 2

			// Очищаем канвас и рисуем изображение
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			ctx.drawImage(img, adjustX, adjustY, img.width, img.height)

			// Получаем пиксели изображения
			const textCoordinates = ctx.getImageData(adjustX, adjustY, img.width, img.height)
			const particleArray = []

			// Blueprint для создания частиц
			class Particle {
				constructor(x, y) {
					this.x = x
					this.y = y
					this.size = 11
					this.baseX = this.x
					this.baseY = this.y
					this.density = Math.random() * 15 + 5
				}

				draw() {
					ctx.fillStyle = 'white'
					ctx.fillRect(this.x, this.y, this.size, this.size)
				}

				update() {
					const dx = mouse.x - this.x
					const dy = mouse.y - this.y
					const distance = Math.sqrt(dx * dx + dy * dy)
					const forceDirectionX = dx / distance
					const forceDirectionY = dy / distance
					const maxDistance = mouse.radius + 500
					const force = (maxDistance - distance) / maxDistance + 3
					const directionX = forceDirectionX * force * this.density
					const directionY = forceDirectionY * force * this.density

					if (distance < mouse.radius) {
						this.x -= directionX
						this.y -= directionY
					} else {
						if (this.x !== this.baseX) {
							const dx = this.x - this.baseX
							this.x -= dx / 60
						}
						if (this.y !== this.baseY) {
							const dy = this.y - this.baseY
							this.y -= dy / 60
						}
					}
				}
			}

			// Функция для инициализации частиц
			function init() {
				particleArray.length = 0 // Очищаем массив частиц
				const pixelSize = 11

				for (let y = 0; y < textCoordinates.height; y += pixelSize) {
					for (let x = 0; x < textCoordinates.width; x += pixelSize) {
						const alpha = textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] // Альфа-канал
						if (alpha > 128) {
							const positionX = x + adjustX
							const positionY = y + adjustY
							particleArray.push(new Particle(positionX, positionY))
						}
					}
				}
			}

			init()

			// Анимация частиц
			function animate() {
				ctx.clearRect(0, 0, canvas.width, canvas.height)

				// Рисуем и обновляем все частицы
				particleArray.forEach(particle => {
					particle.draw()
					particle.update()
				})

				// Перезапуск анимации
				requestAnimationFrame(animate)
			}

			animate()
		}
	}, [])

	return <canvas id="myCanvas" ref={canvasRef}></canvas>
}
