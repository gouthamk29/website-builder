'use client'
import { UseModalStore } from "@/store/ModalStore"
import { useEffect } from "react"
import { ModalContainer } from "./ModalContainer"

export function ModalStack() {
  const { modals, closeModal } = UseModalStore()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modals.length) {
        const top = modals[modals.length - 1]
        if (top.options?.dismissOnEsc !== false) closeModal(top.id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modals, closeModal])

  return (
    <>
      {modals.map((m) => (
        <ModalContainer
          key={m.id}
          entry={m}
          onRequestClose={() => closeModal(m.id)}
        />
      ))}
    </>
  )
}
