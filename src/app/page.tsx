import SvgDemo from '../components/svgDemo'
import BorderDemo from '@/components/borderDemo'
import SwrDemo from '@/components/swrDemo'
import ScrollBarDemo from '@/components/scrollBarDemo'
import FetchControllerDemo from '@/components/fetchControllerDemo'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-gray-400 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 p-6 flex flex-col gap-y-6 min-w-[50%]">
      <p>SvgDemo:</p>
      <SvgDemo></SvgDemo>
      <p>BorderDemo:</p>
      <BorderDemo></BorderDemo>
      <p>SwrDemo:</p>
      <SwrDemo></SwrDemo>
      <p>ScrollBarDemo:</p>
      <ScrollBarDemo></ScrollBarDemo>
      <p>FetchControllerDemo:</p>
      <FetchControllerDemo></FetchControllerDemo>
      <Link href="/swrRequestDemo">swrRequestDemo</Link>
    </div>
  )
}
