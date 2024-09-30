import { FC } from 'react'
import { Hourglass, MagnifyingGlass, ThreeCircles } from 'react-loader-spinner'

export interface LoaderProps {
  color?: string
  height: number
  width: number
  type?: 'Loading' | 'Wait' | 'Search'
}

export const Loader: FC<LoaderProps> = ({ height, width, color = '#264653', type = 'Loading' }: LoaderProps) => {
  if (type === 'Loading') {
    return (
      <>
        <div className="fixed left-0 top-0 z-50 flex size-full items-center justify-center bg-black/50">
          <ThreeCircles height={height} width={width} color={color} ariaLabel="loading-indicator" />
        </div>
      </>
    )
  }

  if (type === 'Wait') {
    return (
      <Hourglass
        visible={true}
        height={height}
        width={width}
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#FF6606', '#FF660626']}
      />
    )
  }

  if (type === 'Search') {
    return <MagnifyingGlass color={'#FF7A00'} height={height} width={width} />
  }
}
