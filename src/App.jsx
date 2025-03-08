import { ParticleCanvas } from './ParticleCanvas'
import './index.css'

export function App() {
	return (
		<div className="container">
			<img src="/public/logo.svg" alt="" className="logo" />
			<ParticleCanvas />
			<img src="/public/text.svg" alt="" className="text" />
			<img src="/public/scroll-icon.svg" alt="" className="scroll" />
		</div>
	)
}
