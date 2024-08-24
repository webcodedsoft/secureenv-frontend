import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const withCreatePortal =
  (WrappedComponent: any) =>
  ({ ...props }: any) => {
    useEffect(() => {
      document.body.style.overflowY = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'

      return () => {
        document.body.style.overflowY = 'visible'
        document.body.style.position = 'inherit'
      }
    }, [])

    return createPortal(<WrappedComponent {...props} />, document.body)
  }

export default withCreatePortal
