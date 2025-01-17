import styles from './borderDemo.module.scss'


// 实现一个渐变色边框，并且是圆角框的border, 主要用到CSS中: -webkit-mask, -webkit-mask-composite, mask-composite 相当于是作一个遮罩层
export default function BorderDemo() {
    return <div className={styles.card}>demo</div>
}