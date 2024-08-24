import React, { FC } from 'react'

interface IModalProps {
  children: React.ReactNode
}

export const Modal: FC<IModalProps> = ({ children }) => (
  <div className="fixed inset-x-0 bottom-0 top-0 z-50 flex max-h-full w-full flex-col items-center justify-center overflow-y-auto bg-black/70 sp-7 md:inset-0 md:p-4">
    <div className="size-full overflow-x-hidden md:h-fit md:justify-center">{children}</div>
  </div>
)
