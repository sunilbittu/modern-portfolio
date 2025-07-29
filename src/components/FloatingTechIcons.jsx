import { motion } from 'framer-motion'
import { 
  Code2, 
  Smartphone, 
  Database, 
  Cloud,
  Cpu,
  Globe,
  Zap,
  Layers
} from 'lucide-react'

const FloatingTechIcons = () => {
  const icons = [
    { Icon: Code2, delay: 0, x: '10%', y: '20%' },
    { Icon: Smartphone, delay: 0.5, x: '85%', y: '15%' },
    { Icon: Database, delay: 1.0, x: '15%', y: '70%' },
    { Icon: Cloud, delay: 1.5, x: '80%', y: '75%' },
    { Icon: Cpu, delay: 2.0, x: '50%', y: '10%' },
    { Icon: Globe, delay: 2.5, x: '90%', y: '45%' },
    { Icon: Zap, delay: 3.0, x: '5%', y: '45%' },
    { Icon: Layers, delay: 3.5, x: '60%', y: '85%' }
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/20"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0.1, 0.3],
            scale: [0, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
            y: [0, -20, 0, -10, 0]
          }}
          transition={{
            duration: 8,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.5, opacity: 0.6 }}
        >
          <Icon className="h-8 w-8" />
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingTechIcons

