import { Analytics } from '@vercel/analytics/react'
import { ParticleCanvas } from './ParticleCanvas'
import './index.css'

export function App() {
	return (
		<div className="container">
			<img src="/logo.svg" alt="" className="logo" />
			<ParticleCanvas />
			<img src="/text.svg" alt="" className="text" />
			<img src="/scroll-icon.svg" alt="" className="scroll" />
			<Analytics />
		</div>
	)
}
