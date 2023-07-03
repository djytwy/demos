import styles from './page.module.scss'
import SvgDemo from '../components/svgDemo'
import BorderDemo from '@/components/borderDemo'

export default function Home() {
  return (
    <div>
        <SvgDemo></SvgDemo>
        <BorderDemo></BorderDemo>
    </div>
  )
}
