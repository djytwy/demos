import styles from './page.module.css'
import Logo from './logo'


// 这样可以改变SVG的颜色
export default function Home() {
  return (
    <div>
        <Logo className={styles.logo}></Logo>
    </div>
  )
}
