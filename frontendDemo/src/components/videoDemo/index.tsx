import * as React from 'react'

export default function VideoDemo() {
    /**
     * 在React中使用video标签播放视频时，更改src属性并不会自动重新加载视频。
     * 这是因为video标签的src属性在切换后不会触发重新加载视频的行为. 
     * 解决办法就是利用key 改变key值，使react强制刷新dom
     */
    const [video, setVideo] = React.useState('xxxx')
    const [videoKey, setVideoKey] = React.useState("key")

    return (
        <div>
            <video src={video} autoPlay loop key={videoKey}></video>
            <button onClick={() => {
                setVideo("yyyy")
                setVideoKey("222")
            }}>change video</button>
        </div>
    )
}