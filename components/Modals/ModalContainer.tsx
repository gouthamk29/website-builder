import { ModalEntry } from "@/store/ModalStore"

export function ModalContainer({
  entry,
  onRequestClose,
}: {
  entry: ModalEntry
  onRequestClose: () => void
}) {
  const { renderer, options = {} } = entry

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && options?.dismissOnBackdrop !== false) {
      onRequestClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onMouseDown={handleBackdropClick}
    >
      <div
        className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-in fade-in duration-200"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {renderer(() => onRequestClose())}
      </div>
    </div>
  )
}
