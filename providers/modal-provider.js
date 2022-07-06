import { useEffect, useState, createContext } from "react"

const ModalContext = createContext({
  displayModal: (dialog, props) => {}
})

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState(null)

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
    setModal(null)
  }

  useEffect(() => {
    if (modal) setOpen(true)
  }, [modal])

  const displayModal = (component, props) => setModal({ component, props })

  const Dialog = modal?.component

  return (
    <>
      {modal ? <Dialog open={open} handleClose={handleClose} {...modal.props} /> : <div />}
      <ModalContext.Provider value={{ displayModal }}>
        {children}
      </ModalContext.Provider>
    </>
  )
}

export { ModalContext, ModalProvider }