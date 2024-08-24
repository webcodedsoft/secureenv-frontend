import React from 'react'

import { Modal } from './Modal'

interface IProps {
  children: React.ReactNode
  className?: string
  width?: string
}

export const InfoModal: React.FC<IProps> = ({ children, className, width }) => (
  <Modal>
    <div className={`${width} relative z-50 mx-auto flex h-fit cursor-default flex-col bg-none md:block`}>
      <div className={`relative grow ${className} bg-neutral-bg dark:bg-dark-neutral-bg`}>{children}</div>
    </div>
  </Modal>
)

InfoModal.defaultProps = {
  className: '',
  width: '',
}
